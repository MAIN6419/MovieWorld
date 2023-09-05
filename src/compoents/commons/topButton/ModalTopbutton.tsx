import React, { RefObject, useEffect, useRef, useState } from "react";
import { ModalBtn } from "./topButton.style";

interface IProps {
  modalRef: RefObject<HTMLElement>
}
export default function ModalTopbutton({ modalRef }:IProps) {
  const [isShow, setIsShow] = useState(false);
  const topBtnRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    modalRef.current?.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if(!modalRef.current) return;
    if (modalRef.current.scrollTop > 500) {
      setIsShow(true);
    } else if(topBtnRef.current){
      topBtnRef.current.style.animation = "topBtnFadeOut 0.5s";
      setTimeout(() => {
        setIsShow(false);
      }, 400);
    }
  };

  useEffect(() => {
    modalRef.current?.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {isShow && (
        <ModalBtn onClick={scrollToTop} aria-label="Top" ref={topBtnRef}/>
      )}
    </>
  );
}
