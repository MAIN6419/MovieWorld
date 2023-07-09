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
            <FooterMenuLink>회사소개</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink>이용약관</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink>고객센터</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink>고용센터</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink>법적고지</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink>공지사항</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink>미디어 센터</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink>위치안내</FooterMenuLink>
          </FooterMenuLi>
          <FooterMenuLi>
            <FooterMenuLink>광고문의</FooterMenuLink>
          </FooterMenuLi>
        </FooterMenu>
      </FooterContents>

      <FooterRights>Copyright ⓒ MovieWorld Rights Reserved.</FooterRights>
    </Wrapper>
  );
}
