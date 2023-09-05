import { useState } from "react";
import { IMovieData } from '../api/movieAPIType';

export const useMovieInfo = (initalValue: boolean) => {
  const [isOpenMovieInfo, setIsOpenMovieInfo] = useState(initalValue);
  const [seletedMovie, setSeletedMoive] = useState({} as IMovieData);

  const onClickMoiveInfo = (movie: IMovieData) => {
    setIsOpenMovieInfo(true);
    setSeletedMoive(movie);
    document.body.style.overflow = "hidden";
  };

  return [isOpenMovieInfo, setIsOpenMovieInfo, seletedMovie, onClickMoiveInfo] as const;
};
