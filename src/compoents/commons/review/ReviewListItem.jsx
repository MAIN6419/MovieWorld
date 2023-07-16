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

export default function ReviewListItem() {
  return (
    <ReviewItem>
      <ReviewerWrapper>
        <ReviewerImg src="assets/defaultProfile.png" />
        <Reviewer>test</Reviewer>
        <ReviewItemRateWrapper>
          <ReviewItemRate defaultValue={3} disabled />
          <ReviewItemRateCount>7</ReviewItemRateCount>
        </ReviewItemRateWrapper>
      </ReviewerWrapper>
      <ReviewContents>안녕하세요.</ReviewContents>
      <ReviewItemBottom>
        <ReviewCreatedAt>2023-05-06</ReviewCreatedAt>
        <ReviewItemBtn>신고</ReviewItemBtn>
      </ReviewItemBottom>
    </ReviewItem>
  );
}
