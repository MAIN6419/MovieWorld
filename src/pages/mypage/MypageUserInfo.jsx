import React, { useState } from "react";
import {
  ProfileEmail,
  ProfileImg,
  ProfileInfo,
  ProfileMenu,
  ProfileMenuBtn,
  ProfileMenuItem,
  ProfileNameWrapper,
  ProfileNickname,
  ProfileTitle,
  ProfileWrapper,
} from "./mypage.style";
import { resolveWebp } from "../../libray/webpSupport";
import ChangeProfile from "./ChangeProfile.container";
import ChangePassword from "./ChangePassword.container";
import Loading from "../../compoents/commons/loading/Loading";
import { useSelector } from "react-redux";

export default function MypageUserInfo() {
  const user = useSelector((state) => state.user.data);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const isLoading = useSelector(state=>state.user.isLoading);

  const onClickProfileEdit = () => {
    setIsProfileEdit(true);
    document.body.style.overflow = "hidden";
  };

  const onClickChangePassword = () => {
    setIsChangePassword(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <ProfileWrapper>
        <ProfileTitle>내 정보</ProfileTitle>
        <ProfileInfo>
          <ProfileImg
            src={
              user.photoURL ||
              resolveWebp("/assets/webp/icon-defaultProfile.webp", "svg")
            }
            alt="프로필 이미지"
            onError={(e) =>
              (e.target.src = resolveWebp(
                "/assets/webp/icon-defaultProfile.webp",
                "svg"
              ))
            }
          />
          <ProfileNameWrapper>
            <ProfileNickname>{user && user.displayName} 님</ProfileNickname>
            <ProfileEmail>{user.email}</ProfileEmail>
          </ProfileNameWrapper>
        </ProfileInfo>
        <ProfileMenu>
          <ProfileMenuItem>
            <ProfileMenuBtn onClick={onClickProfileEdit}>
              프로필 변경
            </ProfileMenuBtn>
          </ProfileMenuItem>
          <ProfileMenuItem>
            <ProfileMenuBtn onClick={onClickChangePassword}>
              비밀번호 변경
            </ProfileMenuBtn>
          </ProfileMenuItem>
        </ProfileMenu>
      </ProfileWrapper>
      {isProfileEdit && (
        <ChangeProfile
          user={user}
          setIsProfileEdit={setIsProfileEdit}
        />
      )}
      {isChangePassword && (
        <ChangePassword
          setIsChangePassword={setIsChangePassword}
        />
      )}
      {isLoading && <Loading />}
    </>
  );
}
