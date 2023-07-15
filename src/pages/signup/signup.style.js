import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  background: url("assets/login-bg.png") no-repeat center / cover;
`;

export const Title = styled.h1``;

export const SignupForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  width: calc(100% - 60px);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 30px 40px;
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
    padding: 30px 20px;
  }
`;

export const SignupTitle = styled.h2`
  color: #fff;
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: 500;
`;

export const SignupBtn = styled.button`
  width: 100%;
  background-color: ${(props) =>
    props.disabled ? "rgba(220,220,220, 0.5)" : "#e50914"};
  cursor: ${(props) => (props.disabled ? "default" : "cursor")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-top: 20px;
  transition: all 0.5s;
`;
