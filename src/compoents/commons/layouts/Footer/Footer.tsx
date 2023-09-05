import React from "react";
import {
  FooterContents,
  FooterMenu,
  FooterMenuLi,
  FooterMenuLink,
  FooterRights,
  Wrapper,
} from "./footer.style";

export default function Footer() {
  return (
    <Wrapper>
      <FooterContents>
        <FooterMenu>
          <FooterMenuLi>
            <FooterMenuLink to="#">회사소개</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink to="#">이용약관</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink to="#">고객센터</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink to="#">고용센터</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink to="#">법적고지</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink to="#">공지사항</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink to="#">미디어 센터</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink to="#">위치안내</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink to="#">광고문의</FooterMenuLink>
          </FooterMenuLi>
        </FooterMenu>
      </FooterContents>

      <FooterRights>Copyright ⓒ MovieWorld Rights Reserved.</FooterRights>
    </Wrapper>
  );
}
