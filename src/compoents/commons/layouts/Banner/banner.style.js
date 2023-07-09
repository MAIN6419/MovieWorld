import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const Wrapper = styled.section`
  position: relative;
  margin-top: 90px;
  color: #fff;
  object-fit: contain;
  height: 600px;
  @media screen and (max-width:440px){
    margin-top: 80px;
  }
`;

export const BannerContents = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-top: 140px;
`;

export const BannerBackdrop = styled.div`
  padding: 20px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Title = styled.h2`
  font-size: 40px;
  font-weight: 800;
  display: inline-block;
  margin-bottom: 30px;
  @media screen and (max-width:768px){
    font-size:30px;
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
  font-weight: 700;
  border-radius: 4px;
  padding: 5px 20px 5px 30px;
  margin-right: 18px;
  color: black;
  &.play {
    background: url("assets/icon-play.png") no-repeat center left 5px/ 20px #fff;
  }
  &.info {
    background: url("assets/icon-info.png") no-repeat center left 5px / 21px
      #fff;
  }
  :hover {
    background-color: ${isMobile ? "":"tomato" };
    transition: all 0.2s;
  }
`;

export const BannerDesc = styled.p`
  line-height: 1.3;
  font-weight: 500;
  font-size: 16px;
  border-radius: 10px;
  max-width: 400px;
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
  height: 7.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
`;
