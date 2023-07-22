import React, { useEffect } from "react";
import {
  Dim,
  ModalCard,
  ModalWrapper,
  Title,
  PasswordChangeBtn,
  PasswordChangeBtns,
  PasswordForm,
  PasswordInput,
  PasswordInputWrapper,
  PasswordLabel,
  InputDesc,
  InputDescList,
} from "./changePassword.style";
import { useValidationInput } from "../../hook/useValidationInput";
import ErrorMsg from "../../compoents/commons/errorMsg/ErrorMsg";
import { useMediaQuery } from "react-responsive";
import { changeUserPassword } from "../../firebase/auth";
import { isMobile } from "react-device-detect";
import { history } from "../../history/history";

export default function ChangePassword({ setIsChangePassword }) {
  const isMoblie = useMediaQuery({
    query: "(max-width:486px)",
  });
  const [
    currentPw,
    currentPwValid,
    onChangeCurrentPW,
  ] = useValidationInput(
    "",
    "password",
  );
  const [newPw,  newPwValid, onChangeNewPW] =
    useValidationInput(
      "",
      "password"
    );
  const [newPWchk, newPwChkValid, _, setNewPwChk, setNewPwChkValid] =
    useValidationInput(
      "",
      "password"
    );

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
    <ModalWrapper>
      <Dim onClick={onClickcancel}>
        <span className="a11y-hidden">dim</span>
      </Dim>
      <ModalCard>
        <Title>비밀번호 변경</Title>
        <PasswordForm onSubmit={onClickSubmit}>
          <PasswordInputWrapper>
            <PasswordLabel htmlFor="input-currentPw">
              현재 비밀번호
            </PasswordLabel>
            <PasswordInput
              id="input-currentPw"
              type="password"
              onChange={onChangeCurrentPW}
              maxLength={16}
            />
            {currentPwValid.errorMsg && (
              <ErrorMsg
                className={isMoblie ? "small" : ""}
                message={currentPwValid.errorMsg}
              />
            )}
          </PasswordInputWrapper>

          <PasswordInputWrapper>
            <PasswordLabel htmlFor="input-newPw">새 비밀번호</PasswordLabel>
            <PasswordInput
              id="input-newPw"
              type="password"
              onChange={onChangeNewPW}
              maxLength={16}
            />
            {newPwValid.errorMsg && (
              <ErrorMsg
                className={isMoblie ? "small" : ""}
                message={newPwValid.errorMsg}
              />
            )}
          </PasswordInputWrapper>

          <PasswordInputWrapper>
            <PasswordLabel htmlFor="input-newPwChk">
              새 비밀번호 확인
            </PasswordLabel>
            <PasswordInput
              id="input-newPwChk"
              type="password"
              onChange={onChangePasswordChk}
              maxLength={16}
            />
            {newPwChkValid.errorMsg && (
              <ErrorMsg
                className={isMoblie ? "small" : ""}
                message={newPwChkValid.errorMsg}
              />
            )}
          </PasswordInputWrapper>
          <InputDescList>
            <InputDesc>
              비밀번호는 8-16자로 영문+숫자+특수문자가 포함되어야 합니다.
            </InputDesc>
            <InputDesc>
              현재 비밀번호가 5회 이상 불일치 할 경우 비밀번호 변경과 로그인이 일시적으로 제한됩니다.
            </InputDesc>
            <InputDesc>
              비밀번호 변경 후 변경사항 확인을 위해 자동으로 로그아웃 됩니다.
            </InputDesc>
          </InputDescList>
          <PasswordChangeBtns>
            <PasswordChangeBtn type="submit">확인</PasswordChangeBtn>
            <PasswordChangeBtn type="button" onClick={onClickcancel}>
              취소
            </PasswordChangeBtn>
          </PasswordChangeBtns>
        </PasswordForm>
      </ModalCard>
    </ModalWrapper>
  );
}
