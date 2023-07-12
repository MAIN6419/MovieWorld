import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { Swiper } from "swiper/react";

export const Wrapper = styled.section`
  margin-bottom: 30px;
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

export const MovieUl = styled.ul`
  display: flex;
  padding: 20px 0 20px 20px;
  transition: transform 400ms;
  width: 100%;
`;

export const MoiveItem = styled.li`
  cursor: pointer;
  transition: transform 400ms;
  width: 95%;
  border-radius: 5px;
`;

export const SwiperContainer = styled(Swiper)`
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
