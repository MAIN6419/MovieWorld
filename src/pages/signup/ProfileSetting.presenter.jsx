import React from "react";
import {
  InputWrapper,
  PrevBtn,
  ProfileImg,
  ProfileImgButton,
  ProfileImgDesc,
  ProfileImgDescList,
  ProfileImgInput,
  ProfileImgLabel,
  ProfileImgResetBtn,
  ProfileImgWrapper,
  SignupBtn,
  SignupForm,
} from "./signup.style";
import UserInput from "../../compoents/commons/userInput/UserInput";
import ErrorMsg from "../../compoents/commons/errorMsg/ErrorMsg";

export default function ProfileSettingUI({
  handleSubmit,
  imgInputRef,
  onChangeImg,
  previewImg,
  onClickImgReset,
  displayNameValue,
  onChangeDislayName,
  displayNameValid,
  disabled,
  setProfile,
  setPercentage,
  setNext,
  webpSupport,
  resolveWebp
}) {
  return (
    <SignupForm onSubmit={handleSubmit}>
      <ProfileImgWrapper>
        <ProfileImgLabel className="a11y-hidden">이미지</ProfileImgLabel>
        <ProfileImgInput
          type="file"
          ref={imgInputRef}
          className="a11y-hidden"
          onChange={onChangeImg}
          accept="image/jpg,image/jpeg, image/png, image/bmp, image/tif, image/heic"
        />
        <ProfileImgButton
          type="button"
          onClick={() => imgInputRef.current.click()}
        >
          <ProfileImg
            src={previewImg}
            alt="유저 프로필 이미지"
            onError={(e) =>
              e.target.value = resolveWebp(webpSupport, "/assets/webp/icon-defaultProfile.webp", "svg")
            }
          />
        </ProfileImgButton>
        <ProfileImgResetBtn type="button" onClick={onClickImgReset}>
          <span className="a11y-hidden">초기화</span>
        </ProfileImgResetBtn>
        <ProfileImgDescList>
          <ProfileImgDesc>
            이미지를 설정하지 않을 경우 기본 이미지가 적용됩니다.
          </ProfileImgDesc>
          <ProfileImgDesc>
            업로드 가능한 최대 이미지 용량은 10MB 입니다.
          </ProfileImgDesc>
          <ProfileImgDesc>
            .jpg, .png, .jpeg,.bmp, .tif, *.heic 이미지 형식을 지원합니다.
          </ProfileImgDesc>
        </ProfileImgDescList>
      </ProfileImgWrapper>
      <InputWrapper>
        <UserInput
          type="text"
          label={"닉네임"}
          id={"input-nickname"}
          placeholder={"4-10자 영문, 영문 + 숫자"}
          value={displayNameValue}
          onChange={onChangeDislayName}
          minLength={4}
          maxLength={10}
        />
        {displayNameValid.errorMsg && (
          <ErrorMsg message={displayNameValid.errorMsg} />
        )}
      </InputWrapper>

      <SignupBtn type="submit" disabled={disabled}>
        회원가입
      </SignupBtn>
      <PrevBtn
        className="prev"
        type="button"
        onClick={() => {
          setProfile(false);
          setPercentage("50%");
          setNext(false);
        }}
      >
        이전
      </PrevBtn>
    </SignupForm>
  );
}
