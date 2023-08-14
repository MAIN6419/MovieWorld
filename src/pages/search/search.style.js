import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const SearchWrapper = styled.main`
  position: relative;
  padding: 20px 0;
  width: 60%;
  height: 100vh;
  margin: 0 auto;
  @media screen and (max-width: 786px) {
    width: calc(100% - 25px);
  }
`;
export const SearchForm = styled.form`
  padding: 5px 10px;
  border-radius: 20px;
  border: 2px solid #666;
  background-color: rgba(0, 0, 0, 0.7);
  max-width: 200px;
  margin: 0 auto 30px auto;
`;

export const SearchLabel = styled.label``;

export const SearchInput = styled.input`
  width: 150px;
  padding-left: 22px;
  background: none;
  body.no-webp & {
    background: url("/assets/icon-search.svg") no-repeat left top 1px / 20px;
  }
  border: none;
  color: #fff;
  body.webp & {
    background: url("/assets/webp/icon-search.webp") no-repeat left top 1px /
      20px;
  }
  ::placeholder {
    color: #bdbdbd;
    font-weight: 300;
  }
  :focus {
    outline: none;
  }
`;

export const SearchMovieList = styled.ul`
  display: grid;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: auto;
  color: white;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  @media screen and (max-width: 1470px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
  @media screen and (max-width: 1007px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, minmax(144px, 1fr));
  }
`;

export const SearchMovieItem = styled.li`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s;
  :hover {
    transform: ${isMobile ? "" : "scale(1.05)"};
  }
`;
export const SearchMovieBtn = styled.button`
  width: 100%;
  height: 100%;
  background: none;
  padding: 3px;
  border-radius: 10px;
`;
export const SearchMovieImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: calc(6 / 4 * 100%);
`;

export const InfiniteScrollTarget = styled.div`
  height: 20px;
`;

export const SearchBlank = styled.div`
  width: 100%;
  max-width: 360px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchBlankImg = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

export const SearchBlankKeyword = styled.strong`
  display: inline-block;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임 적용 */
`;

export const SearchBlankText = styled.p`
  white-space: pre-line;
  line-height: 1.2;
  text-align: center;
`;
