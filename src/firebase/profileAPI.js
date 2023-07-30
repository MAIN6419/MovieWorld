import { doc, updateDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { db, storage } from "./setting";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import { getUser } from "./loginAPI";

const auth = getAuth();
// 유저 프로필 수정 API
export const updateUserProfile = async (file, displayName) => {
  try {
    const fileName = file && `${uuidv4()}_${file.name}`;
    const options = {
      maxSizeMB: 10, // 이미지 최대 용량
      maxWidthOrHeight: 256, // 이미지 최대 너비 및 높이
      useWebWorker: true, // webworker 적용 유무
      // webworker : 웹 워커 API가 멀티 스레딩을 지원하게 되어 워커를 이용하면 워커에서 작성된 스크립트는 
      // 메인 스레드에서 분기되어 독립된 스레드로 실행되기 때문에 메모리 자원을 효율적으로 사용할 수 있다.
    };
    const compressedFile = file && (await imageCompression(file, options));
    const res =
      file &&
      (await uploadBytes(
        storageRef(storage, `images/profile/${fileName}`),
        compressedFile
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
    }

    // 2. 닉네임만 변경된 경우
    else if (displayName && !file) {
      promises.push(
        updateProfile(auth.currentUser, { displayName }),
        updateDoc(updateUser, { displayName })
      );
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
    }

    await Promise.all(promises);
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: auth.currentUser.uid,
        displayName,
        photoURL: uploadfileUrl,
        email: auth.currentUser.email,
      })
    );
  } catch (error) {
    alert("알 수 없는 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
    throw error;
  }
};
