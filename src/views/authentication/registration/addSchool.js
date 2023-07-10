import React, { useState, useEffect, useRef } from "react";

// reactstrap components
import logo from "assets/img/react-logo.png";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
// import Box from "@mui/material/Box";
import { Box } from "@mui/material";
// import { Card, CardHeader, CardBody } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import "../userProfile/Css.css";
// import "../Css.css";
import { useNavigate } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
// import Form from "react-bootstrap/Form";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Container, FloatingLabel, Row, Col } from "react-bootstrap";
import "./index.css";
import AllCountriesAndStates from "../../../countries-states-master/countries";

function SchoolInformation({ formData, setFormData }) {
  const Navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/sign-up") Navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [namex, setName] = useState("");
  const [opened, setOpened] = useState(false);
  const [streetx, setStreet] = useState("");
  const [cityx, setCity] = useState("");
  const [statex, setState] = useState("");
  const [countryx, setCountry] = useState("");
  const [emailx, setEmail] = useState("");
  const [headOfSch, setHeadOfSch] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [schoolTypex, setSchoolType] = useState("");
  console.log(emailx);
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const MySwal = withReactContent(Swal);

  const [validated, setValidated] = useState(false);
  // const [password, setPassword] = useState("");
  // const [confirmation, setConfirmation] = useState("");
  const confirmationError = useRef(null);
  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter(
      (item) => item.name === e.target.value
    );
    setAllStates(filteredItems[0].states);
    setCountry(e.target.value);
  };
  // const handleOnChangeRCCountry = (e) => {
  //   const filteredItems = AlCountry.filter(
  //     (item) => item.name === e.target.value
  //   );
  //   setAllStates(filteredItems[0].states);
  //   setFormData({ ...formData, Country: e.target.value });
  // };
  const handleOnChangeRCState = (e) => {
    setState(e.target.value);
  };

  // const PageDisplay = () => {
  //   if (page === 13) {
  //     return <PersonalInfo formData={formData} setFormData={setFormData} />;
  //   }
  //   if (page === 1) {
  //     return <Pno formData={formData} setFormData={setFormData} />;
  //   }
  //   if (page === 2) {
  //     return <Nationality formData={formData} setFormData={setFormData} />;
  //   }
  //   if (page === 3) {
  //     return <Address formData={formData} setFormData={setFormData} />;
  //   }
  // };

  const handleClick = () => {
    // sessionStorage.setItem("admin", true);
    // setOpened(true);
    console.log(namex);
    console.log(namex);
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
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    // setOpened(true);
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/schools/add`, requestOptions)
      .then(async (res) => {
        // Navigate(`/faculty?id=${res.data}`);
        console.log(res.headers);
        // const aToken = res.headers.get("token-1");
        // localStorage.setItem("rexxdex1", aToken);
        return res.json();
      })
      .then((result) => {
        // if (result.status === "SUCCESS") {
        const getId = result.data;

        console.log(result.data);
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        });
        // localStorage.setItem("admin", result.data);
        Navigate(`/faculty?id=${getId.id}`);
        // setFormData({ ...formData, result });
        // MySwal
        // }
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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(event);

    event.preventDefault();
    event.stopPropagation();
    confirmationError.current.style.display = null;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="form-wrapper">
      <Form>
        <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
          Add School Information
        </h2>
        <Container fluid>
          <Row>
            <Col sm={6} style={{ marginBottom: "10px" }}>
              <Form.Group>
                <FloatingLabel controlId="firstnamLabel" label="First name">
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
            <Col>
              <Form.Group controlId="formBasicEmail">
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
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={6} style={{ marginBottom: "10px" }}>
              <Form.Group>
                <FloatingLabel
                  controlId="Head of school"
                  label="Owner of school name"
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
            <Col>
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

          <Row>
            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
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
            </Form.Group> */}
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
          <br />
          {/* <Container>
                      <div className="row">
                        <div className="col-sm-6">
                          <Typography variant="button" fontWeight="regular" color="text" mt={2}>
                            Country
                          </Typography>
                          <Box textAlign="left">
                            <Form.Select
                              value={countryx || ''}
                              aria-label="Default select example"
                              onChange={handleOnChangeRCCountry}
                            >
                              <option>--Select Country--</option>
                              {AlCountry.map((apic) => (
                                <option key={apic.code3} value={apic.name}>
                                  {apic.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Box>
                        </div>
                      </div>
                    </Container> */}

          <Button variant="primary" onClick={handleClick}>
            Register
          </Button>
        </Container>
      </Form>
    </div>
  );
}

export default SchoolInformation;
