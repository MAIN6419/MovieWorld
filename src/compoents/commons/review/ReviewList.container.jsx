import React, { useEffect, useRef, useState } from "react";
import { optKeyboardFocus } from "../../../libray/optKeyBoard";
import { useInView } from "react-intersection-observer";
import ReviewListUI from "./ReviewList.presenter";
import { useMediaQuery } from "react-responsive";
import {
  fetchFirstReviewData,
  fetchReviewListPage,
} from "../../../slice/reviewSlice";

export default function ReviewList({
  movieData,
  reviewData,
  page,
  hasMore,
  filterRef,
  filter,
  dispatch,
  reviewSlice,
  limitPage,
  modalCardRef,
}) {
  const isSmall = useMediaQuery({ query: "(max-width:501px)" });
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [selectValue, setSelectValue] = useState("최신순");
  const newestFilterRef = useRef(null);
  const oldestFilterRef = useRef(null);
  const ratingFilterRef = useRef(null);
  const [ref, inview] = useInView();

  const onClickSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };

  const onClickOpction = (e) => {
    if (e.target.id === "new") {
      dispatch(
        reviewSlice.actions.changeFilter({ target: "createdAt", order: "desc" })
      );
      setSelectValue("최신순");
      onClickSelect();
    } else if (e.target.id === "old") {
      dispatch(
        reviewSlice.actions.changeFilter({ target: "createdAt", order: "asc" })
      );
      setSelectValue("등록순");
      onClickSelect();
    } else {
      dispatch(
        reviewSlice.actions.changeFilter({ target: "rating", order: "desc" })
      );
      setSelectValue("평점순");
      onClickSelect();
    }
  };

  // 정렬이 바뀔때 마다 데이터를 새로 받아옴
  useEffect(() => {
    dispatch(
      fetchFirstReviewData({ movieId: movieData.id, limitPage, filter })
    );
    // 필터가 바뀌면 스크롤이 올라가도록 설정
    // 무한스크롤 동작을 위해 inview가 변할 수 있도록 하기 위해서
    if (modalCardRef.current.scrollTop > 700) {
      modalCardRef.current.scrollTo({ top: 700 });
    }
  }, [movieData, filter]);


  useEffect(() => {
    if (hasMore && inview) {
      dispatch(fetchReviewListPage({ movieId: movieData.id, page, filter }));
    }
  }, [inview]);

  return (
    <ReviewListUI
      filterRef={filterRef}
      isOpenSelect={isOpenSelect}
      setIsOpenSelect={setIsOpenSelect}
      onClickSelect={onClickSelect}
      selectValue={selectValue}
      onClickOpction={onClickOpction}
      newestFilterRef={newestFilterRef}
      optKeyboardFocus={optKeyboardFocus}
      oldestFilterRef={oldestFilterRef}
      ratingFilterRef={ratingFilterRef}
      reviewData={reviewData}
      movieData={movieData}
      infinityScrollRef={ref}
      isSmall={isSmall}
    />
  );
}
