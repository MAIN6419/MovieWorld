import React, { useContext, useEffect, useState } from "react";
import {
  HeaderBar,
  HeaderLink,
  HeaderLinks,
  HeaderLogo,
  HeaderLogoLink,
  HeaderRight,
  HeaderTitle,
  UserMenu,
  UserMenuBtn,
  UserMenuBtnIcon,
  UserMenuLi,
  UserMenuItemBtn,
  UserMenuItemLink,
  UserNickname,
  UserNicknameWrapper,
  UserProfileImg,
  HeaderSearchLink,
  HeaderSearchIcon,
} from "./header.style";
import { UserContext } from "../../../../context/userContext";
import { logout } from "../../../../firebase/auth";
import { useLocation } from "react-router-dom";

export default function Header() {
  const pathname = useLocation().pathname;
  const [isUserMenu, setIsUserMenu] = useState(false);

  const { user } = useContext(UserContext);

  const onClickUserMenu = () => {
    setIsUserMenu(!isUserMenu);
  };
  return (
    <HeaderBar>
      <HeaderTitle>
        <HeaderLogoLink to="/main" onClick={() => setIsUserMenu(false)}>
          <HeaderLogo src="assets/logo.png" alt="MovieWorld" />
        </HeaderLogoLink>
      </HeaderTitle>
      <HeaderRight>
        <HeaderSearchLink to="/search" onClick={() => setIsUserMenu(false)}>
          <HeaderSearchIcon src="assets/icon-search.png" alt="검색" />
        </HeaderSearchLink>
        {user && (
          <UserProfileImg
            src={user.photoURL || "assets/defultProfile.png"}
            onError={(e) => (e.target.src = "assets/defultProfile.png")}
            alt="유저 프로필 이미지"
          />
        )}
        <HeaderLinks>
          {user ? (
            <UserNicknameWrapper>
              <UserNickname>
                {user.displayName} 님
                {isUserMenu && (
                  <UserMenu>
                    <UserMenuLi>
                      <UserMenuItemLink
                        to="/mypage"
                        onClick={() => setIsUserMenu(false)}
                      >
                        내 정보
                      </UserMenuItemLink>
                    </UserMenuLi>
                    <UserMenuLi>
                      <UserMenuItemBtn
                        onClick={() => {
                          setIsUserMenu(false);
                          logout();
                        }}
                      >
                        로그아웃
                      </UserMenuItemBtn>
                    </UserMenuLi>
                  </UserMenu>
                )}
              </UserNickname>
              <UserMenuBtn onClick={onClickUserMenu}>
                <UserMenuBtnIcon
                  src={"assets/icon-downArrow.png"}
                  active={isUserMenu}
                  alt="유저 메뉴 버튼"
                />
              </UserMenuBtn>
            </UserNicknameWrapper>
          ) : (
            <>
              {pathname === "/signup" ? (
                <HeaderLink to="/login">로그인</HeaderLink>
              ) : pathname === "/login" ? (
                <HeaderLink to="/signup">회원가입</HeaderLink>
              ) : (
                <>
                  <HeaderLink to="/login">로그인</HeaderLink>
                  <HeaderLink to="/signup">회원가입</HeaderLink>
                </>
              )}
            </>
          )}
        </HeaderLinks>
      </HeaderRight>
    </HeaderBar>
  );
}
