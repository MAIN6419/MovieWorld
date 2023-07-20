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
  getDoc,
  startAfter,
  limit,
  orderBy,
  endAt,
  increment,
} from "firebase/firestore";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { db, storage } from "./setting";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
  deleteObject,
} from "firebase/storage";

import { v4 as uuidv4 } from "uuid";

const auth = getAuth();
const userData = JSON.parse(localStorage.getItem("user"));

// 로그인 API
export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.replace("/main");
  } catch (error) {
    if (error.message.includes("auth/invalid-email")) {
      alert("유효하지 않은 이메일 형식 입니다!");
    } else if (error.message.includes("auth/missing-email")) {
      alert("존재하지 않는 이메일 입니다!");
    } else if (error.message.includes("auth/user-not-found")) {
      alert("일치 하는 로그인 정보가 없습니다!");
      return;
    } else if (error.message.includes("auth/wrong-password")) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다!");
      return;
    } else if (error.message.includes("auth/too-many-requests")) {
      alert("많은 로그인 시도로 인해 로그인이 일시적으로 제한됩니다!");
    } else {
      alert("알 수 없는 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요.");
      throw error;
    }
  }
};

// 로그아웃 API
export const logout = async () => {
  if (window.confirm("정말 로그아웃 하시겠습니까?")) {
    try {
      // 로그아웃
      await signOut(auth);
      localStorage.removeItem("user");
      window.location.reload();
    } catch (error) {
      alert("알 수 없는 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요.");
      throw error;
    }
  }
};

// 중복검사 API
export const duplication = async (duplicationValue, duplicationTarget) => {
  const userRef = collection(db, "user");
  const q = query(
    userRef,
    where(duplicationTarget, "==", duplicationValue.toLowerCase())
  );
  const res = await getDocs(q);
  const data = res.docs.map((el) => el.data());
  if (data.length > 0) {
    return true;
  } else {
    return false;
  }
};

// 회원가입 API
export const signup = async (displayName, email, password, phone) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, {
      displayName,
    });

    const user = collection(db, "user");
    await setDoc(doc(user, `${res.user.uid}`), {
      email: res.user.email,
      displayName: res.user.displayName,
      phone,
      likeList: [],
      reviewList: [],
      reportList: [],
      photoFileName: "",
      photoURL: "",
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
    );
  } catch (error) {
    if (error.message.includes("email-already-in-use")) {
      alert("이미 사용중인 이메일 입니다!");
    } else {
      alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    }
    throw error;
  }
};

// 이메일 찾기 API
export const findEmail = async (displayName, phone) => {
  try {
    const userRef = collection(db, "user");
    const q = query(
      userRef,
      where("displayName", "==", displayName),
      where("phone", "==", phone)
    );
    const res = await getDocs(q);
    const datas = res.docs.map((el) => el.data());
    if (datas.length > 0) return datas[0].email;
    else {
      alert("일치하는 정보가 없습니다!");
      return false;
    }
  } catch (error) {
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    throw error;
  }
};

// 비밀번호 변경 API
export const changePassword = async (email, phone) => {
  try {
    const userRef = collection(db, "user");
    const q = query(
      userRef,
      where("email", "==", email),
      where("phone", "==", phone)
    );
    const res = await getDocs(q);
    const datas = res.docs.map((el) => el.data());
    if (datas.length > 0) {
      sendPasswordResetEmail(auth, email)
        .then(() => {})
        .catch((error) => {
          throw error;
        });
      return true;
    } else {
      alert("일치하는 정보가 없습니다!");
      return false;
    }
  } catch (error) {
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    throw error;
  }
};

// 로그인 상태에서 비밀번호 변경 API
export async function changeUserPassword(currentPassword, newPassword) {
  try {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    // 현재 사용자의 정보를 확인하는 메서드
    // => 이것을 이용하여 현재 로그인한 유저의 비밀번화 일치하는지 판별해서
    // 일치하지 않는다면 오류가 발생하는데 이것을 예외처리해서
    // 비밀번호가 일치하지 않는다는 것을 판별
    await reauthenticateWithCredential(user, credential);
    if (currentPassword === newPassword) {
      alert("현재 비밀번호와 새 비밀번호가 같습니다!");
      return false;
    }
    await updatePassword(auth.currentUser, newPassword);
    alert(
      "비밀번호가 변경되었습니다. 변경사항 확인을 위해 다시 로그인 해주세요."
    );
    await signOut(auth);
    window.location.replace("/login");
  } catch (error) {
    if (error.message.includes("auth/wrong-password")) {
      alert("현재 비밀번호가 일치하지 않습니다!");
      return;
    } else {
      throw error;
    }
  }
}

// 유저 프로필 수정 API
export const updateUserProfile = async (file, displayName) => {
  try {
    const fileName = file && `${uuidv4()}_${file.name}`;
    const res =
      file &&
      (await uploadBytes(
        storageRef(storage, `images/profile/${fileName}`),
        file
      ));
    const user = await getUser();
    const uploadfileUrl = file && (await getDownloadURL(res.ref));
    const updateUser = doc(db, `user/${auth.currentUser.uid}`);
    const promises = [];

    // 1. 닉네임과 이미지 파일이 모두 변경된 경우
    if (displayName && file) {
      if (user.photoFileName) {
        promises.push(
          deleteObject(
            storageRef(storage, `images/profile/${String(user.photoFileName)}`)
          )
        );
      }
      promises.push(
        updateProfile(auth.currentUser, {
          displayName,
          photoURL: uploadfileUrl,
        }),
        updateDoc(updateUser, {
          displayName,
          photoFileName: fileName,
          photoURL: uploadfileUrl,
        })
      );
      userData.displayName = displayName;
      userData.photoURL = uploadfileUrl;
    }

    // 2. 닉네임만 변경된 경우
    else if (displayName && !file) {
      promises.push(
        updateProfile(auth.currentUser, { displayName }),
        updateDoc(updateUser, { displayName })
      );
      userData.displayName = displayName;
    }

    // 3. 이미지만 변경된 경우
    else if (!displayName && file) {
      if (user.photoFileName) {
        promises.push(
          deleteObject(
            storageRef(storage, `images/profile/${String(user.photoFileName)}`)
          )
        );
      }
      promises.push(
        updateProfile(auth.currentUser, { photoURL: uploadfileUrl }),
        updateDoc(updateUser, {
          photoFileName: fileName,
          photoURL: uploadfileUrl,
        })
      );
      userData.photoURL = uploadfileUrl;
    }

    await Promise.all(promises);
    localStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {
    alert("알 수 없는 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
    throw error;
  }
};

// 유저 데이터 API
export const getUser = async () => {
  try {
    const userRef = doc(db, `user/${auth.currentUser.uid}`);
    const res = await getDoc(userRef);
    const data = res.data();
    return data;
  } catch (error) {
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    throw error;
  }
};

export const addLike = async (movieData) => {
  try {
    if (auth.currentUser) {
      const likeRef = collection(db, "likeList");
      const userLikedoc = doc(likeRef, auth.currentUser.uid);
      const userLikeRef = collection(userLikedoc, "like");

      await setDoc(doc(userLikeRef, String(movieData.id)), movieData);

      const userRef = doc(db, `user/${auth.currentUser.uid}`);
      await updateDoc(userRef, {
        likeList: arrayUnion(movieData.id),
      });

      return true;
    } else {
      alert("로그인 후 이용 가능합니다!");
      return false;
    }
  } catch (error) {
    alert("알 수 없는 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요.");
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
      const userRef = doc(db, `user/${userData.uid}`);
      await updateDoc(userRef, {
        likeList: arrayRemove(movieData.id),
      });
      return true;
    } else {
      return alert("로그인 후 이용 가능합니다!");
    }
  } catch (error) {
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    throw error;
  }
};

// 좋아요 목록 API
export const fetchFirstLikeList = async (limitPage) => {
  try {
    const likeRef = collection(db, "likeList");
    const userLikedoc = doc(likeRef, userData.uid);
    const userLikeRef = collection(userLikedoc, "like");
    const q = query(userLikeRef, limit(limitPage));
    const res = await getDocs(q);
    return res;
  } catch (error) {
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
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
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    throw error;
  }
};

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
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    throw error;
  }
};

// 리뷰 목록 페이징 API
export const fetchReviewPage = async (movieId, page, limitPage, filter) => {
  try {
    const reviewListRef = collection(db, "reviewList");
    const reviewDoc = doc(reviewListRef, String(movieId));
    const reviewRef = collection(reviewDoc, "review");
    const q = query(
      reviewRef,
      orderBy(filter.target, filter.order),
      where("isBlock", "==", false),
      startAfter(page),
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
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
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
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    throw error;
  }
};

// 리뷰 작성 후 스크롤 내린 만큼의 이전 데이터도 같이 불러오는 API
export const fetchAddReviewData = async (movieId, limitPage, filter) => {
  try {
    const reviewListRef = collection(db, "reviewList");
    const reviewDoc = doc(reviewListRef, String(movieId));
    const reviewRef = collection(reviewDoc, "review");
    const q = query(
      reviewRef,
      orderBy(filter.target, filter.order),
      where("isBlock", "==", false),
      endAt(limitPage)
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
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
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
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
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
    });
  } catch (error) {
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
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
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    throw error;
  }
};

// 리뷰 영화 목록 API
export const fetchFirstReviewMovieList = async (limitPage) => {
  try {
    const reviewListRef = collection(db, "userReviewList");
    const reviewDoc = doc(reviewListRef, userData.uid);
    const reviewRef = collection(reviewDoc, "reviewMovie");
    const q = query(reviewRef, limit(limitPage));
    const res = await getDocs(q);
    return res;
  } catch (error) {
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    throw error;
  }
};

// 리뷰 영화 목록 페이징 API
export const fetchReviewMovieListPage = async (page, limitPage) => {
  try {
    const reviewListRef = collection(db, "userReviewList");
    const reviewDoc = doc(reviewListRef, userData.uid);
    const reviewRef = collection(reviewDoc, "reviewMovie");
    const q = query(reviewRef, startAfter(page), limit(limitPage));
    const res = await getDocs(q);
    return res;
  } catch (error) {
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    throw error;
  }
};
