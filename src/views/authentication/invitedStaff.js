import React, { useState, useEffect, useRef } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../userProfile/Css.css";
import "../Css.css";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./index.css";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container, FloatingLabel, Row, Col } from "react-bootstrap";
// import AllCountriesAndStates from "../../../countries-states-master/countries";
import AllCountriesAndStates from "../../countries-states-master/countries";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GHeaders from "getHeader";
import { FormGroup } from "reactstrap";

function InvitedStaff() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/sign-up") Navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MySwal = withReactContent(Swal);
  const [userName, setUserName] = useState("");
  const [opened, setOpened] = useState(false);
  const [passwordx, setPassword] = useState("");
  const [phonex, setPhone] = useState("");
  const [startTimexx, setStartTime] = useState("");
  const [age, setAge] = React.useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNamex, setFirstName] = useState("");
  const [lastNamex, setLastName] = useState("");
  const [emailx, setEmail] = useState("");

  const [namex, setName] = useState("");
  // const [opened, setOpened] = useState(false);
  const [streetx, setStreet] = useState("");
  const [cityx, setCity] = useState("");
  const [statex, setState] = useState("");
  const [countryx, setCountry] = useState("");
  // const [emailx, setEmail] = useState("");
  const [headOfSch, setHeadOfSch] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [schoolTypex, setSchoolType] = useState("");
  const [sexx, setSex] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  console.log(emailx);

  const [validated, setValidated] = useState(false);
  // const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const confirmationError = useRef(null);
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const [faculties, setFaculties] = useState([]);
  const [facultyx, setFaculty] = useState("");
  const { allGHeaders: miHeaders } = GHeaders();
  const [departx, setDepart] = useState("");
  const [departments, setDepartments] = useState([]);

  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter(
      (item) => item.name === e.target.value
    );
    setAllStates(filteredItems[0].states);
    setCountry(e.target.value);
  };
  const handleOnChangeRCState = (e) => {
    setState(e.target.value);
  };

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/faculties/gets/${schID}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        console.log(result);
        setFaculties(result);
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
  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/departments/gets/${schID}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        console.log(result);
        setDepartments(result);
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

  const handleClick = (e) => {
    if (passwordx === confirmPassword) {
      sessionStorage.setItem("admin", true);
      setOpened(true);
      // e.preventDefault();
      const myHeaders = new Headers();

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const schoolID = urlParams.get("schoolID");
      myHeaders.append("Content-Type", "application/json");
      const raw2 = JSON.stringify({
        firstName: firstNamex,
        lastName: lastNamex,
        email: emailx,
        phoneNumber: phonex,
        sex: sexx,
        dateOfBirth: startDate.getTime(),
        schoolID: schoolID,
        facultyID: facultyx,
        // roleID: "0",
        depID: departx,
        lecturer: true,
      });
      console.log(raw2);
      const requestOptions2 = {
        method: "POST",
        headers: myHeaders,
        body: raw2,
        redirect: "follow",
      };
      fetch(
        `${process.env.REACT_APP_SCHPROJECT_URL}/staffs/add`,
        requestOptions2
      )
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          const result = await res.text();
          if (result === null || result === undefined || result === "") {
            return {};
          }
          return JSON.parse(result);
        })
        .then((result) => {
          console.log(result);
          setOpened(false);
          if (result.status === "SUCCESS") {
            // localStorage.setItem("admin4", result.data);
            // Navigate("/dashboard");
            const raw = JSON.stringify({
              username: emailx,
              password: passwordx,
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
              `${process.env.REACT_APP_SCHPROJECT_URL}/staffLogin/addLogin`,
              requestOptions
            )
              .then(async (res) => {
                // console.log(res.headers);;;;
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex1", aToken);
                return res.json();
              })
              .then((result) => {
                setOpened(false);
                if (result.status === "SUCCESS") {
                  //   localStorage.setItem("admin", result.data);
                  MySwal.fire({
                    title: result.status,
                    type: "success",
                    text: result.message,
                  }).then(() => {
                    localStorage.setItem("user", JSON.stringify(result.data));
                    Navigate("/dashboard");
                  });
                } else {
                  MySwal.fire({
                    title: result.status,
                    type: "error",
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
          // MySwal.fire({
          //   title: result.status,
          //   type: "success",
          //   text: result.message,
          // }).then(() => {
          //   window.location.reload();
          // });
        })
        .catch((error) => {
          setOpened(false);
          MySwal.fire({
            title: error.status,
            type: "error",
            text: error.message,
          });
        });
    }
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (passwordx !== confirmPassword) {
      event.preventDefault();
      event.stopPropagation();
      confirmationError.current.style.display = null;
    } else {
      confirmationError.current.style.display = "none";
      handleClick();
      console.log("barry_jhay");
    }

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    //   setValidated(true);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    const letterMatch = (password.match(/[a-z, A-Z]/g) || []).length;
    const numberMatch = (password.match(/[0-9]/g) || []).length;
    const specialMatch = (password.match(/[#?!@$%^&*-]/g) || []).length;

    const strength = letterMatch + numberMatch * 2 + specialMatch * 3;
    console.log(strength);
    // progressBar.current.style.width = `${strength * 3}%`;
    let color = "red";
    if (strength > 10) {
      color = "orange";
    }
    if (strength > 26) {
      color = "green";
    }
    // progressBar.current.style.backgroundColor = color;
  };

  return (
    <div className="form-wrapper">
      <Form noValidate validated={validated}>
        <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
          School Information
        </h2>
        <Container fluid>
          <Row>
            <Col sm={6} style={{ marginBottom: "10px" }}>
              <Form.Group>
                <FloatingLabel controlId="firstnamLabel" label="Name of School">
                  <Form.Control
                    type="text"
                    value={namex}
                    onChange={(e) => setName(e.target.value)}
                    // placeholder="First name"
                    required
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  Do not leave empty
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6} style={{ marginBottom: "10px" }}>
              <Form.Group>
                <FloatingLabel
                  controlId="Head of school"
                  label="Head of school name"
                >
                  <Form.Control
                    type="text"
                    value={headOfSch}
                    onChange={(e) => setHeadOfSch(e.target.value)}
                    // placeholder="First name"
                    required
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  Do not leave empty
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
                mt={2}
              >
                Country
              </Typography>
              <Box textAlign="left">
                <Form.Select
                  value={countryx || ""}
                  aria-label="Default select example"
                  onChange={handleOnChangeRCCountry}
                  required
                >
                  <option>--Select Country--</option>
                  {AlCountry.map((apic) => (
                    <option key={apic.code3} value={apic.name}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </Box>
            </Col>
            <Col>
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
                mt={2}
              >
                State
              </Typography>
              <Box textAlign="left">
                <Form.Select
                  value={statex || ""}
                  aria-label="Default select example"
                  onChange={handleOnChangeRCState}
                  required
                >
                  <option>--Select State--</option>
                  {allStates.map((apis) => (
                    <option key={apis.code} value={apis.name}>
                      {apis.name}
                    </option>
                  ))}
                </Form.Select>
              </Box>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={6} style={{ marginBottom: "10px" }}>
              <Form.Group>
                <FloatingLabel controlId="Street" label="Street">
                  <Form.Control
                    type="text"
                    value={streetx}
                    onChange={(e) => setStreet(e.target.value)}
                    // placeholder="First name"
                    required
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  Do not leave empty
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6} style={{ marginBottom: "10px" }}>
              <Form.Group>
                <FloatingLabel controlId="City" label="City">
                  <Form.Control
                    type="text"
                    value={cityx}
                    onChange={(e) => setCity(e.target.value)}
                    // placeholder="First name"
                    required
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  Do not leave empty
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Box mb={4}>
                {/* <Typography variant="button" fontWeight="regular" color="text">
                  School Type
                </Typography> */}
                <Form.Select
                  onChange={(e) => setSchoolType(e.target.value)}
                  value={schoolTypex || ""}
                  aria-label="Default select example"
                >
                  <option>---School Type---</option>
                  <option value="0">University</option>
                  <option value="1">Polytechnic</option>
                  <option value="2">College of Education</option>
                </Form.Select>
              </Box>
            </Col>
          </Row>

          <Row style={{ marginTop: 20 }}>
            <Col
              md="4"
              className="pl-md-1"
              style={{
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <FormGroup>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={facultyx || ""}
                  aria-label="Default select example"
                  onChange={(e) => setFaculty(e.target.value)}
                >
                  <option value="">--Select Faculty--</option>
                  {faculties.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col
              md="4"
              className="pl-md-1"
              style={{
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <FormGroup>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={departx || ""}
                  aria-label="Default select example"
                  onChange={(e) => setDepart(e.target.value)}
                >
                  <option value="">--Select Department--</option>
                  {departments.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
            Personal Information
          </h2>

          <Row>
            <Col sm={6} style={{ marginBottom: "10px" }}>
              <Form.Group>
                <FloatingLabel controlId="firstnamLabel" label="First name">
                  <Form.Control
                    type="text"
                    value={firstNamex}
                    onChange={(e) => setFirstName(e.target.value)}
                    // placeholder="First name"
                    required
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  Do not leave empty
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6} style={{ marginBottom: "10px" }}>
              <FloatingLabel controlId="lastnameLabel" label="Last name">
                <Form.Control
                  type="text"
                  value={lastNamex}
                  onChange={(e) => setLastName(e.target.value)}
                  // placeholder="Last name"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel controlId="emailLabel" label="Enter email">
                  <Form.Control
                    type="email"
                    // placeholder="Enter email"
                    value={emailx}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                  />
                </FloatingLabel>
                <Form.Text className="text-muted">
                  We'll (hopefully) never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>

            <Col>
              <Box mb={4}>
                {/* <Typography variant="button" fontWeight="regular" color="text">
                  School Type
                </Typography> */}
                <Form.Select
                  onChange={(e) => setSex(e.target.value)}
                  value={sexx || ""}
                  aria-label="Default select example"
                >
                  <option>---Sex---</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Box>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography variant="button" fontWeight="regular" color="text">
                Phone Number
              </Typography>
              <PhoneInput
                value={phonex}
                inputStyle={{ width: "100%" }}
                buttonStyle={{}}
                onChange={setPhone}
              />
            </Col>
            <Col>
              <Typography
                variant="button"
                fontWeight="regular"
                color="black"
                mt={1}
              >
                Date Of Birth
              </Typography>
              <Box mb={6} mt={1}>
                <div>
                  <style>
                    {`.date-picker input {
                      width: 100%
                 }`}
                  </style>
                  <DatePicker
                    date={startDate}
                    wrapperClassName="date-picker"
                    placeholder="Select Birth Date"
                    dateFormat="dd/MM/yyyy"
                    confirmBtnText="Confirm"
                    showCancelButton="true"
                    customStyles={{
                      placeholderText: {
                        fontSize: 5,
                      },
                      dateIcon: {
                        height: 0,
                        width: 0,
                      },
                      dateText: {
                        color: "#b3b4b5",
                        fontSize: 16,
                      },
                      dateInput: {
                        borderWidth: 0,
                      },
                    }}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
              </Box>
            </Col>
          </Row>

          <Row>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="passwordLabel" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
              </FloatingLabel>
              <Form.Text className="text-muted">
                Must be 8 characters long, contain a number, an uppercase letter
                and a special character.
              </Form.Text>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3" controlId="formBasicConfirmation">
              <FloatingLabel controlId="confirmationLabel" label="Confirmation">
                <Form.Control
                  type="password"
                  placeholder="Confirmation"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FloatingLabel>
              <p
                style={{ color: "red", display: "none" }}
                ref={confirmationError}
              >
                Password and confirmation are not the same
              </p>
            </Form.Group>
          </Row>

          <Button variant="primary" onClick={handleSubmit}>
            Register
          </Button>
        </Container>
      </Form>
    </div>
  );
}

export default InvitedStaff;
