import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Title = styled.h1``;
export const Wrapper = styled.main``;
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
  padding: 30px 40px;
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
    padding: 30px 20px;
  }
`;
export const InputWrapper = styled.div`
  & > p {
    margin-top: 10px;
  }
`;
export const LoginBtn = styled.button`
  width: 100%;
  background-color: ${(props) =>
    props.disabled ? "rgba(220,220,220, 0.5)" : "#e50914"};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-top: 10px;
  transition: all 0.5s;
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

export const SocialLoginWrapper = styled.ul`
  position: relative;
  justify-content: center;
  border-top: 1px solid #fff;
  padding-top: 30px;
  margin-top: 20px;
  ::after {
    content: "소셜 로그인";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    color: #fff;
    font-size: 13px;
    background-color: #111;
    padding: 0 10px;
  }
`;

export const SocialLoginItem = styled.li`
  margin-bottom: 20px;
  text-align: center;
`;

export const SocialLoginBtn = styled.button`
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
  font-weight: 400;
  padding: 15px 0;
  border: px solid #bdbdbd;
  body.no-webp & {
    &.google {
      background: url("assets/icon-google.svg") no-repeat center left 15px /
        24px #fff;
    }
    &.facebook {
      background: url("assets/icon-facebook.svg") no-repeat center left 15px /
        24px #3a5897;
    }
    &.twitter {
      background: url("assets/icon-twitter.svg") no-repeat center left 15px /
        24px #55acee;
    }
    &.github {
      background: url("assets/icon-github.svg") no-repeat center left 15px /
        24px #fff;
    }
  }

  body.webp & {
    &.google {
      background: url("assets/webp/icon-google.webp") no-repeat center left 15px /
        24px #fff;
    }
    &.facebook {
      background: url("assets/webp/icon-facebook.webp") no-repeat center left
        15px / 24px #3a5897;
    }
    &.twitter {
      background: url("assets/webp/icon-twitter.webp") no-repeat center left
        15px / 24px #55acee;
    }
    &.github {
      background: url("assets/webp/icon-github.webp") no-repeat center left 15px /
        24px #fff;
    }
  }
  :hover {
    background-color: ${isMobile ? "" : "#ddd"};
  }
`;
