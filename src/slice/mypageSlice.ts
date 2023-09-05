import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirstLikeList, getLikeListPage } from "../firebase/likeAPI";
import {
  getFirstReviewMovieList,
  getReviewMovieListPage
} from "../firebase/reviewAPI";
import { sweetToast } from "../sweetAlert/sweetAlert";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";

interface IKnownError {
  message: string;
}

// 찜 목록 첫번째 페이지 불러오기
export const fetchFirstLikeList = createAsyncThunk<
  QuerySnapshot<DocumentData>,
  number,
  { rejectValue: IKnownError }
>("mypageSlice/fetchFirstLikeList", async (limitPage, thunkAPI) => {
  try {
    const res = await getFirstLikeList(limitPage);
    return res;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 찜 목록 페이지 불러오기
export const fetchLikeListPage = createAsyncThunk<
  QuerySnapshot<DocumentData>,
  { page: QueryDocumentSnapshot<DocumentData>; limitPage: number },
  { rejectValue: IKnownError }
>("mypageSlice/fetchLikeListPage", async ({ page, limitPage }, thunkAPI) => {
  try {
    const res = await getLikeListPage(page, limitPage);
    return res;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 리뷰 첫번째 페이지 불러오기
export const fetchFirstReviewMovieList = createAsyncThunk<
  QuerySnapshot<DocumentData> | undefined,
  number,
  { rejectValue: IKnownError }
>("mypageSlice/fetchFirstReviewMovieList", async (limitPage, thunkAPI) => {
  try {
    const res = await getFirstReviewMovieList(limitPage);
    return res;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 리뷰 목록 페이지 불러오기
export const fetchReviewMovieListPage = createAsyncThunk<
  QuerySnapshot<DocumentData> | undefined,
  { page: QueryDocumentSnapshot<DocumentData>; limitPage: number },
  { rejectValue: IKnownError }
>(
  "mypageSlice/fetchReviewMovieListPage",
  async ({ page, limitPage }, thunkAPI) => {
    try {
      const res = await getReviewMovieListPage(page, limitPage);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const mypageSlice = createSlice({
  name: "mypageSlice",
  initialState: {
    data: [] as DocumentData[],
    page: 1 as number | QueryDocumentSnapshot<DocumentData>,
    hasMore: false,
    limitPage: 20,
    isBlank: false,
    isLoading: false,
    error: ""
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
    }
  },
  extraReducers: (builder) => {
    // 찜 목록 첫번째 페이지 불러오기
    builder.addCase(fetchFirstLikeList.pending, (state) => {
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
      if (action.payload) {
        state.error = action.payload.message;
      }
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
      if (action.payload) {
        state.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 리뷰 목록 첫번째 페이지 불러오기
    builder.addCase(fetchFirstReviewMovieList.fulfilled, (state, action) => {
      state.hasMore = false;
      if (action.payload) {
        const data = action.payload.docs.map((el) => el.data());
        state.data = data;
        state.isBlank = data.length === 0;
        state.page = action.payload.docs[action.payload.docs.length - 1];
        state.hasMore = action.payload.docs.length === state.limitPage;
      }
    });
    builder.addCase(fetchFirstReviewMovieList.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 리뷰 목록 페이지 불러오기
    builder.addCase(fetchReviewMovieListPage.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload.docs.map((el) => el.data());
        state.data = [...state.data, ...data];
        state.page = action.payload.docs[action.payload.docs.length - 1];
        state.hasMore = action.payload.docs.length === state.limitPage;
      }
    });
    builder.addCase(fetchReviewMovieListPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });
  }
});
