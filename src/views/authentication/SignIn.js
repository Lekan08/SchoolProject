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
import { Button, ButtonGroup } from "@mui/material";
import { Card, Col } from "reactstrap";
import "../userProfile/Css.css";
import "../Css.css";
import { useNavigate } from "react-router-dom";
import Students from "./students.jpg";

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
    borderRadius: 16,
    maxWidth: "100%",
    boxShadow: "0px 0px 50px rgba(255,255,255,0.805)",
    margin: "auto",
    position: "relative",
    zIndex: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(0,0,0,0.6)"
        : "rgba(255,255,255,0.805)",
    backdropFilter: "blur(40px)",
  }));
  return (
    <>
      <img
        src={Students}
        alt="img"
        className="img-res"
        style={{ position: "absolute", zIndex: 1, width: "100vw", marginTop: -50, borderRadius: 50 }}
      />
      <div className="bubble2">
        {/* <Col md="12"> */}
        <Widget
          style={{
            marginTop: "3rem",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <ButtonGroup variant="text" aria-label="text button group">
            <Button>School Portal</Button>
          </ButtonGroup>
        </Widget>
        <div
          className="row-res"
          style={{
            // height: "100vh",
            padding: 10,
            margin: 10,
            marginTop: "10vw",
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
          <Card
            // className="signbox"
            className="resizer2"
            style={{
              textAlign: "center",
            zIndex: 100,
            borderRadius: 500,
            }}
          >
            <Col
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
            </Col>
          </Card>
          <Card
            // className="signbox"
            className="resizer2"
            style={{
            zIndex: 100,
            borderRadius: 500,
              textAlign: "center",
            }}
          >
            <Col
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
            </Col>
          </Card>
        </div>
      </div>
    </>
  );
}

export default SignIn;
