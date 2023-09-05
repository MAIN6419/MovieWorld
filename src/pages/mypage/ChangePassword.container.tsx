import React, { useEffect, useRef } from "react";

import { useValidationInput } from "../../hook/useValidationInput";

import { useMediaQuery } from "react-responsive";
import { isMobile } from "react-device-detect";
import { history } from "../../history/history";
import ChangePasswordUI from "./ChangePassword.presenter";
import { useDispatch } from "react-redux";
import { fetchChangeLoginUserPw, userSlice } from "../../slice/userSlice";
import { mypageSlice } from "../../slice/mypageSlice";
import { AppDispatch } from "../../store/store";

interface IProps {
  setIsChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChangePassword({ setIsChangePassword }: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isMoblie = useMediaQuery({
    query: "(max-width:486px)"
  });
  const currentPwRef = useRef<HTMLInputElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  const [currentPw, currentPwValid, onChangeCurrentPW] = useValidationInput(
    "",
    "password",
    true
  );
  const [newPw, newPwValid, onChangeNewPW] = useValidationInput(
    "",
    "password",
    true
  );
  const [, newPwChkValid, , setNewPwChk, setNewPwChkValid] = useValidationInput(
    "",
    "password",
    true
  );

  // 비밀번호 확인 onChange 별도 생성 => useValidInput에서 처리하지 못하기 때문
  const onChangePasswordChk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPwChk(e.target.value.trim());
    if (newPw !== e.target.value) {
      setNewPwChkValid({
        errorMsg: "비밀번호가 일치하지 않습니다.",
        valid: false
      });
    } else {
      setNewPwChkValid({ errorMsg: "", valid: true });
    }
  };

  const onClickcancel = () => {
    setIsChangePassword(false);
    document.body.style.overflow = "auto";
  };

  const onClickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(mypageSlice.actions.setIsLoading(true));
    await dispatch(fetchChangeLoginUserPw({ currentPw, newPw }));
    dispatch(mypageSlice.actions.setIsLoading(false));
    dispatch(userSlice.actions.resetUser());
  };

  useEffect(() => {
    if (isMobile) {
      window.history.pushState(null, "", window.location.href);

      window.onpopstate = () => {
        history.go(1);
        history.back();
      };
      window.onpopstate = () => {
        onClickcancel();
      };
    }
  }, []);

  useEffect(() => {
    currentPwRef.current && currentPwRef.current.focus();
  }, []);

  return (
    <ChangePasswordUI
      onClickcancel={onClickcancel}
      onClickSubmit={onClickSubmit}
      onChangeCurrentPW={onChangeCurrentPW}
      currentPwValid={currentPwValid}
      isMoblie={isMoblie}
      onChangeNewPW={onChangeNewPW}
      newPwValid={newPwValid}
      onChangePasswordChk={onChangePasswordChk}
      newPwChkValid={newPwChkValid}
      currentPwRef={currentPwRef}
      submitBtnRef={submitBtnRef}
      cancelBtnRef={cancelBtnRef}
    />
  );
}
