import React from "react";
import {
  Rating,
  RatingCount,
  RatingWrapper,
  TextArea,
  TextAreaBtn,
  TextAreaForm,
  TextAreaLabel,
  TextAreaWrapper,
  TextCount,
  TextCountWrapper,
  ToggleSwitch,
  ToggleButton,
  ToggleCheckbox,
  ToggleWrapper,
  ReviewCheckList,
  ToggleSwithTag
} from "./review.style";
interface IProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  spoiler: boolean;
  setSpoiler: React.Dispatch<React.SetStateAction<boolean>>;
  onClickSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeReview: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  reviewValue: string;
  textCount: number;
}
export default function ReviewFormUI({
  rating,
  setRating,
  spoiler,
  setSpoiler,
  onClickSubmit,
  onChangeReview,
  reviewValue,
  textCount
}: IProps) {
  return (
    <>
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
            type='checkbox'
            id='toggle'
            className='a11y-hidden'
            tabIndex={-1}
            onClick={() => setSpoiler(!spoiler)}
          />
          <ToggleSwithTag>스포일러 체크</ToggleSwithTag>
          <ToggleSwitch
            htmlFor='toggle'
            className='toggleSwitch'
            toggle={spoiler}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.keyCode === 13) setSpoiler(!spoiler);
            }}
          >
            <ToggleButton
              className='toggleButton'
              toggle={spoiler}
            ></ToggleButton>
          </ToggleSwitch>
        </ToggleWrapper>
      </ReviewCheckList>
      <TextAreaForm onSubmit={onClickSubmit}>
        <TextAreaWrapper>
          <TextAreaLabel className='a11y-hidden'>리뷰 등록창</TextAreaLabel>
          <TextArea
            onChange={onChangeReview}
            value={reviewValue}
            placeholder='개인정보를 공용 및 요청하거나 명예훼손, 무단 광고, 불법 정보 유포시 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
          ></TextArea>
          <TextCountWrapper>
            <TextCount>{textCount}/500</TextCount>
            <TextAreaBtn type='submit' disabled={!reviewValue || !rating}>
              작성하기
            </TextAreaBtn>
          </TextCountWrapper>
        </TextAreaWrapper>
      </TextAreaForm>
    </>
  );
}
