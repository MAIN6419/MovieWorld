import React, { useRef, useState } from "react";
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
import { useLocation } from "react-router-dom";
import { resolveWebp } from "../../../../libray/webpSupport";
import { optKeyboardFocus } from "../../../../libray/optKeyBoard";
import { sweetConfirm } from "../../../../sweetAlert/sweetAlert";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "../../../../slice/userSlice";

export default function Header() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
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
            src={resolveWebp("/assets/webp/icon-logo.webp", "svg")}
            alt="MovieWorld"
          />
        </HeaderLogoLink>
      </HeaderTitle>
      <HeaderRight>
        <HeaderSearchLink to="/search" onClick={() => setIsUserMenu(false)}>
          <HeaderSearchIcon
            src={resolveWebp(
              "/assets/webp/icon-search.webp",
              "svg"
            )}
            alt="검색"
          />
        </HeaderSearchLink>
        {userData && userData.displayName && (
          <UserProfileImg
            src={
              userData.photoURL ||
              resolveWebp(
                
                "/assets/webp/icon-defaultProfile.webp",
                "svg"
              )
            }
            onError={(e) =>
              (e.target.src = resolveWebp(
              
                "/assets/webp/icon-defaultProfile.webp",
                "svg"
              ))
            }
            alt="유저 프로필 이미지"
          />
        )}
        <HeaderLinks>
          {userData && userData.displayName ? (
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
              <UserNickname>{userData.displayName} 님</UserNickname>
              <UserMenuSelect tabIndex="-1">
                <UserMenuSelectIcon
                  src={resolveWebp(
                    "/assets/webp/icon-downArrow.webp",
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
                          () => dispatch(fetchLogout())
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
