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
  VideoThumbnailTitle,
  MovieLike,
  CustomSwiper,
  ModalCardWrapper,
  MovieContetnsTag,
  MovieContentsInfoItem,
  MovieContentsInfo,
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
  modalCardWrapperRef,
  modalCardRef,
  isPlay,
  setIsPlay,
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
  return (
    <ModalWrapper>
      <ModalTitle className="a11y-hidden">영화정보</ModalTitle>
      <ModalDim onClick={onClickClose}></ModalDim>
      <ModalCardWrapper ref={modalCardWrapperRef}>
        <ModalCard
          className="modalCard"
          ref={modalCardRef}
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
            <MovieContentsInfo>
              <MovieContentsInfoItem>
                <MovieContetnsTag>개봉 : </MovieContetnsTag>
                <MovieRelease dateTime={videoData.release_date}>
                  {videoData.release_date
                    ? videoData.release_date
                    : videoData.first_air_date}
                </MovieRelease>
              </MovieContentsInfoItem>

              <MovieContentsInfoItem>
                {videoData.genres && (
                  <MovieGenreWrapper>
                    <MovieContetnsTag>장르 : </MovieContetnsTag>
                    <MovieGenre>
                      {videoData.genres &&
                        videoData.genres.map(({ name }) => {
                          return <MovieGenreLi key={name}>{name}</MovieGenreLi>;
                        })}
                    </MovieGenre>
                  </MovieGenreWrapper>
                )}
              </MovieContentsInfoItem>
              <MovieContentsInfoItem>
                {videoData.runtime && (
                  <>
                    <MovieContetnsTag>상영시간 : </MovieContetnsTag>
                    <MovieRunTime>{videoData.runtime}분</MovieRunTime>
                  </>
                )}
              </MovieContentsInfoItem>
              <MovieContentsInfoItem>
                <MovieContetnsTag>평점 :</MovieContetnsTag> <MovieRatingIcon />
                {parseFloat(videoData.vote_average).toFixed(2)}
              </MovieContentsInfoItem>

              <MovieContentsInfoItem>
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
              </MovieContentsInfoItem>

              <MovieContentsInfoItem>
                <MovieDesc>
                  {videoData.overview
                    ? videoData.overview
                    : "영화에 대한 설명이 없습니다."}
                </MovieDesc>
              </MovieContentsInfoItem>
            </MovieContentsInfo>

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
            onClick={() => {
              if (isPlay) {
                setIsPlay(false);
                modalCardRef.current.focus();
                return;
              }
              onClickClose();
            }}
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
        {<ModalTopbutton modalRef={modalCardRef} />}
      </ModalCardWrapper>
    </ModalWrapper>
  );
}
