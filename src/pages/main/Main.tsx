import React from "react";
import { Wrapper } from "./main.style";
import MovieList from "../../compoents/units/movieList/MovieList";
import TopButton from "../../compoents/commons/topButton/TopButton";
import {
  fetchActionMovies,
  fetchComedyMovies,
  fetchDocumentaryMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies
} from "../../slice/movieDataslice";

export default function Main() {
  return (
    <>
      <Wrapper>
        <MovieList
          title={"Trending Now"}
          type='trending'
          fetchMoive={fetchTrendingMovies}
        />
        <MovieList
          title={"Top Rated"}
          type='topRated'
          fetchMoive={fetchTopRatedMovies}
        />
        <MovieList
          title={"Action Movies"}
          type={"action"}
          fetchMoive={fetchActionMovies}
        />
        <MovieList
          title={"Comedy Movies"}
          type={"comedy"}
          fetchMoive={fetchComedyMovies}
        />
        <MovieList
          title={"Romance Movies"}
          type={"romance"}
          fetchMoive={fetchRomanceMovies}
        />
        <MovieList
          title={"Horror Movies"}
          type={"horror"}
          fetchMoive={fetchHorrorMovies}
        />
        <MovieList
          title={"Documentary Movies"}
          type={"documentary"}
          fetchMoive={fetchDocumentaryMovies}
        />
        <TopButton />
      </Wrapper>
    </>
  );
}
