import { Link } from "react-router-dom";
import styled from "styled-components";

export const Title = styled.h1``;
export const Wrapper = styled.main`
  background: url("assets/login-bg.png") no-repeat center / cover;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
`;
export const LoginFormTitle = styled.h2`
  color: #fff;
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: 500;
`;
export const LoginForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  width: calc(100% - 60px);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 30px 40px;
  @media screen and (max-width:431px){
    width: calc(100% - 40px);
    padding: 30px 20px;
  }
`;

export const LoginBtn = styled.button`
  width: 100%;
  background-color: #e50914;
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-top: 20px;
`;

export const SignupText = styled.p`
  display: inline-block;
  font-size: 12px;
  color: #fff;
  text-align: center;
`;

export const SignupLink = styled(Link)`
  color: #b3b3b3;
  font-size: 12px;
  margin-left: 5px;
`;

export const FindAccountLink = styled(Link)`
  color: #b3b3b3;
  font-size: 12px;
  align-self: flex-end;
`;
