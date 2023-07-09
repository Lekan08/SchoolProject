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
import Dashboard from "views/dashboard/Dashboard.js";
import Notifications from "views/notification/Notifications.js";
import SignIn from "views/authentication/SignIn";
import TestCompo from "views/testComponent";
import Icons from "examples/Icons";
import Settings from "views/settings";
import ViewProfile from "views/userProfile/ViewProfile";
import SignInAdmin from "views/authentication/SignInAdmin";
import SignInStudent from "views/authentication/SignInStudent";
import DashboardStudent from "views/dashboard/DashboardStudent";
import SignUpAdmin from "views/authentication/SIgnUpAdmin";

var routes = [
  {
    path: "/sign-in",
    name: "Sign In",
    redirect: "true",
    component: SignIn,
  },
  {
    path: "/sign-in-admin",
    name: "Sign In As An Admin",
    redirect: "true",
    component: SignInAdmin,
  },
  {
    path: "/sign-in-student",
    name: "Sign In As A Student",
    redirect: "true",
    component: SignInStudent,
  },
  {
    path: "/sign-up-staff",
    name: "Sign up As A Staff",
    redirect: "true",
    component: SignUpAdmin,
    admin: true,
  },
  {
    path: "/dashboard",
    name: "Admin Dashboard",
    icon: "dashboard",
    component: Dashboard,
    admin: true,
  },
  {
    path: "/dashboard-student",
    name: "Student Dashboard",
    icon: "dashboard",
    component: DashboardStudent,
    admin: false,
  },
  {
    path: "/icons",
    name: "icons",
    icon: "flag",
    component: Icons,
    // redirect: "true",
    admin: true,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "notifications_active",
    component: Notifications,
    admin: false,
    // redirect: "true",
  },

  {
    path: "/view-profile",
    name: "view Profile",
    icon: "account_circle",
    component: ViewProfile,
    // redirect: "true",
    admin: false,
  },
  {
    path: "/testC",
    name: "test Component",
    icon: "verified_user",
    component: TestCompo,
    // redirect: "true",
    admin: true,
  },
  {
    path: "/settings",
    name: "settings",
    icon: "settings",
    component: Settings,
    // redirect: "true",
    admin: true,
  },
];
export default routes;

// import UserProfile from "views/userProfile/UserProfile.js";
// import Location from "views/locations";
// import Locationgets from "views/locations/gets";
// import Pricing from "views/locations/pricing";
// import UpdatePricing from "views/locations/pricing/update";
// import Trips from "views/trips";
// import AssignRiders from "views/trips/riders";
// import Riders from "views/riders";
// import Customers from "views/customers";
// import ViewCustomer from "views/customers/view";
// import ViewRider from "views/riders/view";
// import RiderReferrals from "views/riders/referrals";
// import CustomerReferrals from "views/customers/referrals";
// import Roles from "views/rolesAndPermi";
// import Permissions from "views/rolesAndPermi/permissions";
// import UserManagement from "views/userManagement";
// import Verification from "views/riders/verification";
// import ViewTrip from "views/trips/view";
// import PaymentRequests from "views/payment-requests";
