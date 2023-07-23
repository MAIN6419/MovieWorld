import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.h1``;
export const FormMenu = styled.ul`
  width: calc(100% - 60px);
  max-width: 360px;
  display: flex;
  height: 50px;
  box-sizing: border-box;
  border-bottom: 4px solid #fff;
  background: none;
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
  }
`;
export const FormMenuLi = styled.li`
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? "#fff" : "#292a2b")};
`;
export const FormMenuBtn = styled.button`
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background: none;
  color: ${(props) => (props.active ? "#292a2b" : "#fff")};
  cursor: pointer;
  @media screen and (max-width: 431px) {
    font-size: 16px;
  }
`;
export const FindAccountForm = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  padding: 30px 20px;
  box-sizing: border-box;
  width: calc(100% - 60px);
  max-width: 400px;
  gap: 20px;
  box-shadow: 0 8px 20px rgba(35, 0, 77, 0.2);
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
    padding: 30px 20px;
  }
`;

export const FindAccountBtn = styled.button`
  width: 100%;
  background-color: ${(props) =>
    props.disabled ? "rgba(220,220,220, 0.5)" : "#e50914"};
  cursor: ${(props) => (props.disabled ? "default" : "cursor")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-top: 10px;
  transition: all 0.5s;
`;

export const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  width: 100%;
  padding: 14px 0;
  border-radius: 4px;
  background-color: #e50914;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-top: 10px;
`;

export const FindInfoWrapper = styled.div`
  padding: 20px;
  border: 1px solid #fff;
  width: 100%;
  @media screen and (max-width: 448px) {
    padding: 20px 10px;
  }
  @media screen and (max-width: 361px) {
    padding: 20px 8px;
  }
`;
export const FindInfoText = styled.p`
  line-height: 1.5;
  font-size: 14px;
  color: #fff;
  white-space: pre-line;
  text-align: center;
  @media screen and (max-width: 448px) {
    font-size: 14px;
  }
  @media screen and (max-width: 405px) {
    font-size: 12px;
  }
`;
