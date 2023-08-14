import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getActionMovies,
  getComedyMovies,
  getDocumentaryMovies,
  getHorrorMovies,
  getNowPlayingMovie,
  getRomanceMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getVideoData,
} from "../api/movie";
import { sweetToast } from "../sweetAlert/sweetAlert";

// 액션 영화 목록
export const fetchActionMovies = createAsyncThunk(
  "movieDataSlice/fetchActionMovies",
  async (_, thunkAPI) => {
    try {
      const data = await getActionMovies();
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// 코미디 영화 목록
export const fetchComedyMovies = createAsyncThunk(
  "movieDataSlice/fetchComedyMovies",
  async (_, thunkAPI) => {
    try {
      const data = await getComedyMovies();
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// 다큐멘터리 영화 목록
export const fetchDocumentaryMovies = createAsyncThunk(
  "movieDataSlice/fetchDocumentaryMovies",
  async (_, thunkAPI) => {
    try {
      const data = await getDocumentaryMovies();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 호러 영화 목록
export const fetchHorrorMovies = createAsyncThunk(
  "movieDataSlice/fetchHorrorMovies",
  async (_, thunkAPI) => {
    try {
      const data = await getHorrorMovies();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 로맨스 영화 목록
export const fetchRomanceMovies = createAsyncThunk(
  "movieDataSlice/fetchRomanceMovies",
  async (_, thunkAPI) => {
    try {
      const data = await getRomanceMovies();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 인기 영화 목록
export const fetchTopRatedMovies = createAsyncThunk(
  "movieDataSlice/fetchTopRatedMovies",
  async (_, thunkAPI) => {
    try {
      const data = await getTopRatedMovies();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 최신 영화 목록
export const fetchTrendingMovies = createAsyncThunk(
  "movieDataSlice/fetchTrendingMovies",
  async (_, thunkAPI) => {
    try {
      const data = await getTrendingMovies();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

 // 현재 상영중인 영화 목록에서 랜덤으로 하나의 영화를 불러옴
export const fetchNowPlayingMovie = createAsyncThunk(
  "movieData/fetchNowPlayingMovie",
  async (_, thunkAPI) => {
    try {
      const data = await getNowPlayingMovie();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 영화 비디오 데이터 => 기존 영화 데이터에 비디오 관련 데이터(상영시간, 관련영상 등)가 포함되어서 나옴
export const fetchVideoData = createAsyncThunk(
  "movieDataSlice/fetchVideoData",
  async (movieData, thunkAPI) => {
    try {
      const data = await getVideoData(movieData.id);
      // Themovie DB API에서 기존 영화 데이터와 다른 영화 비디오 데이터를 줄때가 있어서
      // title, name, original_name으로 기존 영화 데이터와 비디오 데이터를 비교하여 같지 않으면 그냥 기존 영화 데이터를 적용
      if (
        data.title !== movieData.title &&
        data.name !== movieData.name &&
        data.original_name !== movieData.original_name
      ) {
        // 비디오 데이터가 일치하지 않는 경우 기존 영화 데이터를 적용
        return movieData;
      }
      // 비디오 데이터가 일치하는 경우 비디오 데이터를 적용
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const movieDataSlice = createSlice({
  name: "movieDataSlice",
  initialState: {
    action: { data: [], error: "" },
    comedy: { data: [], error: "" },
    documentary: { data: [], error: "" },
    horror: { data: [], error: "" },
    romance: { data: [], error: "" },
    topRated: { data: [], error: "" },
    trending: { data: [], error: "" },
    videoData: { data: [], error: "" },
    nowPlayingData: { data: [], error: "" },
  },
  reducers: {
    // 비디오 데이터 초기화
    resetVideoData: (state, action) => {
      state.videoData = { data: [], error: "" };
    },
  },
  extraReducers: (builder) => {
    // 액션 영화 목록
    builder.addCase(fetchActionMovies.fulfilled, (state, action) => {
      state.action.data = action.payload;
    });
    builder.addCase(fetchActionMovies.rejected, (state, action) => {
      state.action.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 코미디 영화 목록
    builder.addCase(fetchComedyMovies.fulfilled, (state, action) => {
      state.comedy.data = action.payload;
    });
    builder.addCase(fetchComedyMovies.rejected, (state, action) => {
      state.comedy.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 다큐멘터리 영화 목록
    builder.addCase(fetchDocumentaryMovies.fulfilled, (state, action) => {
      state.documentary.data = action.payload;
    });
    builder.addCase(fetchDocumentaryMovies.rejected, (state, action) => {
      state.documentary.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 호러 영화 목록
    builder.addCase(fetchHorrorMovies.fulfilled, (state, action) => {
      state.horror.data = action.payload;
    });
    builder.addCase(fetchHorrorMovies.rejected, (state, action) => {
      state.horror.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 로맨스 영화 목록
    builder.addCase(fetchRomanceMovies.fulfilled, (state, action) => {
      state.romance.data = action.payload;
    });
    builder.addCase(fetchRomanceMovies.rejected, (state, action) => {
      state.romance.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 인기 영화 목록
    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
      state.topRated.data = action.payload;
    });
    builder.addCase(fetchTopRatedMovies.rejected, (state, action) => {
      state.topRated.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 최신 영화 목록
    builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
      state.trending.data = action.payload;
    });
    builder.addCase(fetchTrendingMovies.rejected, (state, action) => {
      state.trending.error = action.payload;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 영화 비디오 데이터
    builder.addCase(fetchVideoData.fulfilled, (state, action) => {
      state.videoData.data = action.payload;
    });
    builder.addCase(fetchVideoData.rejected, (state, action) => {
      state.videoData.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

     // 현재 상영중인 영화 
    builder.addCase(fetchNowPlayingMovie.fulfilled, (state, action) => {
      state.nowPlayingData.data = action.payload;
    });
    builder.addCase(fetchNowPlayingMovie.rejected, (state, action) => {
      state.nowPlayingData.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });
  },
});
