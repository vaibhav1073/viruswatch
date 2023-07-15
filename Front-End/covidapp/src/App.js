// import Header from "./Header/Header";
import HeaderNew from "./Header/HeaderNew";
import Home from "./Home/Home";
import Register from "./Register/Register";
import Login from "./Login/Login";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./Footer/Footer";
import UserDashboard from "./UserDashboard/UserDashboard";
import UpdatePassword from "./UpdatePassword/UpdatePassword";
import EditProfile from './EditProfile/EditProfile'
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import ResetPassword from "./ResetPassword/ResetPassword";
function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Header /> */}
        <HeaderNew />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/userprofilepage/:email" element={<UserDashboard />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
          <Route path="/updateprofile" element={<EditProfile/>}/>
          <Route path="/forgetpassword" element={<ForgetPassword/>}/>
          <Route path="/resetpassword/:token" element={<ResetPassword/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
