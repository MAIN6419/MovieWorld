import styled from "styled-components";
export const Title = styled.h1``
export const Wrapper = styled.div`
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
  background: url("assets/icon-camera.png") no-repeat center / contain;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 20px 2px rgba(255, 255, 255, 0.9);
  animation: fadeIn 7s;
  overflow: hidden;
  @keyframes fadeIn {
    from{
      opacity: 0;
    }
    to{
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
    from{
      transform: translateX(-150%);
    }
    to{
      transform: translateX(-50%);
    }
  }
`





