import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./screens/Home";
import Signup from "./components/Signup";
import AboutUs from "./components/AboutUs";
import SideNav from "./components/SideNav";
import Footer from "./components/Footer";
import { UserProvider } from "./components/UserContext";
import { EventTriggerProvider } from "./components/EventTriggerContext";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import Campaigns from "./components/Campaigns";
import Share from "./components/Share";
import FeedBacks from "./components/FeedBacks";
import Community from "./components/Community";
import BloodGuide from "./components/BloodGuide";
import ContactUs from "./components/ContactUs";
import TermsandConditions from "./components/TermsandConditions";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <EventTriggerProvider>
      <UserProvider>
        <Fragment>
          <Router>
            <Nav></Nav>
            <SideNav></SideNav>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/donors" element={<Signup />}>
                <Route path="signup" element={<SignUpForm />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="forgot" element={<ForgotPassword />} />
              </Route>
              <Route exact path="/aboutus" element={<AboutUs />} />
              <Route exact path="/contactus" element={<ContactUs />} />
              <Route exact path="/share" element={<Share />} />
              <Route exact path="/feedbacks" element={<FeedBacks />} />
              <Route exact path="/community" element={<Community />} />
              <Route exact path="/campaigns" element={<Campaigns />} />
              <Route exact path="/guide" element={<BloodGuide />} />
              <Route
                exact
                path="/termsandconditions"
                element={<TermsandConditions />}
              />
              <Route path="*" element={<Home />} />
            </Routes>
            <Footer></Footer>
            <ToastContainer />
          </Router>
        </Fragment>
      </UserProvider>
    </EventTriggerProvider>
  );
}

export default App;
