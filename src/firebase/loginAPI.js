import { collection, doc, setDoc, getDoc } from "firebase/firestore";
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
import { sweetToast } from "../sweetAlert/sweetAlert";

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
    sweetToast(`${auth.currentUser.displayName}님 환영합니다.`, "success", 3000);
  } catch (error) {
    if (error.message.includes("auth/invalid-email")) {
      sweetToast("유효하지 않은 이메일 형식 입니다!", "warning");
    } else if (error.message.includes("auth/missing-email")) {
      sweetToast("존재하지 않는 이메일 입니다!", "warning");
    } else if (error.message.includes("auth/user-not-found")) {
      sweetToast("일치 하는 로그인 정보가 없습니다!", "warning");
      return;
    } else if (error.message.includes("auth/wrong-password")) {
      sweetToast("아이디 또는 비밀번호가 일치하지 않습니다!", "warning");
      return;
    } else if (error.message.includes("auth/too-many-requests")) {
      sweetToast(
        "많은 로그인 시도로 로그인이 일시적으로 제한됩니다!",
        "warning"
      );
    } else {
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
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
      sweetToast("이미 가입된 이메일 계정입니다!", "warning");
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
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
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
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};
