import React, { useContext, useEffect, useRef, useState } from "react";

import { fetchVideo } from "../../../api/movie";
import { getUser } from "../../../firebase/loginAPI";
import { addLike, removeLike } from "../../../firebase/likeAPI";
import { UserContext } from "../../../context/userContext";
import { history } from "../../../history/history";
import { isMobile } from "react-device-detect";
import MovieInfoUI from "./MovieInfo.presenter";

export default function MovieInfo({ movieData, setIsOpenMovieInfo }) {
  const { user } = useContext(UserContext);
  const [isPlay, setIsPlay] = useState(false);
  const [videoData, setVideoData] = useState({});
  const [like, setLike] = useState(false);
  const modalRef = useRef(null);
  const filterRef = useRef(null);

  const fetchLike = async () => {
    if (user) {
      const data = await getUser();
      const isLike =
        data && data.likeList.find((likeId) => likeId === videoData.id);
        console.log(isLike)
      setLike(!!isLike);
    }
  };

  const onClickClose = () => {
    modalRef.current.style.animation = "fadeOut 800ms";
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
      // 비디오 데이터가 아예 없을 경우 기존 영화 데이터를 적용
      setVideoData(movieData);
      console.log(error);
    }
  };

  const onClickPlay = () => {
    if (!videoData.videos || !videoData.videos.results.length) {
      alert("영상이 존재하지 않습니다!");
      return;
    }
    setIsPlay(true);
  };

  const onClickLike = async () => {
    if (!user) {
      alert("로그인 후 이용가능합니다!");
      return;
    }
    if (!like) {
      const res = await addLike(videoData);
      if (res) {
        setLike(true);
      }
    } else {
      console.log("a")
      const res = await removeLike(videoData);
      console.log(res)
      if (res) {
        setLike(false);
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

  return (
    <>
      {videoData.id && (
        <MovieInfoUI
          modalRef={modalRef}
          isPlay={isPlay}
          videoData={videoData}
          like={like}
          onClickClose={onClickClose}
          onClickPlay={onClickPlay}
          onClickLike={onClickLike}
          filterRef={filterRef}
        />
      )}
    </>
  );
}
