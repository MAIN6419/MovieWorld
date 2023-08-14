import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirstLikeList, getLikeListPage } from "../firebase/likeAPI";
import {
  getFirstReviewMovieList,
  getReviewMovieListPage,
} from "../firebase/reviewAPI";
import { sweetToast } from "../sweetAlert/sweetAlert";

// 찜 목록 첫번째 페이지 불러오기
export const fetchFirstLikeList = createAsyncThunk(
  "mypageSlice/fetchFirstLikeList",
  async (limitPage) => {
    const res = await getFirstLikeList(limitPage);
    return res;
  }
);

// 찜 목록 페이지 불러오기
export const fetchLikeListPage = createAsyncThunk(
  "mypageSlice/fetchLikeListPage",
  async ({ page, limitPage }) => {
    const res = await getLikeListPage(page, limitPage);
    return res;
  }
);

// 리뷰 첫번째 페이지 불러오기
export const fetchFirstReviewMovieList = createAsyncThunk(
  "mypageSlice/fetchFirstReviewMovieList",
  async (limitPage) => {
    const res = await getFirstReviewMovieList(limitPage);
    return res;
  }
);

// 리뷰 목록 페이지 불러오기
export const fetchReviewMovieListPage = createAsyncThunk(
  "mypageSlice/fetchReviewMovieListPage",
  async ({ page, limitPage }) => {
    const res = await getReviewMovieListPage(page, limitPage);
    return res;
  }
);

export const mypageSlice = createSlice({
  name: "mypageSlice",
  initialState: {
    data: [],
    page: 1,
    hasMore: false,
    limitPage: 20,
    isBlank: false,
    isLoading: false,
    error: "",
  },
  reducers: {
    // mypageData 변경을 위해 사용
    // movieInfo 창에서 찜 목록을 삭제하면 mypageData를 삭제 혹은 찜 목록을 추가하면 mypageData에 추가
    // 혹은 movieInfo 창에서 리뷰 목록을 삭제하면 mypageData를 삭제 혹은 리뷰를 작성하면 mypagData에 추가
    setMypageData: (state, action) => {
      state.data = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 찜 목록 첫번째 페이지 불러오기
    builder.addCase(fetchFirstLikeList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFirstLikeList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasMore = false;
      const data = action.payload.docs.map((el) => el.data());
      state.data = data;
      state.isBlank = data.length === 0;
      state.page = action.payload.docs[action.payload.docs.length - 1];
      state.hasMore = action.payload.docs.length === state.limitPage;
    });
    builder.addCase(fetchFirstLikeList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 찜 목록 페이지 불러오기
    builder.addCase(fetchLikeListPage.fulfilled, (state, action) => {
      const data = action.payload.docs.map((el) => el.data());
      state.data = [...state.data, ...data];
      state.page = action.payload.docs[action.payload.docs.length - 1];
      state.hasMore = action.payload.docs.length === state.limitPage;
    });
    builder.addCase(fetchLikeListPage.rejected, (state, action) => {
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 리뷰 목록 첫번째 페이지 불러오기
    builder.addCase(fetchFirstReviewMovieList.fulfilled, (state, action) => {
      state.hasMore = false;
      const data = action.payload.docs.map((el) => el.data());
      state.data = data;
      state.isBlank = data.length === 0;
      state.page = action.payload.docs[action.payload.docs.length - 1];
      state.hasMore = action.payload.docs.length === state.limitPage;
    });
    builder.addCase(fetchFirstReviewMovieList.rejected, (state, action) => {
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 리뷰 목록 페이지 불러오기
    builder.addCase(fetchReviewMovieListPage.fulfilled, (state, action) => {
      const data = action.payload.docs.map((el) => el.data());
      state.data = [...state.data, ...data];
      state.page = action.payload.docs[action.payload.docs.length - 1];
      state.hasMore = action.payload.docs.length === state.limitPage;
    });
    builder.addCase(fetchReviewMovieListPage.rejected, (state, action) => {
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });
  },
});
