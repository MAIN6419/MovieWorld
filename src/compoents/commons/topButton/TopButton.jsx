import React, { useEffect, useState } from "react";
import { Btn } from "./topButton.style";

export default function TopButton() {
  const [isShow, setIsShow] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    isShow && (
      <Btn onClick={scrollToTop}>
        <span className="a11y-hidden"></span>
      </Btn>
    )
  );
}
