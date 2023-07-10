import { StarFilled } from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const ModalWrapper = styled.section``;

export const ModalDim = styled.div`
  width: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  inset: 0;
  z-index: 99;
`;

export const ModalCard = styled.div`
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 1000px;
  color: #fff;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  background: #111;
  transition: all 400ms ease-in-out 2s;
  animation: fadeIn 400ms;
  overflow-y: scroll;
  ::-webkit-scrollbar {
  display: none;
}
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

export const ModalTitle = styled.h2``;

export const MovieImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: calc(9 / 16 * 100%);
`;

export const MovieImg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
export const MovieContetns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;
export const MovieTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 40px;
  font-weight: 700;
  border-bottom: 1px solid #fff;
  padding-bottom: 20px;
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
  @media screen and (max-width: 486px) {
    font-size: 25px;
  }
`;

export const MovieRelease = styled.time`
  font-size: 20px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
`;

export const MovieGenre = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 20px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
`;

export const MovieGenreLi = styled.li`
  :first-child {
    margin-left: -5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
  :not(:last-child) {
    ::after {
      content: "";
      width: 1px;
      height: 15px;
      background-color: #fff;
      display: inline-block;
      margin-left: 8px;
      @media screen and (max-width: 768px) {
        height: 12px;
      }
    }
  }
`;

export const MovieRunTime = styled.span`
  font-size: 20px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
`;

export const MovieRating = styled.span`
  font-size: 20px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
`;

export const MovieRatingIcon = styled(StarFilled)`
  color: yellow;
`;

export const MovieDesc = styled.p`
border-bottom: 1px solid #fff;
padding-bottom: 20px;
  line-height: 1.5;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const MoviePlayBtn = styled.button`
  width: 80px;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  padding: 5px 20px 5px 30px;
  margin-right: 18px;
  color: black;
  background: url("assets/icon-play.png") no-repeat center left 5px/ 20px #fff;
  :hover {
    :hover {
      background-color: ${isMobile ? "" : "rgba(170, 170, 170, 0.9)"};
      transition: all 0.2s;
    }
  }
`;

export const CloseBtn = styled.button`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 8px;
  right: 10px;
  z-index: 999;
  background: url("assets/icon-close.png") no-repeat center / 24px;
`;

export const IframeWrapper = styled.div`
  position: absolute;
  margin-top: 34px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  border: none;
`;
