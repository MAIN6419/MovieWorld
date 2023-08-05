import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  startAfter,
  limit,
  orderBy,
  endAt,
  increment,
} from "firebase/firestore";
import { db } from "./setting";
import { getAuth } from "firebase/auth";
import { sweetToast } from "../sweetAlert/sweetAlert";

const auth = getAuth();

// 리뷰 첫번째 목록 API
export const fetchFirstReview = async (movieId, limitPage, filter) => {
  try {
    const reviewListRef = collection(db, "reviewList");
    const reviewDoc = doc(reviewListRef, String(movieId));
    const reviewRef = collection(reviewDoc, "review");
    const q = query(
      reviewRef,
      orderBy(filter.target, filter.order),
      where("isBlock", "==", false),
      limit(limitPage)
    );
    const res = await getDocs(q);

    let data = res.docs.map((el) => el.data());
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
  } catch (error) {
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// 리뷰 목록 페이징 API
export const fetchReviewPage = async (movieId, limitPage, filter) => {
  try {
    const reviewListRef = collection(db, "reviewList");
    const reviewDoc = doc(reviewListRef, String(movieId));
    const reviewRef = collection(reviewDoc, "review");
    const q = query(
      reviewRef,
      orderBy(filter.target, filter.order),
      where("isBlock", "==", false),
      startAfter(limitPage)
    );
    const res = await getDocs(q);
    let data = res.docs.map((el) => el.data());

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
  } catch (error) {
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// 리뷰 작성 API
export const addReview = async (movieData, reviewData) => {
  try {
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
      reportCount: 0,
    });

    const UserReviewListRef = collection(db, "userReviewList");
    const UserReviewListDoc = doc(UserReviewListRef, auth.currentUser.uid);
    const UserReviewRef = collection(UserReviewListDoc, "reviewMovie");

    const addUserReviewListPromise = setDoc(
      doc(UserReviewRef, reviewData.id),
      movieData
    );

    const userRef = doc(db, `user/${auth.currentUser.uid}`);
    const addUserReivewPromise = updateDoc(userRef, {
      reviewList: arrayUnion(movieData.id),
    });

    await Promise.all([
      addReviewPromise,
      addUserReviewListPromise,
      addUserReivewPromise,
    ]);
  } catch (error) {
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// 리뷰 작성 후 스크롤 내린 만큼의 이전 데이터도 같이 불러오는 API
export const fetchAddReviewData = async (movieId, page, filter) => {
  try {
    const reviewListRef = collection(db, "reviewList");
    const reviewDoc = doc(reviewListRef, String(movieId));
    const reviewRef = collection(reviewDoc, "review");
    const q = query(
      reviewRef,
      orderBy(filter.target, filter.order),
      where("isBlock", "==", false),
      endAt(page)
    );

    const res = await getDocs(q);
    let data = res.docs.map((el) => el.data());
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
  } catch (error) {
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// 리뷰 삭제 API
export const removeReview = async (movieId, reviewId) => {
  try {
    const reviewListRef = collection(db, "reviewList");
    const reviewDoc = doc(reviewListRef, String(movieId));
    const reviewRef = collection(reviewDoc, "review");
    const deleteReviewRef = doc(reviewRef, reviewId);
    const deleteReviewPromise = deleteDoc(deleteReviewRef);

    const UserReviewListRef = collection(db, "userReviewList");
    const UserReviewListDoc = doc(UserReviewListRef, auth.currentUser.uid);
    const UserReviewRef = collection(UserReviewListDoc, "reviewMovie");
    const deleteUserReviewListRef = doc(UserReviewRef, reviewId);
    const deleteUserReviewListPromise = deleteDoc(deleteUserReviewListRef);

    const userRef = doc(db, `user/${auth.currentUser.uid}`);
    const deleteUserReviewPromise = updateDoc(userRef, {
      reviewList: arrayRemove(movieId),
    });

    await Promise.all([
      deleteReviewPromise,
      deleteUserReviewListPromise,
      deleteUserReviewPromise,
    ]);
  } catch (error) {
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// 리뷰 수정 API
export const editReview = async (movieId, editData) => {
  try {
    const reviewListRef = collection(db, "reviewList");
    const reviewDoc = doc(reviewListRef, String(movieId));
    const reviewRef = collection(reviewDoc, "review");
    const updateReviewRef = doc(reviewRef, editData.id);

    await updateDoc(updateReviewRef, {
      rating: editData.rating,
      contents: editData.contents,
      spoiler: editData.spoiler,
    });
  } catch (error) {
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// 리뷰 신고 API
export const reviewReport = async (movieId, reviewData) => {
  try {
    const reviewListRef = collection(db, "reviewList");
    const reviewDoc = doc(reviewListRef, String(movieId));
    const reviewRef = collection(reviewDoc, "review");
    const updateReviewRef = doc(reviewRef, reviewData.id);

    const reportReviewPromise = updateDoc(updateReviewRef, {
      isBlock: reviewData.reportCount >= 4 ? true : false,
      reportCount: increment(1),
    });

    const userRef = doc(db, `user/${auth.currentUser.uid}`);
    const addReportListPromise = updateDoc(userRef, {
      reportList: arrayUnion(reviewData.id),
    });
    await Promise.all[(reportReviewPromise, addReportListPromise)];
  } catch (error) {
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// 리뷰 영화 목록 API
export const fetchFirstReviewMovieList = async (limitPage) => {
  try {
    const reviewListRef = collection(db, "userReviewList");
    const reviewDoc = doc(reviewListRef, auth.currentUser.uid);
    const reviewRef = collection(reviewDoc, "reviewMovie");
    const q = query(reviewRef, limit(limitPage));
    const res = await getDocs(q);
    return res;
  } catch (error) {
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// 리뷰 영화 목록 페이징 API
export const fetchReviewMovieListPage = async (page, limitPage) => {
  try {
    const reviewListRef = collection(db, "userReviewList");
    const reviewDoc = doc(reviewListRef, auth.currentUser.uid);
    const reviewRef = collection(reviewDoc, "reviewMovie");
    const q = query(reviewRef, startAfter(page), limit(limitPage));
    const res = await getDocs(q);
    return res;
  } catch (error) {
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};
