import React from "react";
import { Wrapper } from "./main.style";
import MovieList from "../../compoents/units/movieList/MovieList";
import {
  fetchActionMovies,
  fetchComedyMovies,
  fetchDocumentMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchTopRated,
  fetchTrending,
} from "../../api/movie";

export default function Main() {
  return (
    <Wrapper>
      <MovieList title={"Trending Now"} fetchMoive={fetchTrending} />
      <MovieList title={"Top Rated"} fetchMoive={fetchTopRated} />
      <MovieList title={"Action Movies"} fetchMoive={fetchActionMovies} />
      <MovieList title={"Comedy Movies"} fetchMoive={fetchComedyMovies} />
      <MovieList title={"Romance Movies"} fetchMoive={fetchRomanceMovies} />
      <MovieList title={"Horror Movies"} fetchMoive={fetchHorrorMovies} />
      <MovieList
        title={"Documentary Movies"}
        fetchMoive={fetchDocumentMovies}
      />
    </Wrapper>
  );
}
