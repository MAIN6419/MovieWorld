import { useState } from "react";

export const useMovieInfo = (initalValue) => {
  const [isOpenMovieInfo, setIsOpenMovieInfo] = useState(initalValue);
  const [seletedMovie, setSeletedMoive] = useState({});

  const onClickMoiveInfo = (movie) => {
    setIsOpenMovieInfo(true);
    setSeletedMoive(movie);
    document.body.style.overflow = "hidden";
  };

  return [isOpenMovieInfo, setIsOpenMovieInfo, seletedMovie, onClickMoiveInfo];
};
