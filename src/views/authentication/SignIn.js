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
import React, { useState, useEffect } from "react";

// reactstrap components
import logo from "assets/img/react-logo.png";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Swal from "sweetalert2";
import "../userProfile/Css.css";
import "../Css.css";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

function SignIn() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/sign-in") Navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [username, setUsername] = useState("");
  const [opened, setOpened] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <>
      <div className="bubble">
        {/* <Col md="12"> */}

        <div
          style={{
            height: "95vh",
            padding: 10,
            margin: 10,
            display: "grid",
            gridTemplateColumns: "30vw 30vw",
            gridColumnGap: "5vw",
            marginRight: "auto",
            marginLeft: "auto",
            alignItems: "center",
            justifyContent: "center",
            gridGap: "10vw",
          }}
        >
          <Card
            // className="signbox"
            className="resizer2"
            style={{
              textAlign: "center",
              borderRadius: 500,
            }}
          >
            <Col
              // lg="5"
              style={{
                marginRight: "auto",
                cursor: "pointer",
                lineHeight: "80px",
                marginLeft: "auto",
              }}
              onClick={() => Navigate("/sign-in-student")}
            >
              Log in as a student
            </Col>
          </Card>
          <Card
            // className="signbox"
            className="resizer2"
            style={{
              borderRadius: 500,
              textAlign: "center"
            }}
          >
            <Col
              // lg="5"
              style={{
                cursor: "pointer",
                marginRight: "auto",
                lineHeight: "80px",
                marginLeft: "auto",
              }}
              onClick={() => Navigate("/sign-in-admin")}
            >
              Log in as an admin
            </Col>
          </Card>
        </div>
        {/* </Col> */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={opened}
        >
          <CircularProgress sx={{ color: "white" }} />
        </Backdrop>
      </div>
    </>
  );
}

export default SignIn;
