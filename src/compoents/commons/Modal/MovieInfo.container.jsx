import React, { useContext, useEffect, useRef, useState } from "react";

import { fetchVideo } from "../../../api/movie";
import { getUser } from "../../../firebase/loginAPI";
import { addLike, removeLike } from "../../../firebase/likeAPI";
import { UserContext } from "../../../context/userContext";
import { history } from "../../../history/history";
import { isMobile } from "react-device-detect";
import MovieInfoUI from "./MovieInfo.presenter";
import { useMediaQuery } from "react-responsive";
import { sweetToast } from "../../../sweetAlert/sweetAlert";

export default function MovieInfo({
  movieData,
  setIsOpenMovieInfo,
  // 좋아요를 누를 시 mypage 데이터를 수정하기 위해 추가
  setMypageLikeData,
}) {
  const { user } = useContext(UserContext);
  const [isPlay, setIsPlay] = useState(false);
  const [videoData, setVideoData] = useState({});
  const [like, setLike] = useState(false);
  const [isExceed, setIsExceed] = useState(false);
  const likListLimit = 100;
  const [videoUrl, setVideoUrl] = useState("");
  const isMedium = useMediaQuery({
    query: "(max-width: 780px)and(min-width:501px)",
  });
  const isSmall = useMediaQuery({ query: "(max-width: 500px)" });
  const modalCardRef = useRef(null);
  const filterRef = useRef(null);
  const iframeRef = useRef(null);
  const closeBtnRef = useRef(null);
  const likeBtnRef = useRef(null);
  const modalCardWrapperRef = useRef(null);

  const fetchLike = async () => {
    if (user) {
      const data = await getUser();
      const isLike =
        data && data.likeList.find((likeId) => likeId === videoData.id);
      setLike(!!isLike);
      setIsExceed(data.likeList.length > likListLimit);
    }
  };

  const onClickClose = () => {
    modalCardWrapperRef.current.style.animation = "fadeOut 0.6s";
    setTimeout(() => {
      setIsOpenMovieInfo(false);
      document.body.style.overflow = "auto";
    }, 500);
  };

  const fetchData = async () => {
    try {
      const data = await fetchVideo(movieData.id, movieData.media_type);
      // Themovie DB API에서 기존 영화 데이터와 다른 영화 비디오 데이터를 줄때가 있어서 title로 기존 영화 데이터와 비디오 데이터를 비교하여 같지 않으면 그냥 기존 영화 데이터를 적용
      if (
        data.title !== movieData.title &&
        data.name !== movieData.name &&
        data.original_name !== movieData.original_name
      ) {
        setVideoData(movieData);
        return;
      }
      setVideoData(data);
    } catch (error) {
      // 비디오 데이터가 없을 경우 기존 영화 데이터를 적용
      setVideoData(movieData);
      console.log(error);
    }
  };

  const onClickPlay = (vedio) => {
    if (!videoData.videos || !videoData.videos.results.length) {
      sweetToast("현재 영상이 존재하지 않습니다!", "warning");
      return;
    }
    modalCardRef.current.scroll({ top: 0, behavior: "smooth" });
    setVideoUrl(vedio);
    setIsPlay(true);
  };

  const onClickLike = async () => {
    if (!user) {
      return sweetToast("로그인 후 이용가능합니다!", "warning");
    }
    if(isExceed) {
      return sweetToast("최대 찜 목록 수를 초과하였습니다.\n찜 목록 삭제 후 이용해주세요!", "warning");
    }
    if (!like) {
      setLike(true);
      await addLike(videoData);
      if (setMypageLikeData) {
        // firebase 정렬과 같은 순서를 맞춰주기 위해 사용함
        const patternNumber = /[0-9]/;
        const patternAlphabet = /[a-zA-Z]/;
        const patternHangul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        const orderLevelDesc = [patternNumber, patternAlphabet, patternHangul];
        const getLevel = (str) => {
          const index = orderLevelDesc.findIndex((pattern) => pattern.test(str));
          // orderLevelDesc 배열에서 만족하는 패턴의 인덱스를 반환해줌
          return index;
        };
        setMypageLikeData((prev) =>
          [...prev, videoData].sort((a, b) => {
            // 첫번째 문자를 넣어줘서 만족는 패턴의 인덱스를 반환 받음
            const aLevel = getLevel(a.title.charAt(0));
            const bLevel = getLevel(b.title.charAt(0));
            // 시작하는 문자열이 같은 종류일 경우는 유니코드 값으로 사전식 정렬
            if (aLevel === bLevel) {
              return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            }
            // 문자열이 같은 종류가 아닌 경우 위 패턴에 나온 순서대로 정렬
            return aLevel - bLevel;
          })
        );
      }
    } else {
      setLike(false);
      removeLike(videoData);
      if (setMypageLikeData) {
        setMypageLikeData((prev) =>
          prev.filter((item) => item.id !== videoData.id)
        );
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (videoData.id) {
      fetchLike();
    }
  }, [videoData]);

  useEffect(() => {
    if (isMobile) {
      window.history.pushState(null, "", window.location.href);

      window.onpopstate = () => {
        history.go(1);
        this.handleGoback();
      };
      window.onpopstate = () => {
        onClickClose();
      };
    }
  }, []);

  useEffect(() => {
    if (isPlay) {
      iframeRef.current.focus();
    }
  }, [isPlay]);

  useEffect(() => {
    if (videoData.id) modalCardRef.current.focus();
  }, [videoData]);

  return (
    <>
      {videoData.id && (
        <MovieInfoUI
          modalCardWrapperRef={modalCardWrapperRef}
          modalCardRef={modalCardRef}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
          videoData={videoData}
          like={like}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          isMedium={isMedium}
          isSmall={isSmall}
          onClickClose={onClickClose}
          onClickPlay={onClickPlay}
          onClickLike={onClickLike}
          filterRef={filterRef}
          iframeRef={iframeRef}
          closeBtnRef={closeBtnRef}
          likeBtnRef={likeBtnRef}
          setMypageLikeData={setMypageLikeData}
        />
      )}
    </>
  );
}
