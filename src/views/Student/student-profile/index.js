import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp, School } from "@mui/icons-material";
import { Card, TextField, Typography } from "@mui/material";
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

export default function StudentProfileUpdate() {
  const [opened, setOpened] = useState(false);
  const [phonex, setPhonex] = useState(0);
  const [dob, setDob] = useState("");
  const [edit, setEdit] = useState(true);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [type, setType] = useState("");
  const [matric, setMatric] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [oName, setOName] = useState("");

  const [items, setItems] = useState({});

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user2"));
    const idx = userInfo.id;
    setOName(userInfo.otherName);
    // console.log(idx);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/students/getByIds/${idx}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        const dateOfBirth = Number(result[0].dateOfBirth);
        const day = () => {
          let day = new Date(dateOfBirth).getDate();
          if (String(day).length === 1) return `0${day}`;
          return day;
        };
        const month = () => {
          let day = new Date(dateOfBirth).getMonth() + 1;
          if (String(day).length === 1) return `0${day}`;
          return day;
        };
        setOpened(false);
        console.log(result);
        setFname(result[0].firstName);
        setLname(result[0].lastName);
        setSex(result[0].sex);
        setType(String(result[0].studentType));
        setEmail(result[0].email);
        setMatric(result[0].matricNumber);
        setDob(`${new Date(dateOfBirth).getFullYear()}-${month()}-${day()}`);
        setPhonex(`+${result[0].phoneNumber}`);
        setFaculty(result[0].facultyName);
        setDepartment(result[0].departmentName);
        setItems(result[0]);
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

  const userInfo = JSON.parse(localStorage.getItem("user2"));
  console.log(userInfo);
  return (
    <div className="content">
      <Card mx={2}>
        <CardBody>
          <AccountCircleSharp
            sx={{
              fontSize: 230,
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
            }}
          />
          <br />
          <Row>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>First Name</label>
                <Input
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                  disabled
                  // defaultValue={`${data11.firstName}`}
                  placeholder="First Name"
                  value={fname}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
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
                  value={lname}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Other Name</label>
                <Input
                  onChange={(e) => {
                    setOName(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Other Name"
                  // onChange={() => console.log()}
                  type="text"
                  value={oName}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="4" className="pl-md-1">
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
                  value={email}
                  disabled={true}
                />
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Sex</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={sex || ""}
                  disabled
                  aria-label="Default select example"
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">--Select Sex--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1">
              <label>Phone Number</label>
              <PhoneInput
                // value={phonex}
                onChange={(val) => setPhonex(val)}
                id="phone"
                disabled
                placeholder="+234 812 345 6789"
                value={phonex}
                inputStyle={{ marginTop: "3.8%", width: "100%" }}
                // onChange={setPhone}
              />
            </Col>
          </Row>
          {/* <Row style={{ marginTop: 20 }}>
            <Col md="5" className="pl-md-1">
              <FormGroup>
                <label>Student Type</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={type || ""}
                  disabled
                  aria-label="Default select example"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">--Select Type--</option>
                  <option value="0">Major</option>
                  <option value="1">Minor</option>
                </Form.Select>
              </FormGroup>
            </Col>
          </Row> */}
          <Row style={{ marginTop: 20 }}>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Faculty</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={faculty || ""}
                  size="sm"
                  disabled
                  aria-label="Default select example"
                  onChange={(e) => {
                    setFaculty(e.target.value);
                  }}
                >
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                </Form.Select>
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Department</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={department || ""}
                  disabled
                  size="sm"
                  aria-label="Default select example"
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option key={department} value={department}>
                    {department}
                  </option>
                </Form.Select>
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>College </label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  // value={sex || ""}
                  disabled
                  size="sm"
                  aria-label="Default select example"
                  // onChange={(e) => setSex(e.target.value)}
                >
                  <option value=""></option>
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
                  // label="*"
                  color="secondary"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                    width: "20px",
                  }}
                  size="small"
                  value={dob}
                  disabled
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
                  value={matric}
                  disabled
                />
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
            onClick={() => setEdit((edi) => !edi)}
          >
            {edit ? "Edit" : "Save"}
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
