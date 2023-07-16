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

export default function ReviewListItem({reviewData}) {
  console.log(reviewData)
  return (
    <ReviewItem>
      <ReviewerWrapper>
        <ReviewerImg src="assets/defaultProfile.png" />
        <Reviewer>{reviewData.reviewer}</Reviewer>
        <ReviewItemRateWrapper>
          <ReviewItemRate defaultValue={reviewData.rating} disabled />
          <ReviewItemRateCount>{reviewData.rating}</ReviewItemRateCount>
        </ReviewItemRateWrapper>
      </ReviewerWrapper>
      <ReviewContents>{reviewData.contents}</ReviewContents>
      <ReviewItemBottom>
        <ReviewCreatedAt>{setDateFormate(reviewData.createdAt.seconds * 1000)}</ReviewCreatedAt>
        <ReviewItemBtn>신고</ReviewItemBtn>
      </ReviewItemBottom>
    </ReviewItem>
  );
}
