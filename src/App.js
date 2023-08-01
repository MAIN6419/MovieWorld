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
import { UserContext } from "./context/userContext";
import Main from "./pages/main/Main";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NotFound from "./pages/notFound/NotFound";
import { detectWebpSupport } from "./libray/webpSupport";
import { WebpContext } from "./context/webpContext";

function App() {
  const [webpSupport, setWebpSupport] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );

  const refreshUser = () => {
    const user = getAuth().currentUser;
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
    );
    setUser({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
  };

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
      } else {
        setUser("");
        localStorage.removeItem("user");
      }
    });
  }, []);

  useEffect(() => {
    detectWebpSupport();
    if (document.body.classList.contains("webp")) {
      setWebpSupport(true);
    } else {
      setWebpSupport(false);
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, refreshUser }}>
        <WebpContext.Provider value={{ webpSupport }}>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/main" /> : <Splash />}
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
                element={user ? <Navigate to="/main" /> : <Login />}
              />
              <Route
                path="/signup"
                element={
                  user.displayName ? <Navigate to="/main" /> : <Signup />
                }
              />
              <Route
                path="/findAccount"
                element={user ? <Navigate to="/main" /> : <FindAccount />}
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
                element={!user ? <Navigate to="/login" /> : <Mypage />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WebpContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
