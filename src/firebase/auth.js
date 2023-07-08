import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { db, storage } from "./setting";
const auth = getAuth();

// 로그인 변화를 감지
// 로그인이 된 경우 로컬스토리지에 필요한 유저정보 저장
onAuthStateChanged(auth, async (user) => {
  if (user) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email, 
        photoURL: user.photoURL,
      }),
    );
  } 
});

// 로그인 API
export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.replace("/home");
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
export const signup = async (nickname, email, password, phone) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, {
      displayName: nickname,
    });

    const user = collection(db, "user");
    await setDoc(doc(user, `${res.user.displayName ?? ""}`), {
      email: res.user.email,
      nickname: res.user.displayName,
      phone,
      likeList:[],
      profileImgFileName: "",
      profileImgUrl: "",
    });
    alert("회원가입이 완료되었습니다.");
    window.location.replace("/home");
  } catch (error) {
    if (error.message.includes("email-already-in-use")) {
      alert("이미 사용중인 이메일 입니다!");
    } else {
      alert("알 수 없는 에러가 발생하였습니다. 잠시후 다시 시도해 주세요.");
    }
    throw error;
  }
};
