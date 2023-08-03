import React, { useEffect, useState } from "react";
import { ModalBtn } from "./topButton.style";

export default function ModalTopbutton({ modalRef }) {
  const [isShow, setIsShow] = useState(false);

  const scrollToTop = () => {
    modalRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (modalRef.current.scrollTop > 500) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  useEffect(() => {
    modalRef.current.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {isShow && <ModalBtn onClick={scrollToTop} aria-label="Top"/>}
      
    </>
  );
}
