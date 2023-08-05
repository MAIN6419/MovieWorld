import React, { useContext, useRef, useState } from "react";
import {
  HeaderBar,
  HeaderLink,
  HeaderLinks,
  HeaderLogo,
  HeaderLogoLink,
  HeaderRight,
  HeaderTitle,
  UserMenuItemBtn,
  UserMenuItemLink,
  UserNickname,
  UserNicknameWrapper,
  UserProfileImg,
  HeaderSearchLink,
  HeaderSearchIcon,
  UserMenuOpection,
  UserMenuOpectionList,
  UserMenuSelect,
  UserMenuSelectIcon,
} from "./header.style";
import { UserContext } from "../../../../context/userContext";
import { logout } from "../../../../firebase/loginAPI";
import { useLocation } from "react-router-dom";
import { resolveWebp } from "../../../../libray/webpSupport";
import { WebpContext } from "../../../../context/webpContext";
import { optKeyboardFocus } from "../../../../libray/optKeyBoard";
import { sweetConfirm } from "../../../../sweetAlert/sweetAlert";

export default function Header() {
  const { user } = useContext(UserContext);
  const { webpSupport } = useContext(WebpContext);
  const pathname = useLocation().pathname;
  const menuItemLinkRef = useRef(null);
  const menuItemBtnRef = useRef(null);
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
            <UserNicknameWrapper
              tabIndex="0"
              onClick={onClickUserMenu}
              onKeyDown={(e) => {
                if (e.keyCode === 13 || e.keyCode === 32) {
                  e.preventDefault();
                  onClickUserMenu();
                }
              }}
            >
              <UserNickname>{user.displayName} 님</UserNickname>
              <UserMenuSelect tabIndex="-1">
                <UserMenuSelectIcon
                  src={resolveWebp(
                    webpSupport,
                    "assets/webp/icon-downArrow.webp",
                    "svg"
                  )}
                  active={isUserMenu}
                  alt="유저 메뉴 버튼"
                />
              </UserMenuSelect>
              {isUserMenu && (
                <UserMenuOpectionList>
                  <UserMenuOpection>
                    <UserMenuItemLink
                      ref={menuItemLinkRef}
                      to="/mypage"
                      onClick={() => setIsUserMenu(false)}
                      onKeyDown={(e) => {
                        if (e.keyCode === 27) {
                          setIsUserMenu(false);
                        } else if (e.keyCode === 13 || e.keyCode === 32) {
                          menuItemLinkRef.current.click();
                        }
                        optKeyboardFocus(
                          e,
                          menuItemBtnRef.current,
                          menuItemBtnRef.current
                        );
                      }}
                    >
                      내 정보
                    </UserMenuItemLink>
                  </UserMenuOpection>
                  <UserMenuOpection>
                    <UserMenuItemBtn
                      onClick={() => {
                        setIsUserMenu(false);
                        sweetConfirm(
                          "정말 로그아웃 하시겠습니까?",
                          "확인",
                          "취소",
                          () => logout()
                        );
                      }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 27) {
                          setIsUserMenu(false);
                        } else if (e.keyCode === 13 || e.keyCode === 32) {
                          e.preventDefault();
                          menuItemBtnRef.current.click();
                        }
                        optKeyboardFocus(
                          e,
                          menuItemLinkRef.current,
                          menuItemLinkRef.current
                        );
                      }}
                      ref={menuItemBtnRef}
                    >
                      로그아웃
                    </UserMenuItemBtn>
                  </UserMenuOpection>
                </UserMenuOpectionList>
              )}
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
