import styled from "styled-components";

export const Wrapper = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

export const Title = styled.h2``;

export const BlankImg = styled.img`
  display: block;
  margin: 0 auto 10px auto;
  width: 120px;
  height: 120px;
  &.small {
    width: 100px;
    height: 100px;
  }
`;

export const BlankText = styled.p`
  font-size: 16px;
  font-weight: 500px;
  color: #fff;
  text-align: center;
  &.small {
    font-size: 14px;
  }
`;
