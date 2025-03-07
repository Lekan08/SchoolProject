import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp, School } from "@mui/icons-material";
import { Card, TextField } from "@mui/material";
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  CardBody,
  //   Card,
} from "reactstrap";
import { Form } from "react-bootstrap";
import Navigate from "useNavigate";

export default function StudentAdd() {
  const [opened, setOpened] = useState(false);
  const [phonex, setPhonex] = useState(0);
  const [dob, setDob] = useState("");
  const [fname, setFname] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [lname, setLname] = useState("");
  const [matric, setMatric] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    // console.log(userInfo);
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
  const handleDepartment = (w) => {
    setOpened(true);
    const headers = miHeaders;
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/departments/getByFacultyID/${JSON.parse(w).id}`,
      {
        headers,
      }
    )
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
  };
  const handleAdd = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const raw2 = JSON.stringify({
      firstName: fname,
      lastName: lname,
      email: email,
      phoneNumber: phonex,
      sex: sex,
      dateOfBirth: dob.getTime(),
      schoolID: userInfo.schoolID,
      depID: department,
      facultyID: faculty,
      // roleID: "0",
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
      `${process.env.REACT_APP_SCHPROJECT_URL}/student/add`,
      requestOptions2
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultx = await res.text();
        if (resultx === null || resultx === undefined || resultx === "") {
          return {};
        }
        return JSON.parse(resultx);
      })
      .then((resultx) => {
        console.log(resultx);
        setOpened(false);
        if (resultx.status === "SUCCESS") {
          // localStorage.setItem("admin4", result.data);
          // Navigate("/dashboard");
          const raw = JSON.stringify({
            // username: emailx,
            // password: passwordx,
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
                Swal.fire({
                  title: result.status,
                  icon: "success",
                  text: result.message,
                }).then(() => {
                  localStorage.setItem("user", JSON.stringify(result.data));
                  Navigate("/dashboard");
                });
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
        Swal.fire({
          title: error.status,
          icon: "error",
          text: error.message,
        });
      });
  };
  return (
    <div className="content">
      <Card mx={2}>
        <CardBody>
          <School
            sx={{
              fontSize: 230,
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
            }}
          />
          <br />
          <Row>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>First Name</label>
                <Input
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="First Name"
                  //   value={firstName}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Last Name</label>
                <Input
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Last Name"
                  // onChange={() => console.log()}
                  type="text"
                  //   value={items[0]?.lastName}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="5" className="pl-md-1">
              <FormGroup>
                <label>Sex</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={sex || ""}
                  aria-label="Default select example"
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">--Select Sex--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Email</label>
                <Input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Mail"
                  //   onChange={() => console.log()}
                  type="text"
                  //   value={items[0]?.email}
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col md="6" className="pl-md-1">
              <label>Phone Number</label>
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
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Faculty</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  // value={sex || ""}
                  size="sm"
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleDepartment(e.target.value);
                    setFaculty(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  <option value="">--Select Faculty--</option>
                  {faculties.map((apic) => (
                    <option key={apic.id} value={JSON.stringify(apic)}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
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
                    <option key={apic.id} value={JSON.stringify(apic)}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>College (optional) </label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  // value={sex || ""}
                  size="sm"
                  aria-label="Default select example"
                  // onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">--Choose--</option>
                  {/* <option value="Male">Male</option>
                  <option value="Female">Female</option> */}
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Date Of Birth</label>
                <br />
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
              </FormGroup>
            </Col>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Matric Number</label>
                <Input
                  onChange={(e) => setMatric(e.target.value)}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="0000-0000-0000"
                  //   onChange={() => console.log()}
                  type="text"
                  //   value={String(items[0]?.referralCode)}
                  // disabled
                />
                <label style={{ color: "red", marginTop: 10 }}>
                  Password to the student's profile will be the first name /
                  matric number : {fname}/{matric}
                </label>
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
            color="success"
            onClick={() => handleAdd()}
          >
            Add Student
          </Button>
        </CardBody>
      </Card>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
