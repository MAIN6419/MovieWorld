import { memo, useEffect } from "react";
import ReviewList from "./ReviewList.container";
import { Title, Wrapper } from "./review.style";
import ReviewForm from "./ReviewForm.container";
import { useDispatch, useSelector } from "react-redux";
import { fetchIsReview } from "../../../slice/reviewSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { IVideoData } from "../../../api/movieAPIType";

interface IProps {
  movieData: IVideoData;
  filterRef: React.RefObject<HTMLButtonElement>;
  modalCardRef: React.RefObject<HTMLDivElement>;
}
const Review = ({ movieData, filterRef, modalCardRef }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.user.data);
  const filter = useSelector((state: RootState) => state.review.filter);
  const page = useSelector((state: RootState) => state.review.page);
  const hasMore = useSelector((state: RootState) => state.review.hasMore);
  const limitPage = useSelector((state: RootState) => state.review.limitPage);
  const reviewData = useSelector((state: RootState) => state.review.reviewData);
  const isReview = useSelector((state: RootState) => state.review.isReview);

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
        hasMore={hasMore}
        limitPage={limitPage}
        modalCardRef={modalCardRef}
      />
    </Wrapper>
  );
};

export default memo(Review);
