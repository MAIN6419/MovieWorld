import React, { useEffect, useState } from "react";
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
} from "./banner.style";

export default function Banner() {
  const [movieData, setMovieData] = useState([]);
  const [isPlay, setIsPlay] = useState(false);

  const fetchData = async () => {
    const data = await fetchNowPlaying();
    setMovieData(data);
  };

  const onClickPlay = () => {
    if (!movieData.videos.results.length) {
      alert("영상이 존재하지 않습니다!");
    }
    setIsPlay(true);
    window.scroll({top:0, left:0, behavior:"smooth"})

  };

  const onClickClose = () => {
    setIsPlay(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                src={`https://www.youtube.com/embed/${movieData.videos.results[0].key}?autoplay=1&mute=1`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowfullscreen
              />
            </Container>
          </IframeWrapper>
        </>
      ) : (
        <BannerWrapper
          style={
            movieData.backdrop_path && {
              background: `url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path}) no-repeat top center / cover`,
            }
          }
        >
          <BannerBox>
            <BannerContents>
              <BannerBackdrop>
                <Title>
                  {movieData.title || movieData.name || movieData.original_name}
                </Title>
                <BannerBtns>
                  <BannerBtn
                    type="button"
                    className="play"
                    onClick={onClickPlay}
                  >
                    재생
                  </BannerBtn>
                  <BannerBtn type="button" className="info">
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
          </BannerBox>

          <BannerFadeBottom></BannerFadeBottom>
        </BannerWrapper>
      )}
    </>
  );
}
