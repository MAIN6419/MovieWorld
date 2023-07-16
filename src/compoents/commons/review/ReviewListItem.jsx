import React from "react";
import {
  ReviewContents,
  ReviewCreatedAt,
  ReviewItem,
  ReviewItemBottom,
  ReviewItemBtn,
  ReviewItemRate,
  ReviewItemRateCount,
  ReviewItemRateWrapper,
  Reviewer,
  ReviewerImg,
  ReviewerWrapper,
} from "./reviewListItem.style";
import { setDateFormate } from "../../../libray/setDateFormate";
import { removeReview } from "../../../firebase/auth";

export default function ReviewListItem({
  reviewData,
  user,
  movieId,
  setReviewData,
}) {
  const onClickRemove = () => {
    const answer = window.confirm("정말 삭제하시겠습니까?");
    if (answer) {
      removeReview(movieId, reviewData.id);
      setReviewData((prev) => prev.filter((data) => data.id !== reviewData.id));
    }
  };

  return (
    <ReviewItem>
      <ReviewerWrapper>
        <ReviewerImg src="assets/defaultProfile.png" />
        <Reviewer>{reviewData.reviewer}</Reviewer>
        <ReviewItemRateWrapper>
          <ReviewItemRate defaultValue={reviewData.rating} disabled />
          <ReviewItemRateCount>{reviewData.rating * 2}</ReviewItemRateCount>
        </ReviewItemRateWrapper>
      </ReviewerWrapper>
      <ReviewContents>{reviewData.contents}</ReviewContents>
      <ReviewItemBottom>
        <ReviewCreatedAt>
          {setDateFormate(reviewData.createdAt.seconds * 1000)}
        </ReviewCreatedAt>
        {user.displayName === reviewData.reviewer ? (
          <>
            <ReviewItemBtn type="button">수정</ReviewItemBtn>
            <ReviewItemBtn type="button" onClick={onClickRemove}>
              삭제
            </ReviewItemBtn>
          </>
        ) : (
          <ReviewItemBtn>신고</ReviewItemBtn>
        )}
      </ReviewItemBottom>
    </ReviewItem>
  );
}
