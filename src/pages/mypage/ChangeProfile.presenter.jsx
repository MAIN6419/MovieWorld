import React from "react";
import {
  ChangeImgBtn,
  Dim,
  ImgInput,
  InputDesc,
  InputDescList,
  ModalCard,
  ModalWrapper,
  DisplayNameInput,
  DisplayNameLabel,
  DisplayNameWrapper,
  ProfileEditBtn,
  ProfileEditBtns,
  ProfileForm,
  ProfileImg,
  ProfileImgWrapper,
  Title,
} from "./changeProfile.style";
import ErrorMsg from "../../compoents/commons/errorMsg/ErrorMsg";

export default function ChangeProfileUI({
  onClickCancel,
  imgInputRef,
  onChangeImg,
  previewImg,
  onClickChangeImg,
  displayNameValue,
  onChnageDisplayName,
  displayNameValid,
  isMoblie,
  onClickSubmit,
  webpSupport,
  resolveWebp,
}) {
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
              src={
                previewImg ||
                resolveWebp(
                  webpSupport,
                  "assets/webp/icon-defaultProfile.webp",
                  "svg"
                )
              }
              onError={(e) =>
                (e.target.src = resolveWebp(
                  webpSupport,
                  "assets/webp/icon-defaultProfile.webp",
                  "svg"
                ))
              }
              alt="프로필 이미지"
            />
            <ChangeImgBtn type="button" onClick={onClickChangeImg}>
              이미지 변경
            </ChangeImgBtn>
          </ProfileImgWrapper>
          <DisplayNameWrapper>
            <DisplayNameLabel>닉네임</DisplayNameLabel>
            <DisplayNameInput
              type="text"
              value={displayNameValue}
              onChange={onChnageDisplayName}
            />
            {displayNameValid.errorMsg && (
              <ErrorMsg
                className={isMoblie ? "small" : ""}
                message={displayNameValid.errorMsg}
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
          </DisplayNameWrapper>
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
