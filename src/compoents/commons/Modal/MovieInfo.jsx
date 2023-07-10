import React, { useState } from "react";
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

export default function MovieInfo({ movieData, setIsOpenMovieInfo }) {
  const [isPlay, setIsPlay] = useState(false);

  const onClickClose = () => {
    setIsOpenMovieInfo(false);
    document.body.style.overflow = "auto";
  };

  return (
    <ModalWrapper>
      <ModalTitle className="a11y-hidden">영화정보</ModalTitle>
      <ModalDim onClick={onClickClose}></ModalDim>
      <ModalCard>
        <MovieImgWrapper>
          {isPlay ? (
            <>
                <IframeWrapper>
                  <Iframe
                    src={`https://www.youtube.com/embed/${movieData.videos.results[0].key}?autoplay=1&mute=1&loop=1&playlist=${movieData.videos.results[0].key}`}
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
                movieData.backdrop_path && {
                  background: `url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path}) no-repeat top center / cover`,
                }
              }
            ></MovieImg>
          )}
        </MovieImgWrapper>
        <MovieContetns>
          <MovieTitle>
            {movieData.title || movieData.name || movieData.original_name}
          </MovieTitle>
          <MovieRelease dateTime={movieData.release_date}>
            개봉 :{" "}
            {movieData.release_date
              ? movieData.release_date
              : movieData.first_air_date}
          </MovieRelease>
          <MovieGenre>
            장르 :
            {movieData.genres.map(({ name }) => {
              return <MovieGenreLi key={name}>{name}</MovieGenreLi>;
            })}
          </MovieGenre>
          <MovieRunTime>상영시간 : {movieData.runtime}분</MovieRunTime>
          <MovieRating>
            평점 : <MovieRatingIcon />{" "}
            {parseFloat(movieData.vote_average).toFixed(2)}
          </MovieRating>
          <MoviePlayBtn onClick={()=>setIsPlay(true)}>재생</MoviePlayBtn>
          <MovieDesc>
            {movieData.overview
              ? movieData.overview
              : "영화에 대한 설명이 없습니다."}
          </MovieDesc>
        </MovieContetns>

        <CloseBtn onClick={onClickClose}>
          <span className="a11y-hidden">닫기</span>
        </CloseBtn>
      </ModalCard>
    </ModalWrapper>
  );
}
