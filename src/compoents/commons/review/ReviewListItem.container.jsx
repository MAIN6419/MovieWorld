import React, { useContext, useRef, useState } from "react";
import {
  editReview,
  removeReview,
  reviewReport,
} from "../../../firebase/reviewAPI";
import ReviewListItemUI from "./ReviewListItem.presenter";
import { resolveWebp } from "../../../libray/webpSupport";
import { WebpContext } from "../../../context/webpContext";
import { sweetConfirm, sweetToast } from "../../../sweetAlert/sweetAlert";
import { optKeyboardFocus } from "../../../libray/optKeyBoard.js";
export default function ReviewListItem({
  reviewData,
  reviewItem,
  movieId,
  setReviewData,
  userData,
  setUserData,
  setMypageReviewData,
}) {
  const { webpSupport } = useContext(WebpContext);
  const rateRef = useRef(null);
  const submitRef = useRef(null);
  const cancelRef = useRef(null);
  const editBtnRef = useRef(null);
  const [showSpoilerData, setShowSpoilerData] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(reviewItem.contents);
  const [editRating, setEditRating] = useState(reviewItem.rating);
  const [editTextCount, setEditTextCount] = useState(
    reviewItem.contents.length
  );
  const [editSpoiler, setEditSpoiler] = useState(reviewItem.spoiler);
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
    if (
      editValue === reviewItem.contents &&
      editRating === reviewItem.rating &&
      editSpoiler === reviewItem.editSpoiler
    ) {
      sweetToast("수정된 내용이 없습니다!", "warning");
      return;
    }
    const cb = () => {
      const editData = {
        id: reviewItem.id,
        uid: userData.uid,
        rating: editRating,
        contents: editValue,
        spoiler: editSpoiler,
      };
      editReview(movieId, editData);
      let newReviewData = [...reviewData];
      newReviewData.forEach((item) => {
        if (item.id === reviewItem.id) {
          item.reviewer = userData.displayName;
          item.reviewerImg = userData.photoURL;
          item.rating = editRating;
          item.contents = editValue;
          item.spoiler = editSpoiler;
        }
      });
      setReviewData(newReviewData);
      setIsEdit(false);
      sweetToast("수정이 완료되었습니다.", "success");
      setTimeout(() => {
        editBtnRef.current.focus();
      }, 0);
    };

    sweetConfirm("정말 수정하시겠습니까?", "수정", "취소", cb);
  };

  const onClickRemove = () => {
    const cb = () => {
      removeReview(movieId, reviewItem.id);
      setReviewData((prev) => prev.filter((item) => item.id !== reviewItem.id));
      let newUserData = { ...userData };
      newUserData = userData.reviewList.filter((review) => review !== movieId);
      setUserData(newUserData);
      if (setMypageReviewData) {
        setMypageReviewData((prev) => prev.filter((el) => el.id !== movieId));
      }
      sweetToast("삭제가 완료되었습니다.", "success");
    };
    sweetConfirm("정말 삭제하시겠습니까?", "삭제", "취소", cb);
  };

  const onClickReport = () => {
    if (!userData.uid) {
      sweetToast("로그인 후 이용가능합니다!", "warning");
      return;
    }
    const cb = async () => {
      const isReport = userData.reportList.find(
        (report) => report === reviewItem.id
      );
      if (isReport) {
        sweetToast("이미 신고한 리뷰입니다.", "warning");
        return;
      }
      await reviewReport(movieId, reviewItem);
      const newUserData = { ...userData };
      newUserData.reportList.push(reviewItem.id);
      setUserData(newUserData);
      sweetToast("신고가 완료되었습니다.", "success");
    };
    sweetConfirm("정말 신고하시겠습니까?", "확인", "취소", cb);
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
      editSpoiler={editSpoiler}
      setEditSpoiler={setEditSpoiler}
      onClickCancelEdit={onClickCancelEdit}
      setIsEdit={setIsEdit}
      onClickRemove={onClickRemove}
      onClickReport={onClickReport}
      userData={userData}
      resolveWebp={resolveWebp}
      webpSupport={webpSupport}
      showSpoilerData={showSpoilerData}
      setShowSpoilerData={setShowSpoilerData}
      rateRef={rateRef}
      submitRef={submitRef}
      cancelRef={cancelRef}
      editBtnRef={editBtnRef}
      optKeyboardFocus={optKeyboardFocus}
    />
  );
}
