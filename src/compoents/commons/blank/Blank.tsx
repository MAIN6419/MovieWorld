import React from "react";
import { BlankImg, BlankText, Title, Wrapper } from "./blank.style";
import { resolveWebp } from "../../../libray/webpSupport";
interface IProps {
  size: string;
  text: string;
}

export default function Blank({ size, text }: IProps) {
  return (
    <Wrapper>
      <Title className="a11y-hidden">blank data</Title>
      <BlankImg
        src={resolveWebp("/assets/webp/icon-blank.webp", "svg")}
        className={size}
        alt=""
      />
      <BlankText className={size}>{text}</BlankText>
    </Wrapper>
  );
}
