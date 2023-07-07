import React from "react";
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

export default function Login() {
  return (
    <>
      <Title className="a11y-hidden">로그인 페이지</Title>
      <Wrapper>
        <LoginForm>
          <LoginFormTitle>로그인</LoginFormTitle>
          <UserInput
            label={"이메일"}
            id={"input-email"}
            placeholder={"Email"}
          />
          <UserInput
            label={"비밀번호"}
            id={"input-password"}
            placeholder={"Password"}
          />
          <FindAccountLink to={"/findAccount"}>아이디 | 비밀번호 찾기</FindAccountLink>
          <LoginBtn>로그인</LoginBtn>

          <SignupText>
            아이디가 없으신가요? <SignupLink to={"/signup"}>회원가입</SignupLink>
          </SignupText>
        </LoginForm>
      </Wrapper>
    </>
  );
}
