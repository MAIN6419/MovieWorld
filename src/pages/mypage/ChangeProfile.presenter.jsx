import React, { useEffect } from "react";
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
import { optKeyboardFocus } from "../../libray/optKeyBoard";

export default function ChangeProfileUI({
  onClickCancel,
  imgInputRef,
  imgBtnRef,
  submitBtnRef,
  cancelBtnRef,
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
        <span className="a11y-hidden">dim</span>
      </Dim>
      <ModalCard
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            onClickCancel();
          }
        }}
      >
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
            <ChangeImgBtn
              type="button"
              onClick={onClickChangeImg}
              ref={imgBtnRef}
              onKeyDown={(e) => {
                optKeyboardFocus(e, cancelBtnRef.current);
              }}
            >
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
          <ProfileEditBtn
            type="button"
            onClick={onClickSubmit}
            ref={submitBtnRef}
          >
            확인
          </ProfileEditBtn>
          <ProfileEditBtn
            type="button"
            onClick={onClickCancel}
            ref={cancelBtnRef}
            onKeyDown={(e) => {
              optKeyboardFocus(e, submitBtnRef.current, imgBtnRef.current);
            }}
          >
            취소
          </ProfileEditBtn>
        </ProfileEditBtns>
      </ModalCard>
    </ModalWrapper>
  );
}
