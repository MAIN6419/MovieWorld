import { customAxios } from "./customAxios";
const api_key = process.env.REACT_APP_THEMOVIEDB_API_KEY;
const language = "ko-KR";

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

export const fetchNeflix = async (page = 1) => {
  try {
    const res = await customAxios.get(`/discover/tv?with_networks=213`, {
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
    const res = await customAxios.get("/discover/movie?with_genres=09", {
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

export const fetchSearchMovie = async(keyword, page) =>{
  try {
    const res = await customAxios.get(`/search/multi?include_adult=false&query=${keyword}`, {
      params: {
        api_key,
        language,
        page
      },
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
    console.error(error.response.data.status_message);
  }
}
