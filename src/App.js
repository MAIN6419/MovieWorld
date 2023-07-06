import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Splash from "./pages/splash/Splash";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import FindAccount from "./pages/findAccount/FindAccount";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Mypage from "./pages/mypage/Mypage";
import NavBar from "./compoents/commons/layouts/navBar/NavBar";
import Banner from "./compoents/commons/layouts/Banner/Banner";
import Footer from "./compoents/commons/layouts/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route
          element={
            <>
              <NavBar />
              <Banner />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findAccount" element={<FindAccount />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mypage" element={<Mypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
