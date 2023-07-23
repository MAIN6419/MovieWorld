import React, { useEffect, useState } from "react";
import {
  FindAccountBtn,
  FindAccountForm,
  FindInfoText,
  FindInfoWrapper,
  FormMenu,
  FormMenuBtn,
  FormMenuLi,
  LoginLink,
  Title,
  Wrapper,
} from "./findAccount.style";
import UserInput from "../../compoents/commons/userInput/UserInput";
import ErrorMsg from "../../compoents/commons/errorMsg/ErrorMsg";
import { useValidationInput } from "../../hook/useValidationInput";
import { changePassword, findEmail } from "../../firebase/auth";
export default function FindAccount() {
  const [
    displayNameValue,
    displayNameValid,
    onChangeDisplayName,
    setDisplayNameValue,
    setDisplayNameValid,
  ] = useValidationInput(
    "",
    "displayName",
    false
  );

  const [emailValue, emailValid, onChangeEmail, setEmailValue, setEmailValid] =
    useValidationInput("", "email", false);

  const [phoneValue, phoneValid, onChangePhone, setPhoneValue, setPhoneValid] =
    useValidationInput("", "phone", false);

  const [disabled, setDisabled] = useState(false);
  const [findPasswordMenu, setFindPasswordMenu] = useState(false);
  const [findEmailValue, setFindEmailValue] = useState("");
  const [findPasswordValue, setFindPasswordValue] = useState("");

  const onClickFindEmailMenu = () => {
    setFindPasswordMenu(false);
    setDisabled(false);
    setFindPasswordValue("");
    setEmailValue("");
    setEmailValid({ errorMsg: "", valid: false });
    setPhoneValue("");
    setPhoneValid({ errorMsg: "", valid: false });
  };

  const onClickFindPwMenu = () => {
    setFindPasswordMenu(true);
    setDisabled(false);
    setFindEmailValue("");
    setDisplayNameValue("");
    setDisplayNameValid({ errorMsg: "", valid: false });
    setPhoneValue("");
    setPhoneValid({ errorMsg: "", valid: false });
  };

  const onClickFindEmail = async (e) => {
    e.preventDefault();
    const res = await findEmail(displayNameValue, phoneValue);
    if (res) {
      setFindEmailValue(res);
    }
    setDisplayNameValue("");
    setPhoneValue("");
  };

  const onClickFindPassword = async (e) => {
    e.preventDefault();
    const res = await changePassword(emailValue, phoneValue);
    if (res) {
      setFindPasswordValue(res);
    }
    setEmailValue("");
    setPhoneValue("");
  };

  // 전체 input이 유효하다면 버튼 활성화
  useEffect(() => {
    if (findPasswordMenu) {
      if (emailValid.valid && phoneValid.valid) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      if (displayNameValid.valid && phoneValid.valid) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [displayNameValid, emailValid, phoneValid]);

  return (
    <Wrapper>
      <Title className="a11y-hidden">이메일 비밀번호 찾기</Title>
      <FormMenu>
        <FormMenuLi active={!findPasswordMenu}>
          <FormMenuBtn active={!findPasswordMenu} type="button" onClick={onClickFindEmailMenu}>
            이메일 찾기
          </FormMenuBtn>
        </FormMenuLi>
        <FormMenuLi active={findPasswordMenu}>
          <FormMenuBtn active={findPasswordMenu} type="button" onClick={onClickFindPwMenu}>
            비밀번호 찾기
          </FormMenuBtn>
        </FormMenuLi>
      </FormMenu>
      <FindAccountForm
        onSubmit={findPasswordMenu ? onClickFindPassword : onClickFindEmail}
      >
        {findEmailValue || findPasswordValue ? (
          <FindInfoWrapper>
            <FindInfoText>
              {findEmailValue
                ? `찾으시는 이메일은 ${findEmailValue} 입니다.`
                : "가입된 메일로 비밀번호 변경 메일을 발송하였습니다.\n메일이 없을 경우 스팸 메일함을 확인해주세요."}
            </FindInfoText>
          </FindInfoWrapper>
        ) : (
          <>
            {findPasswordMenu ? (
              <>
                <UserInput
                  type="text"
                  label={"이메일"}
                  id={"input-email"}
                  placeholder={"이메일을 입력해주세요."}
                  value={emailValue}
                  onChange={onChangeEmail}
                />
                {emailValid.errorMsg && (
                  <ErrorMsg message={emailValid.errorMsg} />
                )}
              </>
            ) : (
              <>
                <UserInput
                  label={"닉네임"}
                  placeholder={"4-10자 영문, 영문+숫자 포함"}
                  type={"text"}
                  value={displayNameValue}
                  onChange={onChangeDisplayName}
                  minLength={4}
                  maxLength={10}
                />
                {displayNameValid.errorMsg && (
                  <ErrorMsg message={displayNameValid.errorMsg} />
                )}
              </>
            )}
            <UserInput
              label={"휴대폰"}
              placeholder={"휴대폰 번호 ( - 제외 )"}
              type={"text"}
              value={phoneValue
                .replace(/[^0-9]/g, "")
                .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
              onChange={onChangePhone}
              maxLength={13}
            />
            {phoneValid.errorMsg && <ErrorMsg message={phoneValid.errorMsg} />}
          </>
        )}
        {findEmailValue || findPasswordValue ? (
          <LoginLink to="/login">로그인 하러가기</LoginLink>
        ) : (
          <FindAccountBtn type="submit" disabled={disabled}>
            {findPasswordMenu ? "비밀번호 찾기" : "이메일 찾기"}
          </FindAccountBtn>
        )}
      </FindAccountForm>
    </Wrapper>
  );
}
