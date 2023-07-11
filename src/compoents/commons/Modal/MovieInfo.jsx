import React, { useEffect, useState } from "react";
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
} from "./movieInfo.style";
import { fetchVideo } from "../../../api/movie";

export default function MovieInfo({ movieData, setIsOpenMovieInfo }) {
  const [isPlay, setIsPlay] = useState(false);
  const [videoData, setVideoData] = useState({});
  const onClickClose = () => {
    setIsOpenMovieInfo(false);
    document.body.style.overflow = "auto";
  };

  const fetchData = async () => {
    try {
      const data = await fetchVideo(movieData.id);
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
    if (!videoData.videos||!videoData.videos.results.length) {
      alert("영상이 존재하지 않습니다!");
      return;
    }
    setIsPlay(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {videoData.id && (
        <ModalWrapper>
          <ModalTitle className="a11y-hidden">영화정보</ModalTitle>
          <ModalDim onClick={onClickClose}></ModalDim>
          <ModalCard>
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
              {videoData.genres&&<MovieGenre>
                장르 :
                {videoData.genres &&
                  videoData.genres.map(({ name }) => {
                    return <MovieGenreLi key={name}>{name}</MovieGenreLi>;
                  })}
              </MovieGenre>}
              {videoData.runtime && (
                <MovieRunTime>상영시간 : {videoData.runtime}분</MovieRunTime>
              )}
              <MovieRating>
                평점 : <MovieRatingIcon />{" "}
                {parseFloat(videoData.vote_average).toFixed(2)}
              </MovieRating>
              <MoviePlayBtn onClick={onClickPlay}>재생</MoviePlayBtn>
              <MovieDesc>
                {videoData.overview
                  ? videoData.overview
                  : "영화에 대한 설명이 없습니다."}
              </MovieDesc>
            </MovieContetns>

            <CloseBtn onClick={onClickClose}>
              <span className="a11y-hidden">닫기</span>
            </CloseBtn>
          </ModalCard>
        </ModalWrapper>
      )}
    </>
  );
}
