import React from "react";
import { BlankImg, BlankText, Title, Wrapper } from "./blank.style";

export default function Blank({ size, text }) {
  return (
    <Wrapper>
      <Title className="a11y-hidden">blank data</Title>
      <BlankImg src="assets/icon-blank.png" className={size} alt=""/>
      <BlankText className={size}>{text}</BlankText>
    </Wrapper>
  );
}
