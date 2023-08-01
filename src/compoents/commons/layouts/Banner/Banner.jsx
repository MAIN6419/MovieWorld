import React, { useEffect, useRef, useState } from "react";
import { fetchNowPlaying } from "../../../../api/movie";
import {
  BannerBtns,
  BannerContents,
  BannerDesc,
  BannerFadeBottom,
  BannerBtn,
  Title,
  BannerWrapper,
  BannerBackdrop,
  IframeWrapper,
  Container,
  Iframe,
  CloseBtn,
  BannerBox,
  CloseBtnWrapper,
  MobilePlayBtn,
  MobileInfoBtn,
} from "./banner.style";
import MovieInfo from "../../Modal/MovieInfo.container";
import { useMediaQuery } from "react-responsive";

import {  sweetToast } from "../../../../sweetAlert/sweetAlert";
export default function Banner() {
  const isMedium = useMediaQuery({
    query: "(max-width:786px)and(min-width:501px)",
  });
  const isSmall = useMediaQuery({ query: "(max-width:500px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [movieData, setMovieData] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [isOpenMovieInfo, setIsOpenMovieInfo] = useState(false);
  const iframeRef = useRef(null);

  const fetchData = async () => {
    const data = await fetchNowPlaying();
    setMovieData(data);
  };

  const onClickPlay = () => {
    if (!movieData.videos.results.length) {
      sweetToast("현재 영상이 존재하지 않습니다!", "warning");
    }
    setIsPlay(true);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  const onClickClose = () => {
    setIsPlay(false);
  };

  const onClickMovieInfo = () => {
    setIsOpenMovieInfo(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isPlay && movieData.videos.results.length) {
      iframeRef.current.focus();
    }
  }, [isPlay]);

  return (
    <>
      {isPlay && movieData.videos.results.length > 0 ? (
        <>
          <CloseBtnWrapper>
            <CloseBtn onClick={onClickClose}>
              <span className="a11y-hidden">닫기</span>
            </CloseBtn>
          </CloseBtnWrapper>
          <IframeWrapper>
            <Container>
              <Iframe
                ref={iframeRef}
                className="bannerIframe"
                src={`https://www.youtube.com/embed/${movieData.videos.results[0].key}?autoplay=1&enablejsapi=1&mute=1&loop=1&playlist=${movieData.videos.results[0].key}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
                allowfullscreen
              />
            </Container>
          </IframeWrapper>
        </>
      ) : (
        <BannerWrapper>
          <BannerBox
            style={
              movieData.backdrop_path
                ? {
                    background: `url(https://image.tmdb.org/t/p/${
                      isMedium ? "w780" : isSmall ? "w500" : "original"
                    }${movieData.backdrop_path}) no-repeat top center / cover`,
                  }
                : { backgroundColor: "#bdbdbd" }
            }
          >
            {isMobile ? (
              <>
                <Title className="a11y-hidden">
                  {movieData.title || movieData.name || movieData.original_name}
                </Title>
                <MobilePlayBtn onClick={onClickPlay}>
                  <span className="a11y-hidden">재생</span>
                </MobilePlayBtn>
                <MobileInfoBtn onClick={onClickMovieInfo}>
                  <span className="a11y-hidden">상세정보</span>
                </MobileInfoBtn>
              </>
            ) : (
              movieData.title && (
                <BannerContents>
                  <BannerBackdrop>
                    <Title>
                      {movieData.title ||
                        movieData.name ||
                        movieData.original_name}
                    </Title>
                    <BannerBtns>
                      <BannerBtn
                        type="button"
                        className="play"
                        onClick={onClickPlay}
                      >
                        재생
                      </BannerBtn>
                      <BannerBtn
                        type="button"
                        className="info"
                        onClick={onClickMovieInfo}
                      >
                        상세정보
                      </BannerBtn>
                    </BannerBtns>
                    <BannerDesc>
                      {movieData.overview
                        ? movieData.overview
                        : "영화에 대한 설명이 없습니다."}
                    </BannerDesc>
                  </BannerBackdrop>
                </BannerContents>
              )
            )}
          </BannerBox>
          <BannerFadeBottom></BannerFadeBottom>
        </BannerWrapper>
      )}
      {isOpenMovieInfo && (
        <MovieInfo
          movieData={movieData}
          setIsOpenMovieInfo={setIsOpenMovieInfo}
        />
      )}
    </>
  );
}
