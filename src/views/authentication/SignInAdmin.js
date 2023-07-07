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

function SignInAdmin() {
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
    sessionStorage.setItem("admin", true);
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
          {/* <Col md="12"> */}
          <Card
            // className="signbox"
            className="resizer"
          >
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
                    src={logo}
                    alt="companylogo"
                    style={{
                      width: "5vw",
                      borderRadius: "10px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "flex",
                    }}
                  />
                  {/* <h1
                    className="maza"
                    style={{
                      letterSpacing: "0.4vh",
                      fontSize: "1.1vw",
                      textAlign: "center",
                      paddingTop: "2.5vh",
                      textShadow: "2px 2px 4px #000000",
                      fontFamily: "Comic Sans MS",
                    }}
                  >
                    MAZA WAYS
                  </h1> */}
                  <div className="font-icon-detail">
                    <p
                      style={{
                        marginTop: 0,
                        cursor: "pointer",
                        color: "#5e72e4",
                        letterSpacing: "0.4vh",
                        fontSize: "0.9rem",
                        textAlign: "center",
                        paddingBottom: "2.5vh",
                        // textShadow: "2px 2px 4px #000000",
                        fontFamily: "Comic Sans MS",
                      }}
                    >
                      Sign in, welcome.
                    </p>
                    <div style={{ padding: 10, lineHeight: "7vh" }}>
                      <TextField
                        id="outlined-required"
                        label="username"
                        onChange={(e) => setUsername(e.target.value)}
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
                      <FormControl
                        sx={{ m: 1, width: "17rem" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          password
                        </InputLabel>
                        <OutlinedInput
                          onChange={(e) => setPassword(e.target.value)}
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          sx={{
                            input: {
                              // color: "white",
                              height: "1vh",
                              fontSize: "0.8em",
                            },
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
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
                      LOGIN
                    </button>
                    <Box mb={1} mt={-1} textAlign="center">
                      <Typography
                        component={Link}
                        // to="/authentication/resetpassword"
                        // onClick={() => Navigate("/reset-password")}
                        variant="button"
                        color="primary"
                        fontWeight="medium"
                        id="forgotpassword"
                        size="small"
                      >
                        FORGOT PASSWORD?
                      </Typography>
                    </Box>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          {/* </Col> */}
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

export default SignInAdmin;
