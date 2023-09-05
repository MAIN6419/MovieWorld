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
  & .ant-rate-star-focused:first-child svg {
    fill: #fff !important;
  }
  & .ant-rate-star-full.ant-rate-star-focused:first-child svg {
    fill: gold !important;
  }
  font-size: 20px;
  &:where(.css-dev-only-do-not-override-14wwjjs).ant-rate
    .ant-rate-star:not(:last-child) {
    margin-inline-end: 3px;
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
  justify-content: ${(props: { isEdit: boolean }) =>
    props.isEdit && "space-between"};
  padding: ${(props: { isEdit: boolean }) => props.isEdit && "5px 0"};
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
  color: ${(props: { inactive: boolean }) =>
    props.inactive ? "rgba(189,189,189)" : "#fff"};
  margin-left: 10px;
  font-size: 16px;
  margin-bottom: 5px;
  white-space: pre-wrap;
  line-height: 1.5;
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
`;

export const ShowSpoilerBtn = styled.button`
  background: none;
  color: #e50914 !important;
  border-bottom: 1px solid #e50914;
  margin-left: 8px;
  font-size: 14px;
  font-weight: 500;
  @media screen and (max-width: 486px) {
    font-size: 12px;
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

export const EditTextAreaForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid #bdbdbd;
`;
export const EditTextAreaLabel = styled.label``;

export const EditTextArea = styled.textarea`
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

export const EditTextAreaBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const EditTextCount = styled.span`
  margin-left: 10px;
  color: #bdbdbd;
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
`;

export const EditBtns = styled.div``;

export const EditBtn = styled.button`
  background: ${(props) => (props.disabled ? "#292a2b" : "gold")};
  padding: 8px 10px;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.5s;
  color: ${(props) => (props.disabled ? "rgba(245, 245, 245, 0.8)" : "#000")};
  &.cancel {
    background-color: #eee;
    color: #000;
  }
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
`;
