import React, { useEffect, useRef } from "react";
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
  MovieGenreWrapper,
} from "./movieInfo.style";
import Review from "../review/Review";
import { optKeyboardFocus } from "../../../libray/optKeyBoard";

export default function MovieInfoUI({
  modalRef,
  isPlay,
  like,
  videoData,
  isMedium,
  isSmall,
  onClickClose,
  onClickPlay,
  onClickLike,
  filterRef,
  iframeRef,
  setMypageLikeData,
}) {
  const playRef = useRef(null);
  const closeBtnRef = useRef();
  useEffect(() => {
    modalRef.current.focus();
  }, [modalRef]);
  return (
    <ModalWrapper>
      <ModalTitle className="a11y-hidden">영화정보</ModalTitle>
      <ModalDim onClick={onClickClose}></ModalDim>
      <ModalCard
        className="modalCard"
        ref={modalRef}
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            onClickClose();
          }
          if (e.target.classList.contains("modalCard")) {
            optKeyboardFocus(e, closeBtnRef.current);
          }
        }}
      >
        <MovieImgWrapper>
          {isPlay ? (
            <>
              <IframeWrapper>
                <Iframe
                  ref={iframeRef}
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
                  background: `url(https://image.tmdb.org/t/p/${
                    isMedium ? "w780" : isSmall ? "w500" : "w1280"
                  }${videoData.backdrop_path}) no-repeat top center / cover`,
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
            <MovieGenreWrapper>
              <span>장르 :</span>
              <MovieGenre>
                {videoData.genres &&
                  videoData.genres.map(({ name }) => {
                    return <MovieGenreLi key={name}>{name}</MovieGenreLi>;
                  })}
              </MovieGenre>
            </MovieGenreWrapper>
          )}
          {videoData.runtime && (
            <MovieRunTime>상영시간 : {videoData.runtime}분</MovieRunTime>
          )}
          <MovieRating>
            평점 : <MovieRatingIcon />{" "}
            {parseFloat(videoData.vote_average).toFixed(2)}
          </MovieRating>
          <MovieBtns>
            <MoviePlayBtn
              onClick={onClickPlay}
              ref={playRef}
              onKeyDown={(e) => {
                isPlay
                  ? optKeyboardFocus(e, iframeRef.current)
                  : optKeyboardFocus(e, closeBtnRef.current);
              }}
            >
              재생
            </MoviePlayBtn>
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

        <Review
          movieData={videoData}
          filterRef={filterRef}
          setMypageLikeData={setMypageLikeData}
        />

        <CloseBtn
          onClick={onClickClose}
          ref={closeBtnRef}
          onKeyDown={(e) => {
            isPlay
              ? optKeyboardFocus(e, filterRef.current, iframeRef.current)
              : optKeyboardFocus(e, filterRef.current, playRef.current);
          }}
        >
          <span className="a11y-hidden">닫기</span>
        </CloseBtn>
      </ModalCard>
    </ModalWrapper>
  );
}
