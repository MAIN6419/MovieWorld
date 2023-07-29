import React, { useContext, useEffect, useState } from "react";
import { useMovieInfo } from "../../hook/useMovieInfo";
import { useInView } from "react-intersection-observer";
import { UserContext } from "../../context/userContext";
import { useMediaQuery } from "react-responsive";
import MypageUI from "./Mypage.presenter";
import { fetchFirstLikeList, fetchLikeListPage } from "../../firebase/likeAPI";
import {
  fetchFirstReviewMovieList,
  fetchReviewMovieListPage,
} from "../../firebase/reviewAPI";
import { resolveWebp } from "../../libray/webpSupport";
import { WebpContext } from "../../context/webpContext";
export default function Mypage() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isOpenMovieInfo, setIsOpenMovieInfo, seletedMovie, onClickMovieInfo] =
    useMovieInfo(false);
  const [page, setPage] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const limitPage = 20;
  const [ref, inview] = useInView();
  const [menu, setMenu] = useState("like");
  // 초기 렌더링 시 Blank 컴포넌트가 잠깐 나오는 현상을 방지하기 위해 사용
  // isLoading으로 처리하려 했지만 로딩시간이 짧을 경우 깜빡거림 현상으로 인해 UX적으로 안좋아 이 방식 사용
  const [notData, setNotData] = useState(true);
  const isMoblie = useMediaQuery({ query: "(max-width:486px)" });

  const fetchFirstPage = async () => {
    setNotData(true);
    const res =
      menu === "like"
        ? await fetchFirstLikeList(limitPage)
        : await fetchFirstReviewMovieList(limitPage);
    const data = res.docs.map((el) => el.data());
    setData((prev) => [...prev, ...data]);
    setPage(res.docs[res.docs.length - 1]);
    setHasMore(res.docs.length === limitPage);
    setIsLoading(false);
    setNotData(false);
  };

  const fetchAddData = async () => {
    const res =
      menu === "like"
        ? await fetchLikeListPage(page, limitPage)
        : await fetchReviewMovieListPage(page, limitPage);
    const data = res.docs.map((el) => el.data());
    setData((prev) => [...prev, ...data]);
    setPage(res.docs[res.docs.length - 1]);
    setHasMore(res.docs.length === limitPage);
  };

  const onClickProfileEdit = () => {
    setIsProfileEdit(true);
    document.body.style.overflow = "hidden";
  };

  const onClickChangePassword = () => {
    setIsChangePassword(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    fetchFirstPage();
  }, [menu]);

  useEffect(() => {
    if (hasMore && inview) {
      fetchAddData();
    }
  }, [inview]);

  return (
    <MypageUI
      isLoading={isLoading}
      user={user}
      onClickProfileEdit={onClickProfileEdit}
      onClickChangePassword={onClickChangePassword}
      menu={menu}
      setMenu={setMenu}
      data={data}
      setData={setData}
      notData={notData}
      isMoblie={isMoblie}
      onClickMovieInfo={onClickMovieInfo}
      infiniteScrollRef={ref}
      isOpenMovieInfo={isOpenMovieInfo}
      seletedMovie={seletedMovie}
      setIsOpenMovieInfo={setIsOpenMovieInfo}
      isProfileEdit={isProfileEdit}
      setIsProfileEdit={setIsProfileEdit}
      isChangePassword={isChangePassword}
      setIsChangePassword={setIsChangePassword}
      setIsLoading={setIsLoading}
      WebpContext={WebpContext}
      resolveWebp={resolveWebp}
    />
  );
}
