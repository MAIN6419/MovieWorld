import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

export const Title = styled.h1``;

export const ErrorImg = styled.img`
  display: block;
  width: 250px;
  margin: 0 auto;
`;

export const ErrorText = styled.p`
  font-size: 25px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

export const BackBtn = styled.button`
  display: inline-block;
  border-radius: 10px;
  border: 2px solid #bdbdbd;
  color: #fff;
  padding: 8px 45px 8px 20px;
  font-size: 20px;
  body.no-webp & {
    background: url("/assets/icon-back.svg") no-repeat center right 20px / 20px;
  }
  body.webp & {
    background: url("/assets/webp/icon-back.webp") no-repeat center right 20px /
      20px;
  }
  :hover {
    background-color: ${isMobile ? "" : "#292a2b"};
  }
`;
