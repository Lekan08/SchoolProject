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

function SignUpAdmin() {
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

  const handleClick4 = () => {
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
      roleID: "string",
      schoolID: "string",
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
  const handleClick = (e) => {
    if (passwordx === confirmPassword) {
      sessionStorage.setItem("admin", true);
      setOpened(true);
      // e.preventDefault();
      // const data11 = JSON.parse(localStorage.getItem("user1"));

      // const orgIDs = data11.orgID;
      // const idx = data11.personalID;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        name: namex,
        email: emailx,
        head: headOfSch,
        street: streetx,
        city: cityx,
        state: statex,
        country: countryx,
        schoolType: schoolTypex,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        `${process.env.REACT_APP_SCHPROJECT_URL}/schools/add`,
        requestOptions
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
          if (result.status === "SUCCESS") {
            const allResult = result.data;
            const raw2 = JSON.stringify({
              firstName: firstNamex,
              lastName: lastNamex,
              email: emailx,
              phoneNumber: phonex,
              sex: sexx,
              dateOfBirth: startDate.getTime(),
              schoolID: allResult.id,
              // facultyID: facId,
              // roleID: "0",
              // depID: deptId,
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
                const resultx = await res.text();
                if (
                  resultx === null ||
                  resultx === undefined ||
                  resultx === ""
                ) {
                  return {};
                }
                return JSON.parse(resultx);
              })
              .then((resultx) => {
                console.log(resultx);
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
                          localStorage.setItem(
                            "user",
                            JSON.stringify(result.data)
                          );
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
          console.log(result);
          setOpened(false);
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
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
          {/* <br /> */}
          {/* <Box
            component="span"
            sx={{ p: 2, border: "1px dashed grey" }}
            alignSelf={"center"}
          >
            <Button>Personal Information</Button>
          </Box> */}
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

export default SignUpAdmin;
