import "./index.css";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import HomeInfo from "./pages/HomeInfo";
import Login from "./pages/Login";
import Services from "./pages/Services";
import SignUp from "./pages/SignUp";
import ConfirmAccept from "./components/ConfirmAccept";
import ForgotPass from "./pages/ForgotPass";
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<HomeInfo></HomeInfo>} />
            <Route path="/home" element={<Home></Home>} />
            <Route path="/services" element={<Services></Services>} />
            <Route path="/about" element={<About></About>} />
            <Route path="/doctors" element={<Doctors></Doctors>} />
            <Route path="/news" element={<Home></Home>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/signup" element={<SignUp></SignUp>} />
            <Route path="/test" element={<ConfirmAccept />}></Route>
            <Route path="/forgot" element={<ForgotPass />}></Route>
         </Routes>
      </>
   );
};

export default App;
