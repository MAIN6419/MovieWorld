import GlobalStyles from "./GlobalStyles";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import Splash from "./pages/splash/Splash";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import FindAccount from "./pages/findAccount/FindAccount";
import Search from "./pages/search/Search";
import Mypage from "./pages/mypage/Mypage";
import Header from "./compoents/commons/layouts/Header/Header";
import Banner from "./compoents/commons/layouts/Banner/Banner";
import Footer from "./compoents/commons/layouts/Footer/Footer";
import { useState } from "react";
import { UserContext } from "./context/userContext";
import Main from "./pages/main/Main";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );

  return (
    <BrowserRouter>
      <GlobalStyles />
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/main" /> : <Splash />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/main" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/main" /> : <Signup />}
          />
          <Route
            path="/findAccount"
            element={user ? <Navigate to="/main" /> : <FindAccount />}
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
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : (
                  <>
                    <Mypage />
                    <Footer />
                  </>
                )
              }
            />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
