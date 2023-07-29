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
import { logout } from "../../../../firebase/loginAPI";
import { useLocation } from "react-router-dom";
import { resolveWebp } from "../../../../libray/webpSupport";
import { WebpContext } from "../../../../context/webpContext";

export default function Header() {
  const { user } = useContext(UserContext);
  const { webpSupport } = useContext(WebpContext);
  const pathname = useLocation().pathname;
  const [isUserMenu, setIsUserMenu] = useState(false);

  const onClickUserMenu = () => {
    setIsUserMenu(!isUserMenu);
  };

  return (
    <HeaderBar>
      <HeaderTitle>
        <HeaderLogoLink to="/main" onClick={() => setIsUserMenu(false)}>
          <HeaderLogo
            src={resolveWebp(webpSupport, "assets/webp/icon-logo.webp", "svg")}
            alt="MovieWorld"
          />
        </HeaderLogoLink>
      </HeaderTitle>
      <HeaderRight>
        <HeaderSearchLink to="/search" onClick={() => setIsUserMenu(false)}>
          <HeaderSearchIcon
            src={resolveWebp(
              webpSupport,
              "assets/webp/icon-search.webp",
              "svg"
            )}
            alt="검색"
          />
        </HeaderSearchLink>
        {user && user.displayName && (
          <UserProfileImg
            src={
              user.photoURL ||
              resolveWebp(
                webpSupport,
                "assets/webp/icon-defaultProfile.webp",
                "svg"
              )
            }
            onError={(e) =>
              (e.target.src = resolveWebp(
                webpSupport,
                "assets/webp/icon-defaultProfile.webp",
                "svg"
              ))
            }
            alt="유저 프로필 이미지"
          />
        )}
        <HeaderLinks>
          {user && user.displayName ? (
            <UserNicknameWrapper>
              <UserNickname>{user.displayName} 님</UserNickname>
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
              <UserMenuBtn onClick={onClickUserMenu}>
                <UserMenuBtnIcon
                  src={resolveWebp(
                    webpSupport,
                    "assets/webp/icon-downArrow.webp",
                    "svg"
                  )}
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
