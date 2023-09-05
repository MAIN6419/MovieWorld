import React, { useEffect, useRef, useState } from "react";
import { optKeyboardFocus } from "../../../libray/optKeyBoard";
import { useInView } from "react-intersection-observer";
import ReviewListUI from "./ReviewList.presenter";
import { useMediaQuery } from "react-responsive";
import {
  fetchFirstReviewData,
  fetchReviewListPage,
  reviewSlice,
} from "../../../slice/reviewSlice";
import { IVideoData } from '../../../api/movieAPIType';
import { IReviewData } from '../../../firebase/firebaseAPIType';
import { DocumentData, OrderByDirection, QuerySnapshot } from 'firebase/firestore';
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';

interface IProps {
  movieData: IVideoData,
  reviewData: IReviewData[],
  page: QuerySnapshot<DocumentData>,
  hasMore: boolean,
  filterRef: React.RefObject<HTMLButtonElement>,
  filter: {target: string, order: OrderByDirection|undefined},
  dispatch: ThunkDispatch<any, undefined, AnyAction> & Dispatch<AnyAction>;
  limitPage: number,
  modalCardRef: React.RefObject<HTMLDivElement>,
}

export default function ReviewList({
  movieData,
  reviewData,
  page,
  hasMore,
  filterRef,
  filter,
  dispatch,
  limitPage,
  modalCardRef,
}: IProps) {
  const isSmall = useMediaQuery({ query: "(max-width:501px)" });
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [selectValue, setSelectValue] = useState("최신순");
  const newestFilterRef = useRef<HTMLButtonElement>(null);
  const oldestFilterRef = useRef<HTMLButtonElement>(null);
  const ratingFilterRef = useRef<HTMLButtonElement>(null);
  const [ref, inview] = useInView();

  const onClickSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };

  const onClickOpction = (e:React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id === "new") {
      dispatch(
        reviewSlice.actions.changeFilter({ target: "createdAt", order: "desc" })
      );
      setSelectValue("최신순");
      onClickSelect();
    } else if (e.currentTarget.id === "old") {
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
    if (modalCardRef.current&&modalCardRef.current.scrollTop > 700) {
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
