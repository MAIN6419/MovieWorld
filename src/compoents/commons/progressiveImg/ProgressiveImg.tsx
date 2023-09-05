import React, { useEffect, useState } from "react";
import { Img } from "./progressiveImg.style";
import { useInView } from "react-intersection-observer";
import { resolveWebp } from "../../../libray/webpSupport";
import { CSSProperties } from "styled-components";

interface IProps {
  placeholderSrc: string;
  src: string;
  alt: string;
  onError?: any;
  onClick?: () => void;
  styles: CSSProperties;
}
export default function ProgressiveImg({
  placeholderSrc,
  src,
  styles,
  ...props
}: IProps) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const [isLazy, setIsLazy] = useState(true);
  const { ref, inView } = useInView();
  const customClass = isLazy ? "loading" : "loaded";
  useEffect(() => {
    if (inView && imgSrc === placeholderSrc) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLazy(false);
      };
      img.onerror = () => {
        setImgSrc(resolveWebp("/assets/webp/placeholderImg.webp", "svg"));
        setIsLazy(false);
      };
    }
  }, [src, inView]);

  return (
    <Img
      {...{ src: imgSrc, ...props }}
      className={customClass}
      style={styles}
      loading='lazy'
      alt={props.alt || ""}
      ref={ref}
    />
  );
}
