import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const Img = styled.img`
  transition: all 0.5s;
  :hover {
    transform: ${isMobile ? "" : "scale(1.05)"};
  }
  &.loading {
    filter: blur(10px);
    clip-path: inset(0);
  }
  &.loaded {
    filter: blur(0px);
  }
`;
