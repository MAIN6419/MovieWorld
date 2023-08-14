import React, { useEffect, useState } from "react";
import { useMovieInfo } from "../../hook/useMovieInfo";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";

import {} from "../../firebase/reviewAPI";

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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFirstLikeList,
  fetchFirstReviewMovieList,
  fetchLikeListPage,
  fetchReviewMovieListPage,
  mypageSlice,
} from "../../slice/mypageSlice";
import { fetchRemoveLike } from "../../slice/likeSlice";

export default function MypageMenu() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.mypage.isLoading);
  const isBlank = useSelector(state=>state.mypage.isBlank);
  const data = useSelector((state) => state.mypage.data);
  const page = useSelector((state) => state.mypage.page);
  const hasMore = useSelector((state) => state.mypage.hasMore);
  const limitPage = useSelector((state) => state.mypage.limitPage);
  const [isOpenMovieInfo, setIsOpenMovieInfo, seletedMovie, onClickMovieInfo] =
    useMovieInfo(false);
  const [ref, inview] = useInView();
  const [menu, setMenu] = useState("like");
  const isMoblie = useMediaQuery({ query: "(max-width:486px)" });

  const fetchFirstPage = async () => {
    menu === "like"
      ? dispatch(fetchFirstLikeList(limitPage))
      : dispatch(fetchFirstReviewMovieList(limitPage));
  };

  const fetchAddData = async () => {
      menu === "like"
        ? dispatch(fetchLikeListPage({ page, limitPage }))
        : dispatch(fetchReviewMovieListPage({ page, limitPage }));
  };

  useEffect(() => {
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
        {isBlank  ? (
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
                          await dispatch(fetchRemoveLike(item.id));
                          const newData = [...data].filter(el=>el.id!==item.id);
                          dispatch(mypageSlice.actions.setMypageData(newData));
                          sweetToast("삭제가 완료되었습니다.", "success");
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
        />
      )}
      {isLoading && <Loading />}
    </>
  );
}
