import React, { useState, useEffect, useRef } from "react";

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
// import { Card, CardHeader, CardBody } from "reactstrap";
import Swal from "sweetalert2";
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
import { Container, FloatingLabel, Row, Col } from "react-bootstrap";

function SignUpAdmin() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/sign-up") Navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  console.log(emailx);

  const [validated, setValidated] = useState(false);
  // const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const confirmationError = useRef(null);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const handleClick = () => {
    sessionStorage.setItem("admin", true);
    // Navigate("/dashboard");
    setOpened(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      firstName: firstNamex,
      lastName: lastNamex,
      email: emailx,
      phoneNumber: "string",
      sex: "string",
      dateOfBirth: "string",
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
            localStorage.setItem("admin", result.data);
            Navigate("/dashboard");
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
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (passwordx !== confirmation) {
      event.preventDefault();
      event.stopPropagation();
      confirmationError.current.style.display = null;
    } else {
      confirmationError.current.style.display = "none";
    }

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
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
    // <>
    //   <div className="bubble">
    //     <Row
    //       className="signbox"
    //       style={{
    //         marginRight: "auto",
    //         marginLeft: "auto",
    //         paddingLeft: "2vw",
    //         marginTop: "10vh",
    //         width: "40vw",
    //       }}
    //     >
    //       {/* <Col md="12"> */}
    //       <Card
    //         // className="signbox"
    //         className="resizer"
    //       >
    //         <CardHeader></CardHeader>
    //         <CardBody>
    //           <Row>
    //             <Col
    //               lg="11"
    //               style={{
    //                 marginRight: "auto",
    //                 marginLeft: "auto",
    //                 paddingTop: 8,
    //                 paddingBottom: 10,
    //               }}
    //             >
    //               <img
    //                 src={logo}
    //                 alt="companylogo"
    //                 style={{
    //                   width: "5vw",
    //                   borderRadius: "10px",
    //                   marginLeft: "auto",
    //                   marginRight: "auto",
    //                   display: "flex",
    //                 }}
    //               />
    //               <div className="font-icon-detail">
    //                 <p
    //                   style={{
    //                     marginTop: 0,
    //                     cursor: "pointer",
    //                     color: "#5e72e4",
    //                     letterSpacing: "0.4vh",
    //                     fontSize: "0.9rem",
    //                     textAlign: "center",
    //                     paddingBottom: "2.5vh",
    //                     // textShadow: "2px 2px 4px #000000",
    //                     fontFamily: "Comic Sans MS",
    //                   }}
    //                 >
    //                   Sign Up.
    //                 </p>
    //                 <div style={{ padding: 10, lineHeight: "7vh" }}>
    //                   <TextField
    //                     id="outlined-required"
    //                     label="UserName"
    //                     value={userName}
    //                     onChange={(e) => setUserName(e.target.value)}
    //                     sx={{
    //                       input: {
    //                         // color: "white",
    //                         width: "15rem",
    //                         fontSize: "0.8em",
    //                         height: "1vh",
    //                       },
    //                     }}
    //                   />
    //                   {/* </div>
    //                 <br /> */}
    //                   {/* <div style={{ padding: 10, lineHeight: "7vh" }}>
    //                   <TextField
    //                     id="outlined-required"
    //                     label="Last Name"
    //                     onChange={(e) => setUsername(e.target.value)}
    //                     sx={{
    //                       input: {
    //                         // color: "white",
    //                         width: "15rem",
    //                         fontSize: "0.8em",
    //                         height: "1vh",
    //                       },
    //                     }}
    //                   />
    //                 </div>
    //                 <div style={{ padding: 10, lineHeight: "7vh" }}>
    //                   <TextField
    //                     id="outlined-required"
    //                     label="Email"
    //                     onChange={(e) => setUsername(e.target.value)}
    //                     sx={{
    //                       input: {
    //                         // color: "white",
    //                         width: "15rem",
    //                         fontSize: "0.8em",
    //                         height: "1vh",
    //                       },
    //                     }}
    //                   />
    //                 </div>
    //                 <div>
    //                   <div className="col-sm-8">
    //                     <Typography
    //                       variant="button"
    //                       fontWeight="regular"
    //                       color="text"
    //                     >
    //                       Phone Number
    //                     </Typography>
    //                     <PhoneInput
    //                       value={phonex}
    //                       alignItems={"center"}
    //                       inputStyle={{ width: "80%" }}
    //                       buttonStyle={{}}
    //                       onChange={setPhone}
    //                     />
    //                   </div>
    //                 </div>
    //                 <div style={{ padding: 10, lineHeight: "7vh" }}>
    //                   <InputLabel id="demo-simple-select-label">Sex</InputLabel>
    //                   <Select
    //                     labelId="demo-simple-select-label"
    //                     id="demo-simple-select"
    //                     value={age}
    //                     label="Age"
    //                     onChange={handleChange}
    //                     style={{ width: "80%" }}
    //                   >
    //                     <MenuItem value={"Male"}>Male</MenuItem>
    //                     <MenuItem value={"Female"}>Female</MenuItem>
    //                     {/* <MenuItem value={30}>Thirty</MenuItem>
    //                   </Select>
    //                 </div> */}
    //                   {/* <div>
    //                   <TextField
    //                     id="datetime-local"
    //                     label="Start Time *"
    //                     type="datetime-local"
    //                     InputLabelProps={{
    //                       shrink: true,
    //                     }}
    //                     value={startTimexx}
    //                     onChange={(e) => setStartTime(e.target.value)}
    //                     // onInput={(e) => handleTime(e.target.value)}
    //                   /> */}
    //                   {/* </div> */}
    //                   <br />
    //                 </div>
    //                 {/* <div style={{ padding: 10, lineHeight: "7vh" }}>
    //                   <TextField
    //                     type={passwordShown ? "text" : "password"}
    //                     label="Password"
    //                     // value={passwordx || ""}
    //                     // onKeyUp={(e) => s(e.target.value)}
    //                     onChange={(e) => setPassword(e.target.value)}
    //                     variant="standard"
    //                     fullWidth
    //                   />
    //                   <Typography
    //                     variant="button"
    //                     fontSize="60%"
    //                     align="right"
    //                     onClick={togglePassword}
    //                     mx={0}
    //                     color="info"
    //                   >
    //                     show password
    //                   </Typography>
    //                 </div> */}
    //                 {/* <Container> */}

    //                 <div style={{ padding: 10, lineHeight: "7vh" }}>
    //                   {/* <div className="col-sm-6">
    //                     <Box mb={2}>
    //                       <TextField
    //                         type={passwordShown ? "text" : "password"}
    //                         label="Password"
    //                         id="outlined-required"
    //                         // value={passwordx || ''}
    //                         // onKeyUp={(e) => handleOnPasswordKeys(e.target.value)}
    //                         onChange={(e) => setPassword(e.target.value)}
    //                         variant="standard"
    //                         fullWidth
    //                       />
    //                     </Box>
    //                   </div> */}
    //                   <TextField
    //                     id="outlined-required"
    //                     type={passwordShown ? "text" : "password"}
    //                     label="Password"
    //                     value={passwordx}
    //                     onChange={(e) => setPassword(e.target.value)}
    //                     sx={{
    //                       input: {
    //                         // color: "white",
    //                         width: "15rem",
    //                         fontSize: "0.8em",
    //                         height: "1vh",
    //                       },
    //                     }}
    //                   />
    //                 </div>
    //                 <div style={{ padding: 10, lineHeight: "7vh" }}>
    //                   <FormControl
    //                     sx={{ m: 1, width: "17rem" }}
    //                     variant="outlined"
    //                   >
    //                     <InputLabel htmlFor="outlined-adornment-password">
    //                       Confirm Password
    //                     </InputLabel>
    //                     <OutlinedInput
    //                       type={passwordShown ? "text" : "password"}
    //                       // label="Password"
    //                       // value={passwordx}
    //                       value={confirmPassword}
    //                       onChange={(e) => setConfirmPassword(e.target.value)}
    //                       id="outlined-adornment-password"
    //                       // type={showPassword ? "text" : "password"}
    //                       sx={{
    //                         input: {
    //                           // color: "white",
    //                           height: "1vh",
    //                           fontSize: "0.8em",
    //                         },
    //                       }}
    //                       endAdornment={
    //                         <InputAdornment position="end">
    //                           <IconButton
    //                             aria-label="toggle password visibility"
    //                             onClick={() => togglePassword()}
    //                             edge="end"
    //                           >
    //                             {showPassword ? (
    //                               <VisibilityOff />
    //                             ) : (
    //                               <Visibility />
    //                             )}
    //                           </IconButton>
    //                         </InputAdornment>
    //                       }
    //                       label="Password"
    //                     />
    //                   </FormControl>
    //                 </div>
    //                 {/* </Container> */}
    //                 {/* <Box mb={2}>
    //                   {/* <Container>
    //                   <div className="row">
    //                     <div className="col-sm-12">
    //                       <TextField
    //                         type={passwordShown ? "text" : "password"}
    //                         label="Retype Password"
    //                         // value={retypePasswordx || ''}
    //                         // onKeyUp={(e) => handleOnRTPasswordKeys(e.target.value)}
    //                         // onChange={(e) => setRetypePassword(e.target.value)}
    //                         variant="standard"
    //                         fullWidth
    //                       />
    //                     </div>

    //                   </div> */}
    //                 {/* </Container> */}
    //                 {/* </Box> */}
    //                 <Box mb={1} mt={-1} textAlign="center">
    //                   Don't have an account? &nbsp;
    //                   <Typography
    //                     component={Link}
    //                     // to="/authentication/sign-up-staff"
    //                     onClick={() => Navigate("/sign-in-admin")}
    //                     variant="button"
    //                     color="primary"
    //                     fontWeight="medium"
    //                     id="forgotpassword"
    //                     size="small"
    //                   >
    //                     Sign In
    //                   </Typography>
    //                 </Box>
    //                 <button
    //                   type="submit"
    //                   className="btn btn-custom btn-xs"
    //                   style={{
    //                     fontSize: "80%",
    //                     marginBottom: "5%",
    //                     marginTop: "4%",
    //                   }}
    //                   onClick={handleClick}
    //                 >
    //                   Sign UP
    //                 </button>
    //                 {/* <Box mb={1} mt={-1} textAlign="center">
    //                   <Typography
    //                     component={Link}
    //                     // to="/authentication/resetpassword"
    //                     // onClick={() => Navigate("/reset-password")}
    //                     variant="button"
    //                     color="primary"
    //                     fontWeight="medium"
    //                     id="forgotpassword"
    //                     size="small"
    //                   >
    //                     FORGOT PASSWORD?
    //                   </Typography>
    //                 </Box> */}
    //               </div>
    //             </Col>
    //           </Row>
    //         </CardBody>
    //       </Card>
    //       {/* </Col> */}
    //     </Row>
    //     <Backdrop
    //       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //       open={opened}
    //     >
    //       <CircularProgress sx={{ color: "white" }} />
    //     </Backdrop>
    //   </div>
    // </>
    <div className="form-wrapper">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
          Sign up a new user
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
                  required
                  onChange={(e) => setConfirmation(e.target.value)}
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

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Container>
      </Form>
    </div>
  );
}

export default SignUpAdmin;
