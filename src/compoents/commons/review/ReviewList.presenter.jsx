import React from "react";
import {
  ReviewUl,
  SelectWrapper,
  Select,
  OpectionList,
  Opection,
  OpectionBtn,
  InfinityScollTarget
} from "./review.style";
import ReviewListItem from "./ReviewListItem.container";
import Blank from "../blank/Blank";

export default function ReviewListUI({
  filterRef,
  isOpenSelect,
  setIsOpenSelect,
  onClickSelect,
  selectValue,
  onClickOpction,
  newestFilterRef,
  optKeyboardFocus,
  oldestFilterRef,
  ratingFilterRef,
  reviewData,
  movieData,
  infinityScrollRef,
  isSmall,
  modalCardRef,
}) {
  return (
    <>
      <SelectWrapper>
        <Select
          type="button"
          onClick={onClickSelect}
          active={isOpenSelect}
          ref={filterRef}
          onKeyDown={(e) => {
            if (e.keyCode === 27) {
              e.stopPropagation();
              setIsOpenSelect(false);
            }
          }}
        >
          {selectValue}
        </Select>
        {isOpenSelect && (
          <OpectionList>
            <Opection>
              <OpectionBtn
                type="button"
                id="new"
                onClick={onClickOpction}
                ref={newestFilterRef}
                onKeyDown={(e) => {
                  if (e.keyCode === 27) {
                    e.stopPropagation();
                    setIsOpenSelect(false);
                  }
                  optKeyboardFocus(e, ratingFilterRef.current);
                }}
              >
                최신순
              </OpectionBtn>
            </Opection>
            <Opection>
              <OpectionBtn
                type="button"
                id="old"
                onClick={onClickOpction}
                ref={oldestFilterRef}
                onKeyDown={(e) => {
                  if (e.keyCode === 27) {
                    e.stopPropagation();
                    setIsOpenSelect(false);
                  }
                }}
              >
                등록순
              </OpectionBtn>
            </Opection>
            <Opection>
              <OpectionBtn
                type="button"
                id="rating"
                onClick={onClickOpction}
                onKeyDown={(e) => {
                  if (e.keyCode === 27) {
                    e.stopPropagation();
                    setIsOpenSelect(false);
                  }
                  optKeyboardFocus(
                    e,
                    oldestFilterRef.current,
                    newestFilterRef.current
                  );
                }}
                ref={ratingFilterRef}
              >
                평점순
              </OpectionBtn>
            </Opection>
          </OpectionList>
        )}
      </SelectWrapper>
      {reviewData.length ? (
        <>
          <ReviewUl>
            {reviewData.map((item) => {
              return (
                <ReviewListItem
                  key={item.id}
                  reviewItem={item}
                  reviewData={reviewData}
                  reviewDataList={reviewData}
                  movieId={movieData.id}
                  modalCardRef={modalCardRef}
                />
              );
            })}
          </ReviewUl>
          <InfinityScollTarget ref={infinityScrollRef}></InfinityScollTarget>
        </>
      ) : (
        <Blank text={"작성된 리뷰가 없어요."} size={isSmall ? "small" : ""}/>
      )}
    </>
  );
}
