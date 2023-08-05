import { sweetToast } from "../sweetAlert/sweetAlert";
import { customAxios } from "./customAxios";

// api_key, language params로 설정
const api_key = process.env.REACT_APP_THEMOVIEDB_API_KEY;
const language = "ko-KR";

// 영화 비디오 정보가 포함된 데이터를 가져오는 API
export const fetchVideo = async (id, mediaType) => {
  try {
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
  } catch (error) {
    console.error(error.response.data.status_message);
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// Banner 화면에 나타날 영화 정보를 가져오는 API
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
    console.error(error.response.data.status_message);
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// 최신의 영화 정보를 가져오는 API
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
    console.error(error.response.data.status_message);
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// 영화 순위가 높은 순서대로 영화 정보를 가져오는 API
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
    console.error(error.response.data.status_message);
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// Action 영화 정보를 가져오는 API
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
    console.error(error.response.data.status_message);
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// Comedy 영화 정보를 가져오는 API
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
    console.error(error.response.data.status_message);
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// Horror 영화 정보를 가져오는 API
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
    console.error(error.response.data.status_message);
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// Romance 영화 정보를 가져오는 API
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
    console.error(error.response.data.status_message);
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// Document 영화 정보를 가져오는 API
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
    console.error(error.response.data.status_message);
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};

// 검색한 영화 정보를 가져오는 API
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
    console.error(error.response.data.status_message);
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
      "warning"
    );
    throw error;
  }
};
