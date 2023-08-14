import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { login, logout, socialLogin } from "../firebase/loginAPI";
import { sweetToast } from "../sweetAlert/sweetAlert";
import {
  changeLoginUserPw,
  changePassword,
  findEmail,
} from "../firebase/findAccountAPI";
import { updateUserProfile } from "../firebase/profileAPI";

// 로그인
export const fetchLogin = createAsyncThunk(
  "userSlice/fetchLogin",
  async ({ emailValue, passwordValue }, thunkAPI) => {
    try {
      await login(emailValue, passwordValue);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 소셜 로그인
export const fetchSocialLogin = createAsyncThunk(
  "userSlice/fetchSocialLogin",
  async (type, thunkAPI) => {
    try {
      await socialLogin(type);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 로그아웃
export const fetchLogout = createAsyncThunk(
  "userSlice/fetchLogout",
  async (_, thunkAPI) => {
    try {
      await logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 이메일 찾기
export const fetchFindEmail = createAsyncThunk(
  "userSlice/fetchFindEmail",
  async ({ displayNameValue, phoneValue }, thunkAPI) => {
    try {
      const res = await findEmail(displayNameValue, phoneValue);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 비밀번호 찾기 시 비밀번호 변경
export const fetchChangePassowrd = createAsyncThunk(
  "userSlice/fetchChangePassowrd",
  async ({ emailValue, phoneValue }, thunkAPI) => {
    try {
      const res = await changePassword(emailValue, phoneValue);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 프로필 변경
export const fetchChangeProfile = createAsyncThunk(
  "userSlice/fetchChangeProfile",
  async ({ uploadImg, displayNameValue }, thunkAPI) => {
    try {
      await updateUserProfile(uploadImg, displayNameValue);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 로그인 상태 유저 비밀번호변경
export const fetchChangeLoginUserPw = createAsyncThunk(
  "userSlice/fetchChangeLoginUserPw",
  async ({ currentPw, newPw }, thunkAPI) => {
    try {
      await changeLoginUserPw(currentPw, newPw);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  // localstroage에 저장된 유저 데이터가 있을 경우 해당 데이터를 초기값으로 사용
  initialState: { data: JSON.parse(localStorage.getItem("user")) } || {
    data: "",
    isLoading: false,
    error: "",
    findEmailValue: "",
    findPasswordValue: "",
  },
  reducers: {
    // 유저 데이터 초기화
    resetUser: (state) => {
      state.data = "";
    },
    // 유저 데이터 업데이트
    refreshUser: (state) => {
      // 유저의 정보를 불러옴
      const user = getAuth().currentUser;
      // locatlstroage에 유저 정보 저장
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
      // 현재 유저 데이터를 data 저장
      state.data = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
    },
    // 이메일 및 비밀번호 찾은 값 초기화
    resetFindAccountValue: (state) => {
      state.findEmailValue = "";
      state.findPasswordValue = "";
    },
  },
  extraReducers: (builder) => {
    // 로그인 
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      // 현재 유저 정보를 불러옴
      const user = getAuth().currentUser;
      // 현재 유저 데이터를 data에 저장
      state.data = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      // localstorage에 유저 데이터를 저장
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.toString();
      // firebase에서 보내는 에러 메세지를 통해 로그인 발생하는 에러 메세지 출력
      if (state.error.includes("auth/invalid-email")) {
        sweetToast("유효하지 않은 이메일 형식 입니다!", "warning");
      } else if (state.error.includes("auth/missing-email")) {
        sweetToast("존재하지 않는 이메일 입니다!", "warning");
      } else if (state.error.includes("auth/user-not-found")) {
        sweetToast("일치 하는 로그인 정보가 없습니다!", "warning");
        return;
      } else if (state.error.includes("auth/wrong-password")) {
        sweetToast("아이디 또는 비밀번호가 일치하지 않습니다!", "warning");
        return;
      } else if (state.error.includes("auth/too-many-requests")) {
        sweetToast(
          "많은 로그인 시도로 로그인이 일시적으로 제한됩니다!",
          "warning"
        );
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
    });
    builder.addCase(fetchLogout.fulfilled, (state, action) => {
      state.data = "";
      localStorage.removeItem("user");
    });
    builder.addCase(fetchLogout.rejected, (state, action) => {
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
        "warning"
      );
    });

    // 소셜 로그인
    builder.addCase(fetchSocialLogin.rejected, (state, action) => {
      state.error = action.payload.toString();
      if (
        state.error.includes("auth/account-exists-with-different-credential")
      ) {
        sweetToast("이미 가입된 이메일 계정입니다!", "warning");
      }
    });

    // 이메일 찾기
    builder.addCase(fetchFindEmail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFindEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.findEmailValue = action.payload;
    });
    builder.addCase(fetchFindEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
        "warning"
      );
    });

    // 비밀번호 변경
    builder.addCase(fetchChangePassowrd.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChangePassowrd.fulfilled, (state, action) => {
      state.isLoading = false;
      state.findPasswordValue = action.payload;
    });
    builder.addCase(fetchChangePassowrd.rejected, (state, action) => {
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
        "warning"
      );
      state.isLoading = false;
    });


   // 프로필 변경
    builder.addCase(fetchChangeProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChangeProfile.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchChangeProfile.rejected, (state, action) => {
      sweetToast(
        "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
        "warning"
      );
      state.error = action.payload.message;
      state.isLoading = false;
    });

    // 로그인 상태 유저 비밀번호 변경
    builder.addCase(fetchChangeLoginUserPw.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChangeLoginUserPw.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchChangeLoginUserPw.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.toString();
      if (state.error.includes("auth/wrong-password")) {
        sweetToast("현재 비밀번호가 일치하지 않습니다!", "warning");
        return;
      } else if (state.error.includes("auth/too-many-requests")) {
        sweetToast(
          "비밀번호 변경 시도가 많아 일시적으로 비밀번호 변경이 제한됩니다!",
          "warning"
        );
        return;
      } else {
        sweetToast(
          "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
          "warning"
        );
      }
    });
  },
});
