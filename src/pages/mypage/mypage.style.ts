import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  height: calc(100vh - 80px);
  max-width: 1000px;
  background-color: #222;
  margin: 0 auto;
  color: #fff;
`;

export const ProfileWrapper = styled.section`
  padding: 20px;
`;

export const ProfileTitle = styled.h2`
  color: #fff;
  font-size: 25px;
  font-weight: 500;
  margin: 0 0 30px 10px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

export const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #bdbdbd;
`;

export const ProfileNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProfileNickname = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export const ProfileEmail = styled.span`
  font-size: 16px;
`;

export const ProfileMenu = styled.ul`
  display: flex;
  gap: 10px;
`;

export const ProfileMenuItem = styled.li``;

export const ProfileMenuBtn = styled.button`
  background: #fff;
  border-radius: 20px;
  padding: 4px 10px 5px 10px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  :hover {
    background-color: ${isMobile ? "" : " rgba(205, 205, 205)"};
  }
`;

export const MovieMenuWrapper = styled.section`
  background-color: #222;
`;

export const MovieMenuTitle = styled.h2``;

export const MovieMenuNav = styled.nav``;

export const MovieMenuUl = styled.ul`
  display: flex;
  gap: 40px;
  padding: 5px 20px;
  background-color: #000;
`;

export const MovieMenuItem = styled.li``;

export const MovieMenuBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: #bdbdbd;
  font-size: 16px;
  padding-bottom: 5px;
  position: relative;
  transition: all 0.5s;
  :hover {
    color: ${isMobile ? "" : "#bdbdbd"};
  }
  &.active {
    color: #fff;
  }
  &.active::after {
    position: absolute;
    content: "";
    display: block;
    width: 90px;
    height: 3px;
    border-radius: 10px;
    background-color: #e50914;
    bottom: -3px;
    animation: scaleUp 0.5s;
    @keyframes scaleUp {
      from {
        width: 0;
      }
      to {
        width: 90px;
      }
    }
  }
`;

export const MoiveListWrapper = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  padding: 20px;
  @media screen and (max-width: 486px) {
    grid-template-columns: repeat(auto-fill, minmax(144px, 1fr));
  }
`;

export const MovieItem = styled.li``;

export const MovieImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: calc(3 / 4 * 100%);
  margin-bottom: 10px;
  cursor: pointer;
`;

export const RemoveBtn = styled.button`
  width: 28px;
  height: 28px;
  color: #fff;
  position: absolute;
  top: 3px;
  right: 3px;
  body.no-webp & {
    background: url("/assets/icon-close.svg") no-repeat center / 20px;
  }
  body.webp & {
    background: url("/assets/webp/icon-close.webp") no-repeat center / 20px;
  }
  @media screen and (max-width: 486px) {
    top: 0;
    right: 0;
    background: url("/assets/icon-close.svg") no-repeat center / 18px;
    body.webp & {
      background: url("/assets/webp/icon-close.webp") no-repeat center / 18px;
    }
  }
`;

export const MovieImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: transform 0.4s;
  cursor: pointer;
  :hover {
    transform: ${isMobile ? "" : "scale(1.05)"};
  }
  border-radius: 10px;
`;

export const MovieTitle = styled.h3`
  color: #c4c4c4;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const InfiniteScrollTarget = styled.div`
  margin-top: -20px;
`;
