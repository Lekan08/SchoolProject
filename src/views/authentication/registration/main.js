// /* eslint-disable react/button-has-type */
// /* eslint-disable no-nested-ternary */
// import React, { useState } from "react";

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import MDButton from "components/MDButton";
// import MDBox from "components/MDBox";
// // import Card from "@mui/material/Card";
// import SchoolInformation from "./addSchool";
// import Department from "./department";
// import Faculty from "./faculty";
// import SignUpAdmin from "./staff"

// function Citizen() {
//   const [page, setPage] = useState(0);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",
//     username: "",
//     nationality: "",
//     other: "",
//   });

//   const FormTitles = [
//     "Personal Info",
//     "Pno",
//     "Nationality",
//     "Address",
//     "BirthDay",
//     "DeathDay",
//     "Marital",
//     "Sex",
//     "BankAccount",
//     "Education",
//     "Medical",
//     "Relations",
//     "History",
//     "Passport",
//   ];

//   // eslint-disable-next-line consistent-return
//   const PageDisplay = () => {
//     if (page === 0) {
//       return <SchoolInformation formData={formData} setFormData={setFormData} />;
//     }
//     if (page === 1) {
//       return <Department formData={formData} setFormData={setFormData} />;
//     }
//     if (page === 2) {
//       return <Faculty formData={formData} setFormData={setFormData} />;
//     }
//     if (page === 3) {
//       return <SignUpAdmin formData={formData} setFormData={setFormData} />;
//     }
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       {/* <Card> */}
//       <div className="form">
//         <div className="progressbar">
//           <div style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%" }} />
//         </div>
//         <div className="form-container">
//           {/* <div className="header">
//           <h1>{FormTitles[page]}</h1>
//         </div> */}
//           <div className="body">{PageDisplay()}</div>
//           <div className="footer">
//             {/* <button
//               disabled={page === 0}
//               onClick={() => {
//                 setPage((currPage) => currPage - 1);
//               }}
//             >
//               Prev
//             </button> */}
//             <MDBox mt={4} mb={1}>
//               <MDButton
//                 variant="gradient"
//                 disabled={page === 0}
//                 onClick={() => {
//                   setPage((currPage) => currPage - 1);
//                 }}
//                 color="success"
//                 width="50%"
//                 align="left"
//               >
//                 Prev
//               </MDButton>
//               <MDButton
//                 variant="gradient"
//                 // disabled={page === 0}
//                 onClick={() => {
//                   if (page === FormTitles.length - 1) {
//                     alert("FORM SUBMITTED");
//                     console.log(formData);
//                   } else {
//                     setPage((currPage) => currPage + 1);
//                   }
//                 }}
//                 color="success"
//                 width="50%"
//                 align="left"
//               >
//                 {page === FormTitles.length - 1 ? "Submit" : "Next"}
//               </MDButton>
//             </MDBox>
//             {/* <button
//               onClick={() => {
//                 if (page === FormTitles.length - 1) {
//                   alert("FORM SUBMITTED");
//                   console.log(formData);
//                 } else {
//                   setPage((currPage) => currPage + 1);
//                 }
//               }}
//             >
//               {page === FormTitles.length - 1 ? "Submit" : "Next"}
//             </button> */}
//           </div>
//         </div>
//       </div>
//       {/* </Card> */}
//     </DashboardLayout>
//   );
// }

// export default Citizen;
