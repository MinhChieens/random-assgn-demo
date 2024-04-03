import "./index.css";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import HomeInfo from "./pages/HomeInfo";
import Login from "./pages/Login";
import Services from "./pages/Services";
import SignUp from "./pages/SignUp";
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<HomeInfo></HomeInfo>} />
            <Route path="/home" element={<Home></Home>} />
            <Route path="/services" element={<Services></Services>} />
            <Route path="/about" element={<About></About>} />
            <Route path="/doctors" element={<Home></Home>} />
            <Route path="/news" element={<Home></Home>} />
            <Route path="/login" element={<Home></Home>} />
            <Route path="/signUp" element={<Home></Home>} />
         </Routes>
      </>
   );
};

export default App;
