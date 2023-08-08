import styled from "styled-components";
import { Swiper } from "swiper/react";

export const Wrapper = styled.section`
  margin-bottom: 10px;
`;

export const Title = styled.h2`
  margin-left: 20px;
  font-size: 30px;
  color: #fff;
  font-weight: 700;
  @media screen and (max-width: 768px) {
    margin-left: 10px;
    font-size: 25px;
  }
  @media screen and (max-width: 486px) {
    font-size: 20px;
  }
`;

export const MovieItemWrapper = styled.div``;

export const MovieItemBtn = styled.button`
  background: none;
  transition: transform 400ms;
  width: 95%;
  border-radius: 5px;
  margin: 25px 0 25px 5px;
`;

export const SwiperContainer = styled(Swiper)`
  min-height: 208px;
  .swiper-button-next {
    body.no-webp & {
      background: url("assets/icon-nextBtn.svg") no-repeat center left 8px /
        15px rgba(255, 255, 255, 0.8);
    }
    width: 30px;
    height: 30px;
    border-radius: 50%;
    body.webp & {
      background: url("assets/webp/icon-nextBtn.webp") no-repeat center left 8px /
        15px rgba(255, 255, 255, 0.8);
    }
  }

  .swiper-button-prev {
    body.no-webp & {
      background: url("assets/icon-prevBtn.svg") no-repeat center right 8px/ 15px
        rgba(255, 255, 255, 0.8);
    }
    width: 30px;
    height: 30px;
    border-radius: 50%;
    body.webp & {
      background: url("assets/webp/icon-prevBtn.webp") no-repeat center right
        8px/ 15px rgba(255, 255, 255, 0.8);
    }
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }

  &.swiper .swiper-pagination-bullet {
    background: gray !important;
    opacity: 1 !important;
  }

  &.swiper .swiper-pagination {
    text-align: right !important;
    position: relative !important;
    margin-left: -10px !important;
    bottom: 15px !important;
  }

  &.swiper .swiper-pagination-bullet-active {
    background-color: white !important;
  }
`;
