import React, { useState, useEffect, useRef } from "react";

// reactstrap components
import logo from "assets/img/react-logo.png";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
// import Box from "@mui/material/Box";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
// import "../userProfile/Css.css";
// import "../Css.css";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, FloatingLabel, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
// import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-datepicker/dist/react-datepicker.css";
// import "./css";

function SignUpAdmin() {
  const Navigate = useNavigate();
  //   useEffect(() => {
  //     if (window.location.pathname === "/sign-up") Navigate("/");
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);
  const [userName, setUserName] = useState("");
  const [opened, setOpened] = useState(false);
  const [passwordx, setPassword] = useState("");
  const [phonex, setPhone] = useState("");
  const [sexx, setSex] = useState("");
  //   const [age, setAge] = React.useState("");
  //   const [passwordShown, setPasswordShown] = useState(false);
  const [dateOfBirthx, setDateOfBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNamex, setFirstName] = useState("");
  const [lastNamex, setLastName] = useState("");
  const [emailx, setEmail] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  console.log(emailx);

  // const [validated, setValidated] = useState(false);
  //   // const [password, setPassword] = useState("");
  // const [confirmation, setConfirmation] = useState("");
  const confirmationError = useRef(null);
  const MySwal = withReactContent(Swal);

  //   const togglePassword = () => {
  //     // When the handler is invoked
  //     // inverse the boolean state of passwordShown
  //     setPasswordShown(!passwordShown);
  //   };

  const handleClick = () => {
    sessionStorage.setItem("admin", true);
    // Navigate("/dashboard");
    // setOpened(true);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const facId = urlParams.get("facId");
    const deptId = urlParams.get("deptId");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      firstName: firstNamex,
      lastName: lastNamex,
      email: emailx,
      phoneNumber: phonex,
      sex: sexx,
      dateOfBirth: startDate.getTime(),
      schoolID: idx,
      facultyID: facId,
      roleID: "0",
      depID: deptId,
      lecturer: true,
    });
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    // setOpened(true);
    if (passwordx === confirmPassword) {
      fetch(
        `${process.env.REACT_APP_SCHPROJECT_URL}/staffs/add`,
        requestOptions
      )
        .then(async (res) => {
          // console.log(res.headers);;;;
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex1", aToken);
          return res.json();
        })
        .then((result) => {
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
  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (passwordx !== confirmPassword) {
      event.preventDefault();
      event.stopPropagation();
      confirmationError.current.style.display = null;
    } else {
      confirmationError.current.style.display = "none";
      handleClick();
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
      <Form>
        <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
          Staff Information
        </h2>
        <Container fluid>
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

export default SignUpAdmin;
