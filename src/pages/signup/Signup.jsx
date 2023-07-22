import React, { useEffect, useState } from "react";
import {
  FormTitle,
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
import { useValidationInput } from "../../hook/useValidationInput";
import ErrorMsg from "../../compoents/commons/errorMsg/ErrorMsg";
import Loading from "../../compoents/commons/loading/Loading";
import ProfileSetting from "./ProfileSetting";

export default function Signup() {
  const [defaultInfo, setDefaultInfo] = useState(false);
  const [profile, setProfile] = useState(false);
  const [percentage, setPercentage] = useState("0%");
  const [next, setNext] = useState(false);

  // 이메일 유효성 input
  const [emailValue, emailValid, onChangeEmail] =
    useValidationInput("", "email", true);
  const [
    passwordValue,
    passowrdValid,
    onChangePassowrd,
  ] = useValidationInput(
    "",
    "password",
  );

  // 비밀번호 유효성 input
  const [
    passowrdChkValue,
    passwordChkValid,
    _,
    setPasswordChkValue,
    setPasswordChkValid,
  ] = useValidationInput("", "password");

  // 휴대폰 유효성 input
  const [phoneValue, phoneValid, onChangePhone] =
    useValidationInput("", "phone", true);

  // 회원가입 버튼 활성화 상태 관리
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 비밀번호 확인 onChange 별도 생성 => useValidInput에서 처리하지 못하기 때문
  const onChangePasswordChk = (e) => {
    setPasswordChkValue(e.target.value.trim());
    if (passwordValue !== e.target.value) {
      setPasswordChkValid({
        errorMsg: "비밀번호가 일치하지 않습니다.",
        valid: false,
      });
    } else {
      setPasswordChkValid({ errorMsg: "", valid: true });
    }
  };

  // 전체 input이 유효하다면 버튼 활성화
  useEffect(() => {
    if (
      emailValid.valid &&
      passowrdValid.valid &&
      passwordChkValid.valid &&
      phoneValid.valid
    ) {
      setDisabled(false);
      setDefaultInfo(true);
      setPercentage("50%");
    } else {
      setDisabled(true);
      setDefaultInfo(false);
      setPercentage("0");
    }
  }, [emailValid, passowrdValid, passwordChkValid, phoneValid]);

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
            {emailValid.errorMsg && <ErrorMsg message={emailValid.errorMsg} />}
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
            {phoneValid.errorMsg && <ErrorMsg message={phoneValid.errorMsg} />}
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
