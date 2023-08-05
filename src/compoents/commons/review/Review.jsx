import { memo, useContext, useEffect, useState } from "react";
import ReviewList from "./ReviewList.container";
import { Title, Wrapper } from "./review.style";
import ReviewForm from "./ReviewForm.container";
import { UserContext } from "../../../context/userContext";
import { getUser } from "../../../firebase/loginAPI";

const Review = ({ movieData, filterRef, setMypageReviewData }) => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [showSpoilerData, setShowSpoilerData] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [page, setPage] = useState("");
  const [filter, setFilter] = useState({ target: "createdAt", order: "desc" });
  const [hasMore, setHasMore] = useState(false);
  const limitPage = 5;

  const fecthUserData = async () => {
    if (user) {
      const data = await getUser();
      setUserData(data);
    }
  };

  useEffect(() => {
    fecthUserData();
  }, [reviewData]);

  return (
    <Wrapper>
      <Title>리뷰</Title>
      <ReviewForm
        movieData={movieData}
        setMypageReviewData={setMypageReviewData}
        reviewData={reviewData}
        page={page}
        filter={filter}
        showSpoilerData={showSpoilerData}
        setPage={setPage}
        setHasMore={setHasMore}
        setReviewData={setReviewData}
        limitPage={limitPage}
        userData={userData}
      />
      <ReviewList
        movieData={movieData}
        setMypageReviewData={setMypageReviewData}
        filterRef={filterRef}
        reviewData={reviewData}
        setReviewData={setReviewData}
        page={page}
        setPage={setPage}
        filter={filter}
        setFilter={setFilter}
        showSpoilerData={showSpoilerData}
        setShowSpoilerData={setShowSpoilerData}
        hasMore={hasMore}
        setHasMore={setHasMore}
        limitPage={limitPage}
        userData={userData}
        setUserData={setUserData}
      />
    </Wrapper>
  );
};

export default memo(Review);
