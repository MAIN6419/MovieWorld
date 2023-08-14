import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearchData, getTrendingMovies } from "../api/movie";
import { sweetToast } from "../sweetAlert/sweetAlert";

// 최신 영화 데이터 목록 불러오기
export const fetchTrendingPageMovies = createAsyncThunk(
  "trendingPageSlice/fetchTrendingPageMovies",
  async (page, thunkAPI) => {
    try {
      const data = await getTrendingMovies(page);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 영화 검색 목록 불러오기
export const fetchSearchMovies = createAsyncThunk(
  "searchSlice/fetchSearchMovies",
  async ({ keyword, page }, thunkAPI) => {
    try {
      const data = await getSearchData(keyword, page);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState: { data: [], page: 1, hasMore: true, isBlank: false, error: "" },
  reducers: {
    resetSearch: (state) => {
      state.data = [];
      state.page = 1;
      state.hasMore = true;
      state.isBlank = false;
    },
  },
  extraReducers: (builder) => {
    // 최신 영화 목록 페이지
    builder.addCase(fetchTrendingPageMovies.fulfilled, (state, action) => {
      // 기존 데이터에서 새로운 받은 데이터를 추가
      state.data = [...state.data, ...action.payload];
      // hasMore은 다음페이지 존재 여부
      // API에서 1page 당 20개의 데이터 제공
      // 20으로 나누었을때 나머지가 0이 아니라면 다음 페이지가 없으므로 이를 이용하여 다음페이지가 있는지를 파악
      state.hasMore = state.data.length % 20 === 0;
      state.page = state.page + 1;
    });
    builder.addCase(fetchTrendingPageMovies.rejected, (state, action) => {
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    builder.addCase(fetchSearchMovies.fulfilled, (state, action) => {
      state.isBlank = action.payload.length === 0;
      state.data = [...state.data, ...action.payload];
      state.hasMore = state.data.length % 20 === 0;
      state.page = state.page + 1;
    });
    builder.addCase(fetchSearchMovies.rejected, (state, action) => {
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });
  },
});
