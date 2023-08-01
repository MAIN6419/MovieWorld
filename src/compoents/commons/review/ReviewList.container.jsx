import React, { useEffect, useRef, useState } from "react";
import { optKeyboardFocus } from "../../../libray/optKeyBoard";
import { useInView } from "react-intersection-observer";
import { fetchFirstReview, fetchReviewPage } from "../../../firebase/reviewAPI";
import ReviewListUI from "./ReviewList.presenter";

export default function ReviewList({
  movieData,
  reviewData,
  setReviewData,
  page,
  setPage,
  hasMore,
  setHasMore,
  setMypageData,
  showSpoilerData,
  setShowSpoilerData,
  filterRef,
  filter,
  setFilter,
  limitPage,
  userData,
  setUserData,
}) {
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
      setFilter({ target: "createdAt", order: "desc" });
      setSelectValue("최신순");
      onClickSelect();
    } else if (e.target.id === "old") {
      setFilter({ target: "createdAt", order: "asc" });
      setSelectValue("등록순");
      onClickSelect();
    } else {
      setFilter({ target: "rating", order: "desc" });
      setSelectValue("평점순");
      onClickSelect();
    }
  };

  const fetchFirstPage = async () => {
    const { res, data } = await fetchFirstReview(
      movieData.id,
      limitPage,
      filter,
      showSpoilerData
    );
    setReviewData(data);
    setPage(res.docs[res.docs.length - 1]);
    setHasMore(res.docs.length === limitPage);
  };

  const fetchAddData = async () => {
    const { res, data } = await fetchReviewPage(
      movieData.id,
      page,
      filter,
      showSpoilerData
    );
    setReviewData((prev) => [...prev, ...data]);
    setPage(res.docs[res.docs.length - 1]);
    setHasMore(res.docs.length === limitPage);
  };


  // 정렬이 바뀔때 마다 데이터를 새로 받아옴
  useEffect(() => {
    fetchFirstPage();
  }, [filter, showSpoilerData]);

  useEffect(() => {
    if (hasMore && inview) {
      fetchAddData();
    }
  }, [inview]);


  return (
    <ReviewListUI
      showSpoilerData={showSpoilerData}
      setShowSpoilerData={setShowSpoilerData}
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
      setReviewData={setReviewData}
      userData={userData}
      setUserData={setUserData}
      movieData={movieData}
      setMypageReviewData={setMypageData}
      infinityScrollRef={ref}
    />
  );
}
