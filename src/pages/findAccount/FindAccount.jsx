import React, { useEffect, useState } from "react";
import {
  FindAccountBtn,
  FindAccountForm,
  FindInfoText,
  FindInfoWrapper,
  FormMenu,
  FormMenuBtn,
  FormMenuLi,
  Title,
  Wrapper,
} from "./findAccount.style";
import UserInput from "../../compoents/commons/userInput/UserInput";
import ErrorMsg from "../../compoents/commons/errorMsg/ErrorMsg";
import { useValidationInput } from "../../hook/useValidationInput";
export default function FindAccount() {
  const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const nicknameReg = /^[a-zA-z0-9]{4,10}$/;
  const phoneReg = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;

  const [
    nicknameValue,
    setNicknameValue,
    nicknameValid,
    setNicknameValid,
    onChangeNickname,
  ] = useValidationInput(
    "",
    nicknameReg,
    "4-10자 영문, 영문+숫자를 입력해주세요."
  );

  const [emailValue, setEmailValue, emailValid, setEmailValid, onChangeEmail] =
    useValidationInput("", emailReg, "유효한 이메일을 입력해주세요.");

  const [phoneValue, setPhoneValue, phoneValid, setPhoneValid, onChangePhone] =
    useValidationInput("", phoneReg, "유효한 휴대폰 번호를 입력해주세요.");

  const [disabled, setDisabled] = useState(false);
  const [findPasswordMenu, setFindPasswordMenu] = useState(false);
  const [findEmail, setFindEmail] = useState("");
  const [findPassword, setFindPassword] = useState("");

  const onClickFindEmailMenu = () => {
    setFindPasswordMenu(false);
    setDisabled(false);
    setFindPassword("");
    setEmailValue("");
    setEmailValid({ errorMsg: "", valid: false });
    setPhoneValue("");
    setPhoneValid({ errorMsg: "", valid: false });
  };

  const onClickFindPwMenu = () => {
    setFindPasswordMenu(true);
    setDisabled(false);
    setFindEmail("");
    setNicknameValue("");
    setNicknameValid({ errorMsg: "", valid: false });
    setPhoneValue("");
    setPhoneValid({ errorMsg: "", valid: false });
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
      if (nicknameValid.valid && phoneValid.valid) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [nicknameValid, emailValid, phoneValid]);

  return (
    <Wrapper>
      <Title className="a11y-hidden">이메일 비밀번호 찾기</Title>
      <FormMenu>
        <FormMenuLi active={!findPasswordMenu}>
          <FormMenuBtn type="button" onClick={onClickFindEmailMenu}>
            이메일 찾기
          </FormMenuBtn>
        </FormMenuLi>
        <FormMenuLi active={findPasswordMenu}>
          <FormMenuBtn type="button" onClick={onClickFindPwMenu}>
            비밀번호 찾기
          </FormMenuBtn>
        </FormMenuLi>
      </FormMenu>
      <FindAccountForm>
        {findEmail || findPassword ? (
          <FindInfoWrapper>
            <FindInfoText>
              {findEmail
                ? `찾으시는 이메일은 ${findEmail}입니다.`
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
                  placeholder={"Email"}
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
                  placeholder={"Nickname"}
                  type={"text"}
                  value={nicknameValue}
                  onChange={onChangeNickname}
                  minLength={4}
                  maxLength={10}
                />
                {nicknameValid.errorMsg && (
                  <ErrorMsg message={nicknameValid.errorMsg} />
                )}
              </>
            )}
            <UserInput
              label={"휴대폰"}
              placeholder={"Phone ( - 제외 )"}
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

        <FindAccountBtn disabled={disabled}>
          {findPasswordMenu ? "비밀번호 찾기" : "이메일 찾기"}
        </FindAccountBtn>
      </FindAccountForm>
    </Wrapper>
  );
}
