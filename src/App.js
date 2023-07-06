import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./pages/splash/Splash";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import FindAccount from "./pages/findAccount/FindAccount";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Mypage from "./pages/mypage/Mypage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findAccount" element={<FindAccount />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
