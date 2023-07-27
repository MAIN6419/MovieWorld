import React, { useEffect } from "react";

import { useValidationInput } from "../../hook/useValidationInput";

import { useMediaQuery } from "react-responsive";
import { changeUserPassword } from "../../firebase/findAccountAPI";
import { isMobile } from "react-device-detect";
import { history } from "../../history/history";
import ChangePasswordUI from "./ChangePassword.presenter";

export default function ChangePassword({ setIsChangePassword }) {
  const isMoblie = useMediaQuery({
    query: "(max-width:486px)",
  });
  const [currentPw, currentPwValid, onChangeCurrentPW] = useValidationInput(
    "",
    "password"
  );
  const [newPw, newPwValid, onChangeNewPW] = useValidationInput("", "password");
  const [newPWchk, newPwChkValid, _, setNewPwChk, setNewPwChkValid] =
    useValidationInput("", "password");

  // 비밀번호 확인 onChange 별도 생성 => useValidInput에서 처리하지 못하기 때문
  const onChangePasswordChk = (e) => {
    setNewPwChk(e.target.value.trim());
    if (newPw !== e.target.value) {
      setNewPwChkValid({
        errorMsg: "비밀번호가 일치하지 않습니다.",
        valid: false,
      });
    } else {
      setNewPwChkValid({ errorMsg: "", valid: true });
    }
  };

  const onClickcancel = () => {
    setIsChangePassword(false);
    document.body.style.overflow = "auto";
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    changeUserPassword(currentPw, newPw);
  };

  useEffect(() => {
    if (isMobile) {
      window.history.pushState(null, "", window.location.href);

      window.onpopstate = () => {
        history.go(1);
        this.handleGoback();
      };
      window.onpopstate = () => {
        onClickcancel();
      };
    }
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
    />
  );
}
