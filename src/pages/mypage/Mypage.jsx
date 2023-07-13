import React, { useEffect, useState } from "react";
import {
  MoiveListWrapper,
  MovieImg,
  MovieItem,
  MovieMenuBtn,
  MovieMenuItem,
  MovieMenuNav,
  MovieMenuTitle,
  MovieMenuUl,
  MovieMenuWrapper,
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
import { fetchLikeList } from "../../firebase/auth";
import MovieInfo from "../../compoents/commons/Modal/MovieInfo";
import { useMovieInfo } from "../../hook/useMovieInfo";

export default function Mypage() {
  const [data, setData] = useState([]);
  const [isOpenMovieInfo, setIsOpenMovieInfo, seletedMovie, onClickMovieInfo] =
    useMovieInfo(false);

  const fetchData = async () => {
    const data = await fetchLikeList();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Wrapper>
        <ProfileWrapper>
          <ProfileTitle>내 정보</ProfileTitle>
          <ProfileInfo>
            <ProfileImg src={"assets/defultProfile.png"} alt="프로필 이미지" />
            <ProfileNameWrapper>
              <ProfileNickname>test 님</ProfileNickname>
              <ProfileEmail>test@a.com</ProfileEmail>
            </ProfileNameWrapper>
          </ProfileInfo>
          <ProfileMenu>
            <ProfileMenuItem>
              <ProfileMenuBtn>프로필 변경</ProfileMenuBtn>
            </ProfileMenuItem>
            <ProfileMenuItem>
              <ProfileMenuBtn>비밀번호 변경</ProfileMenuBtn>
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
          <MoiveListWrapper>
            {data &&
              data.map((item) => {
                return (
                  <MovieItem key={item.id}>
                    <MovieImg
                      src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                      onClick={() => onClickMovieInfo(item)}
                    />
                  </MovieItem>
                );
              })}
          </MoiveListWrapper>
        </MovieMenuWrapper>
      </Wrapper>
      {isOpenMovieInfo && (
        <MovieInfo
          movieData={seletedMovie}
          setIsOpenMovieInfo={setIsOpenMovieInfo}
        />
      )}
    </>
  );
}
