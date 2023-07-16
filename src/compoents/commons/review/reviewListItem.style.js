import { Rate } from "antd";
import styled from "styled-components";

export const ReviewItem = styled.li`
  padding: 10px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
`;

export const ReviewItemRateWrapper = styled.div``;

export const ReviewItemRate = styled(Rate)`
  margin-right: 5px;
  & .ant-rate-star-zero svg {
    fill: #fff !important;
  }
  font-size: 20px;
  &:where(.css-dev-only-do-not-override-14wwjjs).ant-rate
    .ant-rate-star:not(:last-child) {
    margin-inline-end: 3px;
  }
  @media screen and (max-width: 486px) {
    font-size: 18px;
  }
`;

export const ReviewItemRateCount = styled.strong`
  font-size: 14px;
  font-weight: 500;
`;

export const ReviewerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const ReviewerImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #bdbdbd;
  @media screen and (max-width: 486px) {
    width: 34px;
    height: 34px;
  }
`;

export const Reviewer = styled.span`
  color: #fff;
  font-size: 18px;
  @media screen and (max-width: 486px) {
    font-size: 16px;
  }
`;

export const ReviewContents = styled.p`
  color: #fff;
  margin-left: 10px;
  font-size: 16px;
  margin-bottom: 5px;
  white-space: pre-wrap;
  line-height: 1.5;
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
`;

export const ReviewItemBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #bdbdbd;
  font-size: 12px;
  margin-left: 10px;
  position: relative;

  & :not(:last-child):after {
    position: absolute;
    content: "";
    display: inline-block;
    width: 1px;
    height: 10px;
    background-color: #bdbdbd;
    top: 5px;
    margin: 0 5px;
  }
`;

export const ReviewCreatedAt = styled.time``;

export const ReviewItemBtn = styled.button`
  background: none;
  color: #bdbdbd;
  font-size: 12px;
`;
