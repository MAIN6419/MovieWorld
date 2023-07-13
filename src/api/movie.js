import { customAxios } from "./customAxios";
const api_key = process.env.REACT_APP_THEMOVIEDB_API_KEY;
const language = "ko-KR";

export const fetchVideo = async (id, mediaType) => {
  const video = await customAxios.get(
    `${mediaType === "tv" ? "tv" : "movie"}/${id}`,
    {
      params: {
        api_key,
        language,
        append_to_response: "videos",
      },
    }
  );
  return video.data;
};

export const fetchNowPlaying = async () => {
  try {
    const res = await customAxios.get(`movie/now_playing`, {
      params: {
        api_key,
        language,
      },
    });
    const movieId =
      res.data.results[Math.floor(Math.random() * res.data.results.length)].id;
    return fetchVideo(movieId);
  } catch (error) {
    console.log(error);
    console.error(error.response.data.status_message);
  }
};

export const fetchTrending = async (page = 1) => {
  try {
    const res = await customAxios.get(`/trending/all/week`, {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
    console.error(error.response.data.status_message);
  }
};

export const fetchTopRated = async (page = 1) => {
  try {
    const res = await customAxios.get("/movie/top_rated", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
    console.error(error.response.data.status_message);
  }
};

export const fetchActionMovies = async (page = 1) => {
  try {
    const res = await customAxios.get("/discover/movie?with_genres=28", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
    console.error(error.response.data.status_message);
  }
};

export const fetchComedyMovies = async (page = 1) => {
  try {
    const res = await customAxios.get("/discover/movie?with_genres=35", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
    console.error(error.response.data.status_message);
  }
};

export const fetchHorrorMovies = async (page = 1) => {
  try {
    const res = await customAxios.get("/discover/movie?with_genres=27", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
    console.error(error.response.data.status_message);
  }
};

export const fetchRomanceMovies = async (page = 1) => {
  try {
    const res = await customAxios.get("/discover/movie?with_genres=10749", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
    console.error(error.response.data.status_message);
  }
};

export const fetchDocumentMovies = async (page = 1) => {
  try {
    const res = await customAxios.get("/discover/movie?with_genres=99", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
    console.error(error.response.data.status_message);
  }
};

export const fetchSearchMovie = async (keyword, page) => {
  try {
    const res = await customAxios.get(
      `/search/multi?include_adult=false&query=${keyword}`,
      {
        params: {
          api_key,
          language,
          page,
        },
      }
    );
    return res.data.results;
  } catch (error) {
    console.log(error);
    console.error(error.response.data.status_message);
  }
};

