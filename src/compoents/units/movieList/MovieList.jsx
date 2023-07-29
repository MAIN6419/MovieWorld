import React, { useContext, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  MoiveItem,
  MovieItems,
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
import { resolveWebp } from "../../../libray/webpSupport";
import { WebpContext } from "../../../context/webpContext";

export default function MovieList({ title, fetchMoive }) {
  const isMedium = useMediaQuery({
    query: "(max-width:786px) and (min-width:500px)",
  });
  const isSmall = useMediaQuery({ query: "(max-width:500px)" });
  const { webpSupport } = useContext(WebpContext);
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
          <MovieItems>
            {movieData.map((data) => {
              return (
                <SwiperSlide key={data.id}>
                  <MoiveItem>
                    <ProgressiveImg
                      placeholderSrc={resolveWebp(
                        webpSupport,
                        "assets/webp/placeholderImg.webp",
                        "svg"
                      )}
                      src={`https://image.tmdb.org/t/p/${
                        isMedium ? "w185" : isSmall ? "w154" : "w342"
                      }${data.poster_path}`}
                      styles={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                        transition: "transform 450ms",
                        margin: "25px 0 25px 5px",
                        borderRadius: "5px",
                      }}
                      alt="영화 포스터"
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
                    />
                  </MoiveItem>
                </SwiperSlide>
              );
            })}
          </MovieItems>
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
