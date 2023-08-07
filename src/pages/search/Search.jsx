import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  SearchMovieImgWrapper,
  SearchMovieItem,
  SearchMovieList,
  SearchForm,
  SearchInput,
  SearchLabel,
  SearchWrapper,
  InfiniteScrollTarget,
  SearchBlank,
  SearchBlankImg,
  SearchBlankText,
  SearchBlankKeyword,
  SearchMovieBtn,
} from "./search.style";
import { debounce } from "lodash";
import { fetchSearchMovie, fetchTrending } from "../../api/movie";
import MovieInfo from "../../compoents/commons/Modal/MovieInfo.container";
import { useInView } from "react-intersection-observer";
import ProgressiveImg from "../../compoents/commons/progressiveImg/ProgressiveImg";
import TopButton from "../../compoents/commons/topButton/TopButton";
import { useMovieInfo } from "../../hook/useMovieInfo";
import { resolveWebp } from "../../libray/webpSupport";
import { WebpContext } from "../../context/webpContext";

export default function Search() {
  const { webpSupport } = useContext(WebpContext);
  const [keyWord, setKeyword] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [isOpenMovieInfo, setIsOpenMovieInfo, seletedMovie, onClickMovieInfo] =
    useMovieInfo(false);

  const [ref, inVeiw] = useInView(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
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
        fetchFirstData();
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

  const fetchFirstData = async () => {
    const data = await fetchTrending();
    setPage(2);
    setMovieData(data);
    setHasMore(data.length === 20);
  };

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      fetchFirstData();
      return;
    }
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
        {!movieData.length ? (
          keyWord&&<SearchBlank>
            <SearchBlankImg
              src={resolveWebp(
                webpSupport,
                "assets/webp/icon-blank.webp",
                "svg"
              )}
            />
            <SearchBlankText>
              <SearchBlankKeyword>"{keyWord}"</SearchBlankKeyword>
              {' 에 대한\n검색 결과가 존재하지 않습니다.'}
            </SearchBlankText>
          </SearchBlank>
        ) : (
          <>
            <SearchMovieList>
              {movieData.map((data) => {
                return (
                  // 포스터가 있는 영화 데이터만 받아옴
                  data.poster_path && (
                    <SearchMovieItem key={data.id}>
                      <SearchMovieBtn
                        type="button"
                        onClick={() => onClickMovieInfo(data)}
                      >
                        <SearchMovieImgWrapper>
                          <ProgressiveImg
                            placeholderSrc={`https://image.tmdb.org/t/p/w45/${data.poster_path}`}
                            src={`https://image.tmdb.org/t/p/w342/${data.poster_path}`}
                            styles={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              top: "0",
                              left: "0",
                              borderRadius: "10px",
                            }}
                            alt="영화 포스터"
                            onError={(e) =>
                              (e.target.src = resolveWebp(
                                "assets/webp/placeholderImg.webp",
                                "svg"
                              ))
                            }
                          />
                        </SearchMovieImgWrapper>
                      </SearchMovieBtn>
                    </SearchMovieItem>
                  )
                );
              })}
            </SearchMovieList>
            <InfiniteScrollTarget ref={ref}></InfiniteScrollTarget>
          </>
        )}
      </SearchWrapper>
      {isOpenMovieInfo && (
        <MovieInfo
          movieData={seletedMovie}
          setIsOpenMovieInfo={setIsOpenMovieInfo}
        />
      )}
      <TopButton />
    </>
  );
}
