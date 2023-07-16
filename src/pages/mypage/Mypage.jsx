import React, { useContext, useEffect, useState } from "react";
import {
  InfiniteScrollTarget,
  MoiveListWrapper,
  MovieImgWrapper,
  MovieItem,
  MovieMenuBtn,
  MovieMenuItem,
  MovieMenuNav,
  MovieMenuTitle,
  MovieMenuUl,
  MovieMenuWrapper,
  MovieTitle,
  ProfileEmail,
  ProfileImg,
  ProfileInfo,
  ProfileMenu,
  ProfileMenuBtn,
  ProfileMenuItem,
  ProfileNameWrapper,
  ProfileNickname,
  ProfileTitle,
  ProfileWrapper,
  Wrapper,
} from "./mypage.style";
import { fetchFirstLikeList, fetchLikeListPage } from "../../firebase/auth";
import MovieInfo from "../../compoents/commons/Modal/MovieInfo";
import { useMovieInfo } from "../../hook/useMovieInfo";
import ProgressiveImg from "../../compoents/commons/progressiveImg/ProgressiveImg";
import { useInView } from "react-intersection-observer";
import ChangeProfile from "./ChangeProfile";
import Loading from "../../compoents/commons/loading/Loading";
import { UserContext } from "../../context/userContext";
import ChangePassword from "./ChangePassword";
import TopButton from "../../compoents/commons/topButton/TopButton";
import Blank from "../../compoents/commons/blank/Blank";

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

  const fetchFirstPage = async () => {
    const res = await fetchFirstLikeList(limitPage);
    const data = res.docs.map((el) => el.data());
    setData((prev) => [...prev, ...data]);
    setPage(res.docs[res.docs.length - 1]);
    setHasMore(res.docs.length === limitPage);
    setIsLoading(false);
  };

  const fetchAddData = async () => {
    const res = await fetchLikeListPage(page, limitPage);
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
  }, []);

  useEffect(() => {
    if (hasMore && inview) {
      fetchAddData();
    }
  }, [inview]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Wrapper>
            <ProfileWrapper>
              <ProfileTitle>내 정보</ProfileTitle>
              <ProfileInfo>
                <ProfileImg
                  src={user.photoURL || "assets/defaultProfile.png"}
                  alt="프로필 이미지"
                  onError={(e) => (e.target.src = "assets/defaultProfile.png")}
                />
                <ProfileNameWrapper>
                  <ProfileNickname>
                    {user && user.displayName} 님
                  </ProfileNickname>
                  <ProfileEmail>{user.email}</ProfileEmail>
                </ProfileNameWrapper>
              </ProfileInfo>
              <ProfileMenu>
                <ProfileMenuItem>
                  <ProfileMenuBtn onClick={onClickProfileEdit}>
                    프로필 변경
                  </ProfileMenuBtn>
                </ProfileMenuItem>
                <ProfileMenuItem>
                  <ProfileMenuBtn onClick={onClickChangePassword}>
                    비밀번호 변경
                  </ProfileMenuBtn>
                </ProfileMenuItem>
              </ProfileMenu>
            </ProfileWrapper>
            <MovieMenuWrapper>
              <MovieMenuTitle className="a11y-hidden">찜 목록</MovieMenuTitle>
              <MovieMenuNav>
                <MovieMenuUl>
                  <MovieMenuItem>
                    <MovieMenuBtn className="active">찜 목록</MovieMenuBtn>
                  </MovieMenuItem>
                  <MovieMenuItem>
                    <MovieMenuBtn>최근 본 영화</MovieMenuBtn>
                  </MovieMenuItem>
                  <MovieMenuItem>
                    <MovieMenuBtn>다시보기</MovieMenuBtn>
                  </MovieMenuItem>
                </MovieMenuUl>
              </MovieMenuNav>
              <MoiveListWrapper style={{height: !data.length ? "calc(100vh - 325px)":""}}>
                {!data.length ? <Blank text={"현재 찜 목록이 존재하지 않습니다."}/>:
                  data.map((item, idx) => {
                    return (
                      <MovieItem key={item.id + idx}>
                        <MovieImgWrapper>
                          <ProgressiveImg
                            placeholderSrc={"assets/placeholderImg.png"}
                            src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                            styles={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              top: "0",
                              left: "0",
                              borderRadius: "10px",
                            }}
                            alt="영화 포스터"
                            onError={(e) =>
                              (e.target.src = "assets/placeholderImg.png")
                            }
                            onClick={() => onClickMovieInfo(item)}
                          />
                        </MovieImgWrapper>
                        <MovieTitle>
                          {item.title || item.name || item.original_name}
                        </MovieTitle>
                      </MovieItem>
                    );
                  })}
              </MoiveListWrapper>
              <InfiniteScrollTarget ref={ref}></InfiniteScrollTarget>
            </MovieMenuWrapper>
          </Wrapper>
          {isOpenMovieInfo && (
            <MovieInfo
              movieData={seletedMovie}
              setIsOpenMovieInfo={setIsOpenMovieInfo}
            />
          )}
          {isProfileEdit && (
            <ChangeProfile
              user={user}
              setIsProfileEdit={setIsProfileEdit}
              setIsLoading={setIsLoading}
            />
          )}
          {isChangePassword && (
            <ChangePassword
              setIsChangePassword={setIsChangePassword}
              setIsLoading={setIsLoading}
            />
          )}
        </>
      )}
      <TopButton />
    </>
  );
}
