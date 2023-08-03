import React from "react";
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
  MovieRating,
  MovieRatingIcon,
  MovieRelease,
  MovieTitle,
  MovieRunTime,
  MovieContetns,
  IframeWrapper,
  Iframe,
  MovieLikeBtn,
  MovieGenreWrapper,
  VideoThumbnail,
  SwiperContainer,
  VideoThumbnailBtn,
  MovieGenreTag,
  VideoThumbnailTitle,
  MovieLike,
  CustomSwiper,
  ModalCardWrapper,
} from "./movieInfo.style";
import Review from "../review/Review";
import { optKeyboardFocus } from "../../../libray/optKeyBoard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import ModalTopbutton from "../topButton/ModalTopbutton";


export default function MovieInfoUI({
  modalRef,
  isPlay,
  like,
  videoUrl,
  videoData,
  isMedium,
  isSmall,
  onClickClose,
  onClickPlay,
  onClickLike,
  filterRef,
  iframeRef,
  closeBtnRef,
  likeBtnRef,
  setMypageLikeData,
}) {
  console.log(modalRef.current);
  return (
    <ModalWrapper>
      <ModalTitle className="a11y-hidden">영화정보</ModalTitle>
      <ModalDim onClick={onClickClose}></ModalDim>
      <ModalCardWrapper>
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
                    src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoUrl}`}
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
                <MovieGenreTag>장르 :</MovieGenreTag>
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

            <MovieLike>
              찜
              <MovieLikeBtn
                type="button"
                onClick={onClickLike}
                like={like}
                aria-label="찜"
                onKeyDown={(e) => {
                  optKeyboardFocus(e, closeBtnRef.current);
                }}
                ref={likeBtnRef}
              />
            </MovieLike>

            <MovieDesc>
              {videoData.overview
                ? videoData.overview
                : "영화에 대한 설명이 없습니다."}
            </MovieDesc>

            <VideoThumbnailTitle>관련 영상</VideoThumbnailTitle>
            <SwiperContainer>
              <CustomSwiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation
                slidesPerView={4}
                spaceBetween={10}
                pagination={{
                  type: "fraction",
                }}
                breakpoints={{
                  800: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                  },
                  600: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                  },
                  340: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                  },
                  0: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                  },
                }}
              >
                {videoData.videos.results.map((video) => {
                  return (
                    <SwiperSlide key={video.key}>
                      <VideoThumbnailBtn
                        type="button"
                        onClick={() => onClickPlay(video.key)}
                      >
                        <VideoThumbnail
                          style={{ width: "100%", maxWidth: "300px" }}
                          src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                          alt="영화 관련영상"
                        />
                      </VideoThumbnailBtn>
                    </SwiperSlide>
                  );
                })}
              </CustomSwiper>
            </SwiperContainer>
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
                : optKeyboardFocus(e, filterRef.current, likeBtnRef.current);
            }}
          >
            <span className="a11y-hidden">닫기</span>
          </CloseBtn>
        </ModalCard>
        {<ModalTopbutton modalRef={modalRef}/>}
      </ModalCardWrapper>
    </ModalWrapper>
  );
}
