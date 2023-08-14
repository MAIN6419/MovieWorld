import { memo, useEffect } from "react";
import ReviewList from "./ReviewList.container";
import { Title, Wrapper } from "./review.style";
import ReviewForm from "./ReviewForm.container";
import { useDispatch, useSelector } from "react-redux";
import { fetchIsReview, reviewSlice } from "../../../slice/reviewSlice";

const Review = ({
  movieData,
  filterRef,
  modalCardRef,
}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state=>state.user.data);
  const filter = useSelector((state) => state.review.filter);
  const page = useSelector((state) => state.review.page);
  const hasMore = useSelector((state) => state.review.hasMore);
  const limitPage = useSelector((state) => state.review.limitPage);
  const reviewData = useSelector((state) => state.review.reviewData);
  const isReview = useSelector((state) => state.review.isReview);

  useEffect(() => {
    if (userData) {
      dispatch(fetchIsReview(movieData.id));
    }
  }, []);

  return (
    <Wrapper>
      <Title>리뷰</Title>
      <ReviewForm
        movieData={movieData}
        reviewData={reviewData}
        page={page}
        filter={filter}
        dispatch={dispatch}
        reviewSlice={reviewSlice}
        limitPage={limitPage}
        isReview={isReview}
      />
      <ReviewList
        movieData={movieData}
        filterRef={filterRef}
        reviewData={reviewData}
        page={page}
        filter={filter}
        dispatch={dispatch}
        reviewSlice={reviewSlice}
        hasMore={hasMore}
        limitPage={limitPage}
        modalCardRef={modalCardRef}
      />
    </Wrapper>
  );
};

export default memo(Review);
