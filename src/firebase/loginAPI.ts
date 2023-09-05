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

// 로그인 API
export const login = async (email:string, password:string) => {
    await signInWithEmailAndPassword(auth, email, password);
    if(!auth.currentUser) return;
    sweetToast(
      `${auth.currentUser.displayName}님 환영합니다.`,
      "success",
      3000
    );
};

export const socialLogin = async (type: string) => {
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
    if(!provider) return;
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
};

// 로그아웃 API
export const logout = async () => {
    // 로그아웃
    await signOut(auth);
};

// 유저 데이터 API
export const getUser = async () => {
  try {
    if(!auth.currentUser) return;
    const userRef = doc(
      db,
      `user/${auth.currentUser.uid}`
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
