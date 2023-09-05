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
  DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./setting";
import { IVideoData } from "../api/movieAPIType";
import { IUserData } from './firebaseAPIType';

const auth = getAuth();
// 좋아요 추가 API
export const addLike = async (movieData: IVideoData) => {
  const likeRef = collection(db, "likeList");
  if (!auth.currentUser) return;
  const userLikedoc = doc(likeRef, auth.currentUser.uid);
  const userLikeRef = collection(userLikedoc, "like");

  await setDoc(doc(userLikeRef, String(movieData.id)), movieData);

  const userRef = doc(db, `user/${auth.currentUser.uid}`);
  await updateDoc(userRef, {
    likeList: arrayUnion(movieData.id)
  });

  return true;
};

// 좋아요 제거 API
export const removeLike = async (movieId: number) => {
  const likeRef = collection(db, "likeList");
  if (!auth.currentUser) return;
  const userLikedoc = doc(likeRef, auth.currentUser.uid);
  const userLikeRef = collection(userLikedoc, "like");
  const deleteReplyRef = doc(userLikeRef, String(movieId));
  await deleteDoc(deleteReplyRef);
  const userRef = doc(db, `user/${auth.currentUser.uid}`);
  await updateDoc(userRef, {
    likeList: arrayRemove(movieId)
  });
  return true;
};

// 좋아요 목록 API
export const getFirstLikeList = async (limitPage: number) => {
  const storedUser = localStorage.getItem("user");
  const userData: IUserData = storedUser ? JSON.parse(storedUser) : "";
  const likeRef = collection(db, "likeList");
  const userLikedoc = doc(likeRef, userData.uid);
  const userLikeRef = collection(userLikedoc, "like");
  const q = query(userLikeRef, orderBy("title", "asc"), limit(limitPage));
  const res = await getDocs(q);
  return res;
};

// 좋아요 목록 페이징 API
export const getLikeListPage = async (page:QueryDocumentSnapshot<DocumentData>, limitPage:number) => {
  const storedUser = localStorage.getItem("user");
  const userData: IUserData = storedUser ? JSON.parse(storedUser) : "";
  const likeRef = collection(db, "likeList");
  const userLikedoc = doc(likeRef, userData.uid);
  const userLikeRef = collection(userLikedoc, "like");
  const q = query(
    userLikeRef,
    orderBy("title", "asc"),
    startAfter(page),
    limit(limitPage)
  );
  const res = await getDocs(q);
  return res;
};
