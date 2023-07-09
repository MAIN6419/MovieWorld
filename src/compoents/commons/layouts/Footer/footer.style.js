import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.footer`
  width: 100%;
  padding: 20px;
  background-color: #000;
  color: #fff;
  border-top: 1px solid rgb(25, 25, 25);
`;
export const FooterContents = styled.div`
  width: 50%;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
      width: 80%;
  }
`;
export const FooterMenu = styled.ul`
  display: grid;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: auto;
  color: white;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  margin-top: 35px;
  gap: 20px;
  padding: 40px 0px;
  @media screen and (max-width:768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    padding: 20px 20px;
    padding-bottom: 30px;
    font-size: 14px;
}
`;

export const FooterMenuLi = styled.li``;

export const FooterMenuLink = styled(Link)``;

export const FooterRights = styled.strong`
  display: block;
  color: white;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  @media screen and (max-width: 400px) {
    font-size: 14px;
  }
`;
