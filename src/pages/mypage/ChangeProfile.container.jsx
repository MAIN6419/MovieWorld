import React, { useContext, useEffect, useRef, useState } from "react";
import { useValidationInput } from "../../hook/useValidationInput";
import { updateUserProfile } from "../../firebase/profileAPI";
import { useMediaQuery } from "react-responsive";
import { UserContext } from "../../context/userContext";
import { isMobile } from "react-device-detect";
import { history } from "../../history/history";
import ChangeProfileUI from "./ChangeProfile.presenter";
import { WebpContext } from "../../context/webpContext";
import { resolveWebp } from "../../libray/webpSupport";
import { imgCompression } from "../../libray/imagCompression";
import { sweetToast } from "../../sweetAlert/sweetAlert";

export default function ChangeProfile({
  user,
  setIsProfileEdit,
  setIsLoading,
}) {
  const { webpSupport } = useContext(WebpContext);
  const { refreshUser } = useContext(UserContext);
  const isMoblie = useMediaQuery({
    query: "(max-width:486px)",
  });
  const imgInputRef = useRef(null);
  const imgBtnRef = useRef(null);
  const submitBtnRef = useRef(null);
  const cancelBtnRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(user.photoURL);
  const [uploadImg, setUploadImg] = useState("");
  const [displayNameValue, displayNameValid, onChnageDisplayName, setDisplayNameValue, setDisplayNameValid] =
    useValidationInput(user.displayName, "displayName", true);

  const onClickChangeImg = () => {
    imgInputRef.current.click();
  };

  const imgValidation = (file) => {
    // 파일 확인
    if (!file) {
      return false;
    }
    // 파일 사이즈 확인
    if (file.size > 1024 * 1024 * 10) {
      sweetToast("이미지 파일의 크기를 초과하였습니다.(최대 10MB)", "warning");
      return false;
    }
    // 이미지 지원 형식 확인
    if (
      !file.name.includes("png") &&
      !file.name.includes("jpg") &&
      !file.name.includes("jpeg") &&
      !file.name.includes("bmp") &&
      !file.name.includes("tif") &&
      !file.name.includes("heic")
    ) {
      sweetToast(
        "이미지 형식을 확인해 주세요!\n(지원형식 : .jpg, .png, .jpeg,.bmp, .tif, *.heic)",
        "warning"
      );
      return false;
    }
    // 모두 만족 한다면 true 반환
    return true;
  };

  const onChangeImg = async (e) => {
    const file = e.target.files[0];
    const isValid = imgValidation(file);
    if (!isValid) return;
    const { compressedFile, preview } = await imgCompression(file);
    setPreviewImg(preview);
    setUploadImg(compressedFile);
  };

  const onClickCancel = () => {
    setIsProfileEdit(false);
    document.body.style.overflow = "auto";
  };

  const onClickSubmit = async () => {
    if (!displayNameValid.valid)
      return sweetToast("닉네임을 확인해주세요!", "warning");
    if (user.displayName === displayNameValue && user.photoURL === previewImg) {
      return sweetToast("수정 사항이 없습니다!", "warning");
    }
    setIsLoading(true);
    await updateUserProfile(uploadImg, displayNameValue);
    setIsLoading(false);
    onClickCancel();
    refreshUser();
  };

  useEffect(() => {
    if (isMobile) {
      window.history.pushState(null, "", window.location.href);

      window.onpopstate = () => {
        history.go(1);
        this.handleGoback();
      };
      window.onpopstate = () => {
        onClickCancel();
      };
    }
  }, []);

  useEffect(() => {
    imgBtnRef.current.focus();
    setDisplayNameValid({errorMsg:"", valid: true})
  }, []);
  return (
    <ChangeProfileUI
      onClickCancel={onClickCancel}
      imgInputRef={imgInputRef}
      imgBtnRef={imgBtnRef}
      submitBtnRef={submitBtnRef}
      cancelBtnRef={cancelBtnRef}
      onChangeImg={onChangeImg}
      previewImg={previewImg}
      onClickChangeImg={onClickChangeImg}
      displayNameValue={displayNameValue}
      onChnageDisplayName={onChnageDisplayName}
      displayNameValid={displayNameValid}
      isMoblie={isMoblie}
      onClickSubmit={onClickSubmit}
      webpSupport={webpSupport}
      resolveWebp={resolveWebp}
    />
  );
}
