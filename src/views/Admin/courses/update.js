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
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [courseName, setCourseName] = useState("");
  const [descriptionx, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [unitx, setUnit] = useState("");
  const [courseCodex, setCourseCode] = useState("");
  const [otherProgFaculties, setOtherProgFaculties] = useState([]);
  const [otherProgram, setOtherProg] = useState("");

  useEffect(() => {
    handleGetFaculties();
    handleGetCourses();
    handleGetOtherProgram();
  }, []);

  // useEffect(() => {
  const handleGetFaculties = () => {
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
  };
  // }, []);
  // useEffect(() => {
  const handleGetCourses = () => {
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
        setCourseName(result[0].name);
        setDescription(result[0].description);
        setEmail(result[0].head);
        handleDepartment(result[0].facultyID);
        setCourseCode(result[0].courseCode);
        setUnit(result[0].unit);
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
  };
  // }, []);
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
      name: courseName,
      description: descriptionx,
      head: email,
      schoolID: userInfo.schoolID,
      depID: department.value,
      facultyID: faculty.value,
      facultyName: dara.facultyName,
      collegeID: dara.collegeID,
      collegeName: dara.collegeName,
      deleteFlag: dara.deleteFlag,
      schoolName: dara.schoolName,
      courseCode: courseCodex,
      unit: unitx,
      id: dara.id,
      otherProgramsID: otherProgram,

      // id: "string",
      // name: "string",
      // description: "string",
      // courseCode: "string",
      // schoolID: "string",
      // collegeID: "string",
      // facultyID: "string",
      // depID: "string",
      // unit: 0,
      // deleteFlag: 0,
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

  const handleGetOtherProgram = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/otherPrograms/gets/${schID}`,
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
        setOtherProgFaculties(result);
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
                    setCourseName(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Name"
                  value={courseName}
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
                    setCourseCode(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Course Code"
                  value={courseCodex}
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
                    setUnit(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Unit"
                  value={unitx}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col className="pl-md-1" md="8">
              <FormGroup>
                <label>Description</label>
                <Input
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Description"
                  // onChange={() => console.log()}
                  type="textarea"
                  value={descriptionx}
                  // disabled
                />
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
                  value={otherProgram || ""}
                  aria-label="Default select example"
                  onChange={(e) => setOtherProg(e.target.value)}
                >
                  <option value="">--Select Other Program--</option>
                  {otherProgFaculties.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
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
