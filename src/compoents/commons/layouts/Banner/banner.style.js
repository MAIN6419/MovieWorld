import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const BannerWrapper = styled.section`
  position: relative;
  color: #fff;
  width: 100%;
  height: 0;
  padding-bottom: calc(9 / 16 * 100%);
  height: 600px;
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
`;

export const BannerBackdrop = styled.div`
  padding: 20px;
  max-width: 600px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Title = styled.h2`
  font-size: 40px;
  font-weight: 800;
  display: inline-block;
  margin-bottom: 30px;
  @media screen and (max-width: 768px) {
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
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  padding: 5px 20px 5px 30px;
  margin-right: 18px;
  color: black;
  &.play {
    background: url("assets/icon-play.png") no-repeat center left 5px/ 20px #fff;
  }
  &.info {
    background: url("assets/icon-info.png") no-repeat center left 5px / 20px rgba(109, 109, 110, 0.7);
    color: #fff;
    :hover {
      background-color: ${isMobile ? "" : "rgb(74, 74, 74)"};
    }
  }
  :hover {
    background-color: ${isMobile ? "" : "rgba(170, 170, 170, 0.9)"};
    transition: all 0.2s;
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
  top:0;
  right: 20px;
  z-index: 999;
  background: url("assets/icon-close.png") no-repeat center / 24px;
`;
