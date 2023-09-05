# 🎬 MovieWorld
#### 테스트 계정
| ID         | PW     |
|------------|--------|
| test@a.com | asdzxc123! |

#### 배포 URL :  🎞 [MovieWorld](https://movieworlds.site)

## 🙋‍♂️ 프로젝트 소개
![thumbnail](https://github.com/MAIN6419/MovieWorld/assets/113427991/bbd6d268-71d5-4be6-9d89-dc4f5af989b9)

- **MovieWorld**는 다양한 영화 정보를 제공하고 리뷰할 수 있는 사이트 입니다.
- 로그인 없이 다양한 영화 정보를 무료로 제공받아 볼 수 있습니다.
- 영화 리뷰를 통해 영화 정보를 공유할 수 있습니다.
- 영화 리뷰 스포일러 방지 기능이 있어 영화 리뷰를 필터링하여 원치않은 스포일러를 방지할 수 있습니다.
- 원하는 영화를 찜하고, 저장할 수 있습니다.

<br>

### 📃 목차 (클릭 시 해당 목차로 이동합니다.)
- [📆 개발기간](#-개발기간)
  
- [⚙ 개발환경](#-개발환경)
  
- [🔩 벡엔드 구성](#-벡엔드-구성)
  
- [🗜 node_modules](#-node_modules)
  
- [🛠 프로젝트 관리](#-프로젝트-관리)
  
- [📃 GitHub 컨벤션](#-github-컨벤션)
  
- [📍 구현 기능 미리보기](#-구현-기능-미리보기--제목-클릭-시-해당-기능-상세설명으로-이동됩니다-)
  
- [🔎 주요 기능 코드 및 설명](#-주요-기능-코드-및-설명)
  - [customAxios](#1-customaxios)
    
  - [API 파일](#2-api-파일)
    
  - [리뷰](#3-리뷰-작성-수정-삭제-신고)
    
  - [스포일러 체크](#4-리뷰-스포일러-체크-기능)
    
  - [무한 스크롤](#5-무한-스크롤)
    
  - [검색 디바운싱](#6-검색-디바운싱)
    
  - [이미지 최적화](#7-이미지-최적화)
    
  - [키보드 포커싱 최적화](#8-웹-접근성-키보드-포커싱-최적화)
    
  - [sweetAlert2](#9-sweetalert2)
    
- [🔫 트러블 슈팅](#-트러블-슈팅)
  
  <br>

### 📆 개발기간
**개발완료: 2023.07.05 ~ 2023.08.07**

**프로젝트 개발 이후에도 새로 학습한 내용을 프로젝트에 적용하였습니다.**

**오류, 수정사항 수정 및 Redux 적용 : 2023.08.07 ~ 2023.08.15**

**TypeScript 적용 : 2023.09.02 ~ 2023.09.03**

🔗[Redux-toolkit Slice, Store 구성 및 설명](https://github.com/MAIN6419/MovieWorld/wiki/Redux-Slice-Store-%EC%BD%94%EB%93%9C-%EB%B0%8F-%EC%84%A4%EB%AA%85)

<br>

### ⚙ 개발환경
|프론트엔드|벡엔드|디자인|배포, 관리|
|---|---|---|---|
|<img alt="Html" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/> <img alt="CSS" src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/> <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/> <img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=pink"> <img src="https://img.shields.io/badge/redux-toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=fff">|<img src ="https://img.shields.io/badge/theMovieDB-01B4E4.svg?&style=for-the-badge&logo=themoviedatabase&logoColor=black"/> <img src ="https://img.shields.io/badge/firebase-FFCA28.svg?&style=for-the-badge&logo=firebase&logoColor=black"/>|<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" width=120>|<img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">|
<br>

### 🔩 벡엔드 구성
- TheMovieDBAPI를 통해 영화정보를 받아오도록 하였습니다.
- 구현 기능들(로그인, 소셜로그인, 회원가입, 이메일|비밀번호 찾기, 찜, 리뷰 관련 기능, 프로필 변경, 비밀번호 변경, 나의 찜 목록, 나의 리뷰 목록, 로그아웃)은 firebase를 이용하여 구현 하였습니다.
<br>

### ⛓ node_modules
|모듈명|용도|
|---|---|
|axios|서버 통신|
|browser-image-compression|이미지 압축|
|history|모바일 뒤로가기 구현|
|lodash|debouncing, throttling 사용|
|react-rotuer-dom|라우팅 구현|
|react-intersetion-observer|무한 스크롤 구현|
|react-responsive|반응형 구현|
|react-device-detect|반응형 구현|
|redux|상태관리|
|redux-toolkit|redux 편의성, redux-toolkit thunk 사용|
|uuid|고유 아이디 생성|
|swiper|슬라이더 구현|
|sweetAlert|alert, confirm 커스텀|
<br>

### 🛠 프로젝트 관리
- <a href="https://github.com/MAIN6419/MovieWorld/issues">GitHub Issue</a>
  - 빠른 issue 생성을 위해 issue 템플릿을 만들어 사용하였습니다.
  - issue label을 생성하여 어떤 작업을 히는지 구분하였습니다.
  - issue를 통해 구현할 내용과 체크리스트를 만들어 어떤 작업을 할지 리스트 만들어 관리하였습니다.
  
![issue](https://github.com/MAIN6419/MovieWorld/assets/113427991/a6eac61d-9a1a-4472-8169-a81c4084c6dd)

- <a href="https://github.com/users/MAIN6419/projects/3/views/1?layout=board">GitHub Project</a>
  - 프로젝트 보드의 이슈 목록을 통해 개발 과정과 진행 상황을 한 눈에 알아 볼 수 있었습니다.
  
![project](https://github.com/MAIN6419/MovieWorld/assets/113427991/9f346e43-c02f-4b1a-b2b0-38bbb6e93a63)

### 📃 GitHub 컨벤션
어떤 작업을 했는지 파악하기 위해 컨벤션을 정하여 commit과 isuue를 관리하였습니다.

`Fix` : 수정사항만 있을 경우

`Feat` : 새로운 기능이 추가 되거나 여러 변경 사항들이 있을 경우

`Style` : 스타일만 변경되었을 경우 

`Docs` : 문서를 수정한 경우

`Refactor` : 코드 리팩토링을 하는 경우

`Remove` : 파일을 삭제하는 작업만 수행한 경우

`Rename` : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우

`Relese` : 배포 관련 작업인 경우

`Chore` : 그 외 기타 사항이 있을 경우 사용합니다.

<br>


### 📍 구현 기능 미리보기 ( 제목 클릭 시 해당 기능 상세설명으로 이동됩니다. )
|[🔗시작 화면](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#splash-%ED%8E%98%EC%9D%B4%EC%A7%80)|[🔗로그인](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80)|[🔗소셜 로그인](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80)|
|---|---|---|
|![splash](https://github.com/MAIN6419/MovieWorld/assets/113427991/f76eb405-15c2-492b-a4a1-18026542ada0)|![로그인](https://github.com/MAIN6419/MovieWorld/assets/113427991/29100817-5dfb-4c80-8864-b9c5fc205d94)|![소셜로그인](https://github.com/MAIN6419/MovieWorld/assets/113427991/49532fab-92ff-4a90-b888-eecabec9328c)|

|[🔗메인 페이지](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%98%81%ED%99%94%EC%A0%95%EB%B3%B4-%EB%AA%A8%EB%8B%AC%EC%B0%BD)|[🔗영화정보-리뷰(작성,수정,삭제,신고)](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%98%81%ED%99%94%EC%A0%95%EB%B3%B4-%EB%AA%A8%EB%8B%AC%EC%B0%BD)|[🔗영화정보-찜, 관련영상](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%98%81%ED%99%94%EC%A0%95%EB%B3%B4-%EB%AA%A8%EB%8B%AC%EC%B0%BD)|
|:---:|:---:|:---:|
|![메인페이지](https://github.com/MAIN6419/MovieWorld/assets/113427991/f0a290a2-2747-466a-bc88-aad4bab06e7d)|![영화정보-리뷰(작성,수정,삭제,신고)](https://github.com/MAIN6419/MovieWorld/assets/113427991/d34bff8b-264e-45bc-a5b7-61ad4ff302b5)|![영화정보-찜,관련영상](https://github.com/MAIN6419/MovieWorld/assets/113427991/85e8329e-d2b9-4035-8ab2-ad811129888d)|


|[🔗영화정보-스포일러, 필터](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%98%81%ED%99%94%EC%A0%95%EB%B3%B4-%EB%AA%A8%EB%8B%AC%EC%B0%BD)|[🔗마이페이지-찜 목록](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A7%88%EC%9D%B4-%ED%8E%98%EC%9D%B4%EC%A7%80)|[🔗마이페이지-리뷰 목록](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A7%88%EC%9D%B4-%ED%8E%98%EC%9D%B4%EC%A7%80)|
|---|---|---|
|![영화정보-스포일러,필터](https://github.com/MAIN6419/MovieWorld/assets/113427991/92a112c9-e7f9-49c5-a694-f37279f6c18f)|![검색페이지](https://github.com/MAIN6419/MovieWorld/assets/113427991/53cfc978-b692-4423-b519-596fb2d24154)|![마이페이지-찜](https://github.com/MAIN6419/MovieWorld/assets/113427991/6618aaa4-33eb-490f-aad3-4ff61804cfdf)|


|[🔗마이페이지-찜](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A7%88%EC%9D%B4-%ED%8E%98%EC%9D%B4%EC%A7%80)|[🔗마이페이지-프로필변경](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A7%88%EC%9D%B4-%ED%8E%98%EC%9D%B4%EC%A7%80)|[🔗마이페이지-비밀번호변경](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A7%88%EC%9D%B4-%ED%8E%98%EC%9D%B4%EC%A7%80)|
|---|---|---|
![마이페이지-리뷰](https://github.com/MAIN6419/MovieWorld/assets/113427991/219bf865-cb1c-47da-bc38-25cfe2e92ddc)|![마이페이지-프로필변경](https://github.com/MAIN6419/MovieWorld/assets/113427991/2b7ce702-b9d8-4553-a9f3-bbeb3bf5daed)|![마이페이지-비밀번호변경](https://github.com/MAIN6419/MovieWorld/assets/113427991/60e8e763-fd62-4b92-93f1-02244aeca31e)|
<div align="center">
  
|[🔗로그아웃](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83)|[🔗404 페이지](https://github.com/MAIN6419/MovieWorld/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#404-%ED%8E%98%EC%9D%B4%EC%A7%80)|
|---|---
|![로그아웃](https://github.com/MAIN6419/MovieWorld/assets/113427991/b68cd800-f3dc-4515-8be1-a2cd917393ff)|![404](https://github.com/MAIN6419/MovieWorld/assets/113427991/b433b410-d52b-42ed-8f0a-442bed365709)|

</div>
<br>

### 🔎 주요 기능 코드 및 설명
#### (1) customAxios
axios를 custom하여 baseURL를 설정하여 URL 중복 설정을 피하고, 코드를 단축시켰습니다.
``` javascript
import axios from "axios";

export const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
```
<br>
 
#### (2) API 파일
사용할 API를 하나의 파일로 만들어서 코드 중복 사용을 피하고, 코드를 단축 시켜, 유지보수를 용이하게 하였습니다.
movieAPI 
``` javascript
import { customAxios } from "./customAxios";

// api_key, language params로 설정
const api_key = process.env.REACT_APP_THEMOVIEDB_API_KEY;
const language = "ko-KR";

// 영화 비디오 정보가 포함된 데이터를 가져오는 API
export const getVideoData = async (id) => {
    const video = await customAxios.get(
      `movie/${id}`,
      {
        params: {
          api_key,
          language,
          append_to_response: "videos",
        },
      }
    );
    return video.data;
};

// Banner 화면에 나타날 영화 정보를 가져오는 API
export const getNowPlayingMovie = async () => {
    const res = await customAxios.get(`movie/now_playing`, {
      params: {
        api_key,
        language,
      },
    });
    const movieId =
      res.data.results[Math.floor(Math.random() * res.data.results.length)].id;
    return getVideoData(movieId);
};

// 최신의 영화 정보를 가져오는 API
export const getTrendingMovies = async (page = 1) => {
    const res = await customAxios.get(`/trending/movie/week`, {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// 영화 순위가 높은 순서대로 영화 정보를 가져오는 API
export const getTopRatedMovies = async (page = 1) => {
    const res = await customAxios.get("/movie/top_rated", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// Action 영화 정보를 가져오는 API
export const getActionMovies = async (page = 1) => {
    const res = await customAxios.get("/discover/movie?with_genres=28", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// Comedy 영화 정보를 가져오는 API
export const getComedyMovies = async (page = 1) => {
    const res = await customAxios.get("/discover/movie?with_genres=35", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// Horror 영화 정보를 가져오는 API
export const getHorrorMovies = async (page = 1) => {
    const res = await customAxios.get("/discover/movie?with_genres=27", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// Romance 영화 정보를 가져오는 API
export const getRomanceMovies = async (page = 1) => {
    const res = await customAxios.get("/discover/movie?with_genres=10749", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// Documentary 영화 정보를 가져오는 API
export const getDocumentaryMovies = async (page = 1) => {
    const res = await customAxios.get("/discover/movie?with_genres=99", {
      params: {
        api_key,
        language,
        page,
      },
    });
    return res.data.results;
};

// 검색한 영화 정보를 가져오는 API
export const getSearchData = async (keyword, page) => {
    const res = await customAxios.get(
      `/search/movie?include_adult=false&query=${keyword}`,
      {
        params: {
          api_key,
          language,
          page,
        },
      }
    );
    return res.data.results;
};
```

<br>
 
#### (3) 리뷰-작성, 수정, 삭제, 신고
리뷰에 관련된 기능은 firebase firestore를 통해 db를 설계하고 직접 구현하였습니다.

- #### 리뷰목록의 db구조
  - reviewList 컬렉션 아래 docs id로는 movieId를 두어 각 영화 데이터를 구분해주었습니다.
  - movieId Docs 아래로 영화에 리뷰 데이터들이 들어가는 review subColletion이 존재합니다.
  - MovieInfo 모달 창의 리뷰목록을 무한스크롤 페이징 기능으로 받아오기 위해 subCollection으로 데이터를 설계하였습니다.
  - subColletion 아래 docs id로 commentId를 주어 reivew 데이터를 구분해주었습니다.
  - docs 아래로는 리뷰 정보가 저장되는 field가 존재합니다.

&nbsp;&nbsp; ![reviewList_db구조](https://github.com/MAIN6419/MovieWorld/assets/113427991/eb156848-078e-437a-a613-c5d2aa9c6104)

- #### 유저의 db구조
  - user 컬렉션 아래 docs id로 각 계정의 uid를 주어 user 데이터를 구분해주었습니다.
  - docs 아래로는 user데이터가 들어가는 field와 리뷰 목록의 영화 정보가 들어가는 reviewListMovieInfo subCollection이 존재합니다.
  - 마이페이지에서 리뷰목록에서 영화데이터를 무한스크롤 페이징 기능으로 받아오기 위해 subColletion으로 데이터를 설계하였습니다.
  - subColletion 아래 docs id로 commentId를 주어 reivew 영화 데이터를 구분해주었습니다.
  - docs 아래로는 영화 정보가 저장되는 field가 존재합니다.
  

&nbsp;&nbsp; ![user_db구조](https://github.com/MAIN6419/MovieWorld/assets/113427991/7a7ff4ce-3023-4180-920f-481d9f65b617)
- #### 리뷰작성 API의 세 가지 처리
  - reviewList docs 중 해당 영화에 subColletion 아래 docs에 리뷰 데이터를 생성 
  - 마이페이지의 리뷰목록에서 해당 영화 데이터를 불러오기 위해 리뷰한 user 문서의 아래 subCollection인 reviewListMovieInfo 아래 docs에 리뷰한 영화의 정보를 저장 
  - 해당 유저가 해당 영화의 리뷰 유무 파악하기 위해 유저 db에 reviewList에 리뷰한 movieID를 추가
  
=> 위 세 가지 작업들은 순서가 상관없기 때문에 빠른 처리를 위해 `promise.all`를 이용하여 비동기 작업들을 병렬처리하였습니다.

```javascript
// 리뷰 작성 API
export const addReview = async (movieData, reviewData) => {
    // reviewList 해당 영화에 리뷰 데이터 추가
    const reviewListRef = collection(db, "reviewList");
    const reviewDoc = doc(reviewListRef, String(movieData.id));
    const reviewRef = collection(reviewDoc, "review");

    const addReviewPromise = setDoc(doc(reviewRef, reviewData.id), {
      id: reviewData.id,
      uid: reviewData.uid,
      rating: reviewData.rating,
      contents: reviewData.contents,
      createdAt: reviewData.createdAt,
      spoiler: reviewData.spoiler,
      isBlock: false,
      reportCount: 0,
    });

    // 유저 db subCollection에 review한 영화 정보 저장
    const UserReviewListRef = collection(db, "userReviewList");
    const UserReviewListDoc = doc(UserReviewListRef, auth.currentUser.uid);
    const UserReviewRef = collection(UserReviewListDoc, "reviewMovie");

    const addUserReviewListPromise = setDoc(
      doc(UserReviewRef, reviewData.id),
      movieData
    );

    // 유저 db reviewList에 리뷰한 movieId 추가
    const userRef = doc(db, `user/${auth.currentUser.uid}`);
    const addUserReivewPromise = updateDoc(userRef, {
      reviewList: arrayUnion(movieData.id),
    });

    // 순서에 상관없는 작업 병렬처리
    await Promise.all([
      addReviewPromise,
      addUserReviewListPromise,
      addUserReivewPromise,
    ]);
};
````

- #### 리뷰삭제
   - 리뷰삭제 API 또한 리뷰 작성의 위 세 가지 작업과 같은 작업을 통해 리뷰를 삭제 처리합니다.

```javascript
// 리뷰 삭제 API
export const removeReview = async (movieId, reviewId) => {
     // reviewList 해당 영화에 리뷰 데이터 삭제
    const reviewListRef = collection(db, "reviewList");
    const reviewDoc = doc(reviewListRef, String(movieId));
    const reviewRef = collection(reviewDoc, "review");
    const deleteReviewRef = doc(reviewRef, reviewId);
    const deleteReviewPromise = deleteDoc(deleteReviewRef);

    const UserRef = collection(db, "user");
    const UserReviewListMovieInfoDoc = doc(UserRef, auth.currentUser.uid);
    const UserReviewMovieInfoRef = collection(
      UserReviewListMovieInfoDoc,
      "reviewListMovieInfo"
    );

    // 유저 db subCollection에 review한 영화 정보 삭제
    const deleteUserReviewListRef = doc(UserReviewMovieInfoRef, reviewId);
    const deleteUserReviewListPromise = deleteDoc(deleteUserReviewListRef);

    // 유저 db reviewList에 리뷰한 movieId 삭제
    const userRef = doc(db, `user/${auth.currentUser.uid}`);
    const deleteUserReviewPromise = updateDoc(userRef, {
      reviewList: arrayRemove(movieId),
    });

    // 순서에 상관없는 작업 병렬처리
    await Promise.all([
      deleteReviewPromise,
      deleteUserReviewListPromise,
      deleteUserReviewPromise,
    ]);
};
```
- #### 리뷰 수정
   - reviewList 하위의 해당되는 subColletion docs field의 rating, contents, spoiler 값을 수정

```javascript
// 리뷰 수정 API
export const editReview = async (movieId, editData) => {
    const reviewListRef = collection(db, "reviewList");
    const reviewDoc = doc(reviewListRef, String(movieId));
    const reviewRef = collection(reviewDoc, "review");
    const updateReviewRef = doc(reviewRef, editData.id);

    await updateDoc(updateReviewRef, {
      rating: editData.rating,
      contents: editData.contents,
      spoiler: editData.spoiler,
    });
};
```

- #### 리뷰 신고
   - reviewList 하위의 해당되는 subColletion의 docs field의 reportCount 값을 1씩 증가 시킵니다.
   - 만약 reportCount가 5 이상인 경우 isBlock를 true주어 더 이상 리뷰목록에 출력되지 않도록 block 처리하였습니다.

```javascript
// 리뷰 신고 API
export const reviewReport = async (movieId, reviewData) => {
    // reviewList 컬렉션의 해당 docsId(movieId)의 subCollection의 docsId(reviewId) 해당되는 데이터
    const reviewListRef = collection(db, "reviewList");
    const reviewDoc = doc(reviewListRef, String(movieId));
    const reviewRef = collection(reviewDoc, "review");
    const updateReviewRef = doc(reviewRef, reviewData.id);

    // 리뷰 데이터의 신고수를 1 더해줌
    // 만약 리뷰 데이터의 신고수가 5 이상이 된다면(현재 4 => 클릭시 5이므로 >=4 조건식 사용) 해당 리뷰 block 처리
    const reportReviewPromise = updateDoc(updateReviewRef, {
      isBlock: reviewData.reportCount >= 4 ? true : false,
      reportCount: increment(1),
    });

    // 유저가 신고한 리뷰인지 아닌지 판단하기 위해 reportList에 해당 reviewID를 추가
    const userRef = doc(db, `user/${auth.currentUser.uid}`);
    const addReportListPromise = updateDoc(userRef, {
      reportList: arrayUnion(reviewData.id),
    });
    await Promise.all[(reportReviewPromise, addReportListPromise)];
};
```

<br>
 
#### (4) 리뷰 스포일러 체크 기능
 - 리뷰 작성시 스포일러가 포함된 글을 작성하고 싶은 유저가 존재하기 때문에 스포일러가 포함된 리뷰를 작성시에 스포일러가 포함되는 글이 있다는 체크 기능을 만들어
다른 유저가 리뷰를 볼 때 블라인드 처리 되도록 구현하였습니다.

&nbsp;&nbsp; ![스포일러 작성](https://github.com/MAIN6419/MovieWorld/assets/113427991/da38090e-e1b8-4524-9538-3e3288304337)

 - spoiler라는 값을 통해 해당 리뷰가 spoiler가 포함된 리뷰인지 아닌지를 구분합니다.
 - spoiler가 true 값이면 기존 contents 대신 '스포일러가 포함된 리뷰입니다.'를 출력합니다.
 - 옆에 제공된 보기 버튼을 누를 시 해당 contents가 출력되도록 구현하였습니다.

&nbsp;&nbsp; ![스포일러 보기](https://github.com/MAIN6419/MovieWorld/assets/113427991/fb84eec1-75cc-432a-b84b-697dfef7e908)

아래 코드에서는 reviewItem.spoiler를 통해 스포일러가 포함된 리뷰인지 아닌지를 구분하였습니다.

showSpoiler 상태를 통해 스포일러 리뷰를 보여줍니다.

=> showSpoiler true 일시 '스포일러가 포함된 리뷰입니다'가 출력됩니다. 

=>  showSpoiler false 일시 원래 리뷰 데이터의 contents 값으로 변경하였습니다.

```javascript
 //                                 .
 //                                 .
 //                                 .
 //                               (생략)

 <ReviewContents inactive={isBlock||(reviewItem.spoiler && !showSpoilerData)}>
            {reviewItem.isBlock
              ? "신고에 의해 블라인드 처리된 리뷰입니다."
              : reviewItem.spoiler
              ? showSpoilerData
                ? reviewItem.contents
                : "스포일러가 포함된 리뷰입니다."
              : reviewItem.contents}
            {reviewItem.spoiler && !showSpoilerData && (
              <ShowSpoilerBtn
                onClick={() => {
                  sweetConfirm(
                    "스포일러가 포함된 리뷰입니다.\n정말 확인 하시겠습니까?",
                    "확인",
                    "취소",
                    () => setShowSpoilerData(true)
                  );
                }}
              >
                보기
              </ShowSpoilerBtn>
            )}
</ReviewContents>

//                                (생략)
//                                  .
//                                  .
//                                  .
```
 
<br>
 
#### (5) 무한 스크롤
- 무한스크롤을 이용하여 데이터를 일부만 가져와 서버의 부담을 줄이고 로딩속도를 개선하기 위해 사용하였습니다.
- **react-intersection-observer** 라이브러리를 이용하여 무한스크롤을 구현하였습니다.
- **react-intersection-observer** 라이브러이의 `useView()`의 **ref**값을 관찰요소 **ref**값에 넣으면 관찰요소를 지정할 수 있습니다.
- 만약 관찰요소가 화면 출력되면 **inView** true로 화면에서 사라진다면 false로 변경되게 됩니다.
- useEffect hook를 이용하여 **inView가 true** 상태일 때 다음 페이지 데이터를 받아오도록 구현하였습니다.
- hasMore를 통해 다음 데이터가 없다면 api 요청을 일어나지 않게 조건을 걸어 주었습니다.
- hasMore는 현재 API에서 받아온 데이터의 length와 limt가 같은지 비교하여 다음 데이터가 있는지 판단해줍니다.
- API 요청을 보낼 때 마다 page(`res.docs[res.docs.length - 1]` : 현재 받아온 데이터 docs의 가장 마지막 docs)값을 파악하여 firebase의 startAfter(해당 docs 이후 docs를 받아올 수 있도록 하는 query) query를 이용하여 다음 페이지 데이터를 받아올 수 있도록 하였습니다.

``` javascript
// MypageMenu 컴포넌트
import React, { useEffect, useState } from "react";
import { useMovieInfo } from "../../hook/useMovieInfo";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";

import {
  fetchFirstLikeList,
  fetchLikeListPage,
  removeLike,
} from "../../firebase/likeAPI";
import {
  fetchFirstReviewMovieList,
  fetchReviewMovieListPage,
} from "../../firebase/reviewAPI";

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
  RemoveBtn,
} from "./mypage.style";
import ProgressiveImg from "../../compoents/commons/progressiveImg/ProgressiveImg";
import Blank from "../../compoents/commons/blank/Blank";
import Loading from "../../compoents/commons/loading/Loading";
import MovieInfo from "../../compoents/commons/Modal/MovieInfo.container";
import { sweetToast } from "../../sweetAlert/sweetAlert";

export default function MypageMenu() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenMovieInfo, setIsOpenMovieInfo, seletedMovie, onClickMovieInfo] =
    useMovieInfo(false);
  const [page, setPage] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const limitPage = 20;
  const [ref, inview] = useInView();
  const [menu, setMenu] = useState("like");
  const [notData, setNotData] = useState(true);
  const isMoblie = useMediaQuery({ query: "(max-width:486px)" });

  const fetchFirstPage = async () => {
    setNotData(true);
    // menu가 like 일시 좋아요 목록을 받아옴
    // like가 아니라면 리뷰 목록을 받아옴
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

  // 다음 페이지 데이터를 받아옴
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

  // menu 상태가 바뀔 때 마다 데이터를 초기화
  useEffect(() => {
    setData([]);
    fetchFirstPage();
  }, [menu]);

 // inView 상태가 바뀔 때 마다 다음 데이터가 존재한다면 다음 데이터를 받아옴
  useEffect(() => {
    if (hasMore && inview) {
      fetchAddData();
    }
  }, [inview]);

//                                      (생략)
//                                        .
//                                        .
//                                        .
                                    
````

- 무한 스크롤 적용 화면

&nbsp;&nbsp; ![무한스크롤](https://github.com/MAIN6419/MovieWorld/assets/113427991/a2b9e4c3-91e7-4e7a-8068-9895ceff6390)

<br>
 
#### (6) 검색 디바운싱
- 기존 검색시 onChange 이벤트에서 input의 변화가 감지될 때 마다 API요청이 발생하여 불필요한 API 요청이 발생합니다.
- **debunce**을 통해 설정한 시간이 경과한 이후 이벤트가 호출되지 않을 때 이벤트를 한 번만 호출하게 해주어 불필요한 API 호출을 막아줍니다.
- lodash 라이브러리의 debounce를 이용하여 구현하였습니다.
- **lodash debounce**는 첫 번째 인자로 실행할 함수, 두 번째 인자로 시간을 받습니다.
- debouncing 제대로 적용되도록 **useCallback**를 사용하여 함수가 다시 재생성되는 것을 막아 함수가 한 번만 실행되도록 하였습니다.
  
``` javascript
 // 검색 디바운싱 적용 검색어가 있을 경우 검색어에 해당하는 데이터를 저장
  const searchDebounce = useCallback(
    debounce(async (value) => {
      if (!value) {
      // 검색어가 없다면 데이터 초기화
        fetchFirstData();
        return;
      }
      const data = await fetchSearchMovie(value);
      setMovieData(data);
    }, 500),
    []
  );
````

- 검색 디바운싱 적용 전
  
&nbsp;&nbsp; ![검색디바운싱-적용전](https://github.com/MAIN6419/MovieWorld/assets/113427991/ed484ef8-8d8b-4789-9918-ba40ac39c6d7)

  
- 검색 디바운싱 적용 후
  
&nbsp;&nbsp; ![검색디바운싱-적용후](https://github.com/MAIN6419/MovieWorld/assets/113427991/efabf5cd-4499-4760-b532-af0f35fff4ed)

<br>
   
#### (7) 이미지 최적화
#### ① 이미지 사이즈 최소화
- 필요한 이미지 크기 보다 더 큰 이미지를 사용하는 것은 리소스 낭비가 됩니다.
- 이미지 리소스 낭비를 최소화 하기 위해 사용할 크기에 맞게 이미지 크기를 최소화 하였습니다.
- 이미지 형식은 svg 형식의 이미지를 이용하였습니다.
  - svg 형식 이미지는 간단한 이미지인 경우 png 형식보다 이미지 용량이 작으며, 레티나 디스플레이에서도 이미지가 깨지는 현상이 없습니다.
    
#### ② imageCompression 라이브러리를 이용하여 이미지 압축
- 서버에 이미지를 전송할 시 필요한 이미지 만큼만 최소로 압축하여 이미지 리소스 낭비를 줄일 수 있도록 하였습니다.
- 별도의 imgCompression 함수를 만들어 사용하였습니다.
 
```javascript
import imageCompression from "browser-image-compression"

export const imgCompression = async (file) => {
  try{
    const options = {
        maxSizeMB: 10, // 이미지 최대 용량
        maxWidthOrHeight: 256, // 이미지 최대 너비 및 높이
        useWebWorker: true, // webworker 적용 유무
        // webworker : 웹 워커 API가 멀티 스레딩을 지원하게 되어 워커를 이용하면 워커에서 작성된 스크립트는 
        // 메인 스레드에서 분기되어 독립된 스레드로 실행되기 때문에 메모리 자원을 효율적으로 사용할 수 있다.
    }
    // 압축된 이미지 blob
    const compressedFileBlob = await imageCompression(file, options);
    // blob 형식의 이미지를 file 형식으로 변환
    const compressedFile = new File([compressedFileBlob], file.name, { type: file.type });
    // 미리보기 이미지를 URL 생성
    const preview = await imageCompression.getDataUrlFromFile(file);
    // 압축된 파일과 미리보기 이미지를 반환
    return {compressedFile, preview}
  } catch(error) {
    console.log(error)
  }
}
```

&nbsp;&nbsp; ![이미지압축](https://github.com/MAIN6419/MovieWorld/assets/113427991/4b31b196-8c10-4188-a5e5-46fe0d613938)

- 이미지 압축 전
  - 이미지 크기 : 578MB

- 이미지 압축 후
  - 이미지 크기 : **587MB => 72MB (515MB 약 1/8 크기 감소)**
  
#### ③ 점진적 로딩 기법 및 lazy-loading를 통한 이미지 최적화
- **점진적 로딩 기법**를 통해 이미지가 로딩될 때 원본 이미지 대신 저화질의 이미지를 보여줌으로써 UX를 향상 시켰습니다.
- **react-intersection-observer** 라이브러리를 이용하여 **lazy-loading**를 구현하였습니다.
- 이를 통해 이미지가 화면에서 나타날 때 이미지를 불러올 수 있도록 설정하여 로딩시간을 단축 시킬 수 있습니다.
- 이 두 가지 기법을 이미지에 적용하기 위해 ProgressiveImg 컴포넌트를 만들고, 이미지에 적용시켜 주었습니다.

- ProgressvieImg Props
  - `placeholderSrc` : 원본 이미지가 로딩되기전 보여줄 저화질의 이미지 url 입니다.
  - `src` : 원본 이미지의 url 입니다.
  - `...props` : 그 외 props를 모두 받아오기 위해 사용 하였습니다.

``` javascript
// ProgressvieImg 컴포넌트
import React, { useEffect, useState } from "react";
import { Img } from "./progressiveImg.style";
import { useInView } from "react-intersection-observer";

export default function ProgressiveImg({
  placeholderSrc,
  src,
  styles,
  ...props
}) {
  // 이미지 src를 관리
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  // 현재 로딩이 상태
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView();
  useEffect(() => {
    // 이미지가 화면에서 보이고, imgSrc가 placholder이미지 일때 이미지를 받아옴
    if (inView && imgSrc === placeholderSrc) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLazy(false);
      };
      img.onerror = () => {
        setImgSrc(
          resolveWebp(webpSupport, "/assets/webp/placeholderImg.webp", "svg")
        );
        setIsLazy(false);
      };
    }
  }, [src, inView]);

  return (
    <Img
      {...{ src: imgSrc, ...props }}
      isLazy={isLazy}
      // 로딩 상태일 때 blur효과를 주기위해 사용
      className={isLoading ? "lading" : "loaded"}
      ref={ref}
    />
  );
}
```

#### ④ 최신 이미지 형식 Webp 적용
- WebP 이미지는 JPEG나 PNG에 비해 압축률이 높고, 더 작은 파일 크기를 가지며, 높은 품질을 제공하는 이미지 형식입니다.
- Webp 이미지 형식은 구 브라우저는 지원하지 않기 때문에 점진적 향상 기법을 이용하여 다르게 처리해 주었습니다.
- Webp 이미지가 지원이 된다면 body 태그에 webp classList를 추가해주고, Webp 이미지가 지원되지 않는다면 no-webp classList를 추가해 주었습니다.
- body classList를 통해 이미지 형식이 다르게 적용되도록 처리하였습니다.
- 구 브라우저에서는 svg 이미지 형식이 적용되도록 처리하였습니다.
- Webp가 지원되는 브라우저에서너 Webp 이미지가 적용되도록 처리하였습니다.
- detectWebpSupport, resolveWebp 함수를 만들어 이를 적용시켜 주었습니다.
 
- detectWebpSupport
  - webpdata에 1x1 픽셀 크기의 Webp 형식의 이미지 데이터를 base64로 인코딩한 문자열을 할당합니다.
  - 이미지 로딩이 성공적으로 완료되거나 에러가 발생했을 때 callback 함수가 실행됩니다.
  - webp 이미지가 로딩 되고, webp이미지 지원여부 확인을 기다리기 위해 Promise를 이용해 비동기 처리를 해주었습니다.
  - image.src에 webpdata를 할당하여, 생성한 빈 이미지 객체가 해당 Webp 이미지를 로딩하도록 합니다.
  - callback 함수에서는 event.type이 "load"인 경우와 이미지의 너비(image.width)가 1 픽셀인 경우를 검사하여 브라우저가 Webp 이미지를 지원하는지 여부를 판별합니다.
  - 브라우저가 Webp 이미지를 지원하는 경우 document.body 요소의 classList에 "webp"를 추가합니다.
  - 지원하지 않는 브라우저라면 document.body 요소의 classList에 "no-webp"를 추가합니다.
 
- resolveWebp
   - webpSupported: webp지원 유무, img : Webp 이미지 경로, fallbackExt : Webp 이미지 형식 대신 사용할 이미지 형식
   - ext에 이미지 형식을 저장합니다.
   - webpSupported가 false인 경우, ext이 webp인 경우에 webp 이미지 경로 대신 webp 대신 사용할 이미지 형식 경로를 반환합니다.
   - replace 메서드를 이용해서 이미지경로를 수정합니다. /webp 제거 후, .webp를 대체할 이미지 형식으로 교체합니다.
   - 현재 프로젝트에서 사용 중인 이미지 경로 예시 : img/assets/webp/webpImg.webp => img/assets/svgImg.svg

```javascript
  export async function detectWebpSupport() {
  // webp 이미지가 로딩 될 때까지 기다리기 위해 비동기 처리
  return new Promise((resolve) => {
    const image = new Image();
    // 1px x 1px WebP 이미지
    const webpdata =
      "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";

    const callback = (event) => {
      // event.type이 "load"인 경우와 이미지의 너비(image.width)가 1 픽셀인 경우를 검사하여 브라우저가 WebP 이미지를 지원하는지 여부를 판별
      const result = event?.type === "load" && image.width === 1;
      if (result) {
        resolve(true); // WebP 지원됨
      } else {
        resolve(false); // WebP 지원되지 않음
      }
    };

    image.onerror = callback;
    image.onload = callback;
    image.src = webpdata;
  });
}

  export const resolveWebp = (img, fallbackExt) => {
  const webpSupported = document.body.classList.contains("webp");
  // 이미지 포맷
  const ext = img.split(".").pop();
  // webpSupported false, ext가 webp인 경우
  if (!webpSupported && ext === "webp") {
    return img.replace("/webp", "").replace(".webp", `.${fallbackExt}`);
  }
  return img;
};
```

- 이미지 최적화 전 
  - 이미지 리소스 : 약 68MB
  - 로딩 속도 : 5.8초

 &nbsp;&nbsp; ![이미지최적화전](https://github.com/MAIN6419/MovieWorld/assets/113427991/6633b215-0ac1-4990-b5f9-dc41a084c071)

- 이미지 최적화 후
  - 이미지 리소스 : **67MB => 8.9MB (58MB 단축)**
  - 로딩 속도 : **5.8초 => 3.5초 (2.3초 단축)**

 &nbsp;&nbsp; ![이미지최적화후](https://github.com/MAIN6419/MovieWorld/assets/113427991/996929d3-4ec2-4e5f-8606-a6a83b3f8bef)
 
#### (8) 웹 접근성 키보드 포커싱 최적화 
- 모달 창에서 키보드 포커싱 최적화하기 위해 optKeyboardFocus 함수를 생성하였습니다.
  - 모달창에서 포커싱이 벗어나지 않도록 설정해주었습니다. 
  - shift + tab 키를 눌렀을 경우(이전 요소) 포커싱을 받을 요소로 인자로 받은 previousTarget 설정하였습니다.
  - tab 키를 눌렀을 경우 포커싱을 받을 요소로 인자로 받은 nextTarget으로 설정하였습니다,
  - nextTarget이 필요없는 경우에는 previousTarget만 적용되도록 else if문 nextTarget && 조건을 추가해주었습니다.
  - previousTarget은 필요없는 경우가 없기 때문에 생략되는 경우를 고려하지 않았습니다.
    - nextTarget만 있는 경우에도 previousTarget이 필요 => e.preventDefault() 처리로 이전 요소 포커싱(shift+tab)이 작동하지 않고 nextTarget.focus() 작동되기 때문입니다.
    - 이전 요소(shift + tab), 다음 요소(tab) 포커스 이동시 tab키가 같이 쓰이기 때문입니다.
    - shift+tab키를 누르는 경우도 별도의 조건 처리가 필요합니다.
- esc 키를 누를 경우 모달창이 닫히도록 처리하였습니다.
- 또한 selector 메뉴가 활성화 되면 포커싱이 벗어나지 않도록 처리하였으며, esc키를 누르면 닫히도록 처리 하였습니다.
 
``` javascript
// optKeyboardFocus 함수
// 키보드 포커스 웹 접근성 최적화 함수
// 첫 번째 인자로는 이벤트
// 두 번째 인자로 다음 focus될 대상, 세 번째 인자로 이전 focus될 대상
export const optKeyboardFocus = (e, previousTarget, nextTarget = null) => {
  if (e.shiftKey && e.keyCode === 9) {
    e.preventDefault();
    previousTarget.focus();
  } else if (nextTarget && e.keyCode === 9) {
    e.preventDefault();
    nextTarget.focus();
  }
};
```

- 키보드 포커싱 최적화 처리 전
  - 키보드 포커싱이 모달 창 밖으로 벗어나는 것을 볼 수 있습니다.
    
 &nbsp;&nbsp; ![키보드최적화전](https://github.com/MAIN6419/MovieWorld/assets/113427991/d10ba7fe-5c7c-45af-bdb7-d04a79a84e6d)

- 키보드 포커싱 최적화 처리 후
  - 키보드 포커싱이 모달 창 밖으로 벗어나지 않는 것을 볼 수 있습니다.
  - esc키를 눌러 모달 창이 닫히는 것을 볼 수 있습니다.
    
 &nbsp;&nbsp; ![키보드최적화후](https://github.com/MAIN6419/MovieWorld/assets/113427991/0f1718b7-9ed4-4a15-9a55-f364b57dc68e)
 
#### (9) sweetAlert2
- alert창과 confirm창을 커스텀 하기위해 **sweetAlert2** 라이브러리를 활용하였습니다.
- <a href="https://sweetalert2.github.io/">https://sweetalert2.github.io/</a> 사이트의 docs를 참고하여 구현하였습니다.
- 원하는 디자인 사용과 중복된 코드 사용을 줄이기 위해 별도의 파일에 **sweetToast, sweetConfirm** 함수를 만들어 사용하였습니다.
- sweetToast
  - alert창 대신 활용하기 위해 추가해주었습니다.
  - 인자 값은 title(alert 창에 나타나는 내용), icon(alert창에 나타나는 아이콘), timer(alert창이 사라지는 시간)를 받습니다.
  - Swal.fire를 이용하여 sweetAlert2 창을 사용하며, 속성으로 toast: ture(toast창 사용 유무), title(toast창에 들어갈 내용), postiton(배치할 위치), showConfirmButton(확인버튼 유무), icon(아이콘 설정), timer(창이 사라지는 시간 설정)를 넣어주었습니다.
- sweetConfirm 
  - 인자 값은 title(confirm창 내용), confirmButtonText(confirm창 확인 버튼 내용), cancelButtonText(confirm창 취소 버튼 내용)를 받습니다. 
  - Swal.fire를 이용하여 sweetAlert2 창을 사용하며, 속성으로 title(confirm창 내용), showCancelButtonText(취소버튼활성화 유무), focusConfirm(confirm창 포커싱 유무), confirmButtonText(confirm창 확인 버튼 내용), cancelButtonText(confirm창 취소 버튼 내용), showCloseButton(닫기 버튼 활성화 유무)를 넣어주었습니다.

``` javascript
import Swal from "sweetalert2";
import "./sweetAlert.css";
import 'sweetalert2/dist/sweetalert2.min.css';
export const sweetToast = (title, icon = null, timer = 2000) => {
  return Swal.fire({
    toast: true,
    title,
    position: "top",
    showConfirmButton: false,
    icon,
    timer
  });
};

export const sweetConfirm = (
  title,
  confirmButtonText,
  cancelButtonText,
  cb
) => {
  return Swal.fire({
    title,
    showCancelButton: true,
    focusConfirm: true,
    confirmButtonText,
    cancelButtonText,
    showCloseButton: false,
  }).then(({ isConfirmed }) => {
    if (isConfirmed) {
      cb();
    }
  });
};
```
- sweetAlert2 적용 화면

&nbsp;&nbsp; ![sweetAlert2적용](https://github.com/MAIN6419/MovieWorld/assets/113427991/23d0631b-e769-4176-84fc-af92334df97f)

### 🔫 트러블 슈팅
#### (1) Search 페이지에서 검색 후 요소 클릭 시 스크롤이 올라가는 이슈
 - 원인 : input창의 focus가 유지된 채로 다른 요소를 클릭 했기 때문에, input 요소의 foucs가 해제 되면서 스크롤이 위로 올라는 문제였습니다.
 - 해결방안 : input의 검색어 입력이 끝나면 blur 처리를 해주어 문제를 해결하였습니다.

```javascript
  // 검색 디바운싱 적용 검색어가 있을 경우 검색어에 해당하는 데이터 출력
  const searchDebounce = useCallback(
    debounce(async (value) => {
      if (!value) {
        fetchFirstData();
        return;
      }
      const data = await fetchSearchMovie(value);
      setMovieData(data);
      // 검색이 완료된 이후 input를 blur 처리
      // blur 처리를 하지 않으면 input의 포커스가 유지된 채 스크롤 내려 다른 요소 클릭 시 
      // 포커스가 해제되면서 input요소를 찾아 스크롤이 위로 올라 오기 때문 
      searchInputRef.current.blur();
    }, 500),
    []
  );
```

- 이슈 해결 전
  - 스크롤을 내린 후 클릭 시 스크롤이 위로 올라 오는 것을 볼 수 있습니다.
  
![search오류수정전](https://github.com/MAIN6419/MovieWorld/assets/113427991/eea7df4d-48c6-402a-87aa-3b3c63c8f482)

- 이슈 해결 후
  - 스크롤을 내린 후 클릭 시 스크롤이 유지되는 것을 볼 수 있습니다.
    
![search오류 해결후](https://github.com/MAIN6419/MovieWorld/assets/113427991/ee0e4f5f-6017-44ae-a717-f09808eba7fb)
  
#### (2) Mypage 찜 목록에서 찜 해제 후 다시 추가 시 기존 찜 목록의 정렬과 다르게 정렬 되는 이슈
- 원인 : firebase의 정렬 기준이 javascript 정렬 기준과 달라서 발생한 문제였습니다.
- 해결방안 : firebase의 정렬 기준에 맞게 sort 메서드의 정렬 기준을 적용 시켜주는 로직을 추가해주었습니다.

MovieInfo.container 컴포넌트 onClickLike 함수 코드

```javascript
 const onClickLike = async () => {
    if (!user) {
      return sweetToast("로그인 후 이용가능합니다!", "warning");
    }
    if (!like) {
      setLike(true);
      await addLike(videoData);
      if (setMypageLikeData) {
        // firebase 정렬과 같은 순서를 맞춰주기 위해 사용함
        const patternNumber = /[0-9]/;
        const patternAlphabet = /[a-zA-Z]/;
        const patternHangul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        const orderLevelDesc = [patternNumber, patternAlphabet, patternHangul];
        const getLevel = (str) => {
          const index = orderLevelDesc.findIndex((pattern) => pattern.test(str));
          // orderLevelDesc 배열에서 만족하는 패턴의 인덱스를 반환해줌
          return index;
        };
        setMypageLikeData((prev) =>
          [...prev, videoData].sort((a, b) => {
            // 첫번째 문자를 넣어줘서 만족는 패턴의 인덱스를 반환 받음
            const aLevel = getLevel(a.title.charAt(0));
            const bLevel = getLevel(b.title.charAt(0));
            // 시작하는 문자열이 같은 종류일 경우는 유니코드 값으로 사전식 정렬
            if (aLevel === bLevel) {
              return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            }
            // 문자열이 같은 종류가 아닌 경우 위 패턴에 나온 순서대로 정렬
            return aLevel - bLevel;
          })
        );
      }
    } else {
      setLike(false);
      removeLike(videoData);
      if (setMypageLikeData) {
        setMypageLikeData((prev) =>
          prev.filter((item) => item.id !== videoData.id)
        );
      }
    }
  };
```

- 이슈 해결 전
  - 찜 목록을 제거 후 다시 추가 하면 정렬 순서가 다르게 적용 되는 것을 볼 수 있습니다.
    
![정렬오류수정전](https://github.com/MAIN6419/MovieWorld/assets/113427991/dd3319a7-ed52-4b95-a195-ed417c9bdcc0)

- 이슈 해결 후
  - 찜 목록을 제거 후 다시 추가 하면 정렬 순서가 동일하게 적용 되는 것을 볼 수 있습니다.
    
![정렬오루수정후](https://github.com/MAIN6419/MovieWorld/assets/113427991/ab86b8b8-a017-403b-8a40-c2fb8988bde7)

=> 위 해결 방법으로 해결 했지만 찜 목록의 **데이터가 많아질 경우** 성능 이슈가 발생할 문제가 있어, 추가적인 방법을 생각하였습니다.

=> 찜 목록을 **제한**하는 방식으로 해결하였습니다.

이 방식으로 얻은 장점
- 사용자가 찜 목록이 많아질 경우 관리가 복잡해지는 문제를 미리 해결할 수 있었습니다.
- 제한을 두었기 때문에 데이터가 많아져 문제가 발생할 경우가 없어집니다.
  
이 방식으로 얻는 단점
- 사용자가 찜 목록에 제한을 둔다면 불편을 느끼는 사용자가 발생할 수 있습니다.
- 더 많은 찜 목록을 요구하는 사용자가 발생할 수 있습니다.

MovieInfo.container 컴포넌트 fetchLike 함수, onClickLike 코드

```javascript
  const fetchLike = async () => {
    if (user) {
      const data = await getUser();
      // 유저 데이터 likeList에서 현재 데이터의 id와 일치하는 찜 데이터가 있는지 확인
      const isLike =
        data && data.likeList.find((likeId) => likeId === videoData.id);
      // 결과를 boolean 형식으로 변환후 like 상태에 적용
      setLike(!!isLike);
      // likeList의 길이가 likListLimit 클 때를 비교해서 isExceed 상태에 적용
      setIsExceed(data.likeList.length > likListLimit);
    }
  };

const onClickLike = async () => {
    if (!user) {
      return sweetToast("로그인 후 이용가능합니다!", "warning");
    }
    // 찜 목록 최대 수를 초과하면 찜 가능을 막는다.
    if(isExceed) {
      return sweetToast("최대 찜 목록 수를 초과하였습니다.\n찜 목록 삭제 후 이용해주세요!", "warning");
    }
    if (!like) {
      setLike(true);
      await addLike(videoData);
      if (setMypageLikeData) {
        // firebase 정렬과 같은 순서를 맞춰주기 위해 사용함
        const patternNumber = /[0-9]/;
        const patternAlphabet = /[a-zA-Z]/;
        const patternHangul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        const orderLevelDesc = [patternNumber, patternAlphabet, patternHangul];
        const getLevel = (str) => {
          const index = orderLevelDesc.findIndex((pattern) => pattern.test(str));
          // orderLevelDesc 배열에서 만족하는 패턴의 인덱스를 반환해줌
          return index;
        };
        setMypageLikeData((prev) =>
          [...prev, videoData].sort((a, b) => {
            // 첫번째 문자를 넣어줘서 만족는 패턴의 인덱스를 반환 받음
            const aLevel = getLevel(a.title.charAt(0));
            const bLevel = getLevel(b.title.charAt(0));
            // 시작하는 문자열이 같은 종류일 경우는 유니코드 값으로 사전식 정렬
            if (aLevel === bLevel) {
              return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            }
            // 문자열이 같은 종류가 아닌 경우 위 패턴에 나온 순서대로 정렬
            return aLevel - bLevel;
          })
        );
      }
    } else {
      setLike(false);
      removeLike(videoData);
      if (setMypageLikeData) {
        setMypageLikeData((prev) =>
          prev.filter((item) => item.id !== videoData.id)
        );
      }
    }
  };
```
#### (3) WebpSupport 상태가 제대로 적용되지 않는 현상
- 원인 : detectWebpSupport 함수에서 webp 이미지 로딩 되기까지 기다리는 비동기 처리를 해주지 않아 발생한 문제였습니다.
- 해결방안 : detectWebpSupport 함수를 promise를 이용하여 비동기 처리해주어 해결하였습니다.

#### 문제 발생 코드

detectWebpSupport 함수 코드
```javascript
export function detectWebpSupport() {
  const image = new Image();
  // 1px x 1px WebP 이미지
  const webpdata = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
  const callback = (event) => {
    // event.type이 "load"인 경우와 이미지의 너비(image.width)가 1 픽셀인 경우를 검사하여 브라우저가 WebP 이미지를 지원하는지 여부를 판별
    const result = event?.type === "load" && image.width === 1;
    if (result) {
      document.body.classList.add("webp");
    }
    else {
      document.body.classList.remove("webp");
    }
  };
  image.onerror = callback;
  image.onload = callback;
  image.src = webpdata;
}
```

App 컴포넌트 중 detectWebpSupport 호출 코드
```javascript
useEffect(() => {
    detectWebpSupport();
    if (document.body.classList.contains("webp")) {
      setWebpSupport(true);
    }
  }, []);
```
<br>

#### 문제 해결 후 코드

detectWebpSupport 함수 코드

```javascript
export async function detectWebpSupport() {
  // webp 이미지가 로딩 될 때까지 기다리기 위해 비동기 처리
  return new Promise((resolve) => {
    const image = new Image();
    // 1px x 1px WebP 이미지
    const webpdata =
      "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";

    const callback = (event) => {
      // event.type이 "load"인 경우와 이미지의 너비(image.width)가 1 픽셀인 경우를 검사하여 브라우저가 WebP 이미지를 지원하는지 여부를 판별
      const result = event?.type === "load" && image.width === 1;
      if (result) {
        document.body.classList.add("webp");
        resolve(true); // WebP 지원됨
      } else {
        document.body.classList.remove("webp");
        resolve(false); // WebP 지원되지 않음
      }
    };

    image.onerror = callback;
    image.onload = callback;
    image.src = webpdata;
  });
}
```

App 컴포넌트 중 detectWebpSupport 호출 코드
```javascript
  const checkWebp = async() => {
    const res = await detectWebpSupport();
    if (res) {
      setWebpSupport(true);
    } else {
      setWebpSupport(false);
    }
  }

  useEffect(() => {
    checkWebp();
  },[]);
```
#### (4) webp 이미지가 적용될 때 svg 이미지 리소스도 같이 불러오는 문제 
- 원인 : 기존 코드에서 webp라는 classList가 없을 때 svg 이미지를 불러오도록 했는데, 처음에는 body 태그에 아무런 className이 없기 때문에 svg 이미지가 적용되어서 문제가 발생하였습니다.
  또한 resolveWebp 함수에서 인자로 받는 webpSupport 값이 context로 저장된 값이기 때문에 초기값이 null 주어져서 조건문에 의해 svg 이미지 경로를 반환하기 때문에 svg 이미지가 적용되는 문제가 발생하였습니다.
- 해결방안 : webp 이미지를 지원하지 않는다면 **no-webp라는 classList**를 주어 초반 className이 없을 경우에는 svg 이미지가 적용되지 않도록 수정하여 해결하였습니다.
  resolveWebp함수에서 **webpSupport 값이 null인 경우 retrun** 되도록 처리하여 context가 초기 값(null)일때 svg 이미지가 적용되는 문제를 해결하였습니다.

webpSupport.js 코드
```javascript
  export async function detectWebpSupport() {
  // webp 이미지가 로딩 될 때까지 기다리기 위해 비동기 처리
  return new Promise((resolve) => {
    const image = new Image();
    // 1px x 1px WebP 이미지
    const webpdata =
      "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";

    const callback = (event) => {
      // event.type이 "load"인 경우와 이미지의 너비(image.width)가 1 픽셀인 경우를 검사하여 브라우저가 WebP 이미지를 지원하는지 여부를 판별
      const result = event?.type === "load" && image.width === 1;
      if (result) {
        document.body.classList.add("webp");
        resolve(true); // WebP 지원됨
      } else {
        document.body.classList.add("no-webp");
        resolve(false); // WebP 지원되지 않음
      }
    };

    image.onerror = callback;
    image.onload = callback;
    image.src = webpdata;
  });

export const resolveWebp = (webpSupported, img, fallbackExt) => {
  // webpSupported null인 경우는 context 초기 값이므로 return
  if(webpSupported===null) return;
  // 이미지 포맷
  const ext = img.split(".").pop();
  // webpSupported false, ext가 webp인 경우
  if (!webpSupported && ext === "webp") {
    return img.replace("/webp", "").replace(".webp", `.${fallbackExt}`);
  }
  return img;
};
```
#### (5) 새로고침 시 잠깐 동안 이미지가 나오지 않고 alt가 나오는 현상
- 원인 : resolveWebp 함수에서 webpSupported가 null인 경우 함수를 바로 retrun 하였는데, 이 경우에는 아무 이미지 경로도 반환하지 않기 때문에 이미지가 적용되지 않고, 이미지 alt가 출력되는 문제가 발생하였습니다.
- 해결방안 : webpSupported를 인자로 받지 않고 함수 안에서 선언하였습니다.

 ```javascript
export const resolveWebp = (webpSupported, img, fallbackExt) => {
  const webpSupported = document.body.classList.contains("webp");
  // 이미지 포맷
  const ext = img.split(".").pop();
  // webpSupported false, ext가 webp인 경우
  if (!webpSupported && ext === "webp") {
    return img.replace("/webp", "").replace(".webp", `.${fallbackExt}`);
  }
  return img;
};
```
#### (6) webp 이미지가 적용될 때 svg 이미지 리소스도 같이 불러오는 문제
- 원인 : 초기 body classList가 없을 때 resolveWebp 함수가 실행되었기 때문에 문제가 발생하였습니다.
- 해결방안 : detectWebpSupport 함수 비동기 처리를 이용하여 app 컴포넌트에 detectWebpSupport 함수가 실행되고 나서 body의 classList 부여 후 webpChecked 상태를 통해 조건부 렌더링을 걸어주어 body에 classList가 있는 경우에만 렌더링 될 수 있도록 하여 문제를 해결하였습니다.

detectWebpSupport 함수
```javascript
export async function detectWebpSupport() {
  // 이미지가 webp 지원유무를 파악하고 렌더링 될 수 있도록 비동기 처리
  return new Promise((resolve) => {
    const image = new Image();
    // 1px x 1px WebP 이미지
    const webpdata =
      "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";

    const callback = (event) => {
      // event.type이 "load"인 경우와 이미지의 너비(image.width)가 1 픽셀인 경우를 검사하여 브라우저가 WebP 이미지를 지원하는지 여부를 판별
      const result = event?.type === "load" && image.width === 1;
      if (result) {
        resolve(true); // WebP 지원됨
      } else {
        resolve(false); // WebP 지원되지 않음
      }
    };

    image.onerror = callback;
    image.onload = callback;
    image.src = webpdata;
  });
}
```

App 컴포넌트 
 ```javascript
 //                           '
 //                           '
 //                           '
 //                         (생략)

 // webp 지원유무가 확인 되었을때 컴포넌트를 렌더링 시키위해 사용
  const [webpChecked, setWebpChecked] = useState(false);

  const checkwebp = async () => {
    const webpSupport = await detectWebpSupport();
    if (webpSupport) {
      // webp가 지원된다면 body에 webp classList추가
      document.body.classList.add("webp");
    } else {
      // webp가 지원되지 않는다면 body에 no-webp classList추가
      document.body.classList.add("no-webp");
    }
    // webp 지원유무가 확인되었다면 true로 설정
    setWebpChecked(true);
  };

  useEffect(() => {
    checkwebp();
  }, []);

 //                         (생략)
 //                           '
 //                           '
 //                           '
```
