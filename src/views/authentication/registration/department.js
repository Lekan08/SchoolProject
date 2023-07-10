import React, { useState, useEffect, useRef } from "react";

// reactstrap components
// import { Card, CardHeader, CardBody } from "reactstrap";
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
import "./index.css";
import { Container, FloatingLabel, Row, Col } from "react-bootstrap";

function Department({ formData, setFormData }) {
  const Navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/sign-up") Navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [namex, setName] = useState("");
  const [opened, setOpened] = useState(false);
  const [descrip, setDescrip] = useState("");
  const [headOfDepart, setHeadOfDepart] = useState("");
  //   console.log(emailx);

  const [validated, setValidated] = useState(false);
  // const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const confirmationError = useRef(null);

  const handleClick = () => {
    // sessionStorage.setItem("admin", true);
    // setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const facId = urlParams.get("facId");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      name: namex,
      description: descrip,
      head: headOfDepart,
      schoolID: idx,
      collegeID: idx,
      facultyID: facId,
    });
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    // setOpened(true);
    // if (passwordx === confirmPassword) {
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/departments/add`,
      requestOptions
    )
      .then(async (res) => {
        // Navigate("/sign-up-admin");
        // console.log(res.headers);;;;
        // const aToken = res.headers.get("token-1");
        // localStorage.setItem("rexxdex1", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.status === "SUCCESS") {
          const getId = result.data;
          //   localStorage.setItem("admin", result.data);
          Navigate(
            `/sign-up-admin?id=${idx}&facId=${facId}&deptId=${getId.id}`
          );
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
    // }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    // if (passwordx !== confirmation) {
    event.preventDefault();
    event.stopPropagation();
    confirmationError.current.style.display = null;
    // } else {
    //   confirmationError.current.style.display = "none";
    // }

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handlePasswordChange = (password) => {
    // setPassword(password);
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
          Department
        </h2>
        <Container fluid>
          <Row>
            <Col sm={6} style={{ marginBottom: "10px" }}>
              <Form.Group>
                <FloatingLabel controlId="firstnamLabel" label="Name">
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
                  controlId="Head of Department"
                  label="Head of Department"
                >
                  <Form.Control
                    type="text"
                    value={headOfDepart}
                    onChange={(e) => setHeadOfDepart(e.target.value)}
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="description" label="Description">
                <Form.Control
                  type="Description"
                  // placeholder="Enter email"
                  value={descrip}
                  onChange={(e) => setDescrip(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Button variant="primary" onClick={handleClick}>
            Register
          </Button>
        </Container>
      </Form>
    </div>
  );
}

export default Department;
