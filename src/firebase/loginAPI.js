import {
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { db } from "./setting";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();
const userData = JSON.parse(localStorage.getItem("user")) || {};

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

export const socialLogin = async (type) => {
  try {
    let provider;
    if (type === "google") {
      provider = googleProvider;
    } else if (type === "facebook") {
      provider = facebookProvider;
    } else if (type === "twitter") {
      provider = twitterProvider;
    } else if (type === "github") {
      provider = githubProvider;
    }
    const result = await signInWithPopup(auth, provider);
    if (result) {
      const user = result.user;
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      const isUserRes = await getDoc(doc(db, `user/${user.uid}`));
      const isUser = isUserRes.data();
      if (!isUser) {
        await updateProfile(result.user, {
          displayName,
          photoURL,
        });

        const userRef = collection(db, "user");
        await setDoc(doc(userRef, `${user.uid}`), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL || "",
          phone: user.phoneNumber,
          likeList: [],
          reviewList: [],
          reportList: [],
          photoFileName: "",
        });
      }
    }
  } catch (error) {
    console.log(error);
    if (
      error.message.includes("auth/account-exists-with-different-credential")
    ) {
      alert("이미 가입된 이메일 계정입니다!");
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

// 유저 데이터 API
export const getUser = async () => {
  try {
    const userRef = doc(
      db,
      `user/${(userData && userData.uid) || auth.currentUser.uid}`
    );
    const res = await getDoc(userRef);
    const data = res.data();
    return data;
  } catch (error) {
    alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    throw error;
  }
};
