import { Rate } from "antd";
import styled from "styled-components";

export const Wrapper = styled.section`
  padding: 0 20px 20px 20px;
`;

export const Title = styled.h2`
  background: url("assets/icon-review.png") no-repeat left / 25px;
  padding-left: 28px;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const RatingWrapper = styled.div`
  margin-bottom: 20px;
  display: inline-block;
`;

export const Rating = styled(Rate)`
  font-size: 25px;
  margin-right: 10px;
  & .ant-rate-star-zero svg {
    fill: #fff !important;
  }
`;

export const RatingCount = styled.span`
font-size: 18px;
font-weight: 500;
`

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
    font-size: 14px;
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
  font-weight: 400;
  font-size: 16px;
  transition: all 0.5s;
  color: ${(props) => (props.disabled ? "rgba(245, 245, 245, 0.8)" : "#000")};
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
`;

export const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
