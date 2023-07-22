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
import logo from "assets/img/anime3.png";
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
import withReactContent from "sweetalert2-react-content";
import "../userProfile/Css.css";
import "../Css.css";
import { useNavigate } from "react-router-dom";

function SignInAdmin() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/sign-in") Navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [usernamex, setUsername] = useState("");
  const [opened, setOpened] = useState(false);
  const [passwordx, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const MySwal = withReactContent(Swal);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const handleClick = () => {
    sessionStorage.setItem("admin", true);
    setShowLoader(true);
    // Navigate("/dashboard");
    setOpened(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      username: usernamex,
      password: passwordx,
      npassword: passwordx,
    });
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    // setOpened(true);
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/staffLogin/doLogin`,
      requestOptions
    )
      .then(async (res) => {
        // console.log(res.headers);;;;
        // const aToken = res.headers.get("token-1");
        // localStorage.setItem("rexxdex1", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        console.log(result);
        if (result.status === "SUCCESS") {
          Navigate("/dashboard");
          // localStorage.setItem("user", result.data);
          localStorage.setItem("user", JSON.stringify(result.data));
          localStorage.setItem("user1", JSON.stringify(result.data));

        } else {
          Swal.fire({
            title: result.status,
            icon: "error",
            text: result.message,
          });
        }
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          icon: "error",
          text: error.message,
        });
      });
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
            marginTop: "5vh",
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
                    <div style={{ padding: 5, lineHeight: "7vh" }}>
                      <TextField
                        id="outlined-required"
                        label="email"
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
                    </div>
                    <div style={{ padding: 5, lineHeight: "7vh" }}>
                      <FormControl
                        sx={{ m: 1, width: "17rem" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          password
                        </InputLabel>
                        <OutlinedInput
                          type={passwordShown ? "text" : "password"}
                          // label="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          // value={confirmPassword}
                          // onChange={(e) => setConfirmPassword(e.target.value)}
                          // id="outlined-adornment-password"
                          // type={passwordShown ? "text" : "password"}
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
                                onClick={() => togglePassword()}
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
                        // marginTop: "4%",
                      }}
                      onClick={handleClick}
                      loading={showLoader}
                    >
                      LOGIN
                    </button>
                    <Box mb={1} mt={1} textAlign="center">
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
                    <br />
                    <Box mb={1} mt={-1} textAlign="center">
                      Don't have an account? &nbsp;
                      <Typography
                        component={Link}
                        // to="/authentication/sign-up-staff"
                        onClick={() => Navigate("/sign-up-admin")}
                        variant="button"
                        color="primary"
                        fontWeight="medium"
                        id="forgotpassword"
                        size="small"
                      >
                        Sign Up
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
          <CircularProgress sx={{ color: "info" }} />
        </Backdrop>
      </div>
    </>
  );
}

export default SignInAdmin;
