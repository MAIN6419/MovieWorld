import React, { useState } from "react";
import {
  editReview,
  removeReview,
  reviewReport,
} from "../../../firebase/reviewAPI";
import ReviewListItemUI from "./ReviewListItem.presenter";
import { resolveWebp } from "../../../libray/webpSupport";
import { WebpContext } from "../../../context/webpContext";

export default function ReviewListItem({
  reviewData,
  reviewItem,
  movieId,
  setReviewData,
  userData,
  setUserData,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(reviewItem.contents);
  const [editRating, setEditRating] = useState(reviewItem.rating);
  const [editTextCount, setEditTextCount] = useState(
    reviewItem.contents.length
  );

  const onChangeEditValue = (e) => {
    if (e.target.value.length === 1 && e.target.value === " ") {
      return;
    }
    setEditValue(e.target.value);
    setEditTextCount(e.target.value.length);
  };

  const onClickCancelEdit = () => {
    setEditRating(reviewItem.rating);
    setEditTextCount(reviewItem.contents.length);
    setEditValue(reviewItem.contents);
    setIsEdit(false);
  };

  const onClickEdit = (e) => {
    e.preventDefault();
    const answer = window.confirm("정말 수정하시겠습니까?");
    if (answer) {
      const editData = {
        id: reviewItem.id,
        uid: userData.uid,
        rating: editRating,
        contents: editValue,
      };
      editReview(movieId, editData);
      let newReviewData = [...reviewData];
      newReviewData.forEach((item) => {
        if (item.id === reviewItem.id) {
          item.reviewer = userData.displayName;
          item.reviewerImg = userData.photoURL;
          item.rating = editRating;
          item.contents = editValue;
        }
      });
      setReviewData(newReviewData);
      setIsEdit(false);
    }
  };

  const onClickRemove = () => {
    const answer = window.confirm("정말 삭제하시겠습니까?");
    if (answer) {
      removeReview(movieId, reviewItem.id);
      setReviewData((prev) => prev.filter((item) => item.id !== reviewItem.id));
      let newUserData = { ...userData };
      newUserData = userData.reviewList.filter((review) => review !== movieId);
      setUserData(newUserData);
    }
  };

  const onClickReport = async () => {
    if (!userData.uid) {
      alert("로그인 후 이용가능합니다!");
      return;
    }
    const answer = window.confirm("정말 신고하시겠습니까?");
    if (answer) {
      const isReport = userData.reportList.find(
        (report) => report === reviewItem.id
      );
      if (isReport) {
        alert("이미 신고한 리뷰입니다.");
        return;
      }
      await reviewReport(movieId, reviewItem);
      const newUserData = { ...userData };
      newUserData.reportList.push(reviewItem.id);
      setUserData(newUserData);
      alert("신고가 완료되었습니다.");
    }
  };

  return (
    <ReviewListItemUI
      reviewItem={reviewItem}
      isEdit={isEdit}
      editRating={editRating}
      setEditRating={setEditRating}
      onClickEdit={onClickEdit}
      editValue={editValue}
      onChangeEditValue={onChangeEditValue}
      editTextCount={editTextCount}
      onClickCancelEdit={onClickCancelEdit}
      setIsEdit={setIsEdit}
      onClickRemove={onClickRemove}
      onClickReport={onClickReport}
      userData={userData}
      resolveWebp={resolveWebp}
      WebpContext={WebpContext}
    />
  );
}
