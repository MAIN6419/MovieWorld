import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.footer`
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 20px;
  background-color: #000;
  color: #fff;
  box-shadow: 1px 1px 3px 1px #555;
`;
export const FooterContents = styled.div`
  width: 50%;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
      width: 80%;
  }
  @media screen and (max-width: 486px) {
      width: 100%;
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
  gap: 20px;
  padding: 40px 0px;
  @media screen and (max-width:768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    padding: 20px 20px;
    padding-bottom: 30px;
    font-size: 14px;
}
`;

export const FooterMenuLi = styled.li`
  text-align: center;
`;

export const FooterMenuLink = styled(Link)``;

export const FooterRights = styled.strong`
  display: block;
  color: white;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
  @media screen and (max-width: 400px) {
    font-size: 12px;
  }
`;
