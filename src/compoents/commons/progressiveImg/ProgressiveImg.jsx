import React, { useEffect, useState } from "react";
import { Img } from "./progressiveImg.style";

export default function ProgressiveImg({
  placeholderSrc,
  src,
  styles,
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return (
    <>
      <Img
        {...{ src: imgSrc, ...props }}
        style={styles}
        alt={props.alt || ""}
      />
    </>
  );
}
