import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addReview,
  addReviewData,
  editReview,
  getFirstReviewList,
  getReviewListPage,
  removeReview,
  reportReview
} from "../firebase/reviewAPI";
import { getUser } from "../firebase/loginAPI";
import { sweetToast } from "../sweetAlert/sweetAlert";
import {
  DocumentData,
  OrderByDirection,
  QuerySnapshot
} from "firebase/firestore";
import { IVideoData } from "../api/movieAPIType";
import { IReviewData } from "../firebase/firebaseAPIType";

interface IKnownError {
  message: string;
}

interface IFilter {
  target: string;
  order: OrderByDirection | undefined;
}

// 리뷰한 영화인지 확인
export const fetchIsReview = createAsyncThunk<
  boolean,
  number,
  { rejectValue: IKnownError }
>("reviewSlice/fetchIsReview", async (movieId, thunkAPI) => {
  try {
    const user = await getUser();
    const isReview: number | undefined = (user?.reviewList as number[]).find(
      (id: number) => id === (movieId as any)
    );
    return !!isReview;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 리뷰 목록 첫번째 페이지 불러오기
export const fetchFirstReviewData = createAsyncThunk<
  { res: QuerySnapshot<DocumentData>; data: DocumentData[] },
  { movieId: number; limitPage: number; filter: IFilter },
  { rejectValue: IKnownError }
>(
  "reviewSlice/fetchFirstReviewData",
  async ({ movieId, limitPage, filter }, thunkAPI) => {
    try {
      const { res, data } = await getFirstReviewList(
        movieId,
        limitPage,
        filter
      );
      return { res, data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 리뷰 목록 페이지 불러오기
export const fetchReviewListPage = createAsyncThunk<
  { res: QuerySnapshot<DocumentData>; data: DocumentData[] },
  { movieId: number; page: QuerySnapshot<DocumentData>; filter: IFilter },
  { rejectValue: IKnownError }
>(
  "reviewSlice/fetchReviewListPage",
  async ({ movieId, page, filter }, thunkAPI) => {
    try {
      const { res, data } = await getReviewListPage(movieId, page, filter);
      return { res, data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 리뷰 작성 후 기존 데이터 유지
// 리뷰 작성 후 무한 스크롤로 불러온 기존 데이터에 작성한 리뷰 데이터를 추가
// 리뷰 작성 후에도 스크롤 유지 및 기존 데이터 유지
export const fetchAddReviewData = createAsyncThunk<
  { res: QuerySnapshot<DocumentData>; data: DocumentData[] },
  { movieId: number; page: QuerySnapshot<DocumentData>; filter: IFilter },
  { rejectValue: IKnownError }
>(
  "reviewSlice/fetchAddReviewData",
  async ({ movieId, page, filter }, thunkAPI) => {
    try {
      const { data, res } = await addReviewData(movieId, page, filter);
      return { data, res };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 리뷰 추가
export const fetchAddReview = createAsyncThunk<
  void,
  {
    movieData: IVideoData;
    newReviewData: Pick<
      IReviewData,
      "id" | "uid" | "rating" | "contents" | "createdAt" | "spoiler"
    >;
  },
  { rejectValue: IKnownError }
>(
  "reviewSlice/fetchAddReview",
  async ({ movieData, newReviewData }, thunkAPI) => {
    try {
      await addReview(movieData, newReviewData);
      sweetToast("리뷰가 작성되었습니다.", "success");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 리뷰 수정
export const fetchEditReview = createAsyncThunk<
  IReviewData[],
  {
    movieId: number;
    editData: Pick<IReviewData, "id" | "contents" | "rating" | "spoiler">;
    newReviewData: IReviewData[];
  },
  { rejectValue: IKnownError }
>(
  "reviewSlice/fetchEditReview",
  async ({ movieId, editData, newReviewData }, thunkAPI) => {
    try {
      await editReview(movieId, editData);
      return newReviewData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 리뷰 삭제
export const fetchRemoveReview = createAsyncThunk<
  string,
  { movieId: number; reviewId: string },
  { rejectValue: IKnownError }
>("reviewSlice/fetchRemoveReview", async ({ movieId, reviewId }, thunkAPI) => {
  try {
    await removeReview(movieId, reviewId);
    return reviewId;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 리뷰 신고
export const fetchReportReview = createAsyncThunk<
  void,
  { movieId: number; reviewData: IReviewData },
  { rejectValue: IKnownError }
>(
  "reviewSlice/fetchReportReview",
  async ({ movieId, reviewData }, thunkAPI) => {
    try {
      await reportReview(movieId, reviewData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const reviewSlice = createSlice({
  name: "revieSlice",
  initialState: {
    reviewData: [] as IReviewData[],
    isReview: false,
    page: 1 as  any ,
    hasMore: false,
    limitPage: 5,
    filter: { target: "createdAt", order: "desc" as OrderByDirection | undefined },
    error: ""
  },
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 리뷰한 영화인지 확인
    builder.addCase(fetchIsReview.fulfilled, (state, action) => {
      state.isReview = action.payload;
    });
    builder.addCase(fetchIsReview.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 리뷰 목록 첫번째 페이지 불러오기
    builder.addCase(fetchFirstReviewData.fulfilled, (state, action) => {
      state.reviewData = action.payload.data as IReviewData[];
      state.hasMore = state.reviewData.length % state.limitPage === 0;
      state.page = action.payload.res.docs[action.payload.res.docs.length - 1];
    });
    builder.addCase(fetchFirstReviewData.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 리뷰 목록 페이지 불러오기
    builder.addCase(fetchReviewListPage.fulfilled, (state, action) => {
      state.reviewData = [
        ...state.reviewData,
        ...action.payload.data
      ] as IReviewData[];
      state.hasMore = state.reviewData.length % state.limitPage === 0;
      state.page = action.payload.res.docs[action.payload.res.docs.length - 1];
    });
    builder.addCase(fetchReviewListPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
    });

    // 리뷰 추가
    builder.addCase(fetchAddReview.fulfilled, (state) => {
      state.isReview = true;
    });
    builder.addCase(fetchAddReview.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 리뷰 작성 후 기존 데이터 유지
    builder.addCase(fetchAddReviewData.fulfilled, (state, action) => {
      state.reviewData = action.payload.data as IReviewData[];
      state.hasMore = (state.reviewData.length - 1) % state.limitPage === 0;
      state.page = action.payload.res.docs[action.payload.res.docs.length - 1];
      sweetToast("리뷰가 작성되었습니다.", "success");
    });
    builder.addCase(fetchAddReviewData.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 리뷰 수정
    builder.addCase(fetchEditReview.fulfilled, (state, action) => {
      state.reviewData = action.payload as IReviewData[];
      sweetToast("수정이 완료되었습니다.", "success");
    });
    builder.addCase(fetchEditReview.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 리뷰 삭제
    builder.addCase(fetchRemoveReview.fulfilled, (state, action) => {
      state.reviewData = [
        ...state.reviewData.filter((data) => data.id !== action.payload)
      ];
      state.isReview = false;
      sweetToast("삭제가 완료되었습니다.", "success");
    });
    builder.addCase(fetchRemoveReview.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 리뷰 신고
    builder.addCase(fetchReportReview.fulfilled, () => {
      sweetToast("신고가 완료되었습니다.", "success");
    });
    builder.addCase(fetchReportReview.rejected, (state, action) => {
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
