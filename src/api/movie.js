import { customAxios } from "./customAxios";

// api_key, language params로 설정
const api_key = process.env.REACT_APP_THEMOVIEDB_API_KEY;
const language = "ko-KR";

// 영화 비디오 정보가 포함된 데이터를 가져오는 API
export const fetchVideo = async (id) => {
    const video = await customAxios.get(
      `movie/${id}`,
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

// Banner 화면에 나타날 영화 정보를 가져오는 API
export const fetchNowPlaying = async () => {
    const res = await customAxios.get(`movie/now_playing`, {
      params: {
        api_key,
        language,
      },
    });
    const movieId =
      res.data.results[Math.floor(Math.random() * res.data.results.length)].id;
    return fetchVideo(movieId);
};

// 최신의 영화 정보를 가져오는 API
export const fetchTrending = async (page = 1) => {
    const res = await customAxios.get(`/trending/movie/week`, {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// 영화 순위가 높은 순서대로 영화 정보를 가져오는 API
export const fetchTopRated = async (page = 1) => {
    const res = await customAxios.get("/movie/top_rated", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// Action 영화 정보를 가져오는 API
export const fetchAction = async (page = 1) => {
    const res = await customAxios.get("/discover/movie?with_genres=28", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// Comedy 영화 정보를 가져오는 API
export const fetchComedy = async (page = 1) => {
    const res = await customAxios.get("/discover/movie?with_genres=35", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// Horror 영화 정보를 가져오는 API
export const fetchHorror = async (page = 1) => {
    const res = await customAxios.get("/discover/movie?with_genres=27", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// Romance 영화 정보를 가져오는 API
export const fetchRomance = async (page = 1) => {
    const res = await customAxios.get("/discover/movie?with_genres=10749", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// Documentary 영화 정보를 가져오는 API
export const fetchDocumentary = async (page = 1) => {
    const res = await customAxios.get("/discover/movie?with_genres=99", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// 검색한 영화 정보를 가져오는 API
export const fetchSearch = async (keyword, page) => {
    const res = await customAxios.get(
      `/search/movie?include_adult=false&query=${keyword}`,
      {
        params: {
          api_key,
          language,
          page,
        },
      }
    );
    return res.data.results;
};
