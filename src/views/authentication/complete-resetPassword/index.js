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
import logo from "assets/img/react-logo.png";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navigate from "useNavigate";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Swal from "sweetalert2";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function CompleteResetPassword() {
  const [emailx, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [opened, setOpened] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [valpass, setValpass] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idx = urlParams.get("id");
  React.useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_MAZA_URL}/users/getByIds/${idx}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        setEmail(result[0].email);
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
  }, []);
  //   const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleOnPasswordKeys = (value) => {
    const passwordValidate = new RegExp(
      "^(?=.*[a-z!@#$%^&*])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
    );
    if (!value.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      setValpass(
        "Password - Password must be at least 8 characters, must include a capital letter, small letter, a number and any of these symbol (!@#$%^&*)"
      );
    }
    if (value.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      setValpass("");
    }
    if (confirm.length !== 0) {
      if (confirm !== value) {
        // eslint-disable-next-line no-unused-expressions
        setValpass("Passwords do not match");
      } else {
        // eslint-disable-next-line no-unused-expressions
        setValpass("");
      }
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      setValpass("Password is required");
    }
  };
  const handleOnRTPasswordKeys = (value) => {
    if (value === password) {
      // eslint-disable-next-line no-unused-expressions
      setValpass("");
    } else {
      // eslint-disable-next-line no-unused-expressions
      setValpass("Passwords do not match");
    }
    if (value === password && value.length === 0) {
      setValpass("Password is required");
    }
  };
  //   const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
    // const data11 = JSON.parse(localStorage.getItem("user1"));
    // const id = data11.id;
    handleOnPasswordKeys(password);
    handleOnRTPasswordKeys(confirm);
    if (valpass === "" && password.length > 0 && confirm.length > 0) {
      const raw = JSON.stringify({
        username: emailx,
        password: password,
        userType: 3,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      setOpened(true);
      fetch(
        `${process.env.REACT_APP_MAZA_URL}/login/complete-reset-password`,
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
              text: result.message,
            }).then(() => Navigate("/sign-in"));
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
    }
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
                      src={logo}
                      alt="companylogo"
                      style={{
                        height: "15vh",
                        width: "40vh",
                        borderRadius: "10px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "flex",
                      }}
                    />
                    <div className="font-icon-detail">
                      <p
                        style={{
                          marginTop: -10,
                          cursor: "pointer",
                          color: "#5e72e4",
                        }}
                      >
                        Set Your New Password
                      </p>
                      <br />
                      <div style={{ padding: 10, lineHeight: "7vh" }}>
                        <TextField
                          id="outlined-required"
                          label="email"
                          value={emailx}
                          sx={{
                            input: {
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
                            Password
                          </InputLabel>
                          <OutlinedInput
                            onChange={(e) => {
                              handleOnPasswordKeys(e.target.value);
                              setPassword(e.target.value);
                            }}
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
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
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
                        <br />
                        <FormControl
                          sx={{ m: 1, width: "17rem" }}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Confirm Password
                          </InputLabel>
                          <OutlinedInput
                            onChange={(e) => {
                              handleOnRTPasswordKeys(e.target.value);
                              setConfirm(e.target.value);
                            }}
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
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
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
                      <Row>
                        <div
                          className="vibr"
                          style={{ width: "80%", marginTop: "0px", position: "inherit", fontSize: "11px" }}
                        >
                          {valpass}
                        </div>
                      </Row>
                      <br />
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
