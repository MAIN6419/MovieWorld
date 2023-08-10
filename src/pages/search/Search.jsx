import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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

export default function Search() {
  const searchInputRef = useRef(null);
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
      // 검색이 완료된 이후 input를 blur 처리
      // blur 처리를 하지 않으면 input의 포커스가 유지된 채 스크롤 내려 다른 요소 클릭 시
      // 포커스가 해제되면서 input요소를 찾아 스크롤이 위로 올라 오기 때문
      searchInputRef.current.blur();
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
            ref={searchInputRef}
          />
        </SearchForm>
        {!movieData.length ? (
          keyWord && (
            <SearchBlank>
              <SearchBlankImg
                src={resolveWebp("/assets/webp/icon-blank.webp", "svg")}
              />
              <SearchBlankText>
                <SearchBlankKeyword>"{keyWord}"</SearchBlankKeyword>
                {" 에 대한\n검색 결과가 존재하지 않습니다."}
              </SearchBlankText>
            </SearchBlank>
          )
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
