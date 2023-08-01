import React, { useContext, useState } from "react";
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
import { WebpContext } from "../../context/webpContext";
import { UserContext } from "../../context/userContext";
import ChangeProfile from "./ChangeProfile.container";
import ChangePassword from "./ChangePassword.container";
import Loading from "../../compoents/commons/loading/Loading";

export default function MypageUserInfo() {
  const { user } = useContext(UserContext);
  const { webpSupport } = useContext(WebpContext);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
              resolveWebp(
                webpSupport,
                "assets/webp/icon-defaultProfile.webp",
                "svg"
              )
            }
            alt="프로필 이미지"
            onError={(e) =>
              (e.target.src = resolveWebp(
                webpSupport,
                "assets/webp/icon-defaultProfile.webp",
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
          setIsLoading={setIsLoading}
        />
      )}
      {isChangePassword && (
        <ChangePassword
          setIsChangePassword={setIsChangePassword}
          setIsLoading={setIsLoading}
        />
      )}
      {isLoading && <Loading />}
    </>
  );
}
