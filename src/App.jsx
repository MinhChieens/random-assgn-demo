import "./index.css";
import { Route, Routes } from "react-router-dom";
import Doctors from "./pages/Doctors";

import HomeInfo from "./pages/HomeInfo";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ConfirmAccept from "./components/ConfirmAccept";
import ForgotPass from "./pages/ForgotPass";
import User from "./pages/User";
import Admin from "./pages/Admin";
import { routesUser, routesAdmin, routesDoctor } from "./Routes";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeInfo></HomeInfo>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/test" element={<ConfirmAccept />}></Route>
        <Route path="/forgot" element={<ForgotPass />}></Route>
        <Route path="/doctors" element={<Doctors></Doctors>}>
          {routesDoctor}
        </Route>
        <Route path="/admin" element={<Admin></Admin>}>
          {routesAdmin}
        </Route>
        <Route path="/users" element={<User />}>
          {routesUser}
        </Route>
      </Routes>
    </>
  );
};

export default App;
