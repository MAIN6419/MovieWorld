import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userSlice } from "../slice/userSlice";
import { searchSlice } from "../slice/searchSlice";
import { movieDataSlice } from "../slice/movieData.slice";
import { likeSlice } from "../slice/likeSlice";
import { reviewSlice } from "../slice/reviewSlice";
import { signupSlice } from "../slice/signupSlice";
import { mypageSlice } from "../slice/mypageSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    movieData: movieDataSlice.reducer,
    search: searchSlice.reducer,
    like: likeSlice.reducer,
    review: reviewSlice.reducer,
    login: reviewSlice.reducer,
    signup: signupSlice.reducer,
    mypage: mypageSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
