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
} from "./search.style";
import { debounce } from "lodash";
import { fetchSearchMovie, fetchTrending } from "../../api/movie";

export default function Search() {
  const [keyWord, setKeyword] = useState("");
  const [movieData, setMovieData] = useState([]);

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
      if(!value) return;
      const data = await fetchSearchMovie(value);
      setMovieData(data);
    }, 500),
    []
  );

  // 검색어가 없을때 Trending Movie 출력
  const fetchData = async() => {
    const data = await fetchTrending();
    setMovieData(data);
  }

  useEffect(()=>{
    if(!keyWord) {
      fetchData();
    }
  },[keyWord])
  return (
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
            <SearchMovieItem key={data.id}>
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
    </SearchWrapper>
  );
}
