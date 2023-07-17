import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import ReviewListItem from "./ReviewListItem";
import {
  Rating,
  RatingCount,
  RatingWrapper,
  ReviewList,
  TextArea,
  TextAreaBtn,
  TextAreaForm,
  TextAreaLabel,
  TextAreaWrapper,
  TextCount,
  TextCountWrapper,
  Title,
  Wrapper,
} from "./review.style";
import { addReview, fetchReview } from "../../../firebase/auth";
import { Timestamp } from "firebase/firestore";
import Blank from "../blank/Blank";

export default function Review({ movieData, user }) {
  const [reviewValue, setReivewValue] = useState("");
  const [rating, setRating] = useState(0);
  const [textCount, setTextCount] = useState(0);
  const [reviewData, setReviewData] = useState([]);

  const fetchReviewData = async () => {
    const data = await fetchReview(movieData.id);
    setReviewData(data);
  };

  useEffect(() => {
    fetchReviewData();
  }, []);

  const onChangeReview = (e) => {
    if (e.target.value.length === 1 && e.target.value === " ") {
      return;
    }
    setReivewValue(e.target.value);
    setTextCount(e.target.value.length);
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    const isReview = reviewData.find(
      (data) => data.reviewer === user.displayName
    );
    if (isReview) {
      alert("이미 리뷰한 영화 입니다!");
    } else {
      const commentData = {
        id: uuidv4(),
        uid: user.uid,
        rating,
        contents: reviewValue,
        createdAt: Timestamp.fromDate(new Date()),
      };
      addReview(movieData.id, commentData);
      fetchReviewData();
    }
    setReivewValue("");
    setTextCount(0);
    setRating(0);
  };
  return (
    <Wrapper>
      <Title>리뷰</Title>
      <RatingWrapper>
        <Rating
          count={5}
          value={rating}
          onChange={(value) => setRating(value)}
        />
        <RatingCount>{!rating || rating * 2}</RatingCount>
      </RatingWrapper>
      <TextAreaForm onSubmit={onClickSubmit}>
        <TextAreaWrapper>
          <TextAreaLabel className="a11y-hidden">리뷰 등록창</TextAreaLabel>
          <TextArea
            onChange={onChangeReview}
            value={reviewValue}
            placeholder="개인정보를 공용 및 요청하거나 명예훼손, 무단 광고, 불법 정보 유포시 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          ></TextArea>
          <TextCountWrapper>
            <TextCount>{textCount}/500</TextCount>
            <TextAreaBtn type="submit" disabled={!reviewValue || !rating}>
              작성하기
            </TextAreaBtn>
          </TextCountWrapper>
        </TextAreaWrapper>
      </TextAreaForm>
      <ReviewList>
        {reviewData.length ? (
          reviewData.map((item) => {
            return (
              <ReviewListItem
                key={item.id}
                reviewData={item}
                reviewDataList={reviewData}
                user={user}
                movieId={movieData.id}
                refetchReviewData={fetchReviewData}
                setReviewData={setReviewData}
              />
            );
          })
        ) : (
          <Blank text={"작성된 리뷰가 없어요."} />
        )}
      </ReviewList>
    </Wrapper>
  );
}
