import React, { useEffect, useRef, useState } from "react";
import { Btn } from "./topButton.style";

export default function TopButton() {
  const [isShow, setIsShow] = useState(false);
  const topBtnRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 500
    ) {
      setIsShow(true);
    } else if (topBtnRef.current){
      topBtnRef.current.style.animation = "topBtnFadeOut 0.5s";
      setTimeout(() => {
        setIsShow(false);
      }, 400);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    isShow && <Btn ref={topBtnRef} onClick={scrollToTop} aria-label="Top" />
  );
}
