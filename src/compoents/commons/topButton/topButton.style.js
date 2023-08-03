import styled from "styled-components";

export const Btn = styled.button`
  position: fixed;
  z-index: 999;
  bottom: 40px;
  right: 20px;
  width: 44px;
  height: 44px;
  background: url("assets/icon-topbutton.svg") no-repeat center / 44px;
  color: #fff;
  animation: TopButtonfadeIn 1s;
  body.webp & {
    background: url("assets/webp/icon-topbutton.webp") no-repeat center / 44px;
  }
  @keyframes TopButtonfadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media screen and (max-width: 486px) {
    right: 20px;
    width: 38px;
    height: 38px;
    background: url("assets/icon-topbutton.svg") no-repeat center / 38px;
    body.webp & {
    background: url("assets/webp/icon-topbutton.webp") no-repeat center / 38px;
  }
  }
`;
