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
import React, { useState, useRef } from "react";
import logo from "assets/img/react-logo.png";
import "./Css.css";
import AllCountriesAndStates from "countries-states-master/countries";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import Form2 from "react-bootstrap/Form";
import { Box, TextField } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { useEffect } from "react";
import Navigate from "useNavigate";
import PHeaders from "postHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

export default function Invitation() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const [allStates, setAllStates] = useState([]);
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [FValid, setFValid] = useState("");
  const [LValid, setLValid] = useState("");
  const [OValid, setOValid] = useState("");
  const [fname, setFname] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [opened, setOpened] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phonex, setPhonex] = useState(0);
  const [mail, setMail] = useState("");
  const [lname, setLname] = useState("");
  const [oname, setOname] = useState("");
  const [valpass, setValpass] = useState("");
  const [resultd, setResultd] = useState({});
  const myRef = useRef(null);
  useEffect(() => {
    setFname(new URLSearchParams(window.location.search).get("fname"));
    setLname(new URLSearchParams(window.location.search).get("lname"));
    setMail(new URLSearchParams(window.location.search).get("email"));
    setRole(new URLSearchParams(window.location.search).get("role"));
    const raw2 = JSON.stringify({
      email: new URLSearchParams(window.location.search).get("email"),
    });
    const requestOptions2 = {
      method: "POST",
      headers: myHeaders,
      body: raw2,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_MAZA_URL}/users/getByEmail`, requestOptions2)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        setResultd(result);
      });
  }, []);
  const handleOnChangeRCCountry = (e) => {
    if (e.target.value) {
      const filteredItems = AlCountry.filter(
        (item) => item.name === e.target.value
      );
      setAllStates(filteredItems[0].states);
      setResidentialCountry(e.target.value);
    } else {
      setResidentialCountry(e.target.value);
      setAllStates([]);
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleOnChangeRCState = (e) => {
    setResidentialState(e.target.value);
  };
  const handleOnFirstKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      setFValid("First Name - input only capital and small letters!");
    }
    if (value.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      setFValid("");
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      setFValid("First Name is required! ");
    }
  };
  const handleOnLastKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      setLValid("Last Name - input only capital and small letters!");
    }
    if (value.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      setLValid("");
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      setLValid("Last Name is required!");
    }
  };
  const handleOnOtherKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      setOValid("Other Name - input only capital and small letters!");
    }
    if (value.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      setOValid("");
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      setOValid("");
    }
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
  const handleAdd = () => {
    // const data11 = JSON.parse(localStorage.getItem("user1"));
    // const id = data11.id;
    handleOnPasswordKeys(password);
    handleOnRTPasswordKeys(confirm);
    if (valpass === "" && password.length > 0 && confirm.length > 0) {
      const raw = JSON.stringify({
        id: resultd.id,
        firstName: fname,
        lastName: lname,
        otherName: oname,
        email: mail,
        dateOfBirth: new Date(dob).getTime(),
        street: street,
        city: city,
        pno: phonex,
        roleID: role,
        state: residentialStatex,
        country: residentialCountryx,
        createdTime: resultd.createdTime,
        status: resultd.status,
        deleteFlag: resultd.deleteFlag,
      });
      // console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      setOpened(true);
      fetch(`${process.env.REACT_APP_MAZA_URL}/users/update`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          setOpened(false);
          if (result.message === "Expired Access") {
            Navigate("/sign-in");
            window.location.reload();
          }
          if (result.message === "Token Does Not Exist") {
            Navigate("/sign-in");
            window.location.reload();
          }
          if (result.message === "Unauthorized Access") {
            Navigate("/authentication/forbiddenPage");
            window.location.reload();
          }
          const raw2 = JSON.stringify({
            username: mail,
            password: password,
            userType: 3,
          });
          // console.log(raw2);
          const requestOptions2 = {
            method: "POST",
            headers: myHeaders,
            body: raw2,
            redirect: "follow",
          };
          fetch(
            `${process.env.REACT_APP_MAZA_URL}/login/create`,
            requestOptions2
          )
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((result) => {
              setOpened(false);
              if (result.message === "Expired Access") {
                Navigate("/sign-in");
                window.location.reload();
              }
              if (result.message === "Token Does Not Exist") {
                Navigate("/sign-in");
                window.location.reload();
              }
              if (result.message === "Unauthorized Access") {
                Navigate("/authentication/forbiddenPage");
                window.location.reload();
              }

              // Swal.fire({
              //   title: result.status,
              //   icon: "success",
              //   text: result.message,
              // }).then(() => window.location.reload());
              // console.log(result );
            })
            .catch((error) => {
              setOpened(false);
              Swal.fire({
                title: error.status,
                icon: "error",
                text: error.message,
              });
            });

          if (result.status === "SUCCESS") {
            Swal.fire({
              title: result.status,
              icon: "success",
              text: "You have completed your registration!",
            }).then(() => Navigate("/sign-in"));
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
          Swal.fire({
            title: error.status,
            icon: "error",
            text: error.message,
          });
        });
    }
  };
  return (
    <div className="wraper">
      <div className="kkk">
        <div ref={myRef} />
        <Row style={{ width: "98vw", marginLeft: "auto", marginRight: "auto" }}>
          <Card
            className="small shadows"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "center",
              marginTop: "30px",
              alignItems: "center",
              // height: "300vw",
              // position:"absolute"
            }}
          >
            <CardHeader>
              <h5
                className="title"
                style={{ letterSpacing: "5px", marginTop: "20px" }}
              >
                Welcome To
              </h5>
            </CardHeader>
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
            <br />
            <CardBody>
              <Form style={{ width: "100%" }}>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>First Name *</label>
                      <Input
                        // defaultValue={`${data11.firstName}`}
                        value={fname}
                        placeholder="First Name"
                        type="text"
                        onChange={(e) => {
                          handleOnFirstKeys(e.target.value);
                          setFname(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Last Name *</label>
                      <Input
                        // defaultValue={`${data11.lastName}`}

                        value={lname}
                        placeholder="Last Name"
                        type="text"
                        onChange={(e) => {
                          handleOnLastKeys(e.target.value);
                          setLname(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Other Name</label>
                      <Input
                        // defaultValue={`${data11.lastName}`}
                        onChange={(e) => {
                          setOname(e.target.value);
                          handleOnOtherKeys(e.target.value);
                        }}
                        placeholder="Other Name"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="vibr" style={{ width: "50%" }}>
                    {FValid}&nbsp;
                    {LValid}&nbsp;
                    {OValid}
                  </div>
                </Row>
                <hr />
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Street</label>
                      <Input
                        // defaultValue={`${data11.street}`}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Street"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>City</label>
                      <Input
                        // defaultValue={`${data11.city}`}
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Nationality</label>

                    <Form2.Select
                      style={{ marginBottom: "20px" }}
                      value={residentialCountryx || ""}
                      aria-label="Default select example"
                      onChange={handleOnChangeRCCountry}
                      size="sm"
                    >
                      <option value="">----</option>
                      {AlCountry.map((apic) => (
                        <option key={apic.code3} value={apic.name}>
                          {apic.name}
                        </option>
                      ))}
                    </Form2.Select>
                  </Col>

                  <Col>
                    <label>State</label>
                    <Form2.Select
                      value={residentialStatex || ""}
                      size="sm"
                      aria-label="Default select example"
                      onChange={handleOnChangeRCState}
                    >
                      <option>----</option>
                      {allStates.map((apis) => (
                        <option key={apis.code} value={apis.name}>
                          {apis.name}
                        </option>
                      ))}
                    </Form2.Select>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col md="10">
                    <FormGroup>
                      <label>Email *</label>
                      <Input
                        // defaultValue={`${data11.street}`}
                        value={mail}
                        placeholder="mazaways@mazaways.com"
                        type="text"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <PhoneInput
                      // value={phonex}
                      onChange={(val) => setPhonex(val)}
                      id="phone"
                      placeholder="+234 812 345 6789"
                      // value="+"
                      inputStyle={{ marginTop: "3.8%" }}
                      // onChange={setPhone}
                    />
                  </Col>
                  <Col md="6">
                    <label>Date of Birth </label>
                    <TextField
                      id="datetime-local"
                      // label="*"
                      color="secondary"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                        width: "20px",
                      }}
                      size="small"
                      value={dob}
                      // disabled={disab}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </Col>
                </Row>
                <br />
                <hr />
                <br />
                <Box className="shadows2">
                  <b>PASSWORD</b>
                </Box>
                <Row>
                  <FormControl
                    sx={{ mt: 5, width: "50%", mr: "auto", ml: "auto" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Enter Password
                    </InputLabel>
                    <OutlinedInput
                      color="secondary"
                      size="small"
                      sx={{ pb: 1 }}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      onChange={(e) => {
                        handleOnPasswordKeys(e.target.value);
                        setPassword(e.target.value);
                      }}
                    />
                  </FormControl>{" "}
                </Row>
                <Row>
                  <FormControl
                    sx={{ mt: 2, width: "50%", mr: "auto", ml: "auto" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      color="secondary"
                      size="small"
                      sx={{ pb: 1 }}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      onChange={(e) => {
                        handleOnRTPasswordKeys(e.target.value);
                        setConfirm(e.target.value);
                      }}
                    />
                  </FormControl>
                </Row>
                <Row>
                  <div
                    className="vibr"
                    style={{ width: "80%", marginTop: "20px" }}
                  >
                    {valpass}
                  </div>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button
                className="btn-fill"
                color="primary"
                onClick={() => {
                  if (FValid === "" && LValid === "" && OValid === "") {
                    handleAdd();
                  } else myRef.current.scrollIntoView();
                }}
              >
                Complete Registration
              </Button>
            </CardFooter>
          </Card>
          <Backdrop
            sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={opened}
          >
            <CircularProgress style={{ color: "white" }} />
          </Backdrop>
        </Row>
      </div>
    </div>
  );
}
