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
import ViewProfile from "views/userProfile/ViewProfile";
var routes = [
  {
    path: "/sign-in",
    name: "Sign In",
    redirect: "true",
    component: SignIn,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "dashboard",
    component: Dashboard,
  },
  // {
  //   path: "/customers",
  //   name: "customers",
  //   icon: "people",
  //   component: Customers,
  // },
  // {
  //   path: "/customers/view",
  //   name: "view customer",
  //   // icon: "people",
  //   redirect: "true",
  //   component: ViewCustomer,
  // },
  // {
  //   path: "/customers/referral",
  //   name: "customer's referral",
  //   // icon: "people",
  //   redirect: "true",
  //   component: CustomerReferrals,
  // },
  // {
  //   path: "/riders",
  //   name: "riders",
  //   icon: "two_wheeler",
  //   component: Riders,
  // },
  // {
  //   path: "/riders/verify",
  //   name: "verify rider",
  //   // icon: "people",
  //   redirect: "true",
  //   component: Verification,
  // },
  // {
  //   path: "/riders/view",
  //   name: "view rider",
  //   // icon: "people",
  //   redirect: "true",
  //   component: ViewRider,
  // },
  // {
  //   path: "/riders/referral",
  //   name: "rider's referral",
  //   // icon: "people",
  //   redirect: "true",
  //   component: RiderReferrals,
  // },
  // {
  //   path: "/trips",
  //   name: "Trips",
  //   icon: "near_me",
  //   component: Trips,
  // },
  // {
  //   path: "/trips/riders",
  //   name: "Trips Rider",
  //   component: AssignRiders,
  //   icon: "settings",
  //   redirect: "true",
  // },
  // {
  //   path: "/trips/view",
  //   name: "View Trip",
  //   component: ViewTrip,
  //   icon: "settings",
  //   redirect: "true",
  // },
  // {
  //   path: "/payment-requests",
  //   name: "Payment Requests",
  //   icon: "payment",
  //   component: PaymentRequests,
  // },
  // {
  //   path: "/locations",
  //   name: "Locations & Pricing",
  //   icon: "language",
  //   component: Location,
  // },
  // {
  //   path: "/locations/gets",
  //   name: "Locations",
  //   component: Locationgets,
  //   icon: "settings",
  //   redirect: "true",
  // },
  // {
  //   path: "/locations/pricing",
  //   name: "Pricing",
  //   component: Pricing,
  //   icon: "settings",
  //   redirect: "true",
  // },
  // {
  //   path: "/locations/pricing/update",
  //   name: "Pricing",
  //   component: UpdatePricing,
  //   icon: "settings",
  //   redirect: "true",
  // },
  {
    path: "/icons",
    name: "icons",
    icon: "flag",
    component: Icons,
    // redirect: "true",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "notifications_active",
    component: Notifications,
    // redirect: "true",
  },

  {
    path: "/view-profile",
    name: "view Profile",
    icon: "account_circle",
    component: ViewProfile,
    // redirect: "true",
  },
  {
    path: "/testC",
    name: "test Component",
    icon: "verified_user",
    component: TestCompo,
    // redirect: "true",
  },
  // {
  //   path: "/roles",
  //   name: "Roles",
  //   icon: "assignment",
  //   component: Roles,
  // },
  // {
  //   path: "/permissions",
  //   name: "permissions",
  //   icon: "assignment",
  //   component: Permissions,
  //   redirect: "true",
  // },
  // {
  //   path: "/user-management",
  //   name: "User Management",
  //   icon: "supervised_user_circle",
  //   component: UserManagement,
  //   // redirect: "true",
  // },
  // {
  //   path: "/settings",
  //   name: "Settings",
  //   icon: "settings",
  //   component: Settings,
  //   // redirect: "true",
  // },
];
export default routes;


// import UserProfile from "views/userProfile/UserProfile.js";
// import Location from "views/locations";
// import Locationgets from "views/locations/gets";
// import Pricing from "views/locations/pricing";
// import UpdatePricing from "views/locations/pricing/update";
// import Trips from "views/trips";
// import AssignRiders from "views/trips/riders";
// import Settings from "views/settings";
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