import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ChangeImgBtn,
  Dim,
  ImgInput,
  InputDesc,
  InputDescList,
  ModalCard,
  ModalWrapper,
  NicknameInput,
  NicknameLabel,
  NicknameWrapper,
  ProfileEditBtn,
  ProfileEditBtns,
  ProfileForm,
  ProfileImg,
  ProfileImgWrapper,
  Title,
} from "./changeProfile.style";
import { useValidationInput } from "../../hook/useValidationInput";
import ErrorMsg from "../../compoents/commons/errorMsg/ErrorMsg";
import { duplication, updateUserProfile } from "../../firebase/auth";
import { useMediaQuery } from "react-responsive";
import { UserContext } from "../../context/userContext";
import { isMobile } from "react-device-detect";
import { history } from "../../history/history";
export default function ChangeProfile({
  user,
  setIsProfileEdit,
  setIsLoading,
}) {
  const { refreshUser } = useContext(UserContext);
  const isMoblie = useMediaQuery({
    query: "(max-width:486px)",
  });
  const imgInputRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(user.photoURL);
  const [uploadImg, setUploadImg] = useState("");
  const [
    displayNameValue,
    nicknameValid,
    onChnageNickname,
  ] = useValidationInput(
    user.displayName,
    "displayName",
    true
  );


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
      alert("이미지 파일의 크기를 초과하였습니다.(최대 10MB)");
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
      alert(
        "이미지 형식을 확인해 주세요!\n(지원형식 : .jpg, .png, .jpeg,.bmp, .tif, *.heic)"
      );
      return false;
    }
    // 모두 만족 한다면 true 반환
    return true;
  };

  const onChangeImg = (e) => {
    const file = e.target.files[0];
    const isValid = imgValidation(file);
    if (!isValid) return;
    setPreviewImg(URL.createObjectURL(file));
    setUploadImg(file);
  };

  const onClickCancel = () => {
    setIsProfileEdit(false);
    document.body.style.overflow = "auto";
  };

  const onClickSubmit = async () => {
    if (user.displayName === displayNameValue && user.photoURL === previewImg) {
      alert("수정 사항이 없습니다!");
      return;
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

  return (
    <ModalWrapper>
      <Dim onClick={onClickCancel}>
        <span>dim</span>
      </Dim>
      <ModalCard>
        <Title>프로필 수정</Title>
        <ProfileForm>
          <ProfileImgWrapper>
            <ImgInput type="file" ref={imgInputRef} onChange={onChangeImg} />
            <ProfileImg
              src={previewImg || "assets/defaultProfile.png"}
              onError={(e) => (e.target.src = "assets/defaultProfile.png")}
              alt="프로필 이미지"
            />
            <ChangeImgBtn type="button" onClick={onClickChangeImg}>
              이미지 변경
            </ChangeImgBtn>
          </ProfileImgWrapper>
          <NicknameWrapper>
            <NicknameLabel>닉네임</NicknameLabel>
            <NicknameInput
              type="text"
              value={displayNameValue}
              onChange={onChnageNickname}
            />
            {nicknameValid.errorMsg && (
              <ErrorMsg
                className={isMoblie ? "small" : ""}
                message={nicknameValid.errorMsg}
              />
            )}
            <InputDescList>
              <InputDesc>
                닉네임은 영문, 영문+숫자 조합 4-10자로 입력해야합니다.
              </InputDesc>
              <InputDesc>
                업로드 가능한 최대 이미지 용량은 10MB 입니다.
              </InputDesc>
              <InputDesc>
                .jpg, .png, .jpeg,.bmp, .tif, *.heic 형식의 이미지를 지원합니다.
              </InputDesc>
            </InputDescList>
          </NicknameWrapper>
        </ProfileForm>
        <ProfileEditBtns>
          <ProfileEditBtn type="button" onClick={onClickSubmit}>
            확인
          </ProfileEditBtn>
          <ProfileEditBtn type="button" onClick={onClickCancel}>
            취소
          </ProfileEditBtn>
        </ProfileEditBtns>
      </ModalCard>
    </ModalWrapper>
  );
}
