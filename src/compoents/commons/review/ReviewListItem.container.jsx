import React, { useRef, useState } from "react";
import {
  editReview,
  removeReview,
  reviewReport,
} from "../../../firebase/reviewAPI";
import ReviewListItemUI from "./ReviewListItem.presenter";
import { resolveWebp } from "../../../libray/webpSupport";
import { sweetConfirm, sweetToast } from "../../../sweetAlert/sweetAlert";
import { optKeyboardFocus } from "../../../libray/optKeyBoard.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditReview, fetchRemoveReview, fetchReportReview } from "../../../slice/reviewSlice";
import { getUser } from "../../../firebase/loginAPI";
import { mypageSlice } from "../../../slice/mypageSlice";
export default function ReviewListItem({
  reviewData,
  reviewItem,
  movieId,
}) {
  const dispatch = useDispatch();
  const mypageData = useSelector((state) => state.mypage.data);
  const userData = useSelector((state) => state.user.data);
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
      const newReviewData = reviewData.map((item) => {
        if (item.id === reviewItem.id) {
          return {
            ...item,
            reviewer: userData.displayName,
            reviewerImg: userData.photoURL,
            rating: editRating,
            contents: editValue,
            spoiler: editSpoiler,
          };
        }
        return item;
      });
      dispatch(fetchEditReview({ movieId, editData, newReviewData }));
      setIsEdit(false);
      setTimeout(() => {
        editBtnRef.current.focus();
      }, 0);
    };
    sweetConfirm("정말 수정하시겠습니까?", "수정", "취소", cb);
  };

  const onClickRemove = () => {
    const cb = () => {
      dispatch(fetchRemoveReview({ movieId, reviewId: reviewItem.id }));
      if (mypageData) {
        const newData = [...mypageData].filter((el) => el.id !== movieId);
        dispatch(mypageSlice.actions.setMypageData(newData));
      }
    };
    sweetConfirm("정말 삭제하시겠습니까?", "삭제", "취소", cb);
  };

  const onClickReport = async () => {
    if (!userData.uid) {
      sweetToast("로그인 후 이용가능합니다!", "warning");
      return;
    }
    const user = await getUser();
    const isReport = user.reportList.find(id=>id===reviewItem.id);
    if (isReport) {
      sweetToast("이미 신고한 리뷰입니다.", "warning");
      return;
    }
    const cb = async () => {
      dispatch(fetchReportReview({ movieId, reviewData: reviewItem }));
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
