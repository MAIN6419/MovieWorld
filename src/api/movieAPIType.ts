interface IGenres {
  id: number;
  name: string;
}

interface IVideo {
  key: string;
}

export interface IVideoData {
  backdrop_path: string;
  genres: IGenres[];
  id: number;
  original_title?: string;
  original_name?: string;
  name?: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  runtime: number;
  title?: string;
  videos: { results: IVideo[] };
  media_type: string;
  vote_average: string;
}

export interface IMovieData {
  backdrop_path: string;
  id: number;
  original_title?: string;
  original_name?: string;
  name?: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title?: string;
  media_type: string;
  videos: boolean;
}
