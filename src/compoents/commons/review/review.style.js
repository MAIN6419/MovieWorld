import { Rate } from "antd";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const Wrapper = styled.section`
  width: calc(100% - 40px);
  margin: 0 auto 20px auto;
`;

export const Title = styled.h2`
  background: url("assets/icon-review.svg") no-repeat left / 25px;
  body.webp & {
    background: url("assets/webp/icon-review.webp") no-repeat left / 25px;
  }
  padding-left: 28px;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;

  @media screen and (max-width: 400px) {
    font-size: 18px;
    background: url("assets/icon-review.svg") no-repeat left / 22px;
    body.webp & {
      background: url("assets/webp/icon-review.webp") no-repeat left / 22px;
    }
  }
`;

export const ReviewCheckList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  @media screen and (max-width: 400px) {
    margin-bottom: 10px;
  }
`;

export const RatingWrapper = styled.div``;

export const Rating = styled(Rate)`
  font-size: 25px;
  margin-right: 10px;
  & .ant-rate-star-zero svg {
    fill: #fff !important;
  }
  & .ant-rate-star-focused:first-child svg {
    fill: #fff !important;
  }
  & .ant-rate-star-full.ant-rate-star-focused:first-child svg {
    fill: gold !important;
  }
  @media screen and (max-width: 486px) {
    font-size: 20px;
  }
`;

export const RatingCount = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

export const ToggleCheckbox = styled.input``;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const ToggleSwithTag = styled.span`
  font-weight: 500;
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
`;
export const ToggleSwitch = styled.label`
  display: inline-block;
  width: 50px;
  height: 26px;
  border-radius: 30px;
  background-color: ${(props) => (props.toggle ? "#f03d3d" : "#fff")};
  box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  :focus {
    outline-color: #e50914;
  }
  @media screen and (max-width: 486px) {
    width: 40px;
    height: 20px;
  }
`;

/* 토글 버튼 */
export const ToggleButton = styled.span`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50%;
  left: ${(props) => (props.toggle ? "calc(100% - 19px)" : "4px")};
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: ${(props) => (props.toggle ? "#fff" : "#f03d3d")};
  transition: all 0.3s;
  @media screen and (max-width: 486px) {
    width: 10px;
    height: 10px;
    left: ${(props) => (props.toggle ? "calc(100% - 14px)" : "4px")};
  }
`;

export const TextAreaForm = styled.form`
  display: flex;
  border: 1px solid #bdbdbd;
  margin-bottom: 50px;
`;

export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const TextAreaLabel = styled.label``;
export const TextArea = styled.textarea`
  padding: 8px 10px;
  width: 100%;
  height: 100px;
  resize: none;
  background: none;
  border-bottom: 1px solid #bdbdbd;
  font-size: 16px;
  color: #fff;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 486px) {
    font-size: 12px;
    ::placeholder {
      font-size: 12px;
    }
  }
`;

export const TextCountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TextCount = styled.span`
  margin-left: 10px;
  color: #bdbdbd;
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
`;

export const TextAreaBtn = styled.button`
  background: ${(props) => (props.disabled ? "##292a2b" : "gold")};
  float: right;
  padding: 8px 10px;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.5s;
  color: ${(props) => (props.disabled ? "rgba(245, 245, 245, 0.8)" : "#000")};
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
  :focus {
    outline-color: #e50914;
  }
`;

export const ReviewUl = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 300px;
`;

export const SelectWrapper = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
  text-align: right;
  margin-bottom: 20px;
  @media screen and (max-width: 486px) {
    margin-bottom: 10px;
  }
`;

export const Select = styled.button`
  width: 90px;
  text-align: left;
  border: 0;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 10px 0 10px 20px;
  position: relative;
  font-size: 14px;
  font-weight: 500;
  background-color: #1d1e1e;
  color: #fff;
  display: block;
  margin-left: auto;
  cursor: pointer;
  ::after {
    position: absolute;
    top: 12px;
    right: 10px;
    display: inline-block;
    content: "";
    width: 15px;
    height: 15px;
    background: url("assets/icon-downArrow.svg") no-repeat center right 0px /
      15px;
    transform: ${(props) =>
      props.active ? "rotate(-180deg)" : "rotate(0deg)"};
    transition: all 0.5s;
  }
  body.webp &::after {
    background: url("assets/webp/icon-downArrow.webp") no-repeat center right
      0px / 15px;
  }
  @media screen and (max-width: 486px) {
    font-size: 12px;
    width: 72px;
    padding-left: 10px;
  }
`;

export const OpectionList = styled.ul`
  position: absolute;
  top: 42px;
  right: 0;
  width: 90px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  box-sizing: border-box;
  z-index: 99;
  overflow: hidden;
  animation: open 0.5s;
  @keyframes open {
    from {
      height: 0;
    }
    to {
      height: 109px;
    }
  }

  @keyframes close {
    from {
      height: 109px;
    }
    to {
      height: 0;
    }
  }
  @media screen and (max-width: 486px) {
    font-size: 12px;
    width: 72px;
    @keyframes open {
      from {
        height: 0;
      }
      to {
        height: 103px;
      }
    }

    @keyframes close {
      from {
        height: 103px;
      }
      to {
        height: 0;
      }
    }
  }
`;

export const Opection = styled.li`
  color: #fff;
  :not(:last-child) {
    border-bottom: 1px solid #fff;
  }
`;

export const OpectionBtn = styled.button`
  padding: 8px;
  display: block;
  border: none;
  width: 100%;
  margin: 0 auto;
  cursor: pointer;
  background-color: #1d1e1e;
  color: #fff;
  font-size: 14px;
  :hover {
    background-color: ${isMobile ? "" : "rgba(74,74,74)"};
  }
  :focus {
    outline: none;
    background-color: rgba(74, 74, 74);
  }
  @media screen and (max-width: 486px) {
    font-size: 12px;
  }
`;

export const InfinityScollTarget = styled.div`
  position: relative;
  bottom: 120px;
`;
