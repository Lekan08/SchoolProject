import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { MenuBook } from "@mui/icons-material";
import { Card, TextField } from "@mui/material";
import Select from "react-select";
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

export default function CourseUpdate() {
  const [opened, setOpened] = useState(false);
  const [dara, setDara] = useState([]);
  const [dob, setDob] = useState([]);
  const [fname, setFname] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [lname, setLname] = useState("");
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
        const spec = result.map((r) => ({ value: r.id, label: r.name }));
        setDob(spec);
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

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/courses/getByIds/${idx}`, {
      headers,
    })
      .then(async (res) => {
        // const aToken = res.headers.get("token-1");
        // localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        console.log(result);
        setFname(result[0].name);
        setLname(result[0].description);
        setEmail(result[0].head);
        handleDepartment(result[0].facultyID);
        setFaculty({
          value: result[0].facultyID,
          label: result[0].facultyName,
        });
        setDepartment({
          value: result[0].depID,
          label: result[0].departmentName,
        });
        setDara(result[0]);
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
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const headers = miHeaders;
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/departments/getByFacultyID/${w}`,
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
        const newdp = result.map((r) => ({ value: r.id, label: r.name }));
        setDepartments(newdp);
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
    console.log(departments);
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const raw2 = JSON.stringify({
      name: fname,
      description: lname,
      head: email,
      schoolID: userInfo.schoolID,
      depID: department.value,
      facultyID: faculty.value,
      facultyName: dara.facultyName,
      collegeID: dara.collegeID,
      collegeName: dara.collegeName,
      deleteFlag: dara.deleteFlag,
      schoolName: dara.schoolName,
      id: dara.id,
    });
    console.log(raw2);
    const requestOptions2 = {
      method: "PUT",
      headers: myHeaders,
      body: raw2,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/courses/update`,
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
      .then((result) => {
        setOpened(false);
        if (result.status === "SUCCESS") {
          //   localStorage.setItem("admin", result.data);
          Swal.fire({
            title: result.status,
            icon: "success",
            text: result.message,
          }).then(() => {
            Navigate("/courses");
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
  };
  return (
    <div className="content">
      <Card mx={2}>
        <CardBody>
          <MenuBook
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
                <label>Course Name</label>
                <Input
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Name"
                  value={fname}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="8">
              <FormGroup>
                <label>Description</label>
                <Input
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Description"
                  // onChange={() => console.log()}
                  type="textarea"
                  value={lname}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col className="pl-md-1" md="4">
              <label>Faculty</label>
              <Select
                value={faculty}
                options={dob}
                onChange={(e) => {
                  handleDepartment(e.value);
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
                value={department}
                options={departments}
                onChange={(e) => {
                  setDepartment(e.value);
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
            onClick={() => handleAdd()}
          >
            Update Course
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
