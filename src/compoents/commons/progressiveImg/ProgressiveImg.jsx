import React, { useEffect, useState } from "react";
import { Img } from "./progressiveImg.style";
import { useInView } from "react-intersection-observer";

export default function ProgressiveImg({
  placeholderSrc,
  src,
  styles,
  ...props
}) {
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
    }
  }, [src, inView]);

  return (
    <Img
      {...{ src: imgSrc, ...props }}
      className={customClass}
      style={styles}
      loading="lazy"
      alt={props.alt || ""}
      onError={(e) => (e.target.src = placeholderSrc)}
      ref={ref}
    />
  );
}
