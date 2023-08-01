import React from "react";
import {
  InputWrapper,
  ProgressBar,
  ProgressCheck,
  ProgressCheckText,
  ProgressCheckWrapper,
  ProgressTitle,
  ProgressWrapper,
  SignupBtn,
  SignupForm,
  Title,
  Wrapper,
} from "./signup.style";
import UserInput from "../../compoents/commons/userInput/UserInput";
import ErrorMsg from "../../compoents/commons/errorMsg/ErrorMsg";
import ProfileSetting from "./ProfileSetting.container";
import Loading from "../../compoents/commons/loading/Loading";

export default function SignupUI({
  defaultInfo,
  percentage,
  profile,
  next,
  emailValue,
  onChangeEmail,
  emailValid,
  passwordValue,
  onChangePassowrd,
  passowrdValid,
  passowrdChkValue,
  onChangePasswordChk,
  passwordChkValid,
  phoneValue,
  onChangePhone,
  phoneValid,
  disabled,
  setIsLoading,
  setProfile,
  setPercentage,
  setNext,
  isLoading,
}) {
  return (
    <>
      <Wrapper>
        <Title>회원가입</Title>
        <ProgressWrapper>
          <ProgressTitle className="a11y-hidden">회원가입 진행바</ProgressTitle>
          <ProgressCheckWrapper>
            <ProgressCheck
              className="defalut"
              active={defaultInfo}
            ></ProgressCheck>
            <ProgressCheckText>기본정보 입력</ProgressCheckText>
          </ProgressCheckWrapper>
          <ProgressBar percentage={percentage}></ProgressBar>
          <ProgressCheckWrapper>
            <ProgressCheck className="profile" active={profile}></ProgressCheck>
            <ProgressCheckText>프로필 설정</ProgressCheckText>
          </ProgressCheckWrapper>
        </ProgressWrapper>
        {!next ? (
          <SignupForm>
            <InputWrapper>
              <UserInput
                type="text"
                label={"이메일"}
                id={"input-email"}
                placeholder={"이메일 주소를 입력해주세요."}
                value={emailValue}
                onChange={onChangeEmail}
              />
              {emailValid.errorMsg && (
                <ErrorMsg message={emailValid.errorMsg} />
              )}
            </InputWrapper>
            <InputWrapper>
              <UserInput
                type="password"
                label={"비밀번호"}
                id={"input-password"}
                placeholder={"8-16자 특수문자, 숫자, 영문 포함"}
                value={passwordValue}
                onChange={onChangePassowrd}
                minLength={8}
                maxLength={16}
              />
              {passowrdValid.errorMsg && (
                <ErrorMsg message={passowrdValid.errorMsg} />
              )}
            </InputWrapper>
            <InputWrapper>
              <UserInput
                type="password"
                label={"비밀번호 확인"}
                id={"input-passwordChk"}
                placeholder={"비밀번호 확인을 입력해주세요."}
                value={passowrdChkValue}
                onChange={onChangePasswordChk}
                minLength={8}
                maxLength={16}
              />
              {passwordChkValid.errorMsg && (
                <ErrorMsg message={passwordChkValid.errorMsg} />
              )}
            </InputWrapper>
            <InputWrapper>
              <UserInput
                type="text"
                label={"휴대폰"}
                id={"input-phone"}
                placeholder={"휴대폰 번호를 입력해주세요. ( - 제외 )"}
                value={phoneValue
                  .replace(/[^0-9]/g, "")
                  .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
                onChange={onChangePhone}
                maxLength={13}
              />
              {phoneValid.errorMsg && (
                <ErrorMsg message={phoneValid.errorMsg} />
              )}
            </InputWrapper>
            <SignupBtn
              type="button"
              disabled={disabled}
              onClick={() => setNext(true)}
            >
              다음
            </SignupBtn>
          </SignupForm>
        ) : (
          <ProfileSetting
            setIsLoading={setIsLoading}
            setProfile={setProfile}
            emailValue={emailValue}
            passwordValue={passwordValue}
            phoneValue={phoneValue}
            setPercentage={setPercentage}
            setNext={setNext}
          />
        )}
      </Wrapper>

      {isLoading && <Loading />}
    </>
  );
}
