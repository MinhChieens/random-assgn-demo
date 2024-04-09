import "./index.css";
import { Route, Routes } from "react-router-dom";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import HomeInfo from "./pages/HomeInfo";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ConfirmAccept from "./components/ConfirmAccept";
import ForgotPass from "./pages/ForgotPass";
import User from "./pages/User";
import Admin from "./pages/Admin";
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<HomeInfo></HomeInfo>} />
            <Route path="/home" element={<Home></Home>} />
            <Route path="/doctors" element={<Doctors></Doctors>} />
            <Route path="/admin" element={<Admin></Admin>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/signup" element={<SignUp></SignUp>} />
            <Route path="/test" element={<ConfirmAccept />}></Route>
            <Route path="/forgot" element={<ForgotPass />}></Route>
            <Route path="/users" element={<User />}></Route>
         </Routes>
      </>
   );
};

export default App;
