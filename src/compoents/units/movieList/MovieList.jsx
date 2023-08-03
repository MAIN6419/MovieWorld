import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  MovieItemWrapper,
  MovieItemBtn,
  SwiperContainer,
  Title,
  Wrapper,
} from "./movieList.style";

import MovieInfo from "../../commons/Modal/MovieInfo.container";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import ProgressiveImg from "../../commons/progressiveImg/ProgressiveImg";
import { useMovieInfo } from "../../../hook/useMovieInfo";
import { useMediaQuery } from "react-responsive";
export default function MovieList({ title, fetchMoive }) {
  const isSmall = useMediaQuery({ query: "(max-width:500px)" });

  const [movieData, setMovieData] = useState([]);
  const [isOpenMovieInfo, setIsOpenMovieInfo, seletedMovie, onClickMovieInfo] =
    useMovieInfo(false);

  const fetchData = async () => {
    const data = await fetchMoive();
    setMovieData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Wrapper>
        <Title>{title}</Title>
        <SwiperContainer
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          slidesPerView={5}
          spaceBetween={15}
          pagination={{ clickable: true }}
          breakpoints={{
            1900: {
              slidesPerView: 7,
              slidesPerGroup: 7,
            },
            1378:
             {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
            998: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            500: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            420: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            0: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
        >
          <MovieItemWrapper>
            {movieData.map((data) => {
              return (
                <SwiperSlide
                  key={data.id}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) onClickMovieInfo(data);
                  }}
                >
                  <MovieItemBtn
                    onClick={() => {
                      onClickMovieInfo(data);
                      // movieInfo 모달창을 열때 banner 동영상이 실행중 이라면 중지 시킴
                      if (document.querySelector(".bannerIframe") !== null) {
                        document
                          .querySelector(".bannerIframe")
                          .contentWindow.postMessage(
                            '{"event":"command","func":"pauseVideo","args":""}',
                            "*"
                          );
                      }
                    }}
                  >
                    <ProgressiveImg
                      placeholderSrc={`https://image.tmdb.org/t/p/w45/${data.poster_path}`}
                      src={`https://image.tmdb.org/t/p/${
                        isSmall? "w185" : "w342"
                      }${data.poster_path}`}
                      styles={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.45s",

                        borderRadius: "5px",
                      }}
                      alt="영화 포스터"
                    />
                  </MovieItemBtn>
                </SwiperSlide>
              );
            })}
          </MovieItemWrapper>
        </SwiperContainer>
      </Wrapper>
      {isOpenMovieInfo && (
        <MovieInfo
          movieData={seletedMovie}
          setIsOpenMovieInfo={setIsOpenMovieInfo}
        />
      )}
    </>
  );
}
