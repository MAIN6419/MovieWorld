import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  MoiveItem,
  MovieImg,
  MovieUl,
  SwiperContainer,
  Title,
  Wrapper,
} from "./movieList.style";

import MovieInfo from "../../commons/Modal/MovieInfo";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

export default function MovieList({ title, fetchMoive }) {
  const [movieData, setMovieData] = useState([]);
  const [isOpenMovieInfo, setIsOpenMovieInfo] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const onClickMovieInfo = (movie) => {
    setIsOpenMovieInfo(true);
    setMovieSelected(movie);
    document.body.style.overflow = "hidden";

    // movieInfo 모달창을 열때 banner 동영상이 실행중 이라면 중지 시킴
    if(document.querySelector('.bannerIframe')!==null){
      document.querySelector('.bannerIframe').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
    }
  };

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
          slidesPerView={5}
          spaceBetween={15}
          pagination={{ clickable: true }}
          breakpoints={{
            1900: {
              slidesPerView: 7,
              slidesPerGroup: 7,
            },
            1378: {
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
          <MovieUl>
            {movieData.map((data) => {
              return (
                <SwiperSlide key={data.id}>
                  <MoiveItem>
                    <MovieImg
                      src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                      onClick={() => onClickMovieInfo(data)}
                    />
                  </MoiveItem>
                </SwiperSlide>
              );
            })}
          </MovieUl>
        </SwiperContainer>
      </Wrapper>
      {isOpenMovieInfo && (
        <MovieInfo
          movieData={movieSelected}
          setIsOpenMovieInfo={setIsOpenMovieInfo}
        />
      )}
    </>
  );
}
