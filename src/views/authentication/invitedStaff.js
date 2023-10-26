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
import { Card } from "@mui/material";
import { Input, CardBody } from "reactstrap";
// import Grid from "@material-ui/core/Grid";

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
  const [otherNamex, setOtherName] = useState("");

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
        otherName: otherNamex,
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

  var cardStyle = {
    display: "block",
    width: "30vw",
    transitionDuration: "0.3s",
    height: "45vw",
  };

  return (
    <div className="content">
      <Card mx={6} style={cardStyle}>
        <CardBody>
          {/* <MenuBook
            sx={{
              fontSize: 230,
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
            }}
          /> */}
          <br />
          <Row>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Course Name</label>
                <Input
                  onChange={(e) => {
                    // setFname(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Name"
                  //   value={firstName}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Course Code</label>
                <Input
                  onChange={(e) => {
                    // setCourseCode(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Course Code"
                  //   value={firstName}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Unit</label>
                <Input
                  onChange={(e) => {
                    // setUnit(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Unit"
                  //   value={firstName}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col className="pl-md-1" md="8">
              <FormGroup>
                <label>Description (optional)</label>
                {/* <Input
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Description"
                  // onChange={() => console.log()}
                  type="textarea"
                  //   value={items[0]?.lastName}
                  // disabled
                /> */}
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
                <label>Other Program</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  // value={otherProgram || ""}
                  // aria-label="Default select example"
                  // onChange={(e) => setOtherProg(e.target.value)}
                >
                  <option value="">--Select Other Program--</option>
                  {/* {otherProgFaculties.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))} */}
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col className="pl-md-1" md="4">
              <label>Faculty</label>
              <Select
                options={faculties}
                maxMenuHeight={80}
                onChange={(e) => {
                  // handleDepartment(e.value);
                  setFaculty(e.value);
                }}
              />
              {/* <FormGroup>
                <label>Faculty</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  // value={sex || ""}
                  size="sm"
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleDepartment(e.target.value);
                    setFaculty(e.target.value);
                    console.log(selected);
                  }}
                >
                  <option value="">--Select Faculty--</option>
                  {faculties.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup> */}
            </Col>
            <Col className="pl-md-1" md="4">
              {/* <FormGroup>
                <label>Department</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  // value={sex || ""}
                  size="sm"
                  aria-label="Default select example"
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">--Select Department--</option>
                  {departments.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup> */}
              <label>Department</label>
              <Select
                options={departments}
                maxMenuHeight={80}
                onChange={(e) => {
                  // setDepartment(e.value);
                }}
              />
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>College (optional) </label>
                <Select />
              </FormGroup>
            </Col>
          </Row>
          <Button
            variant="gradient"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              marginTop: "20px",
            }}
            color="info"
            // onClick={() => handleChange2()}
          >
            Add Course
          </Button>
        </CardBody>
      </Card>
      {/* <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Card>// card content</Card>
        </Grid>
      </Grid> */}
      {/* <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop> */}
    </div>
  );
}

export default InvitedStaff;
