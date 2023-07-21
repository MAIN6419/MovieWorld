import React, { useContext, useEffect, useRef, useState } from "react";
import {
  CloseBtn,
  ModalCard,
  ModalDim,
  ModalTitle,
  ModalWrapper,
  MovieGenre,
  MovieGenreLi,
  MovieDesc,
  MovieImg,
  MovieImgWrapper,
  MoviePlayBtn,
  MovieRating,
  MovieRatingIcon,
  MovieRelease,
  MovieTitle,
  MovieRunTime,
  MovieContetns,
  IframeWrapper,
  Iframe,
  MovieLikeBtn,
  MovieBtns,
} from "./movieInfo.style";
import { fetchVideo } from "../../../api/movie";
import { addLike, getUser, removeLike } from "../../../firebase/auth";
import { UserContext } from "../../../context/userContext";
import Review from "../review/Review";
import { history } from "../../../history/history";
import { isMobile } from "react-device-detect";

export default function MovieInfo({ movieData, setIsOpenMovieInfo }) {
  const { user } = useContext(UserContext);
  const [isPlay, setIsPlay] = useState(false);
  const [videoData, setVideoData] = useState({});
  const [like, setLike] = useState(false);
  const modalRef = useRef();

  const fetchLike = async () => {
    if (user) {
      const data = await getUser();
      const isLike =
        data && data.likeList.find((likeId) => likeId === videoData.id);
      setLike(!!isLike);
    }
  };

  const onClickClose = () => {
    modalRef.current.style.animation= 'fadeOut 800ms';
    setTimeout(() => {
      setIsOpenMovieInfo(false);
      document.body.style.overflow = 'auto';
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
      const res = removeLike(videoData);
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
        <ModalWrapper>
          <ModalTitle className="a11y-hidden">영화정보</ModalTitle>
          <ModalDim onClick={onClickClose}></ModalDim>
          <ModalCard ref={modalRef}>
            <MovieImgWrapper>
              {isPlay ? (
                <>
                  <IframeWrapper>
                    <Iframe
                      src={`https://www.youtube.com/embed/${videoData.videos.results[0].key}?autoplay=1&mute=1&loop=1&playlist=${videoData.videos.results[0].key}`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
                      allowfullscreen
                    />
                  </IframeWrapper>
                </>
              ) : (
                <MovieImg
                  style={
                    videoData.backdrop_path && {
                      background: `url(https://image.tmdb.org/t/p/original/${videoData.backdrop_path}) no-repeat top center / cover`,
                    }
                  }
                ></MovieImg>
              )}
            </MovieImgWrapper>
            <MovieContetns>
              <MovieTitle>
                {videoData.title || videoData.name || videoData.original_name}
              </MovieTitle>
              <MovieRelease dateTime={videoData.release_date}>
                개봉 :{" "}
                {videoData.release_date
                  ? videoData.release_date
                  : videoData.first_air_date}
              </MovieRelease>
              {videoData.genres && (
                <MovieGenre>
                  장르 :
                  {videoData.genres &&
                    videoData.genres.map(({ name }) => {
                      return <MovieGenreLi key={name}>{name}</MovieGenreLi>;
                    })}
                </MovieGenre>
              )}
              {videoData.runtime && (
                <MovieRunTime>상영시간 : {videoData.runtime}분</MovieRunTime>
              )}
              <MovieRating>
                평점 : <MovieRatingIcon />{" "}
                {parseFloat(videoData.vote_average).toFixed(2)}
              </MovieRating>
              <MovieBtns>
                <MoviePlayBtn onClick={onClickPlay}>재생</MoviePlayBtn>
                <MovieLikeBtn
                  type="button"
                  onClick={onClickLike}
                  like={like}
                ></MovieLikeBtn>
              </MovieBtns>

              <MovieDesc>
                {videoData.overview
                  ? videoData.overview
                  : "영화에 대한 설명이 없습니다."}
              </MovieDesc>
            </MovieContetns>

            <Review movieData={videoData} />

            <CloseBtn onClick={onClickClose}>
              <span className="a11y-hidden">닫기</span>
            </CloseBtn>
          </ModalCard>
        </ModalWrapper>
      )}
    </>
  );
}
