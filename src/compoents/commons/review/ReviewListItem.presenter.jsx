import React, { useContext } from "react";
import {
  EditBtn,
  EditBtns,
  EditTextArea,
  EditTextAreaBottom,
  EditTextAreaForm,
  EditTextAreaLabel,
  EditTextCount,
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

export default function ReviewListItemUI({
  reviewItem,
  isEdit,
  editRating,
  setEditRating,
  onClickEdit,
  editValue,
  onChangeEditValue,
  editTextCount,
  onClickCancelEdit,
  setIsEdit,
  onClickRemove,
  onClickReport,
  userData,
  webpSupport,
  resolveWebp,
}) {
  return (
    <ReviewItem>
      <ReviewerWrapper>
        <ReviewerImg
          src={
            reviewItem.reviewerImg ||
            resolveWebp(
              webpSupport,
              "assets/webp/icon-defaultProfile.webp",
              "svg"
            )
          }
          alt="유저 프로필 이미지"
          onError={(e) =>
            (e.target.src = resolveWebp(
              webpSupport,
              "assets/webp/icon-defaultProfile.webp",
              "svg"
            ))
          }
        />
        <Reviewer>{reviewItem.reviewer}</Reviewer>
        <ReviewItemRateWrapper>
          <ReviewItemRate
            value={editRating}
            disabled={!isEdit}
            onChange={(value) => setEditRating(value)}
          />
          <ReviewItemRateCount>{editRating * 2}</ReviewItemRateCount>
        </ReviewItemRateWrapper>
      </ReviewerWrapper>
      {isEdit ? (
        <EditTextAreaForm onSubmit={(e) => onClickEdit(e)}>
          <EditTextAreaLabel className="a11y-hidden">
            수정 입력창
          </EditTextAreaLabel>
          <EditTextArea
            value={editValue}
            onChange={onChangeEditValue}
            placeholder="개인정보를 공용 및 요청하거나 명예훼손, 무단 광고, 불법 정보 유포시 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <EditTextAreaBottom>
            <EditTextCount>{editTextCount}/500</EditTextCount>
            <EditBtns>
              <EditBtn type="submit">수정하기</EditBtn>
              <EditBtn
                className="cancel"
                type="button"
                onClick={onClickCancelEdit}
              >
                취소하기
              </EditBtn>
            </EditBtns>
          </EditTextAreaBottom>
        </EditTextAreaForm>
      ) : (
        <>
          <ReviewContents>{reviewItem.contents}</ReviewContents>
          <ReviewItemBottom>
            <ReviewCreatedAt
              dateTime={new Date(
                reviewItem.createdAt.seconds * 1000
              ).toISOString()}
            >
              {setDateFormate(reviewItem.createdAt.seconds * 1000)}
            </ReviewCreatedAt>
            {userData.displayName === reviewItem.reviewer ? (
              <>
                <ReviewItemBtn type="button" onClick={() => setIsEdit(true)}>
                  수정
                </ReviewItemBtn>
                <ReviewItemBtn type="button" onClick={onClickRemove}>
                  삭제
                </ReviewItemBtn>
              </>
            ) : (
              <ReviewItemBtn onClick={onClickReport}>신고</ReviewItemBtn>
            )}
          </ReviewItemBottom>
        </>
      )}
    </ReviewItem>
  );
}
