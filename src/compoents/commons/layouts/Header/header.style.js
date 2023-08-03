import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #000;
  padding: 15px;
  color: #fff;
  z-index: 999;
  @media screen and (max-width: 486px) {
    padding: 15px;
  }
`;

export const HeaderTitle = styled.h1``;

export const HeaderLogoLink = styled(Link)``;

export const HeaderLogo = styled.img`
  width: 105px;
  height: 100%;
  margin-left: 10px;
  @media screen and (max-width: 486px) {
    width: 80px;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-size: 14px;
  @media screen and (max-width: 486px) {
    font-size: 12px;
  }
`;

export const HeaderSearchLink = styled(Link)`
  margin-right: 5px;
`;

export const HeaderSearchIcon = styled.img`
  width: 28px;
  height: 28px;
  @media screen and (max-width: 486px) {
    width: 20px;
    height: 20px;
  }
`;

export const HeaderLinks = styled.div``;

export const HeaderLink = styled(Link)`
  color: #fff;
  margin-right: 8px;
  :nth-child(2)::before {
    content: "";
    width: 1px;
    height: 12px;
    background-color: #fff;
    display: inline-block;
    margin-right: 8px;
    @media screen and (max-width: 486px) {
      height: 10px;
    }
  }
`;

export const UserNicknameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
`;

export const UserNickname = styled.strong`
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  @media screen and (max-width: 486px) {
    font-size: 14px;
  }
  color: transparent;
  text-shadow: 0 0 0 #fff;
`;

export const UserProfileImg = styled.img`
  width: 35px;
  height: 35px;
  object-position: center;
  object-fit: cover;
  overflow: hidden;
  border: 1px solid #bdbdbd;
  margin: 0 10px;
  @media screen and (max-width: 486px) {
    width: 28px;
    height: 28px;
  }
`;

export const UserMenuSelect = styled.button`
  width: 20px;
  height: 20px;
  background: none;
`;

export const UserMenuSelectIcon = styled.img`
  width: 20px;
  height: 20px;
  transform: ${(props) => (props.active ? "rotate(-180deg)" : "rotate(0deg)")};
  transition: all 0.5s;
  @media screen and (max-width: 486px) {
    width: 14px;
    height: 14px;
    margin-top: 3px;
  }
`;

export const UserMenuOpectionList = styled.ul`
  position: absolute;
  top: 30px;
  width: 80px;
  border: 2px solid #292a2b;
  border-radius: 5px;
  background: #1d1e1e;
  overflow: hidden;
  animation: openUserMenu 0.5s;
  @keyframes openUserMenu {
    from {
      height: 0;
    }
    to {
      height: 74px;
    }
  }
`;

export const UserMenuOpection = styled.li`
  transition: all 0.3s;
  :not(:last-child) {
    border-bottom: 2px solid #292a2b;
  }
  :hover {
    background-color: ${isMobile ? "" : "rgba(74,74,74)"};
  }
`;

export const UserMenuItemLink = styled(Link)`
  padding: 10px 8px;
  font-size: 14px;
  display: block;
  border: none;
  width: 100%;
  font-weight: 400;
  cursor: pointer;
  :focus {
    outline: none;
    background-color: rgba(74, 74, 74);
  }
`;

export const UserMenuItemBtn = styled.button`
  padding: 7px 8px;
  display: block;
  border: none;
  width: 100%;
  background: none;
  color: #fff;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  :focus {
    outline: none;
    background-color: rgba(74, 74, 74);
  }
`;
