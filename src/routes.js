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
import Dashboard from "views/Admin/dashboard/Dashboard.js";
import Notifications from "views/Admin/notification/Notifications.js";
import SignIn from "views/authentication/SignIn";
import TestCompo from "views/Admin/testComponent";
import Icons from "examples/Icons";
import Settings from "views/Admin/settings";
import ViewProfile from "views/Admin/userProfile/ViewProfile";
import SignInAdmin from "views/authentication/SignInAdmin";
import SignInStudent from "views/authentication/SignInStudent";
import DashboardStudent from "views/Student/dashboard/DashboardStudent";
import SignUpAdmin from "views/authentication/SIgnUpAdmin";
import InviteLecturer from "views/Admin/inviteLecturer/invite";
import InviteLecturers from "views/Admin/inviteLecturer";
import Faculty from "views/authentication/registration/faculty";
import Department from "views/authentication/registration/department";
import InviteMultiple from "views/Admin/inviteLecturer/Multiple";
import InvitedStaff from "views/authentication/invitedStaff";

import Students from "views/Admin/students";
import StudentAdd from "views/Admin/students/Add";
import StudentMultiple from "views/Admin/students/Multiple";
import Departments from "views/Admin/departments";
import DepartmentAdd from "views/Admin/departments/Add";
import DepartmentMultiple from "views/Admin/departments/Multiple";
import DepartmentUpdate from "views/Admin/departments/update";
import Faculties from "views/Admin/faculties";
import FacultyAdd from "views/Admin/faculties/Add";
import FacultyMultiple from "views/Admin/faculties/Multiple";
import FacultyUpdate from "views/Admin/faculties/update";
import Schools from "views/Admin/school";
import SchoolAdd from "views/Admin/school/Add";
import StudentView from "views/Admin/students/view";
import StudentUpdate from "views/Admin/students/update";
import SchoolUpdate from "views/Admin/school/update";
import Courses from "views/Admin/courses";
import CourseAdd from "views/Admin/courses/Add";
import CourseMultiple from "views/Admin/courses/Multiple";
import CourseUpdate from "views/Admin/courses/update";
import StudentProfileUpdate from "views/Student/student-profile";
import CourseRegistartion from "views/Student/course-Registaration";
import StudentProfile from "views/Student/studentProfile";
import Level from "views/Admin/level";
import LevelUpdate from "views/Admin/level/update";
import OtherPrograms from "views/Admin/otherPrograms";
import OtherProgramUpdate from "views/Admin/otherPrograms/update";
import CourseAdvisor from "views/Admin/courseAdvisor";
import CourseAdvisorUpdate from "views/Admin/courseAdvisor/update";
import ClassCourses from "views/Admin/courseAdvisor/classCourses";
import Grading from "views/Admin/grading";
import Result from "views/Admin/result";
import ResultUpdate from "views/Admin/result/update";
import ResultAdd from "views/Admin/result/add";
import ResultMultiple from "views/Admin/result/multiple";
import GradingUpdate from "views/Admin/grading/update";
import College from "views/Admin/college";
import StudentResult from "views/Student/student-Result";
import SeeResult from "views/Student/student-Result/seeResult";
import Transcript from "views/Student/student-Result/transcript";
import CollegeUpdate from "views/Admin/college/update";
import ViewLecturer from "views/Admin/inviteLecturer/view";
// import ClassCourses from "views/Admin/courseAdvisor/classCourses";

import CompleteResetPassword from "views/authentication/complete-resetPassword";
import StudentChangePassword from "views/authentication/studentChangePassword";
import AdminProfile from "views/Admin/adminProfile";
import AdminChangePassword from "views/authentication/changePassword";

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
    path: "/invitedStaff",
    // name: "Sign In As A Student",
    redirect: "true",
    component: InvitedStaff,
  },
  // {
  //   path: "/registration",
  //   name: "Registration",
  //   redirect: "true",
  //   component: Registration,
  //   admin: true,
  // },
  // {
  //   path: "/dashboard",
  //   name: "Admin Dashboard",
  //   icon: "dashboard",
  //   component: Dashboard,
  //   admin: true,
  // },
  // {
  //   path: "/schoolInformation",
  //   // name: "Admin Dashboard",
  //   // icon: "dashboard",
  //   component: SchoolInformation,
  //   redirect: "true",
  //   admin: true,
  // },
  {
    path: "/sign-up-admin",
    // name: "Admin Dashboard",
    // icon: "dashboard",
    component: SignUpAdmin,
    redirect: "true",
    admin: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "dashboard",
    component: Dashboard,
    // redirect: "true",
    admin: true,
  },
  {
    path: "/faculty",
    // name: "Faculty",
    // icon: "dashboard",
    component: Faculty,
    redirect: "true",
    admin: true,
  },
  {
    path: "/inviteLecturer/invite",
    // name: "Invite Lecturers",
    // icon: "person_add",
    component: InviteLecturer,
    redirect: "true",
    admin: true,
  },
  {
    path: "/inviteLecturer",
    name: "Invite Lecturers",
    icon: "person_add",
    component: InviteLecturers,
    // redirect: "true",
    admin: true,
  },
  {
    path: "/inviteLecturer/multiple",
    name: "Invite Multiple Lecturers",
    // icon: "person_add",
    component: InviteMultiple,
    redirect: "true",
    admin: true,
  },
  {
    path: "/inviteLecturer/view",
    // name: "Invite Multiple Lecturers",
    // icon: "person_add",
    component: ViewLecturer,
    redirect: "true",
    admin: true,
  },
  {
    path: "/schools",
    name: "School Profile",
    icon: "location_city",
    component: Schools,
    admin: true,
  },
  {
    path: "/adminProfile",
    name: "User Profile",
    icon: "account_circle",
    component: AdminProfile,
    admin: true,
  },
  {
    path: "/schools/add",
    name: "Schools",
    icon: "location_city",
    component: SchoolAdd,
    redirect: true,
  },
  {
    path: "/schools/update",
    name: "Update School",
    icon: "location_city",
    component: SchoolUpdate,
    redirect: true,
  },
  {
    path: "/students",
    name: "Students",
    icon: "school",
    component: Students,
    admin: true,
  },
  {
    path: "/students/add",
    name: "Add student",
    icon: "school",
    component: StudentAdd,
    redirect: true,
  },
  {
    path: "/students/view",
    name: "View student",
    icon: "school",
    component: StudentView,
    redirect: true,
  },
  {
    path: "/students/update",
    name: "Update student",
    icon: "school",
    component: StudentUpdate,
    redirect: true,
  },
  {
    path: "/students/multiple",
    name: "Add multiple students",
    icon: "school",
    component: StudentMultiple,
    redirect: true,
  },
  {
    path: "/courses",
    name: "courses",
    icon: "menu_book",
    component: Courses,
    admin: true,
  },
  {
    path: "/courses/add",
    name: "Add course",
    icon: "school",
    component: CourseAdd,
    redirect: true,
  },
  {
    path: "/courses/multiple",
    name: "Add multiple courses",
    icon: "school",
    component: CourseMultiple,
    redirect: true,
  },
  {
    path: "/courses/update",
    name: "Update course",
    // icon: "school",
    component: CourseUpdate,
    redirect: true,
  },
  {
    path: "/courseAdvisor/classCourses",
    name: "Class Course",
    icon: "menu_book",
    component: ClassCourses,
    admin: true,
    // redirect: true,
  },
  {
    path: "/courseAdvisor",
    name: "Course Advisor",
    icon: "menu_book",
    component: CourseAdvisor,
    admin: true,
  },
  {
    path: "/courseAdvisor/update",
    name: "Update courseAdvisor",
    // icon: "school",
    component: CourseAdvisorUpdate,
    redirect: true,
  },
  {
    path: "/grading",
    name: "Grading",
    icon: "menu_book",
    component: Grading,
    admin: true,
  },
  {
    path: "/result",
    name: "Result",
    icon: "menu_book",
    component: Result,
    admin: true,
  },
  // {
  //   path: "/college",
  //   name: "College",
  //   icon: "menu_book",
  //   component: College,
  //   admin: true,
  // },
  {
    path: "/faculties",
    name: "faculties",
    icon: "corporate_fare",
    component: Faculties,
    admin: true,
  },
  {
    path: "/otherPrograms",
    name: "Other Programs",
    icon: "grading",
    component: OtherPrograms,
    admin: true,
  },
  {
    path: "/result/update",
    name: "Result Update",
    icon: "menu_book",
    component: ResultUpdate,
    // admin: true,
  },
  {
    path: "/result/add",
    name: "Result Add",
    icon: "menu_book",
    component: ResultAdd,
    // admin: true,
  },
  {
    path: "/result/multiple",
    name: "Result Multiple",
    icon: "menu_book",
    component: ResultMultiple,
    // admin: true,
  },
  {
    path: "/grading/update",
    name: "Grading Update",
    // icon: "school",
    component: GradingUpdate,
    redirect: true,
  },
  {
    path: "/department",
    // name: "Departments",
    // icon: "class",
    component: Department,
    redirect: true,
    admin: true,
  },
  {
    path: "/departments",
    name: "Departments",
    icon: "class",
    component: Departments,
    admin: true,
  },
  {
    path: "/departments/add",
    name: "Add department",
    icon: "school",
    component: DepartmentAdd,
    redirect: true,
  },
  {
    path: "/departments/multiple",
    name: "Add multiple departments",
    icon: "school",
    component: DepartmentMultiple,
    redirect: true,
  },
  {
    path: "/departments/update",
    // name: "Add multiple departments",
    // icon: "school",
    component: DepartmentUpdate,
    redirect: true,
  },
  {
    path: "/faculties/add",
    name: "Add faculty",
    icon: "school",
    component: FacultyAdd,
    redirect: true,
  },
  {
    path: "/faculties/multiple",
    name: "Add multiple faculties",
    icon: "school",
    component: FacultyMultiple,
    redirect: true,
  },
  {
    path: "/faculties/update",
    // name: "Add multiple faculties",
    // icon: "school",
    component: FacultyUpdate,
    redirect: true,
  },
  {
    path: "/level",
    name: "Level",
    icon: "grading",
    component: Level,
    admin: true,
  },
  {
    path: "/level/update",
    // name: "Level",
    // icon: "grading",
    component: LevelUpdate,
    // admin: true,
    redirect: true,
  },
  {
    path: "/otherPrograms/update",
    // name: "Level",
    // icon: "grading",
    component: OtherProgramUpdate,
    // admin: true,
    redirect: true,
  },
  {
    path: "/icons",
    name: "icons",
    icon: "flag",
    component: Icons,
    redirect: "true",
    admin: true,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "notifications_active",
    component: Notifications,
    admin: false,
    redirect: "true",
  },

  {
    path: "/view-profile",
    name: "view Profile",
    icon: "account_circle",
    component: ViewProfile,
    redirect: "true",
    admin: false,
  },
  {
    path: "/testC",
    name: "test Component",
    icon: "verified_user",
    component: TestCompo,
    redirect: "true",
    admin: true,
  },
  {
    path: "/settings",
    name: "settings",
    icon: "settings",
    component: Settings,
    redirect: "true",
    admin: true,
  },
  // {
  //   path: "/result",
  //   name: "Result",
  //   icon: "menu_book",
  //   component: Result,
  //   admin: true,
  // },
  {
    path: "/college/update",
    // name: "Level",
    // icon: "grading",
    component: CollegeUpdate,
    // admin: true,
    redirect: true,
  },
  {
    path: "/changepassword",
    name: "Change Password",
    icon: "password",
    component: AdminChangePassword,
    // redirect: "true",
    admin: true,
  },
  // {
  //   path: "/complete-reset-password",
  //   name: "Change Password",
  //   icon: "password",
  //   component: CompleteResetPassword,
  //   // redirect: "true",
  //   admin: true,
  // },
  {
    path: "/complete-reset-password",
    name: "Change Password",
    icon: "password",
    component: CompleteResetPassword,
    admin: true,
    redirect: true,
  },
  // {
  //   path: "/dashboard-student",
  //   name: "Student Dashboard",
  //   icon: "dashboard",
  //   component: DashboardStudent,
  //   admin: false,
  //   // redirect: true,
  // },
  {
    path: "/student-profile-update",
    name: "Your Profile",
    icon: "account_circle",
    component: StudentProfileUpdate,
    admin: false,
  },
  {
    path: "/course-Registration",
    name: "Course Registration",
    icon: "how_to_reg",
    component: CourseRegistartion,
    admin: false,
  },
  {
    path: "/studentProfile",
    name: "Student Profile",
    icon: "account_circle",
    component: StudentProfile,
    admin: false,
    redirect: true,
  },
  {
    path: "/studentresult",
    name: " Result",
    icon: "how_to_reg",
    component: StudentResult,
    admin: false,
  },
  {
    path: "/studentseeResult",
    name: "Student Result",
    icon: "how_to_reg",
    component: SeeResult,
  },
  {
    path: "/studenttranscript",
    name: "Student Transcript",
    icon: "how_to_reg",
    component: Transcript,
  },
  {
    path: "/studentChangepassword",
    name: "Change Password",
    icon: "password",
    component: StudentChangePassword,
    // redirect: "true",
    admin: false,
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
// import ViewTrip from "views/trips/view";T20E5W23
// import PaymentRequests from "views/payment-requests";
