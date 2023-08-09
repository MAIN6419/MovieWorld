import React, { useContext, useEffect } from "react";
import { Logo, SportLight, Title, Wrapper } from "./splash.style";
import { useNavigate } from "react-router-dom";
import { resolveWebp } from "../../libray/webpSupport";
import { WebpContext } from "../../context/webpContext";

export default function Splash() {
  const { webpSupport } = useContext(WebpContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/main");
    }, 2500);
  }, []);

  return (
    <>
      <Title className="a11y-hidden">스플래쉬 페이지</Title>
      <Wrapper>
        <SportLight>
          <Logo
            src={resolveWebp(webpSupport, "/assets/webp/icon-logo.webp", "svg")}
            alt="MovieWorld"
          />
        </SportLight>
      </Wrapper>
    </>
  );
}
