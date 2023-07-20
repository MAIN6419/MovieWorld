import React, { useState } from "react";
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
import { editReview, removeReview, reviewReport } from "../../../firebase/auth";

export default function ReviewListItem({
  reviewData,
  movieId,
  setReviewData,
  userData,
  setUserData,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(reviewData.contents);
  const [editRating, setEditRating] = useState(reviewData.rating);
  const [editTextCount, setEditTextCount] = useState(
    reviewData.contents.length
  );

  const onChangeEditValue = (e) => {
    if (e.target.value.length === 1 && e.target.value === " ") {
      return;
    }
    setEditValue(e.target.value);
    setEditTextCount(e.target.value.length);
  };

  const onClickCancelEdit = () => {
    setEditRating(reviewData.rating);
    setEditTextCount(reviewData.contents.length);
    setEditValue(reviewData.contents);
    setIsEdit(false);
  };

  const onClickEdit = (e) => {
    e.preventDefault();
    const answer = window.confirm("정말 수정하시겠습니까?");
    if (answer) {
      const editData = {
        id: reviewData.id,
        uid: userData.uid,
        rating: editRating,
        contents: editValue,
      };
      editReview(movieId, editData);

      let newData = [...userData];
      newData.userData.forEach((item) => {
        if (item.id === reviewData.id) {
          item.reviewer = userData.displayName;
          item.reviewerImg = userData.photoURL;
          item.rating = editRating;
          item.contents = editValue;
        }
      });
      setReviewData(newData);
      setIsEdit(false);
    }
  };

  const onClickRemove = () => {
    const answer = window.confirm("정말 삭제하시겠습니까?");
    if (answer) {
      removeReview(movieId, reviewData.id);
      setReviewData((prev) => prev.filter((item) => item.id !== reviewData.id));
      let newUserData = {...userData};
      newUserData = userData.reviewList.filter((review) => review !== movieId);
      setUserData(newUserData);
    }
  };

  const onClickReport = async () => {
    const answer = window.confirm("정말 신고하시겠습니까?");
    if (answer) {
      const isReport = userData.reportList.find((report)=>report===reviewData.id);
      if(isReport){
        alert("이미 신고한 리뷰입니다.");
        return;
      }
      await reviewReport(movieId, reviewData);
      const newUserData = {...userData}
      newUserData.reportList.push(reviewData.id);
      setUserData(newUserData);
      alert("신고가 완료되었습니다.");
    }
  }

  return (
    <ReviewItem>
      <ReviewerWrapper>
        <ReviewerImg
          src={reviewData.reviewerImg || "assets/defaultProfile.png"}
          onError={(e) => (e.target.src = "assets/defaultProfile.png")}
        />
        <Reviewer>{reviewData.reviewer}</Reviewer>
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
          <ReviewContents>{reviewData.contents}</ReviewContents>
          <ReviewItemBottom>
            <ReviewCreatedAt>
              {setDateFormate(reviewData.createdAt.seconds * 1000)}
            </ReviewCreatedAt>
            {userData.displayName === reviewData.reviewer ? (
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
