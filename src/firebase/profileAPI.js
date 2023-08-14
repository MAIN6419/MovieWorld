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
import { getUser } from "./loginAPI";

const auth = getAuth();
// 유저 프로필 수정 API
export const updateUserProfile = async (file, displayName) => {
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
};
