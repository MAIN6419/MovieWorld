import React from "react";
import { BlankImg, BlankText, Wrapper } from "./blank.style";

export default function Blank({ size, text }) {
  return (
    <Wrapper>
      <BlankImg src="assets/icon-blank.png" className={size} />
      <BlankText className={size}>{text}</BlankText>
    </Wrapper>
  );
}
