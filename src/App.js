import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

import Splash from "./pages/splash/Splash";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import FindAccount from "./pages/findAccount/FindAccount";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Mypage from "./pages/mypage/Mypage";
import Header from "./compoents/commons/layouts/Header/Header";
import Banner from "./compoents/commons/layouts/Banner/Banner";
import Footer from "./compoents/commons/layouts/Footer/Footer";
import { useState } from "react";
import { UserContext } from "./context/userContext";


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))||"");

  return (
    <BrowserRouter>
      <GlobalStyles />
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home"/> : <Splash />} />
          <Route path="/login" element={user ? <Navigate to="/home"/> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/home"/> : <Signup />} />
          <Route path="/findAccount" element={user ? <Navigate to="/home"/> : <FindAccount />} />
          <Route
            element={
              <>
                <Header />
                <Banner />
                <Outlet />
                <Footer />
              </>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/mypage" element={!user ? <Navigate to="/login"/> : <Mypage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
