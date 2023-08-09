import styled from "styled-components";
export const Title = styled.h1``;
export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #333;
`;

export const SportLight = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border-radius: 50%;
  body.no-webp & {
    background: url("/assets/icon-camera.svg") no-repeat center / contain;
  }
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 20px 1px rgba(255, 255, 255, 0.5);
  animation: fadeIn 2s;
  overflow: hidden;
  body.webp & {
    background: url("/assets/webp/icon-camera.webp") no-repeat center / contain;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Logo = styled.img`
  position: absolute;
  top: 60%;
  left: 45%;
  transform: translate(-50%, 0%);
  width: 150px;
  animation: move 1.2s;
  @keyframes move {
    from {
      transform: translateX(-150%);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;
