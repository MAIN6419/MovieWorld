import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const BannerWrapper = styled.section`
  position: relative;
  color: #fff;
  width: 100%;
  height: 0;
  padding-bottom: calc(9 / 16 * 100%);
  @media screen and (min-width: 1500px) {
    height: 600px;
    padding: 0;
  }
`;
export const BannerBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const BannerContents = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-top: 140px;
  @media screen and (max-width: 1031px) {
    padding-top: 80px;
  }

  @media screen and (max-width: 910px) {
    padding-top: 50px;
  }
  @media screen and (max-width: 501px) {
    padding-top: 30px;
  }
`;

export const BannerBackdrop = styled.div`
  padding: 20px;
  max-width: 600px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 901px) {
    max-width: 500px;
    height: 300px;
  }
  @media screen and (max-width: 630px) {
    max-width: 500px;
    height: 250px;
  }
`;

export const Title = styled.h2`
  font-size: 40px;
  font-weight: 800;
  display: inline-block;
  margin-bottom: 30px;
  @media screen and (max-width: 901px) {
    font-size: 30px;
  }
`;

export const BannerBtns = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const BannerBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  padding: 5px 20px 5px 30px;
  margin-right: 18px;
  color: black;
  body.no-webp & {
    &.play {
      background: url("assets/icon-play.svg") no-repeat center left 5px/ 20px #fff;
    }
    &.info {
      background: url("assets/icon-info.svg") no-repeat center left 5px / 20px
        rgba(109, 109, 110, 0.7);
      color: #fff;
      :hover {
        background-color: ${isMobile ? "" : "rgb(74, 74, 74)"};
      }
    }
  }
  :hover {
    background-color: ${isMobile ? "" : "rgba(170, 170, 170, 0.9)"};
    transition: all 0.2s;
  }
  body.webp & {
    &.play {
      background: url("assets/webp/icon-play.webp") no-repeat center left 5px/ 20px
        #fff;
    }
    &.info {
      background: url("assets/webp/icon-info.webp") no-repeat center left 5px /
        20px rgba(109, 109, 110, 0.7);
    }
  }
`;

export const BannerDesc = styled.p`
  line-height: 1.3;
  font-weight: 500;
  font-size: 16px;
  border-radius: 10px;
  max-height: 260px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  line-height: 1.5;
  @media screen and (max-width: 901px) {
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    -webkit-line-clamp: 4;
  }
  @media screen and (max-width: 620px) {
    -webkit-line-clamp: 3;
  }
`;
export const BannerFadeBottom = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 110px;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
  @media screen and (max-width: 768px) {
    height: 80px;
  }
`;

export const IframeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: calc(
    9 / 16 * 100%
  ); /* calc (이미지 높이 ÷ 이미지 가로 × 100 %) */
  background-color: #000;
  @media screen and (min-width: 1500px) {
    padding: 0;
    height: calc(100vh - 94px);
  }
`;

export const Container = styled.div`
  position: absolute;
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

export const CloseBtnWrapper = styled.div`
  position: relative;
  height: 24px;
  background-color: #000;
`;

export const CloseBtn = styled.button`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 0;
  right: 20px;
  z-index: 999;
  body.no-webp & {
    background: url("assets/icon-close.svg") no-repeat center / 22px;
  }
  body.webp & {
    background: url("assets/webp/icon-close.webp") no-repeat center / 22px;
  }
`;
export const MobileTitleWrapper = styled.div`
  text-align: center;
`;
export const MobilePlayBtn = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  body.no-webp & {
    background: url("assets/icon-mobile-playBtn.svg") no-repeat center / 50px;
  }
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  z-index: 99;
  body.webp & {
    background: url("assets/webp/icon-mobile-playBtn.webp") no-repeat center /
      50px;
  }
  @media screen and (max-width: 486px) {
    top: 40%;
  }
`;

export const MobileInfoBtn = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  body.no-webp & {
    background: url("assets/icon-mobile-infoBtn.svg") no-repeat center / 40px;
  }
  bottom: 20px;
  z-index: 99;
  body.webp & {
    background: url("assets/webp/icon-mobile-infoBtn.webp") no-repeat center /
      40px;
  }
`;
