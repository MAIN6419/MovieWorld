import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const SearchWrapper = styled.main`
  position: relative;
  padding: 20px 0;
  width: calc(60%);
  height: 100vh;
  margin: 0 auto;
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
  background: url("assets/icon-search.svg") no-repeat left top 1px / 20px;
  border: none;
  color: #fff;
  body.webp & {
    background: url("assets/webp/icon-search.webp") no-repeat left top 1px / 20px;
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

export const SearchMovieImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: calc(6 / 4 * 100%);
`;

export const InfiniteScrollTarget = styled.div`
  height: 20px;
`
