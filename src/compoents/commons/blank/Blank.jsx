import React, { useContext } from "react";
import { BlankImg, BlankText, Title, Wrapper } from "./blank.style";
import { WebpContext } from "../../../context/webpContext";
import { resolveWebp } from "../../../libray/webpSupport";

export default function Blank({ size, text }) {
  const { webpSupport } = useContext(WebpContext);
  return (
    <Wrapper>
      <Title className="a11y-hidden">blank data</Title>
      <BlankImg
        src={resolveWebp(webpSupport, "/assets/webp/icon-blank.webp", "svg")}
        className={size}
        alt=""
      />
      <BlankText className={size}>{text}</BlankText>
    </Wrapper>
  );
}
