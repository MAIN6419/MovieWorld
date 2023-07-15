import React, { useContext, useEffect, useState } from "react";
import {
  SignupBtn,
  SignupForm,
  SignupTitle,
  Title,
  Wrapper,
} from "./signup.style";
import UserInput from "../../compoents/commons/userInput/UserInput";
import { useValidationInput } from "../../hook/useValidationInput";
import ErrorMsg from "../../compoents/commons/errorMsg/ErrorMsg";
import { duplication, signup } from "../../firebase/auth";
import Loading from "../../compoents/commons/loading/Loading";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function Signup() {
  const { refreshUser } = useContext(UserContext);
  const navigate = useNavigate();
  const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const displayNameReg = /^[a-zA-z0-9]{4,10}$/;
  const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  const phoneReg = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;

  // 닉네임 유효성 input
  const [
    displayNameValue,
    setDisplayNameValue,
    displayNameValid,
    setDisplayNameValid,
    onChangeNickName,
  ] = useValidationInput(
    "",
    displayNameReg,
    "4-10자 영문, 영문+숫자를 입력해주세요."
  );

  // 이메일 유효성 input
  const [emailValue, setEmailValue, emailValid, setEmailValid, onChangeEmail] =
    useValidationInput("", emailReg, "유효한 이메일을 입력해주세요.");
  const [
    passwordValue,
    setpasswordValue,
    passowrdValid,
    setPassowrdValid,
    onChangePassowrd,
  ] = useValidationInput(
    "",
    passwordReg,
    "8-16자 특수문자, 숫자, 영문을 포함해야합니다."
  );

  // 비밀번호 유효성 input
  const [
    passowrdChkValue,
    setPasswordChkValue,
    passwordChkValid,
    setPasswordChkValid,
  ] = useValidationInput("", passwordReg, "비밀번호가 일치하지 않습니다.");

  // 휴대폰 유효성 input
  const [phoneValue, setPhoneValue, phoneValid, setPhoneValid, onChangePhone] =
    useValidationInput("", phoneReg, "유효한 휴대폰 번호를 입력하세요.");

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

  const onBlurNickname = async () => {
    if (displayNameValid.valid) {
      const isDulplcation = await duplication(displayNameValue, "displayName");
      if (isDulplcation) {
        setDisplayNameValid({
          errorMsg: "중복된 닉네임 입니다!",
          valid: false,
        });
      } else {
        setDisplayNameValid({ errorMsg: "", valid: true });
      }
    }
  };

  const onBlurEmail = async () => {
    if (emailValid.valid) {
      const isDulplcation = await duplication(emailValue, "email");
      if (isDulplcation) {
        setEmailValid({ errorMsg: "중복된 이메일 입니다!", valid: false });
      } else {
        setEmailValid({ errorMsg: "", valid: true });
      }
    }
  };

  const onBlurPhone = async () => {
    if (phoneValid.valid) {
      const isDulplcation = await duplication(
        phoneValue.replace(/-/g, ""),
        "phone"
      );
      if (isDulplcation) {
        setPhoneValid({
          errorMsg: "이미 사용중인 휴대폰 번호 입니다!",
          valid: false,
        });
      } else {
        setPhoneValid({ errorMsg: "", valid: true });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signup(
      displayNameValue,
      emailValue,
      passwordValue,
      phoneValue.replace(/-/g, "")
    );
    setIsLoading(false);
    refreshUser();
    navigate("/main", { replace: true });
  };

  // 전체 input이 유효하다면 버튼 활성화
  useEffect(() => {
    if (
      displayNameValid.valid &&
      emailValid.valid &&
      passowrdValid.valid &&
      passwordChkValid.valid &&
      phoneValid.valid
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    displayNameValid,
    emailValid,
    passowrdValid,
    passwordChkValid,
    phoneValid,
  ]);

  return (
    <Wrapper>
      <Title className="a11y-hidden">회원가입 페이지</Title>
      <SignupForm onSubmit={(e) => handleSubmit(e)}>
        <SignupTitle>회원가입</SignupTitle>
        <UserInput
          type="text"
          label={"닉네임"}
          id={"input-nickname"}
          placeholder={"Nickname"}
          value={displayNameValue}
          onChange={onChangeNickName}
          onBlur={onBlurNickname}
          minLength={4}
          maxLength={10}
        />
        {displayNameValid.errorMsg && (
          <ErrorMsg message={displayNameValid.errorMsg} />
        )}
        <UserInput
          type="text"
          label={"이메일"}
          id={"input-email"}
          placeholder={"Email"}
          value={emailValue}
          onChange={onChangeEmail}
          onBlur={onBlurEmail}
        />
        {emailValid.errorMsg && <ErrorMsg message={emailValid.errorMsg} />}
        <UserInput
          type="password"
          label={"비밀번호"}
          id={"input-password"}
          placeholder={"Password"}
          value={passwordValue}
          onChange={onChangePassowrd}
          minLength={8}
          maxLength={16}
        />
        {passowrdValid.errorMsg && (
          <ErrorMsg message={passowrdValid.errorMsg} />
        )}
        <UserInput
          type="password"
          label={"비밀번호 확인"}
          id={"input-passwordChk"}
          placeholder={"Password check"}
          value={passowrdChkValue}
          onChange={onChangePasswordChk}
          minLength={8}
          maxLength={16}
        />
        {passwordChkValid.errorMsg && (
          <ErrorMsg message={passwordChkValid.errorMsg} />
        )}
        <UserInput
          type="text"
          label={"휴대폰"}
          id={"input-phone"}
          placeholder={"Phone ( - 제외 )"}
          value={phoneValue
            .replace(/[^0-9]/g, "")
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
          onChange={onChangePhone}
          onBlur={onBlurPhone}
          maxLength={13}
        />
        {phoneValid.errorMsg && <ErrorMsg message={phoneValid.errorMsg} />}
        <SignupBtn
          type="submit"
          disabled={disabled}
          onMouseOver={(e) => {
            e.target.focus();
          }}
        >
          회원가입
        </SignupBtn>
      </SignupForm>
      {isLoading && <Loading />}
    </Wrapper>
  );
}
