import React, { useEffect, useState } from "react";
import { useValidationInput } from "../../hook/useValidationInput";
import FindAccountUI from "./FindAccount.presenter";
import { changePassword, findEmail } from "../../firebase/findAccountAPI";
export default function FindAccount() {
  const [
    displayNameValue,
    displayNameValid,
    onChangeDisplayName,
    setDisplayNameValue,
    setDisplayNameValid,
  ] = useValidationInput("", "displayName", false);

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
    <FindAccountUI
      findPasswordMenu={findPasswordMenu}
      onClickFindEmailMenu={onClickFindEmailMenu}
      onClickFindPwMenu={onClickFindPwMenu}
      onClickFindPassword={onClickFindPassword}
      onClickFindEmail={onClickFindPassword}
      findEmailValue={findEmailValue}
      emailValue={emailValue}
      onChangeEmail={onChangeEmail}
      emailValid={emailValid}
      displayNameValue={displayNameValue}
      onChangeDisplayName={onChangeDisplayName}
      displayNameValid={displayNameValid}
      phoneValue={phoneValue}
      onChangePhone={onChangePhone}
      phoneValid={phoneValid}
      findPasswordValue={findPasswordValue}
      disabled={disabled}
    />
  );
}
