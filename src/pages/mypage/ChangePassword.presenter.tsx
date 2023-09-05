import React from "react";
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
  InputDescList
} from "./changePassword.style";
import ErrorMsg from "../../compoents/commons/errorMsg/ErrorMsg";
import { optKeyboardFocus } from "../../libray/optKeyBoard";

interface IProps {
  onClickcancel: () => void;
  onClickSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onChangeCurrentPW: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentPwValid: {
    errorMsg: string;
    valid: boolean;
  };
  isMoblie: boolean;
  onChangeNewPW: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newPwValid: {
    errorMsg: string;
    valid: boolean;
  };
  onChangePasswordChk: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newPwChkValid:  {
    errorMsg: string;
    valid: boolean;
  };
  currentPwRef: React.RefObject<HTMLInputElement>;
  submitBtnRef: React.RefObject<HTMLButtonElement>;
  cancelBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function ChangePasswordUI({
  onClickcancel,
  onClickSubmit,
  onChangeCurrentPW,
  currentPwValid,
  isMoblie,
  onChangeNewPW,
  newPwValid,
  onChangePasswordChk,
  newPwChkValid,
  currentPwRef,
  submitBtnRef,
  cancelBtnRef
}: IProps) {
  return (
    <ModalWrapper>
      <Dim onClick={onClickcancel}>
        <span className='a11y-hidden'>dim</span>
      </Dim>
      <ModalCard
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            onClickcancel();
          }
        }}
      >
        <Title>비밀번호 변경</Title>
        <PasswordForm onSubmit={onClickSubmit}>
          <PasswordInputWrapper>
            <PasswordLabel htmlFor='input-currentPw'>
              현재 비밀번호
            </PasswordLabel>
            <PasswordInput
              id='input-currentPw'
              type='password'
              onChange={onChangeCurrentPW}
              maxLength={16}
              ref={currentPwRef}
              onKeyDown={(e) => {
                optKeyboardFocus(e, cancelBtnRef.current);
              }}
            />
            {currentPwValid.errorMsg && (
              <ErrorMsg
                className={isMoblie ? "small" : ""}
                message={currentPwValid.errorMsg}
              />
            )}
          </PasswordInputWrapper>

          <PasswordInputWrapper>
            <PasswordLabel htmlFor='input-newPw'>새 비밀번호</PasswordLabel>
            <PasswordInput
              id='input-newPw'
              type='password'
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
            <PasswordLabel htmlFor='input-newPwChk'>
              새 비밀번호 확인
            </PasswordLabel>
            <PasswordInput
              id='input-newPwChk'
              type='password'
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
              현재 비밀번호가 5회 이상 불일치 할 경우 비밀번호 변경과 로그인이
              일시적으로 제한됩니다.
            </InputDesc>
            <InputDesc>
              비밀번호 변경 후 변경사항 확인을 위해 자동으로 로그아웃 됩니다.
            </InputDesc>
          </InputDescList>
          <PasswordChangeBtns>
            <PasswordChangeBtn type='submit' ref={submitBtnRef}>
              확인
            </PasswordChangeBtn>
            <PasswordChangeBtn
              type='button'
              onClick={onClickcancel}
              ref={cancelBtnRef}
              onKeyDown={(e) => {
                optKeyboardFocus(e, submitBtnRef.current, currentPwRef.current);
              }}
            >
              취소
            </PasswordChangeBtn>
          </PasswordChangeBtns>
        </PasswordForm>
      </ModalCard>
    </ModalWrapper>
  );
}
