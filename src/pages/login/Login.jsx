import React, { useEffect, useRef } from "react";
import {
  LoginBtn,
  LoginForm,
  LoginFormTitle,
  Title,
  Wrapper,
  SignupLink,
  FindAccountLink,
  SignupText,
} from "./login.style";
import UserInput from "../../compoents/commons/userInput/UserInput";
import { useValidationInput } from "../../hook/useValidationInput";
import ErrorMsg from "../../compoents/commons/errorMsg/ErrorMsg";
import { login } from "../../firebase/auth";

export default function Login() {
  const emailRef = useRef(null);
  const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  const [emailValue, setEmailValue, emailValid, setEmailValid, onChangeEmail] =
    useValidationInput("", emailReg, "이메일 형식을 확인해주세요.");
  const [
    passowordValue,
    setPasswordValue,
    passwordValid,
    setPasswordValid,
    onChangePassword,
  ] = useValidationInput(
    "",
    passwordReg,
    "8-16자 특수문자, 숫자, 영문을 포함해야합니다."
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValue) {
      setEmailValid({ errorMsg: "이메일을 입력해주세요.", valid: false });
    }
    if (!passowordValue) {
      setPasswordValid({ errorMsg: "비밀번호를 입력해주세요.", valid: false });
      return;
    }
    if (emailValid.valid && passwordValid.valid) {
      await login(emailValue, passowordValue);
      setEmailValue("");
      setPasswordValue("");
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);
  return (
    <>
      <Title className="a11y-hidden">로그인 페이지</Title>
      <Wrapper>
        <LoginForm onSubmit={handleSubmit}>
          <LoginFormTitle>로그인</LoginFormTitle>
          <UserInput
            label={"이메일"}
            id={"input-email"}
            placeholder={"Email"}
            type={"text"}
            value={emailValue}
            onChange={onChangeEmail}
            InputRef={emailRef}
          />
          {emailValid.errorMsg && <ErrorMsg message={emailValid.errorMsg} />}
          <UserInput
            label={"비밀번호"}
            id={"input-password"}
            placeholder={"Password"}
            type={"password"}
            onChange={onChangePassword}
            value={passowordValue}
          />
          {passwordValid.errorMsg && (
            <ErrorMsg message={passwordValid.errorMsg} />
          )}
          <FindAccountLink to={"/findAccount"}>
            아이디 | 비밀번호 찾기
          </FindAccountLink>
          <LoginBtn type="submit">로그인</LoginBtn>

          <SignupText>
            아이디가 없으신가요?
            <SignupLink to={"/signup"}>회원가입</SignupLink>
          </SignupText>
        </LoginForm>
      </Wrapper>
    </>
  );
}
