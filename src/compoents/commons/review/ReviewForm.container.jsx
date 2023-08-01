import { v4 as uuidv4 } from "uuid";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { Timestamp } from "firebase/firestore";
import { addReview, fetchAddReviewData } from "../../../firebase/reviewAPI";
import ReviewFormUI from "./ReviewForm.presenter";
import { sweetToast } from "../../../sweetAlert/sweetAlert";
export default function ReviewForm({
  movieData,
  reviewData,
  page,
  filter,
  showSpoilerData,
  setPage,
  setHasMore,
  setReviewData,
  limitPage,
  userData,
}) {
  const { user } = useContext(UserContext);
  const [reviewValue, setReivewValue] = useState("");
  const [rating, setRating] = useState(0);
  const [textCount, setTextCount] = useState(0);
  const [spoiler, setSpoiler] = useState(false);

  const onChangeReview = (e) => {
    if (e.target.value.length === 1 && e.target.value === " ") {
      return;
    }
    setReivewValue(e.target.value);
    setTextCount(e.target.value.length);
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const isReview = userData.reviewList.find(
        (data) => data === movieData.id
      );
      if (isReview) {
        sweetToast("이미 리뷰한 영화입니다!", "warning");
        setReivewValue("");
        setTextCount(0);
        setRating(0);
        return;
      } else {
        const newReviewData = {
          id: uuidv4(),
          uid: userData.uid,
          rating,
          contents: reviewValue,
          createdAt: Timestamp.fromDate(new Date()),
          spoiler,
        };
        await addReview(movieData, newReviewData);
        if (reviewData.length) {
          // 댓글 추가후 이전 데이터들도 같이 불러오기 위해서 사용(스크롤 유지)
          const { res, data } = await fetchAddReviewData(
            movieData.id,
            page,
            filter,
            showSpoilerData
          );
          setPage(res.docs[res.docs.length - 1]);
          setHasMore(res.docs.length / limitPage >= 0);
          setReviewData(data);
          sweetToast("리뷰가 작성되었습니다.", "success");
        } else {
          if (spoiler && !showSpoilerData) return;
          setReviewData([
            {
              ...newReviewData,
              reviewer: userData.displayName,
              reviewerImg: userData.photoURL,
            },
          ]);
        }
      }
    } else {
      sweetToast("로그인 후 이용가능합니다!", "warning");
    }
    setReivewValue("");
    setTextCount(0);
    setRating(0);
  };


  return (
    <ReviewFormUI
      rating={rating}
      setRating={setRating}
      spoiler={spoiler}
      setSpoiler={setSpoiler}
      onClickSubmit={onClickSubmit}
      onChangeReview={onChangeReview}
      reviewValue={reviewValue}
      textCount={textCount}
    />
  );
}
