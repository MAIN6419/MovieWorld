import { StarFilled } from "@ant-design/icons";
import styled from "styled-components";
import { Swiper } from "swiper/react";

export const ModalWrapper = styled.section``;

export const ModalDim = styled.div`
  width: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  inset: 0;
  z-index: 999;
`;
export const ModalCardWrapper = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  animation: fadeIn 0.5s;
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
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    to {
      opacity: 0;
      transform: translate(-50%, 50%);
    }
  }
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
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  :focus {
    outline: none;
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
  padding: 20px 20px 0 20px;
`;

export const MovieContentsInfo = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MovieContentsInfoItem = styled.li`
  font-size: 20px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const MovieContetnsTag = styled.span`
  font-size: 20px;
  font-weight: 500;
  flex-shrink: 0;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const MovieTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 40px;
  font-weight: 600;
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
    font-size: 18px;
  }
`;

export const MovieGenreWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

export const MovieGenre = styled.ul`
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const MovieGenreLi = styled.li`
  margin-right: 8px;
  @media screen and (max-width: 768px) {
    font-size: 18px;
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
    font-size: 18px;
  }
`;

export const MovieRating = styled.span`
  font-size: 20px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const MovieRatingIcon = styled(StarFilled)`
  color: gold;
  margin-right: 5px;
`;

export const MovieDesc = styled.p`
  font-size: 16px;
  border-bottom: 1px solid #fff;
  padding-bottom: 20px;
  font-weight: 500;
  line-height: 1.5;
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
`;

export const MovieLike = styled.div`
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  @media screen and (max-width: 768px) {
    gap: 5px;
    font-size: 18px;
  }
`;

export const MovieLikeBtn = styled.button`
  width: 25px;
  height: 25px;
  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
  transition: all 0.2s;
  background: ${(props) =>
    props.like
      ? `url(${
          document.body.classList.contains("webp")
            ? "assets/webp/icon-like.webp"
            : "assets/icon-like.svg"
        }) no-repeat center / cover`
      : `url(${
          document.body.classList.contains("webp")
            ? "assets/webp/icon-unlike.webp"
            : "assets/icon-unlike.svg"
        }) no-repeat center / cover`};
`;

export const VideoThumbnailTitle = styled.h3`
  font-size: 20px;
  @media screen and (max-width: 486px) {
    font-size: 18px;
  }
`;
export const SwiperContainer = styled.div``;

export const CustomSwiper = styled(Swiper)`
  padding: 5px 0;
  .swiper-button-next {
    background: url("assets/icon-nextBtn.svg") no-repeat center left 8px / 15px
      rgba(255, 255, 255, 0.8);
    body.webp & {
      background: url("assets/webp/icon-nextBtn.webp") no-repeat center left 8px /
        15px rgba(255, 255, 255, 0.8);
    }
    width: 30px;
    height: 30px;
    border-radius: 50%;
    @media screen and (max-width: 486px) {
      background: url("assets/icon-nextBtn.svg") no-repeat center left 8px/ 12px
        rgba(255, 255, 255, 0.8);
      body.webp & {
        background: url("assets/webp/icon-nextBtn.webp") no-repeat center left
          8px / 12px rgba(255, 255, 255, 0.8);
      }
      width: 25px;
      height: 25px;
      right: 5px;
    }
  }

  .swiper-button-prev {
    background: url("assets/icon-prevBtn.svg") no-repeat center right 8px/ 15px rgba(255, 255, 255, 0.8);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    @media screen and (max-width: 486px) {
      background: url("assets/icon-prevBtn.svg") no-repeat center right 8px/ 12px
        rgba(255, 255, 255, 0.8);
      width: 25px;
      height: 25px;
      left: 5px;
    }
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }

  .swiper-pagination {
    text-align: right !important;
    position: relative !important;
    margin-left: -10px !important;
    bottom: -5px !important;
    font-size: 14px;
  }
`;

export const VideoThumbnailBtn = styled.button`
  background: none;
`;
export const VideoThumbnail = styled.img`
  width: 100%;
`;

export const CloseBtn = styled.button`
  width: 22px;
  height: 22px;
  position: absolute;
  top: 8px;
  right: 10px;
  z-index: 999;
  background: url("assets/icon-close.svg") no-repeat center / 22px;
  body.webp & {
    background: url("assets/webp/icon-close.webp") no-repeat center / 22px;
  }
`;

export const IframeWrapper = styled.div`
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

export const ModalTopButtons = styled.button`
  position: fixed;
  bottom: 0px;
  right: 0;
  background-color: #fff;
  width: 40px;
  height: 40px;
  font-size: 20px;
  z-index: 999;
`;
