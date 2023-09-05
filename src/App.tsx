import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Splash from "./pages/splash/Splash";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup.container";
import FindAccount from "./pages/findAccount/FindAccount.container";
import Search from "./pages/search/Search";
import Mypage from "./pages/mypage/Mypage";
import Header from "./compoents/commons/layouts/Header/Header";
import Banner from "./compoents/commons/layouts/Banner/Banner";
import Footer from "./compoents/commons/layouts/Footer/Footer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Main from "./pages/main/Main";
import NotFound from "./pages/notFound/NotFound";
import { detectWebpSupport } from "./libray/webpSupport";
import { RootState } from './store/store';

function App() {
  const userData = useSelector((state: RootState) => state.user.data);
  // webp 지원유무가 확인 되었을때 컴포넌트를 렌더링 시키위해 사용
  const [webpChecked, setWebpChecked] = useState(false); 

  const checkwebp = async () => {
    const webpSupport = await detectWebpSupport();
    if (webpSupport) {
      document.body.classList.add("webp");
    } else {
      document.body.classList.add("no-webp");
    }
    // webp 지원유무가 확인되었다면 true로 설정
    setWebpChecked(true);
  };

  useEffect(() => {
    checkwebp();
  }, []);

  return (
    // webp 지원유무가 확인 되면 렌더링
    webpChecked && (
      <>
        <Routes>
          <Route
            path="/"
            element={userData ? <Navigate to="/main" /> : <Splash />}
          />
          <Route
            element={
              <>
                <Header />
                <Outlet />
              </>
            }
          >
            <Route
              path="/login"
              element={userData ? <Navigate to="/main" /> : <Login />}
            />
            <Route
              path="/signup"
              element={
                userData && userData.displayName ? (
                  <Navigate to="/main" />
                ) : (
                  <Signup />
                )
              }
            />
            <Route
              path="/findAccount"
              element={userData ? <Navigate to="/main" /> : <FindAccount />}
            />
            <Route
              path="/main"
              element={
                <>
                  <Banner />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route path="/search" element={<Search />} />
            <Route
              path="/mypage"
              element={!userData ? <Navigate to="/login" /> : <Mypage />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    )
  );
}

export default App;
