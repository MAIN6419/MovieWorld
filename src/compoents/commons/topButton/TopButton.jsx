import React, { useEffect, useState } from "react";
import { Btn } from "./topButton.style";

export default function TopButton({ targetElement = window }) {
  const [isShow, setIsShow] = useState(false);

  const scrollToTop = () => {
    targetElement.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (
      targetElement === window
        ? targetElement.scrollY
        : targetElement.scrollTop > 500
    ) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  useEffect(() => {
    targetElement.addEventListener("scroll", handleScroll);
    return () => targetElement.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    isShow && (
      <Btn onClick={scrollToTop} aria-label="Top"/>
    )
  );
}
