import React, { useEffect, useState } from "react";
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

export default function Mypage() {
  const [data, setData] = useState([]);
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
  };

  const fetchAddData = async () => {
    const res = await fetchLikeListPage(page, limitPage);
    const data = res.docs.map((el) => el.data());
    setData((prev) => [...prev, ...data]);
    setPage(res.docs[res.docs.length - 1]);
    setHasMore(res.docs.length === limitPage);
  };

  useEffect(() => {
    if (!hasMore && inview && !page) {
      fetchFirstPage();
    }
    if (hasMore && inview) {
      fetchAddData();
    }
  }, [inview]);

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
                        onClick={() => onClickMovieInfo(data)}
                      />
                    </MovieImgWrapper>
                    <MovieTitle>{item.title || item.name || item.original_name}</MovieTitle>
                  </MovieItem>
                );
              })}
            <InfiniteScrollTarget ref={ref}></InfiniteScrollTarget>
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
