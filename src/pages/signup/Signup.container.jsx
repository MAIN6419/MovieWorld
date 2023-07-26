import React, { useEffect, useState } from "react";
import { useValidationInput } from "../../hook/useValidationInput";
import Loading from "../../compoents/commons/loading/Loading";
import SignupUI from "./Signup.presenter";

export default function Signup() {
  const [defaultInfo, setDefaultInfo] = useState(false);
  const [profile, setProfile] = useState(false);
  const [percentage, setPercentage] = useState("0%");
  const [next, setNext] = useState(false);

  // 이메일 유효성 input
  const [emailValue, emailValid, onChangeEmail] = useValidationInput(
    "",
    "email",
    true
  );
  const [passwordValue, passowrdValid, onChangePassowrd] = useValidationInput(
    "",
    "password"
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
  const [phoneValue, phoneValid, onChangePhone] = useValidationInput(
    "",
    "phone",
    true
  );

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
      <SignupUI />
      {isLoading && (
        <Loading
          defaultInfo={defaultInfo}
          percentage={percentage}
          profile={profile}
          next={next}
          emailValue={emailValue}
          onChangeEmail={onChangeEmail}
          emailValid={emailValid}
          passwordValue={passwordValue}
          onChangePassowrd={onChangePassowrd}
          passowrdValid={passowrdValid}
          passowrdChkValue={passowrdChkValue}
          onChangePasswordChk={onChangePasswordChk}
          passwordChkValid={passwordChkValid}
          phoneValue={phoneValue}
          onChangePhone={onChangePhone}
          phoneValid={phoneValid}
          disabled={disabled}
          setIsLoading={setIsLoading}
          setProfile={setProfile}
          setPercentage={setPercentage}
          setNext={setNext}
        />
      )}
    </>
  );
}
