import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #000;
  padding: 20px;
  color: #fff;
  z-index: 999;
`;

export const HeaderTitle = styled.h1``;

export const HeaderLogoLink = styled(Link)``;

export const HeaderLogo = styled.img`
  width: 150px;
  @media screen and (max-width: 440px) {
    width: 120px;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-right: 10px;
  font-size: 14px;
`;

export const HeaderLinks = styled.div``;

export const HeaderLink = styled(Link)`
  color: #fff;
  margin-right: 8px;
  :first-child::after {
    content: "";
    width: 1px;
    height: 12px;
    background-color: #fff;
    display: inline-block;
    margin-left: 8px;
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
`;

export const UserProfileImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border: 1px solid #bdbdbd;
  @media screen and (max-width: 440px) {
    width: 40px;
    height: 40px;
  }
`;

export const UserMenuBtn = styled.button`
  width: 20px;
  height: 20px;
  background: none;
`;

export const UserMenuBtnIcon = styled.img`
  width: 20px;
  height: 20px;
  transform: ${(props) => (props.active ? "rotate(-180deg)" : "rotate(0deg)")};
  transition: all 0.5s;
`;

export const UserMenu = styled.ul`
  position: absolute;
  top: 30px;
  left: 0;
  width: 90px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  background: #555;
  overflow: hidden;
  animation: fadeIn 0.5s;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const UserMenuLi = styled.li`
  transition: all 0.3s;
  :not(:last-child) {
    border-bottom: 1px solid #fff;
  }

  :hover {
    background-color: #739bfa;
  }
`;

export const UserMenuItemLink = styled(Link)`
  padding: 15px 8px;
  font-size: 16px;
  display: block;
  border: none;
  width: 100%;
  font-weight: 400;
  cursor: pointer;
`;

export const UserMenuItemBtn = styled.button`
  padding: 11.5px 8px;
  display: block;
  border: none;
  width: 100%;
  background: none;
  color: #fff;
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
`;
