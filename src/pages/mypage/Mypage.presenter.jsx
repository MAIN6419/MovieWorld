import React from "react";
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
import ProgressiveImg from "../../compoents/commons/progressiveImg/ProgressiveImg";
import Blank from "../../compoents/commons/blank/Blank";
import MovieInfo from "../../compoents/commons/Modal/MovieInfo.container";
import Loading from "../../compoents/commons/loading/Loading";
import ChangeProfile from "./ChangeProfile.container";
import ChangePassword from "./ChangePassword.container";
import TopButton from "../../compoents/commons/topButton/TopButton";


export default function MypageUI({
  isLoading,
  user,
  onClickProfileEdit,
  onClickChangePassword,
  menu,
  setMenu,
  data,
  setData,
  notData,
  isMoblie,
  onClickMovieInfo,
  infiniteScrollRef,
  isOpenMovieInfo,
  seletedMovie,
  setIsOpenMovieInfo,
  isProfileEdit,
  setIsProfileEdit,
  isChangePassword,
  setIsChangePassword,
  setIsLoading,
  webpSupport,
  resolveWebp
}) {
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
                  src={
                    user.photoURL ||
                    resolveWebp(
                      webpSupport,
                      "assets/webp/icon-defaultProfile.webp",
                      "svg"
                    )
                  }
                  alt="프로필 이미지"
                  onError={(e) =>
                    (e.target.src = resolveWebp(
                      webpSupport,
                      "assets/webp/icon-defaultProfile.webp",
                      "svg"
                    ))
                  }
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
              <MovieMenuTitle className="a11y-hidden">{menu}</MovieMenuTitle>
              <MovieMenuNav>
                <MovieMenuUl>
                  <MovieMenuItem>
                    <MovieMenuBtn
                      onClick={() => {
                        setMenu("like");
                        setData([]);
                      }}
                      className={menu === "like" ? "active" : ""}
                    >
                      찜 목록
                    </MovieMenuBtn>
                  </MovieMenuItem>
                  <MovieMenuItem>
                    <MovieMenuBtn
                      className={menu === "review" ? "active" : ""}
                      onClick={() => {
                        setMenu("review");
                        setData([]);
                      }}
                    >
                      리뷰한 영화
                    </MovieMenuBtn>
                  </MovieMenuItem>
                </MovieMenuUl>
              </MovieMenuNav>
              {!data.length && !notData ? (
                <Blank
                  size={isMoblie ? "small" : ""}
                  text={
                    menu === "like"
                      ? "찜 목록이 존재하지 않습니다."
                      : "리뷰한 영화가 존재하지 않습니다."
                  }
                />
              ) : (
                <MoiveListWrapper>
                  {data.map((item, idx) => {
                    return (
                      <MovieItem key={item.id + idx}>
                        <MovieImgWrapper tabIndex="0">
                          <ProgressiveImg
                            placeholderSrc={
                              document.body.className === "webp"
                                ? "assets/webp/placeholderImg.webp"
                                : "assets/placeholderImg.png"
                            }
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
                              (e.target.src =
                                document.body.className === "webp"
                                  ? "assets/webp/placeholderImg.webp"
                                  : "assets/placeholderImg.png")
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
              )}

              <InfiniteScrollTarget
                ref={infiniteScrollRef}
              ></InfiniteScrollTarget>
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
          <TopButton />
        </>
      )}
    </>
  );
}
