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
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./setting";
import { sweetToast } from "../sweetAlert/sweetAlert";

const auth = getAuth();
const userData = JSON.parse(localStorage.getItem("user")) || {};
// 좋아요 추가 API
export const addLike = async (movieData) => {
  try {
    const likeRef = collection(db, "likeList");
    const userLikedoc = doc(likeRef, auth.currentUser.uid);
    const userLikeRef = collection(userLikedoc, "like");

    await setDoc(doc(userLikeRef, String(movieData.id)), movieData);

    const userRef = doc(db, `user/${auth.currentUser.uid}`);
    await updateDoc(userRef, {
      likeList: arrayUnion(movieData.id),
    });

    return true;
  } catch (error) {
    sweetToast("알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.", "warning");
    throw error;
  }
};

// 좋아요 제거 API
export const removeLike = async (movieData) => {
  try {
    if (auth.currentUser) {
      const likeRef = collection(db, "likeList");
      const userLikedoc = doc(likeRef, auth.currentUser.uid);
      const userLikeRef = collection(userLikedoc, "like");
      const deleteReplyRef = doc(userLikeRef, String(movieData.id));
      await deleteDoc(deleteReplyRef);
      const userRef = doc(db, `user/${auth.currentUser.uid}`);
      await updateDoc(userRef, {
        likeList: arrayRemove(movieData.id),
      });
      return true;
    }
  } catch (error) {
    sweetToast("알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.", "warning");
    throw error;
  }
};

// 좋아요 목록 API
export const fetchFirstLikeList = async (limitPage) => {
  try {
    const likeRef = collection(db, "likeList");
    const userLikedoc = doc(
      likeRef,
      (userData && userData.uid) || auth.currentUser.uid
    );
    const userLikeRef = collection(userLikedoc, "like");
    const q = query(userLikeRef, limit(limitPage));
    const res = await getDocs(q);
    return res;
  } catch (error) {
    sweetToast("알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.","waring");
    throw error;
  }
};

// 좋아요 목록 페이징 API
export const fetchLikeListPage = async (page, limitPage) => {
  try {
    const likeRef = collection(db, "likeList");
    const userLikedoc = doc(likeRef, userData.uid);
    const userLikeRef = collection(userLikedoc, "like");
    const q = query(userLikeRef, startAfter(page), limit(limitPage));
    const res = await getDocs(q);
    return res;
  } catch (error) {
    sweetToast("알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.", "warning");
    throw error;
  }
};
