import React from "react";
import { Wrapper } from "./mypage.style";
import MypageUserInfo from "./MypageUserInfo";
import MypageMenu from "./MypageMenu";
import TopButton from "../../compoents/commons/topButton/TopButton";
export default function Mypage() {
  return (
    <>
      <Wrapper>
        <MypageUserInfo />
        <MypageMenu />
      </Wrapper>
      <TopButton />
    </>
  );
}
