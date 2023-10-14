/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import SignIn from "views/authentication/SignIn";
import ResetPassword from "views/authentication/ResetPassword";
import Invitation from "views/Admin/invitation";
import ResetStudentPassword from "views/authentication/resetStudentPassword";
import CompleteResetPassword from "views/authentication/complete-resetPassword";
import CompleteResetStudentPassword from "views/authentication/complete-resetStudent-password";
import SignInAdmin from "views/authentication/SignInAdmin";
import SignInStudent from "./views/authentication/SignInStudent";
import SignUpAdmin from "views/authentication/SIgnUpAdmin";
// import SchoolInformation from "views/authentication/registration/addSchool";
import Faculty from "views/authentication/registration/faculty";
import Department from "views/authentication/registration/department";
import InvitedStaff from "views/authentication/invitedStaff";
import ForgotPassword from "views/authentication/forgotPassword";
import CompleteForgotPassword from "views/authentication/complete-forgotPassword";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-in-admin" element={<SignInAdmin />} />
          <Route path="/sign-in-student" element={<SignInStudent />} />
          <Route path="/sign-up-admin" element={<SignUpAdmin />} />
          <Route
            path="/complete-reset-password"
            element={<CompleteResetPassword />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* <Route path="/schoolInformation" element={<SchoolInformation />} /> */}
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/department" element={<Department />} />
          <Route path="/invitedStaff" element={<InvitedStaff />} />
          <Route
            path="/reset-student-password"
            element={<ResetStudentPassword />}
          />
          <Route
            path="/complete-resetStudent-password"
            element={<CompleteResetStudentPassword />}
          />
          <Route path="/forgotAdmin-password" element={<ForgotPassword />} />
          <Route
            path="/complete-forgotAdmin-password"
            element={<CompleteForgotPassword />}
          />

          {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
          {/* <Route path="/authentication/complete-reset-Password" element={<CompleteResetPassword />} /> */}
          {/* <Route path="/authentication/complete-invite-user" element={<Invitation />} /> */}
          <Route path="*" element={<AdminLayout />} />
        </Routes>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
