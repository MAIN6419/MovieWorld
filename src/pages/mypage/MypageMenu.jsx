import React, { useContext, useEffect, useState } from "react";
import { useMovieInfo } from "../../hook/useMovieInfo";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";

import {
  fetchFirstLikeList,
  fetchLikeListPage,
  removeLike,
} from "../../firebase/likeAPI";
import {
  fetchFirstReviewMovieList,
  fetchReviewMovieListPage,
} from "../../firebase/reviewAPI";

import {
  InfiniteScrollTarget,
  MoiveListWrapper,
  MovieImgWrapper,
  MovieItem,
  MovieMenuBtn,
  MovieMenuItem,
  MovieMenuNav,
  MovieMenuTitle,
  MovieMenuUl,
  MovieMenuWrapper,
  MovieTitle,
  RemoveBtn,
} from "./mypage.style";
import ProgressiveImg from "../../compoents/commons/progressiveImg/ProgressiveImg";
import Blank from "../../compoents/commons/blank/Blank";
import Loading from "../../compoents/commons/loading/Loading";
import MovieInfo from "../../compoents/commons/Modal/MovieInfo.container";
import { sweetToast } from "../../sweetAlert/sweetAlert";

export default function MypageMenu() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenMovieInfo, setIsOpenMovieInfo, seletedMovie, onClickMovieInfo] =
    useMovieInfo(false);
  const [page, setPage] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const limitPage = 20;
  const [ref, inview] = useInView();
  const [menu, setMenu] = useState("like");
  // 초기 렌더링 시 Blank 컴포넌트가 잠깐 나오는 현상을 방지하기 위해 사용
  // isLoading으로 처리하려 했지만 로딩시간이 짧을 경우 깜빡거림 현상으로 인해 UX적으로 안좋아 이 방식 사용
  const [notData, setNotData] = useState(true);
  const isMoblie = useMediaQuery({ query: "(max-width:486px)" });

  const fetchFirstPage = async () => {
    setNotData(true);
    const res =
      menu === "like"
        ? await fetchFirstLikeList(limitPage)
        : await fetchFirstReviewMovieList(limitPage);
    const data = res.docs.map((el) => el.data());
    setData((prev) => [...prev, ...data]);
    setPage(res.docs[res.docs.length - 1]);
    setHasMore(res.docs.length === limitPage);
    setIsLoading(false);
    setNotData(false);
  };

  const fetchAddData = async () => {
    const res =
      menu === "like"
        ? await fetchLikeListPage(page, limitPage)
        : await fetchReviewMovieListPage(page, limitPage);
    const data = res.docs.map((el) => el.data());
    setData((prev) => [...prev, ...data]);
    setPage(res.docs[res.docs.length - 1]);
    setHasMore(res.docs.length === limitPage);
  };

  useEffect(() => {
    setData([]);
    setHasMore(false);
    fetchFirstPage();
  }, [menu]);

  useEffect(() => {
    if (hasMore && inview) {
      fetchAddData();
    }
  }, [inview]);

  return (
    <>
      <MovieMenuWrapper>
        <MovieMenuTitle className="a11y-hidden">{menu}</MovieMenuTitle>
        <MovieMenuNav>
          <MovieMenuUl>
            <MovieMenuItem>
              <MovieMenuBtn
                onClick={() => {
                  setMenu("like");
                }}
                className={menu === "like" ? "active" : ""}
              >
                찜 목록
              </MovieMenuBtn>
            </MovieMenuItem>
            <MovieMenuItem>
              <MovieMenuBtn
                className={menu === "review" ? "active" : ""}
                onClick={() => {
                  setMenu("review");
                }}
              >
                리뷰한 영화
              </MovieMenuBtn>
            </MovieMenuItem>
          </MovieMenuUl>
        </MovieMenuNav>
        {!data.length && !notData ? (
          <Blank
            size={isMoblie ? "small" : ""}
            text={
              menu === "like"
                ? "찜 목록이 존재하지 않습니다."
                : "리뷰한 영화가 존재하지 않습니다."
            }
          />
        ) : (
          <MoiveListWrapper>
            {data.map((item, idx) => {
              return (
                <MovieItem key={item.id + idx}>
                  <MovieImgWrapper tabIndex="0">
                    <ProgressiveImg
                      placeholderSrc={`https://image.tmdb.org/t/p/w45/${item.backdrop_path}`}
                      src={`https://image.tmdb.org/t/p/w300/${item.backdrop_path}`}
                      styles={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                        borderRadius: "5px",
                      }}
                      alt="영화 포스터"
                      onError={(e) =>
                        (e.target.src =
                          document.body.className === "webp"
                            ? "/assets/webp/placeholderImg.webp"
                            : "/assets/placeholderImg.png")
                      }
                      onClick={() => onClickMovieInfo(item)}
                    />
                    {menu === "like" && (
                      <RemoveBtn
                        type="button"
                        onClick={async () => {
                          await removeLike(item);
                          setData((prev) =>
                            prev.filter((el) => el.id !== item.id)
                          );
                          sweetToast("삭제가 완료되었습니다.", "success")
                        }}
                        aria-label="닫기"
                      />
                    )}
                  </MovieImgWrapper>
                  <MovieTitle>
                    {item.title || item.name || item.original_name}
                  </MovieTitle>
                </MovieItem>
              );
            })}
          </MoiveListWrapper>
        )}
        <InfiniteScrollTarget ref={ref}></InfiniteScrollTarget>
      </MovieMenuWrapper>
      {isOpenMovieInfo && (
        <MovieInfo
          movieData={seletedMovie}
          setIsOpenMovieInfo={setIsOpenMovieInfo}
          setMypageLikeData={setData}
        />
      )}
      {isLoading && <Loading />}
    </>
  );
}
