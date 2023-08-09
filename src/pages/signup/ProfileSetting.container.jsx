import React, { useContext, useEffect, useRef, useState } from "react";
import { signup } from "../../firebase/signupAPI";
import { useValidationInput } from "../../hook/useValidationInput";
import { UserContext } from "../../context/userContext";
import ProfileSettingUI from "./ProfileSetting.presenter";
import { resolveWebp } from "../../libray/webpSupport";
import { WebpContext } from "../../context/webpContext";
import { imgCompression } from "../../libray/imagCompression";
import { sweetToast } from "../../sweetAlert/sweetAlert";

export default function ProfileSetting({
  setIsLoading,
  emailValue,
  passwordValue,
  phoneValue,
  setProfile,
  setPercentage,
  setNext,
}) {
  const { webpSupport } = useContext(WebpContext);
  const { refreshUser } = useContext(UserContext);
  const imgInputRef = useRef();
  // 회원가입 버튼 활성화 상태 관리
  const [disabled, setDisabled] = useState(true);
  const [previewImg, setPreviewImg] = useState(
    resolveWebp(webpSupport, "/assets/webp/icon-defaultProfile.webp", "svg")
  );
  const [uploadImg, setUploadImg] = useState("");
  const [displayNameValue, displayNameValid, onChangeDislayName] =
    useValidationInput("", "displayName", true);

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

  const onClickImgReset = () => {
    setPreviewImg(
      resolveWebp(webpSupport, "/assets/webp/icon-defaultProfile.webp", "svg")
    );
    setUploadImg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signup(
      displayNameValue,
      uploadImg,
      emailValue,
      passwordValue,
      phoneValue.replace(/-/g, "")
    );
    setIsLoading(false);
    refreshUser();
  };

  useEffect(() => {
    if (displayNameValid.valid) {
      setDisabled(false);
      setProfile(true);
      setPercentage("100%");
    } else {
      setDisabled(true);
      setPercentage("50%");
      setProfile(false);
    }
  }, [displayNameValid]);

  return (
    <ProfileSettingUI
      handleSubmit={handleSubmit}
      imgInputRef={imgInputRef}
      onChangeImg={onChangeImg}
      previewImg={previewImg}
      onClickImgReset={onClickImgReset}
      displayNameValue={displayNameValue}
      onChangeDislayName={onChangeDislayName}
      displayNameValid={displayNameValid}
      disabled={disabled}
      setProfile={setProfile}
      setPercentage={setPercentage}
      setNext={setNext}
    />
  );
}
