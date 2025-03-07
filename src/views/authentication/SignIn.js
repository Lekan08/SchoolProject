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
import React, { useEffect } from "react";

// reactstrap components
import { Button, ButtonGroup, Paper } from "@mui/material";
import { Card, Col } from "reactstrap";
import "../userProfile/Css.css";
import "../Css.css";
import { useNavigate } from "react-router-dom";
import Studygroup2 from "./studygroup2.jpg";

import { styled } from "@mui/material/styles";
function SignIn() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/sign-in") Navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = () => {
    Navigate("/dashboard");
    // setOpened(true);
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // const raw = JSON.stringify({
    //   username: username,
    //   password: password,
    //   userType: 3,
    // });
    // // console.log(raw);
    // const requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };
    // setOpened(true);
    // fetch(`${process.env.REACT_APP_MAZA_URL}/login/`, requestOptions)
    //   .then(async (res) => {
    //     // console.log(res.headers);;;;
    //     const aToken = res.headers.get("token-1");
    //     localStorage.setItem("rexxdex1", aToken);
    //     return res.json();
    //   })
    //   .then((result) => {
    //     if (result.status === "SUCCESS") {
    //       // console.log(result);
    //       const raw2 = JSON.stringify({
    //         email: username,
    //       });
    //       const requestOptions2 = {
    //         method: "POST",
    //         headers: myHeaders,
    //         body: raw2,
    //         redirect: "follow",
    //       };
    //       fetch(
    //         `${process.env.REACT_APP_MAZA_URL}/users/getByEmail`,
    //         requestOptions2
    //       )
    //         .then(async (res) => {
    //           const aToken = res.headers.get("token-1");
    //           localStorage.setItem("rexxdex", aToken);
    //           return res.json();
    //         })
    //         .then((result) => {
    //           // console.log(result);
    //           localStorage.setItem("user1", JSON.stringify(result));
    //           setOpened(false);
    //           Navigate("/dashboard");
    //           // setResultd(result);
    //         });
    //     } else {
    //       // alert(result.message);
    //       setOpened(false);
    //       Swal.fire({
    //         title: result.status,
    //         icon: "error",
    //         text: result.message,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     setOpened(false);
    //     Swal.fire({
    //       title: error.status,
    //       icon: "error",
    //       text: error.message,
    //     });
    //   });
  };
  const Widget = styled("div")(({ theme }) => ({
    padding: 16,
    borderRadius: 10,
    maxWidth: "100%",
    boxShadow: "0px 0px 50px rgba(255,255,255,0.805)",
    margin: "auto",
    position: "relative",
    zIndex: 1,
    backgroundImage: "linear-gradient(yellow,lightgreen)",
    // backgroundColor:
    //   theme.palette.mode === "dark" ? "rgba(247, 249, 249)" : "#F7F9F9",
    backdropFilter: "blur(40px)",
  }));

  return (
    <div>
      <img
        src={Studygroup2}
        alt="img"
        className="img-res"
        style={{
          position: "absolute",
          zIndex: 1,
          width: "100%",
          marginTop: -50,
        }}
      ></img>
      <Widget
        // className="calamity"
        style={{
          marginTop: 20,
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <h1
          style={{
            color: "#000",
            // textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 50,
            marginTop: 20,
            // background: `linear-gradient(to bottom,  ${color1} 0%,${color2} 100%)`,
          }}
        >
          EduPlan
        </h1>
      </Widget>
      <div
        className="row-res"
        style={{
          padding: 10,
          margin: 10,
          marginTop: "20vw",
          display: "grid",
          gridTemplateColumns: "30vw 30vw",
          gridColumnGap: "5vw",
          marginRight: "auto",
          marginLeft: "auto",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          gridGap: "10vw",
        }}
      >
        <Paper
          elevation={8}
          // className="signbox"
          className="resizer2"
          style={{
            textAlign: "center",
            marginTop: 10,
            zIndex: 100,
            borderRadius: 500,
          }}
        >
          <div
            // lg="5"
            className="col-res"
            style={{
              marginRight: "auto",
              cursor: "pointer",
              lineHeight: "4rem",
              marginLeft: "auto",
            }}
            onClick={() => Navigate("/sign-in-student")}
          >
            Log in as a student
          </div>
        </Paper>
        <Paper
          elevation={8}
          // className="signbox"
          className="resizer2"
          style={{
            zIndex: 100,
            marginTop: 10,
            borderRadius: 500,
            textAlign: "center",
          }}
        >
          <div
            className="col-res"
            // lg="5"
            style={{
              cursor: "pointer",
              marginRight: "auto",
              lineHeight: "4rem",
              marginLeft: "auto",
            }}
            onClick={() => Navigate("/sign-in-admin")}
          >
            Log in as an admin
          </div>
        </Paper>
      </div>
      <div style={{ height: "20px" }} />
    </div>
  );
}

export default SignIn;
