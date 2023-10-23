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
import React, { useState } from "react";

// reactstrap components
import forgotPassword from "assets/img/forgotPassword.jpg";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import Visibility from "@mui/icons-material/Visibility";
// import InputLabel from "@mui/material/InputLabel";
// import IconButton from "@mui/material/IconButton";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputAdornment from "@mui/material/InputAdornment";
import Navigate from "useNavigate";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Swal from "sweetalert2";

function ResetStudentPassword() {
  const [emailx, setEmail] = useState("");
  const [opened, setOpened] = useState(false);

  const [valpass, setValpass] = useState("");

  //   const [password, setPassword] = useState("");
  //   const [showPassword, setShowPassword] = useState(false);
  const handleClick = (e) => {
    // setOpened(true);
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: emailx,
      // userType: 3,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/studentLogin/forgotPassword`,
      requestOptions
    )
      .then(async (res) => {
        // console.log(res.headers);;;;
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex1", aToken);
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        if (result.status === "SUCCESS") {
          Swal.fire({
            title: result.status,
            icon: "success",
            text: "Kindly Check Your Mail To Recover Your Password (You can check your promotions or spam section if you still haven't seen the mail).",
          }).then(() => Navigate("/sign-in"));
        } else if (result.status === "INVALID_ACTION") {
          Swal.fire({
            title: result.status,
            icon: "warning",
            text: "You have already requested for a password reset (You can check your promotions or spam section if you still haven't seen the mail).",
          });
        } else {
          // alert(result.message);
          Swal.fire({
            title: result.status,
            icon: "error",
            text: result.message,
          });
        }
        setOpened(false);
      })
      .catch((error) => {
        setOpened(false);
        Swal.fire({
          title: error.status,
          icon: "error",
          text: error.message,
        });
      });
  };
  return (
    <>
      <div className="bubble" style={{ width: "98vw" }}>
        <Row
          className="signbox"
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            paddingLeft: "2vw",
            marginTop: "10vh",
            width: "40vw",
          }}
        >
          <Col md="12">
            <Card>
              <CardHeader>
                {/* <h5 className="title">Log</h5>
                <p className="category">
                  Handcrafted by our friends from{" "}
                  <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                </p> */}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col
                    lg="11"
                    style={{
                      marginRight: "auto",
                      marginLeft: "auto",
                      paddingTop: 8,
                      paddingBottom: 10,
                    }}
                  >
                    <img
                      src={forgotPassword}
                      alt="companylogo"
                      style={{
                        height: "30vh",
                        width: "30vh",
                        borderRadius: "10px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "flex",
                      }}
                    />
                    <div className="font-icon-detail">
                      <p
                        style={{
                          marginTop: -70,
                          cursor: "pointer",
                          color: "#5e72e4",
                        }}
                      >
                        Reset Password
                      </p>
                      <div style={{ padding: 10, lineHeight: "7vh" }}>
                        <TextField
                          id="outlined-required"
                          label="email"
                          onChange={(e) => setEmail(e.target.value)}
                          sx={{
                            input: {
                              // color: "white",
                              width: "15rem",
                              fontSize: "0.8em",
                              height: "1vh",
                            },
                          }}
                        />
                        <br />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-custom btn-xs"
                        style={{
                          fontSize: "80%",
                          marginBottom: "5%",
                          marginTop: "4%",
                        }}
                        onClick={handleClick}
                      >
                        Reset Password
                      </button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
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

export default ResetStudentPassword;
