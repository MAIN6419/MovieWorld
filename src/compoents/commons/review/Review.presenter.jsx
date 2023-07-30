import React, { useRef } from "react";
import Blank from "../blank/Blank";
import ReviewListItem from "./ReviewListItem.container";
import {
  Rating,
  RatingCount,
  RatingWrapper,
  ReviewList,
  SelectWrapper,
  Select,
  OpectionList,
  Opection,
  OpectionBtn,
  TextArea,
  TextAreaBtn,
  TextAreaForm,
  TextAreaLabel,
  TextAreaWrapper,
  TextCount,
  TextCountWrapper,
  Title,
  Wrapper,
  ToggleSwitch,
  ToggleButton,
  ToggleCheckbox,
  ToggleWrapper,
  ReviewCheckList,
} from "./review.style";
import { optKeyboardFocus } from "../../../libray/optKeyBoard";
export default function ReviewUI({
  rating,
  setRating,
  spoiler,
  setSpoiler,
  onClickSubmit,
  onClickSelect,
  onChangeReview,
  reviewValue,
  textCount,
  showSpoilerData,
  setShowSpoilerData,
  selectValue,
  isOpenSelect,
  setIsOpenSelect,
  onClickOpction,
  reviewData,
  setReviewData,
  movieData,
  userData,
  setUserData,
  infiniteScrollRef,
  filterRef,
}) {
  const newestFilterRef = useRef(null);
  const oldestFilterRef = useRef(null);
  const ratingFilterRef = useRef(null);

  return (
    <Wrapper>
      <Title>리뷰</Title>
      <ReviewCheckList>
        <RatingWrapper>
          <Rating
            count={5}
            value={rating}
            onChange={(value) => setRating(value)}
          />
          <RatingCount>{!rating || rating * 2}</RatingCount>
        </RatingWrapper>

        <ToggleWrapper>
          <ToggleCheckbox
            type="checkbox"
            id="toggle"
            className="a11y-hidden"
            tabIndex="-1"
            onClick={() => setSpoiler(!spoiler)}
          />
          <span>스포일러 체크</span>
          <ToggleSwitch
            htmlFor="toggle"
            className="toggleSwitch"
            toggle={spoiler}
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.keyCode === 13) setSpoiler(!spoiler);
            }}
          >
            <ToggleButton
              className="toggleButton"
              toggle={spoiler}
            ></ToggleButton>
          </ToggleSwitch>
        </ToggleWrapper>
      </ReviewCheckList>
      <TextAreaForm onSubmit={onClickSubmit}>
        <TextAreaWrapper>
          <TextAreaLabel className="a11y-hidden">리뷰 등록창</TextAreaLabel>
          <TextArea
            onChange={onChangeReview}
            value={reviewValue}
            placeholder="개인정보를 공용 및 요청하거나 명예훼손, 무단 광고, 불법 정보 유포시 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          ></TextArea>
          <TextCountWrapper>
            <TextCount>{textCount}/500</TextCount>
            <TextAreaBtn type="submit" disabled={!reviewValue || !rating}>
              작성하기
            </TextAreaBtn>
          </TextCountWrapper>
        </TextAreaWrapper>
      </TextAreaForm>
      <SelectWrapper>
        <ToggleWrapper>
          <ToggleCheckbox
            type="checkbox"
            id="toggle-showSpoiler"
            className="a11y-hidden"
            tabIndex="-1"
            onClick={() => setShowSpoilerData(!showSpoilerData)}
          />
          <span>스포일러 리뷰 포함</span>
          <ToggleSwitch
            htmlFor="toggle-showSpoiler"
            className="toggleSwitch"
            toggle={showSpoilerData}
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.keyCode === 13) setShowSpoilerData(!showSpoilerData);
            }}
          >
            <ToggleButton
              className="toggleButton"
              toggle={showSpoilerData}
            ></ToggleButton>
          </ToggleSwitch>
        </ToggleWrapper>
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
                  optKeyboardFocus(e, ratingFilterRef.current)
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
                  optKeyboardFocus(e, oldestFilterRef.current, newestFilterRef.current);
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
          <ReviewList>
            {reviewData.map((item) => {
              return (
                <ReviewListItem
                  key={item.id}
                  reviewItem={item}
                  reviewData={reviewData}
                  reviewDataList={reviewData}
                  movieId={movieData.id}
                  setReviewData={setReviewData}
                  userData={userData}
                  setUserData={setUserData}
                />
              );
            })}
          </ReviewList>
          <div ref={infiniteScrollRef}></div>
        </>
      ) : (
        <Blank text={"작성된 리뷰가 없어요."} />
      )}
    </Wrapper>
  );
}
