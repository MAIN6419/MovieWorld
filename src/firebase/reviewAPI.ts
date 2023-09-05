import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  startAfter,
  limit,
  orderBy,
  endAt,
  increment,
  OrderByDirection,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";
import { db } from "./setting";
import { getAuth } from "firebase/auth";
import { IVideoData } from "../api/movieAPIType";
import { IReviewData } from "./firebaseAPIType";
interface IFilter {
  target: string;
  order: OrderByDirection | undefined;
}

const auth = getAuth();

// 리뷰 첫번째 목록 API
export const getFirstReviewList = async (
  movieId: number,
  limitPage: number,
  filter: IFilter
) => {
  const reviewListRef = collection(db, "reviewList");
  const reviewDoc = doc(reviewListRef, String(movieId));
  const reviewRef = collection(reviewDoc, "review");
  const q = query(
    reviewRef,
    orderBy(filter.target, filter.order),
    limit(limitPage)
  );
  const res = await getDocs(q);

  const data = res.docs.map((el) => el.data());
  const userListRef = collection(db, `user`);
  const userListRes = await getDocs(userListRef);
  const userListUid = userListRes.docs.map((doc) => doc.id);
  const userList = userListRes.docs.map((el) => el.data());

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < userListUid.length; j++) {
      if (data[i].uid === userListUid[j]) {
        data[i].reviewer = userList[j].displayName;
        data[i].reviewerImg = userList[j].photoURL;
      }
    }
  }
  return { res, data };
};

// 리뷰 목록 페이징 API
export const getReviewListPage = async (
  movieId: number,
  page: QuerySnapshot<DocumentData>,
  filter: IFilter
) => {
  const reviewListRef = collection(db, "reviewList");
  const reviewDoc = doc(reviewListRef, String(movieId));
  const reviewRef = collection(reviewDoc, "review");
  const q = query(
    reviewRef,
    orderBy(filter.target, filter.order),
    startAfter(page)
  );
  const res = await getDocs(q);
  const data = res.docs.map((el) => el.data());

  const userListRef = collection(db, `user`);
  const userListRes = await getDocs(userListRef);
  const userListUid = userListRes.docs.map((doc) => doc.id);
  const userList = userListRes.docs.map((el) => el.data());
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < userListUid.length; j++) {
      if (data[i].uid === userListUid[j]) {
        data[i].reviewer = userList[j].displayName;
        data[i].reviewerImg = userList[j].photoURL;
      }
    }
  }
  return { res, data };
};

// 리뷰 작성 API
export const addReview = async (
  movieData: IVideoData,
  reviewData: Pick<
    IReviewData,
    "id" | "uid" | "rating" | "contents" | "createdAt" | "spoiler"
  >
) => {
  // reviewList 해당 영화에 리뷰 데이터 추가
  const reviewListRef = collection(db, "reviewList");
  const reviewDoc = doc(reviewListRef, String(movieData.id));
  const reviewRef = collection(reviewDoc, "review");

  const addReviewPromise = setDoc(doc(reviewRef, reviewData.id), {
    id: reviewData.id,
    uid: reviewData.uid,
    rating: reviewData.rating,
    contents: reviewData.contents,
    createdAt: reviewData.createdAt,
    spoiler: reviewData.spoiler,
    isBlock: false,
    reportCount: 0
  });

  // 유저 db subCollection에 review한 영화 정보 저장
  const UserRef = collection(db, "user");
  if (!auth.currentUser) return;
  const UserReviewListMovieInfoDoc = doc(UserRef, auth.currentUser.uid);
  const UserReviewMovieInfoRef = collection(
    UserReviewListMovieInfoDoc,
    "reviewListMovieInfo"
  );

  const addUserReviewListMovieInfoPromise = setDoc(
    doc(UserReviewMovieInfoRef, reviewData.id),
    movieData
  );

  // 유저 db reviewList에 리뷰한 movieId 추가
  const userRef = doc(db, `user/${auth.currentUser.uid}`);
  const addUserReivewPromise = updateDoc(userRef, {
    reviewList: arrayUnion(movieData.id)
  });

  // 순서에 상관없는 작업 병렬처리
  await Promise.all([
    addReviewPromise,
    addUserReviewListMovieInfoPromise,
    addUserReivewPromise
  ]);
};

// 리뷰 작성 후 스크롤 내린 만큼의 이전 데이터도 같이 불러오는 API
export const addReviewData = async (
  movieId: number,
  page: QuerySnapshot<DocumentData>,
  filter: IFilter
) => {
  const reviewListRef = collection(db, "reviewList");
  const reviewDoc = doc(reviewListRef, String(movieId));
  const reviewRef = collection(reviewDoc, "review");
  const q = query(reviewRef, orderBy(filter.target, filter.order), endAt(page));

  const res = await getDocs(q);
  const data = res.docs.map((el) => el.data());
  const userListRef = collection(db, `user`);
  const userListRes = await getDocs(userListRef);
  const userListUid = userListRes.docs.map((doc) => doc.id);
  const userList = userListRes.docs.map((el) => el.data());

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < userListUid.length; j++) {
      if (data[i].uid === userListUid[j]) {
        data[i].reviewer = userList[j].displayName;
        data[i].reviewerImg = userList[j].photoURL;
      }
    }
  }

  return { res, data };
};

// 리뷰 삭제 API
export const removeReview = async (movieId: number, reviewId: string) => {
  // reviewList 해당 영화에 리뷰 데이터 삭제
  const reviewListRef = collection(db, "reviewList");
  const reviewDoc = doc(reviewListRef, String(movieId));
  const reviewRef = collection(reviewDoc, "review");
  const deleteReviewRef = doc(reviewRef, reviewId);
  const deleteReviewPromise = deleteDoc(deleteReviewRef);

  const UserRef = collection(db, "user");
  if (!auth.currentUser) return;
  const UserReviewListMovieInfoDoc = doc(UserRef, auth.currentUser.uid);
  const UserReviewMovieInfoRef = collection(
    UserReviewListMovieInfoDoc,
    "reviewListMovieInfo"
  );

  // 유저 db subCollection에 review한 영화 정보 삭제
  const deleteUserReviewListRef = doc(UserReviewMovieInfoRef, reviewId);
  const deleteUserReviewListPromise = deleteDoc(deleteUserReviewListRef);

  // 유저 db reviewList에 리뷰한 movieId 삭제
  const userRef = doc(db, `user/${auth.currentUser.uid}`);
  const deleteUserReviewPromise = updateDoc(userRef, {
    reviewList: arrayRemove(movieId)
  });

  // 순서에 상관없는 작업 병렬처리
  await Promise.all([
    deleteReviewPromise,
    deleteUserReviewListPromise,
    deleteUserReviewPromise
  ]);
};

// 리뷰 수정 API
export const editReview = async (
  movieId: number,
  editData: Pick<IReviewData, "id" | "rating" | "contents" | "spoiler">
) => {
  const reviewListRef = collection(db, "reviewList");
  const reviewDoc = doc(reviewListRef, String(movieId));
  const reviewRef = collection(reviewDoc, "review");
  const updateReviewRef = doc(reviewRef, editData.id);

  await updateDoc(updateReviewRef, {
    rating: editData.rating,
    contents: editData.contents,
    spoiler: editData.spoiler
  });
};

// 리뷰 신고 API
export const reportReview = async (
  movieId: number,
  reviewData: IReviewData
) => {
  // reviewList 컬렉션의 해당 docsId(movieId)의 subCollection의 docsId(reviewId) 해당되는 데이터
  const reviewListRef = collection(db, "reviewList");
  const reviewDoc = doc(reviewListRef, String(movieId));
  const reviewRef = collection(reviewDoc, "review");
  const updateReviewRef = doc(reviewRef, reviewData.id);

  // 리뷰 데이터의 신고수를 1 더해줌
  // 만약 리뷰 데이터의 신고수가 5 이상이 된다면(현재 4 => 클릭시 5이므로 >=4 조건식 사용) 해당 리뷰 block 처리
  const reportReviewPromise = updateDoc(updateReviewRef, {
    isBlock: reviewData.reportCount >= 4 ? true : false,
    reportCount: increment(1)
  });
  if (!auth.currentUser) return;
  // 유저가 신고한 리뷰인지 아닌지 판단하기 위해 reportList에 해당 reviewID를 추가
  const userRef = doc(db, `user/${auth.currentUser.uid}`);
  const addReportListPromise = updateDoc(userRef, {
    reportList: arrayUnion(reviewData.id)
  });
  await Promise.all([reportReviewPromise, addReportListPromise]);
};

// 리뷰 영화 목록 API
export const getFirstReviewMovieList = async (limitPage: number) => {
  const UserRef = collection(db, "user");
  if (!auth.currentUser) return;
  const UserReviewListMovieInfoDoc = doc(UserRef, auth.currentUser.uid);
  const UserReviewMovieInfoRef = collection(
    UserReviewListMovieInfoDoc,
    "reviewListMovieInfo"
  );
  const q = query(UserReviewMovieInfoRef, limit(limitPage));
  const res = await getDocs(q);
  return res;
};

// 리뷰 영화 목록 페이징 API
export const getReviewMovieListPage = async (
  page: QueryDocumentSnapshot<DocumentData>,
  limitPage: number
) => {
  const UserRef = collection(db, "user");
  if (!auth.currentUser) return;
  const UserReviewListMovieInfoDoc = doc(UserRef, auth.currentUser.uid);
  const UserReviewMovieInfoRef = collection(
    UserReviewListMovieInfoDoc,
    "reviewListMovieInfo"
  );
  const q = query(UserReviewMovieInfoRef, startAfter(page), limit(limitPage));
  const res = await getDocs(q);
  return res;
};
