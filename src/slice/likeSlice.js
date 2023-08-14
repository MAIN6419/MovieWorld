import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addLike, removeLike } from "../firebase/likeAPI";
import { getUser } from "../firebase/loginAPI";
import { sweetToast } from "../sweetAlert/sweetAlert";

// 찜 목록 추가
export const fetchAddLike = createAsyncThunk(
  "likeSlice/fetchAddLike",
  async (movieData, thunkAPI) => {
    try {
      addLike(movieData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 찜 목록 제거
export const fetchRemoveLike = createAsyncThunk(
  "likeSlice/fetchRemoveLike",
  async (movieId, thunkAPI) => {
    try {
      removeLike(movieId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 유저 찜 목록 불러오기
export const fetchLikeList = createAsyncThunk(
  "likeSlice/fetchLikeList",
  async (movieId, thunkAPI) => {
    try {
      const data = await getUser();
      return { data: data.likeList, movieId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const likeSlice = createSlice({
  name: "likeSlice",
  initialState: {
    islike: false,
    likeListMovieData: [],
    isExceed: false,
    error: "",
  },

  // likeSlice state 초기화
  reducers: {
    resetLike: (state) => {
      state.islike = false;
      state.likeListMovieData = [];
      state.isExceed = false;
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    // 찜 목록 추가
    builder.addCase(fetchAddLike.fulfilled, (state, action) => {
      state.islike = true;
    });
    builder.addCase(fetchAddLike.rejected, (state, action) => {
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 찜 목록 제거
    builder.addCase(fetchRemoveLike.fulfilled, (state, action) => {
      state.islike = false;
    });
    builder.addCase(fetchRemoveLike.rejected, (state, action) => {
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 유저 찜 목록 불러오기
    builder.addCase(fetchLikeList.fulfilled, (state, action) => {
      state.islike = !!action.payload.data.find(
        (id) => id === action.payload.movieId
      );
      // 찜 목록이 100개 이상 이면 isExceed 값을 true 바꿈
      // 100개 이상일 경우 찜 목록 추가를 제한시킴
      state.isExceed = action.payload.data.length > 100;
    });
    builder.addCase(fetchLikeList.rejected, (state, action) => {
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });
  },
});
