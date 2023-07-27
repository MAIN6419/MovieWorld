import React, { useEffect } from "react";
import {
  Logo,
  SportLight,
  Title,
  Wrapper,
} from "./splash.style";
import { useNavigate } from "react-router-dom";

export default function Splash() {
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
          <Logo src="assets/logo.png" alt="MovieWorld"/>
        </SportLight>
      </Wrapper>
    </>
  );
}
