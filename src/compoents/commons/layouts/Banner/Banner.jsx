import React, { useEffect, useState } from "react";
import { fetchNowPlaying } from "../../../../api/movie";
import {
  BannerBtns,
  BannerContents,
  BannerDesc,
  BannerFadeBottom,
  BannerBtn,
  Title,
  Wrapper,
  BannerBackdrop,
} from "./banner.style";

export default function Banner() {
  const [movieData, setMovieData] = useState([]);

  const fetchData = async () => {
    const data = await fetchNowPlaying();
    setMovieData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wrapper
      style={movieData.backdrop_path&&{
        background: `url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path
      }) no-repeat top center / cover`,
      }}
    >
      <BannerContents>
        <BannerBackdrop>
          <Title>
            {movieData.title || movieData.name || movieData.original_name}
          </Title>
          <BannerBtns>
            <BannerBtn type="button" className="play">
              Play
            </BannerBtn>
            <BannerBtn type="button" className="info">
              More
            </BannerBtn>
          </BannerBtns>
          <BannerDesc>
            {movieData.overview
              ? movieData.overview
              : "영화에 대한 설명이 없습니다."}
          </BannerDesc>
        </BannerBackdrop>
      </BannerContents>
      <BannerFadeBottom></BannerFadeBottom>
    </Wrapper>
  );
}
