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
  getVideoData
} from "../api/movie";
import { sweetToast } from "../sweetAlert/sweetAlert";
import { IMovieData, IVideoData } from "../api/movieAPIType";

interface IKnownError {
  message: string;
}

// 액션 영화 목록
export const fetchActionMovies = createAsyncThunk<
  IMovieData[] | undefined,
  void,
  { rejectValue: IKnownError }
>("movieDataSlice/fetchActionMovies", async (_, thunkAPI) => {
  try {
    const data = await getActionMovies();
    return data;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
  }
});

// 코미디 영화 목록
export const fetchComedyMovies = createAsyncThunk<
  IMovieData[] | undefined,
  void,
  { rejectValue: IKnownError }
>("movieDataSlice/fetchComedyMovies", async (_, thunkAPI) => {
  try {
    const data = await getComedyMovies();
    return data;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
  }
});

// 다큐멘터리 영화 목록
export const fetchDocumentaryMovies = createAsyncThunk<
  IMovieData[] | undefined,
  void,
  { rejectValue: IKnownError }
>("movieDataSlice/fetchDocumentaryMovies", async (_, thunkAPI) => {
  try {
    const data = await getDocumentaryMovies();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 호러 영화 목록
export const fetchHorrorMovies = createAsyncThunk<
  IMovieData[] | undefined,
  void,
  { rejectValue: IKnownError }
>("movieDataSlice/fetchHorrorMovies", async (_, thunkAPI) => {
  try {
    const data = await getHorrorMovies();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 로맨스 영화 목록
export const fetchRomanceMovies = createAsyncThunk<
  IMovieData[] | undefined,
  void,
  { rejectValue: IKnownError }
>("movieDataSlice/fetchRomanceMovies", async (_, thunkAPI) => {
  try {
    const data = await getRomanceMovies();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 인기 영화 목록
export const fetchTopRatedMovies = createAsyncThunk<
  IMovieData[] | undefined,
  void,
  { rejectValue: IKnownError }
>("movieDataSlice/fetchTopRatedMovies", async (_, thunkAPI) => {
  try {
    const data = await getTopRatedMovies();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 최신 영화 목록
export const fetchTrendingMovies = createAsyncThunk<
  IMovieData[] | undefined,
  void,
  { rejectValue: IKnownError }
>("movieDataSlice/fetchTrendingMovies", async (_, thunkAPI) => {
  try {
    const data = await getTrendingMovies();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 현재 상영중인 영화 목록에서 랜덤으로 하나의 영화를 불러옴
export const fetchNowPlayingMovie = createAsyncThunk<
IVideoData | undefined,
  void,
  { rejectValue: IKnownError }
>("movieData/fetchNowPlayingMovie", async (_, thunkAPI) => {
  try {
    const data = await getNowPlayingMovie();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 영화 비디오 데이터 => 기존 영화 데이터에 비디오 관련 데이터(상영시간, 관련영상 등)가 포함되어서 나옴
export const fetchVideoData = createAsyncThunk<
  IVideoData,
  IMovieData,
  { rejectValue: IKnownError }
>("movieDataSlice/fetchVideoData", async (movieData, thunkAPI) => {
  try {
    const data = await getVideoData(movieData.id);
    // 비디오 데이터가 일치하는 경우 비디오 데이터를 적용
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const movieDataSlice = createSlice({
  name: "movieDataSlice",
  initialState: {
    action: { data: [] as IMovieData[], error: "" },
    comedy: { data: [] as IMovieData[], error: "" },
    documentary: { data: [] as IMovieData[], error: "" },
    horror: { data: [] as IMovieData[], error: "" },
    romance: { data: [] as IMovieData[], error: "" },
    topRated: { data: [] as IMovieData[], error: "" },
    trending: { data: [] as IMovieData[], error: "" },
    videoData: { data: {} as IVideoData, error: "" },
    nowPlayingData: { data: {} as IVideoData, error: "" }
  },
  reducers: {
    // 비디오 데이터 초기화
    resetVideoData: (state) => {
      state.videoData = { data: {} as IVideoData, error: "" };
    },
    resetNowPlayingData: (state) => {
      state.nowPlayingData = { data: {} as IVideoData, error: "" };
    }
  },
  extraReducers: (builder) => {
    // 액션 영화 목록
    builder.addCase(fetchActionMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.action.data = action.payload;
      }
    });
    builder.addCase(fetchActionMovies.rejected, (state, action) => {
      if (action.payload) {
        state.action.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 코미디 영화 목록
    builder.addCase(fetchComedyMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.comedy.data = action.payload;
      }
    });
    builder.addCase(fetchComedyMovies.rejected, (state, action) => {
      if (action.payload) {
        state.comedy.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 다큐멘터리 영화 목록
    builder.addCase(fetchDocumentaryMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.documentary.data = action.payload;
      }
    });
    builder.addCase(fetchDocumentaryMovies.rejected, (state, action) => {
      if (action.payload) {
        state.documentary.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 호러 영화 목록
    builder.addCase(fetchHorrorMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.horror.data = action.payload;
      }
    });
    builder.addCase(fetchHorrorMovies.rejected, (state, action) => {
      if (action.payload) {
        state.horror.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 로맨스 영화 목록
    builder.addCase(fetchRomanceMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.romance.data = action.payload;
      }
    });
    builder.addCase(fetchRomanceMovies.rejected, (state, action) => {
      if (action.payload) {
        state.romance.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 인기 영화 목록
    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.topRated.data = action.payload;
      }
    });
    builder.addCase(fetchTopRatedMovies.rejected, (state, action) => {
      if (action.payload) {
        state.topRated.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 최신 영화 목록
    builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.trending.data = action.payload;
      }
    });
    builder.addCase(fetchTrendingMovies.rejected, (state, action) => {
      if (action.payload) {
        state.trending.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 영화 비디오 데이터
    builder.addCase(fetchVideoData.fulfilled, (state, action) => {
      if (action.payload) {
        state.videoData.data = action.payload;
      }
    });
    builder.addCase(fetchVideoData.rejected, (state, action) => {
      if (action.payload) {
        state.videoData.error = action.payload.message;
      }

      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 현재 상영중인 영화
    builder.addCase(fetchNowPlayingMovie.fulfilled, (state, action) => {
      if (action.payload) {
        state.nowPlayingData.data = action.payload;
      }
    });
    builder.addCase(fetchNowPlayingMovie.rejected, (state, action) => {
      if (action.payload) {
        state.nowPlayingData.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });
  }
});
