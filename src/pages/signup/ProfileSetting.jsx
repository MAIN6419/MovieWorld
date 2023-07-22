import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import UserInput from "../../compoents/commons/userInput/UserInput";
import {
  InputWrapper,
  PrevBtn,
  ProfileImg,
  ProfileImgButton,
  ProfileImgDesc,
  ProfileImgDescList,
  ProfileImgInput,
  ProfileImgLabel,
  ProfileImgResetBtn,
  ProfileImgWrapper,
  SignupBtn,
  SignupForm,
} from "./signup.style";
import ErrorMsg from "../../compoents/commons/errorMsg/ErrorMsg";
import { signup } from "../../firebase/auth";
import { useValidationInput } from "../../hook/useValidationInput";
import { UserContext } from "../../context/userContext";


export default function ProfileSetting({
  setIsLoading,
  emailValue,
  passwordValue,
  phoneValue,
  setProfile,
  setPercentage,
  setNext,
}) {
  const { refreshUser } = useContext(UserContext);
  const imgInputRef = useRef();
  // 회원가입 버튼 활성화 상태 관리
  const [disabled, setDisabled] = useState(true);
  const [previewImg, setPreviewImg] = useState("assets/defaultProfile.png");
  const [uploadImg, setUploadImg] = useState("");
  const [
    displayNameValue,
    displayNameValid,
    onChangeNickName,
  ] = useValidationInput(
    "",
    "displayName",
    true
  );

  const imgValidation = (file) => {
    // 파일 확인
    if (!file) {
      return false;
    }
    // 파일 사이즈 확인
    if (file.size > 1024 * 1024 * 10) {
      alert("이미지 파일의 크기를 초과하였습니다.(최대 10MB)");
      return false;
    }
    // 이미지 지원 형식 확인
    if (
      !file.name.includes("png") &&
      !file.name.includes("jpg") &&
      !file.name.includes("jpeg") &&
      !file.name.includes("bmp") &&
      !file.name.includes("tif") &&
      !file.name.includes("heic")
    ) {
      alert(
        "이미지 형식을 확인해 주세요!\n(지원형식 : .jpg, .png, .jpeg,.bmp, .tif, *.heic)"
      );
      return false;
    }
    // 모두 만족 한다면 true 반환
    return true;
  };

  const onChangeImg = (e) => {
    const file = e.target.files[0];
    const isValid = imgValidation(file);
    if (!isValid) return;
    setPreviewImg(URL.createObjectURL(file));
    setUploadImg(file);
  };

  const onClickImgReset = () => {
    setPreviewImg("assets/defaultProfile.png");
    setUploadImg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signup(
      displayNameValue,
      uploadImg,
      emailValue,
      passwordValue,
      phoneValue.replace(/-/g, "")
    );
    refreshUser();
    setIsLoading(false);
  };

  useEffect(() => {
    if (displayNameValid.valid) {
      setDisabled(false);
      setProfile(true);
      setPercentage("100%");
    } else {
      setDisabled(true);
      setPercentage("50%");
      setProfile(false);
    }
  }, [displayNameValid]);

  return (
    <SignupForm onSubmit={handleSubmit}>
      <ProfileImgWrapper>
        <ProfileImgLabel className="a11y-hidden">이미지</ProfileImgLabel>
        <ProfileImgInput
          type="file"
          ref={imgInputRef}
          className="a11y-hidden"
          onChange={onChangeImg}
          accept="image/jpg,image/jpeg, image/png, image/bmp, image/tif, image/heic"
        />
        <ProfileImgButton
          type="button"
          onClick={() => imgInputRef.current.click()}
        >
          <ProfileImg src={previewImg} />
        </ProfileImgButton>
        <ProfileImgResetBtn type="button" onClick={onClickImgReset}>
          <span className="a11y-hidden">초기화</span>
        </ProfileImgResetBtn>
        <ProfileImgDescList>
          <ProfileImgDesc>
            이미지를 설정하지 않을 경우 기본 이미지가 적용됩니다.
          </ProfileImgDesc>
          <ProfileImgDesc>
            업로드 가능한 최대 이미지 용량은 10MB 입니다.
          </ProfileImgDesc>
          <ProfileImgDesc>
            .jpg, .png, .jpeg,.bmp, .tif, *.heic 이미지 형식을 지원합니다.
          </ProfileImgDesc>
        </ProfileImgDescList>
      </ProfileImgWrapper>
      <InputWrapper>
        <UserInput
          type="text"
          label={"닉네임"}
          id={"input-nickname"}
          placeholder={"4-10자 영문, 영문 + 숫자"}
          value={displayNameValue}
          onChange={onChangeNickName}
          minLength={4}
          maxLength={10}
        />
        {displayNameValid.errorMsg && (
          <ErrorMsg message={displayNameValid.errorMsg} />
        )}
      </InputWrapper>

      <SignupBtn
        type="submit"
        disabled={disabled}
      >
        회원가입
      </SignupBtn>
      <PrevBtn
        className="prev"
        type="button"
        onClick={() => {
          setProfile(false);
          setPercentage("50%");
          setNext(false);
        }}
      >
        이전
      </PrevBtn>
    </SignupForm>
  );
}
