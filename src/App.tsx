import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
// import useRefresh from "./hooks/useRefresh";
// import useAuth from "./states/useAuth";
import MessBill from "./pages/MessBill";
import Rebate from "./pages/Rebate";
import AdminRebate from "./pages/admin/Rebate";
import AdminMessBill from "./pages/admin/MessBill";
import Profile from "./pages/Profile";
// import AdminProfile from "./pages/admin/Profile"
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";

import { useSelector} from 'react-redux'


export default function App() {
  // useRefresh();
  // const isAuth = useAuth((state) => state.isAuth);
  const { user, admin } = useSelector( (state:{user:boolean; admin:boolean})=>state); 
  console.log(admin);
  console.log(user);
  // const {user, admin } = initialState   
 
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={(user || admin) ? <Home /> : <Navigate to="/login" />}    
        />
        <Route
          path="/messBill"
          element={user ? <MessBill /> : <Navigate to="/?redirect_to=messBill" />}
        />
        <Route
          path="/admin/messBill"
          element={admin && <AdminMessBill /> }
        />
        <Route
          path="/rebate"
          element={user ? <Rebate /> : <Navigate to="/?redirect_to=rebate" />}
        />
        <Route
          path="/admin/rebate"
          element={admin ? <AdminRebate /> : <Navigate to="/?redirect_to=admin/rebate" />}
        />
        <Route
          path="/profile"
          element={(user )? <Profile /> : <Navigate to="/?redirect_to=profile" />}
        />
        {/* <Route
          path="/admin/profile"
          element={isAuth ? <AdminProfile /> : <Navigate to="/?redirect_to=admin/profile" />}
        /> */}
        <Route
          path="/login"
          element={(!user) ? <Login /> : <Navigate to="/" />}
        />
        
        <Route
          path="/register"
          element={(!user) ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-register"
          element={!admin ? <AdminRegister /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-login"
          element={!admin ? <AdminLogin /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}
