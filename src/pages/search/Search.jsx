import React, { useCallback, useEffect, useRef, useState } from "react";
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
import MovieInfo from "../../compoents/commons/Modal/MovieInfo.container";
import { useInView } from "react-intersection-observer";
import ProgressiveImg from "../../compoents/commons/progressiveImg/ProgressiveImg";
import TopButton from "../../compoents/commons/topButton/TopButton";
import { useMovieInfo } from "../../hook/useMovieInfo";
import { resolveWebp } from "../../libray/webpSupport";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchMovies, searchSlice } from "../../slice/searchSlice";
import {
  fetchTrendingPageMovies,
  trendingPageSlice,
} from "../../slice/tredingPageSlice";

export default function Search() {
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  // 검색어 유무에 따라 다른 데이터를 보여주기 위해서 type를 관리
  const [type, setType] = useState("trendingPage");
  // 현재 페이지를 관리
  const page = useSelector((state) => state[type].page);
  // 다음 페이지가 있는지 확인
  const hasMore = useSelector((state) => state[type].hasMore);
  const [keyword, setkeyword] = useState("");
  const movieData = useSelector((state) => state[type].data);
  const [isOpenMovieInfo, setIsOpenMovieInfo, seletedMovie, onClickMovieInfo] =
    useMovieInfo(false);
  // 무한 스크롤 이용하기 위한 hook
  // ref는 관찰대상, inView 현재 관찰대상이 화면에 나타나지를 반환
  const [ref, inVeiw] = useInView(false);
  // 검색어가 있는 없는지를 파악
  const isBlank = useSelector((state) => state.isBlank);
  const onChangekeyword = (e) => {
    if (e.target.value.length === 1 && e.target.value === " ") {
      return;
    }
    setkeyword(e.target.value);
    searchDebounce(e.target.value);
  };

  // 검색 디바운싱 적용 검색어가 있을 경우 검색어에 해당하는 데이터 출력
  const searchDebounce = useCallback(
    debounce(async (value) => {
      if (!value) {
        // 검색을 모두 지운 경우에는 Trending Movie의 정보를 출력해야 하기 때문에
        // 기존의 trending의 값들을 모두 초기화 시키고, type를 변경해서 trending 데이터를 출력
        dispatch(trendingPageSlice.actions.resetTrending());
        setType("trendingPage");
        return;
      }
      // 검색어가 있을 경웅에는 Search Movie의 데이터를 출력해야 하기 때문에
      // 기존의 Search의 값들을 모두 초기화 시키고, type를 변경시켜 search 데이터를 출력
      setType("search");
      dispatch(searchSlice.actions.resetSearch());
      searchInputRef.current.blur();
    }, 500),
    []
  );

  useEffect(() => {
    // 검색어가 있는 경우에는 search Movie 데이터를 무한 스크롤 처리
    if (hasMore && inVeiw && keyword) {
      dispatch(fetchSearchMovies({ keyword, page }));
    }
    // 검색어가 있는 경우에는 trending Movie 데이터를 무한 스크롤 처리
    else if (hasMore && inVeiw && !keyword) {
      dispatch(fetchTrendingPageMovies(page));
    }
  }, [inVeiw, keyword]);

  // 새로고침시 스크롤이 위로 가도록 설정
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <SearchWrapper>
        <SearchForm>
          <SearchLabel className="a11y-hidden">검색</SearchLabel>
          <SearchInput
            placeholder="검색"
            value={keyword}
            onChange={onChangekeyword}
            ref={searchInputRef}
          />
        </SearchForm>
        {isBlank && keyword ? (
          <SearchBlank>
            <SearchBlankImg
              src={resolveWebp("/assets/webp/icon-blank.webp", "svg")}
            />
            <SearchBlankText>
              <SearchBlankKeyword>"{keyword}"</SearchBlankKeyword>
              {" 에 대한\n검색 결과가 존재하지 않습니다."}
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
                                "/assets/webp/placeholderImg.webp",
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
