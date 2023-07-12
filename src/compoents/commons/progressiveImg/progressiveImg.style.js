import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const Img = styled.img`
  transition: transform 0.4s;
  :hover {
    transform: ${isMobile ? "" : "scale(1.05)"};
  }
`;
