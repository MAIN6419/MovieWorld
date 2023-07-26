import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useRef, useState } from "react";

import {
  addReview,
  fetchAddReviewData,
  fetchFirstReview,
  fetchReviewPage,
  getUser,
} from "../../../firebase/auth";
import { Timestamp } from "firebase/firestore";
import { useInView } from "react-intersection-observer";
import { UserContext } from "../../../context/userContext";
import ReviewUI from "./Review.presenter";

export default function Review({ movieData }) {
  const { user } = useContext(UserContext);
  const [reviewValue, setReivewValue] = useState("");
  const [rating, setRating] = useState(0);
  const [textCount, setTextCount] = useState(0);
  const [spoiler, setSpoiler] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [userData, setUserData] = useState({});
  const [showSpoilerData, setShowSpoilerData] = useState(false);
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [selectValue, setSelectValue] = useState("최신순");
  const [filter, setFilter] = useState({ target: "createdAt", order: "desc" });
  const [page, setPage] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const limitPage = 5;

  const [ref, inview] = useInView();

  const onChangeReview = (e) => {
    if (e.target.value.length === 1 && e.target.value === " ") {
      return;
    }
    setReivewValue(e.target.value);
    setTextCount(e.target.value.length);
  };

  const onClickSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };

  const onClickOpction = (e) => {
    if (e.target.id === "new") {
      setFilter({ target: "createdAt", order: "desc" });
      setSelectValue("최신순");
      onClickSelect();
    } else if (e.target.id === "old") {
      setFilter({ target: "createdAt", order: "asc" });
      setSelectValue("등록순");
      onClickSelect();
    } else {
      setFilter({ target: "rating", order: "desc" });
      setSelectValue("평점순");
      onClickSelect();
    }
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const isReview = userData.reviewList.find(
        (data) => data === movieData.id
      );
      if (isReview) {
        alert("이미 리뷰한 영화 입니다!");
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
            spoiler
          );
          setPage(res.docs[res.docs.length - 1]);
          setHasMore(res.docs.length / limitPage >= 0);
          setReviewData(data);
        } else {
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
      alert("로그인 후 이용가능합니다!");
    }
    setReivewValue("");
    setTextCount(0);
    setRating(0);
  };

  const fecthUserData = async () => {
    if (user) {
      const data = await getUser();
      setUserData(data);
    }
  };

  const fetchFirstPage = async () => {
    const { res, data } = await fetchFirstReview(
      movieData.id,
      limitPage,
      filter,
      showSpoilerData
    );
    setReviewData(data);
    setPage(res.docs[res.docs.length - 1]);
    setHasMore(res.docs.length === limitPage);
  };

  const fetchAddData = async () => {
    const { res, data } = await fetchReviewPage(
      movieData.id,
      page,
      limitPage,
      filter,
      showSpoilerData
    );
    setReviewData((prev) => [...prev, ...data]);
    setPage(res.docs[res.docs.length - 1]);
    setHasMore(res.docs.length === limitPage);
  };

  useEffect(() => {
    fecthUserData();
  }, [reviewData]);

  // 정렬이 바뀔때 마다 데이터를 새로 받아옴
  useEffect(() => {
    fetchFirstPage();
  }, [filter, showSpoilerData]);

  useEffect(() => {
    if (hasMore && inview) {
      fetchAddData();
    }
  }, [inview]);

  return (
    <ReviewUI
      rating={rating}
      setRating={setRating}
      spoiler={spoiler}
      setSpoiler={setSpoiler}
      onClickSubmit={onClickSubmit}
      onClickSelect={onClickSelect}
      onChangeReview={onChangeReview}
      reviewValue={reviewValue}
      textCount={textCount}
      showSpoilerData={showSpoilerData}
      setShowSpoilerData={setShowSpoilerData}
      selectValue={selectValue}
      isOpenSelect={isOpenSelect}
      onClickOpction={onClickOpction}
      reviewData={reviewData}
      setReviewData={setReviewData}
      movieData={movieData}
      userData={userData}
      setUserData={setUserData}
      infiniteScrollRef={ref}
    />
  );
}
