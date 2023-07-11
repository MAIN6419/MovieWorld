import React, { useCallback, useEffect, useState } from "react";
import {
  SearchMovieImg,
  SearchMovieImgWrapper,
  SearchMovieItem,
  SearchMovieList,
  SearchForm,
  SearchInput,
  SearchLabel,
  SearchWrapper,
  InfiniteScrollTarget,
} from "./search.style";
import { debounce } from "lodash";
import { fetchSearchMovie, fetchTrending } from "../../api/movie";
import MovieInfo from "../../compoents/commons/Modal/MovieInfo";
import { InView, useInView } from "react-intersection-observer";

export default function Search() {
  const [keyWord, setKeyword] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [seletedMovie, setSelectedMovie] = useState({});
  const [isOpenMovieInfo, setIsOpenMovieInfo] = useState(false);

  const [ref, inVeiw] = useInView(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const onChangeKeyword = (e) => {
    if (e.target.value.length === 1 && e.target.value === " ") {
      return;
    }
    setKeyword(e.target.value);
    searchDebounce(e.target.value);
  };

  // 검색 디바운싱 적용 검색어가 있을 경우 검색어에 해당하는 데이터 출력
  const searchDebounce = useCallback(
    debounce(async (value) => {
      if (!value) {
        // 데이터 초기화
        const data = await fetchTrending();
        setMovieData(data);
        setHasMore(true);
        // 첫페이지가 불러와져있으므로 2페이지로 초기화
        setPage(2);
        return;
      }
      const data = await fetchSearchMovie(value);
      setMovieData(data);
    }, 500),
    []
  );

  const fetchAddMovie = async () => {
    const data = await fetchSearchMovie(keyWord, page);
    setPage((prev) => prev + 1);
    setMovieData((prev) => [...prev, ...data]);
    setHasMore(data.length === 20);
  };

  // 검색어가 없을때 Trending Movie 출력
  const fetchData = async () => {
    const data = await fetchTrending(page);
    setPage((prev) => prev + 1);
    setMovieData((prev) => [...prev, ...data]);
    setHasMore(data.length === 20);
  };

  const onClickMoiveInfo = (movie) => {
    setIsOpenMovieInfo(true);
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (hasMore && inVeiw && keyWord) {
      fetchAddMovie();
    } else if (hasMore && inVeiw && !keyWord) {
      fetchData();
    }
  }, [inVeiw, keyWord]);

  return (
    <>
      <SearchWrapper>
        <SearchForm>
          <SearchLabel className="a11y-hidden">검색</SearchLabel>
          <SearchInput
            placeholder="검색"
            value={keyWord}
            onChange={onChangeKeyword}
          />
        </SearchForm>
        <SearchMovieList>
          {movieData.map((data) => {
            return (
              <SearchMovieItem
                key={data.id}
                onClick={() => onClickMoiveInfo(data)}
              >
                <SearchMovieImgWrapper>
                  <SearchMovieImg
                    src={
                      `https://image.tmdb.org/t/p/original/${
                        data.poster_path || data.backdrop_path
                      }` || "assets/icon-camera.png"
                    }
                    onError={(e) => (e.target.src = "assets/icon-camera.png")}
                  />
                </SearchMovieImgWrapper>
              </SearchMovieItem>
            );
          })}
        </SearchMovieList>
        <InfiniteScrollTarget ref={ref}></InfiniteScrollTarget>
      </SearchWrapper>
      {isOpenMovieInfo && (
        <MovieInfo
          movieData={seletedMovie}
          setIsOpenMovieInfo={setIsOpenMovieInfo}
        />
      )}
    </>
  );
}
