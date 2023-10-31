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

export default function CourseAdd() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(null);
  const [dob, setDob] = useState([]);
  const [fname, setFname] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [lname, setLname] = useState("");
  const [unitx, setUnit] = useState("");
  const [courseCodex, setCourseCode] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [otherProgFaculties, setOtherProgFaculties] = useState([]);
  const [otherProgram, setOtherProg] = useState("");

  console.log(faculty);

  useEffect(() => {
    handleGetFaculties();
    handleGetOtherProgram();
  }, [])

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
        // const spec = result.map((r) => ({ value: r.id, label: r.name }));
        // setDob(spec);
        // setFaculties(result);
        const spec = result.map((r) => ({ value: r.id, label: r.name }));

        setFaculties(spec);
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
    console.log(w);
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
    const unit = parseInt(unitx);
    const raw2 = JSON.stringify({
      name: fname,
      description: lname,
      head: email,
      schoolID: userInfo.schoolID,
      depID: department,
      facultyID: faculty,
      courseCode: courseCodex,
      unit: unit,
      otherProgramsID: otherProgram,
    });
    console.log(raw2);
    const requestOptions2 = {
      method: "POST",
      headers: myHeaders,
      body: raw2,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/courses/add`,
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
  const handleChange2 = () => {
    const unit = parseInt(unitx);
    if (unit <= 6) {
      handleAdd();
    } else {
      Swal.fire({
        title: "Invalid_Parameters",
        icon: "error",
        text: "A course unit can't be more than (6)",
      });
    }
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
                    setFname(e.target.value);
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
                    setCourseCode(e.target.value);
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
                    setUnit(e.target.value);
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
                <Input
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Description"
                  // onChange={() => console.log()}
                  type="textarea"
                  //   value={items[0]?.lastName}
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
                options={faculties}
                maxMenuHeight={80}
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
                options={departments}
                maxMenuHeight={80}
                onChange={(e) => {
                  setDepartment(e.value);
                }}
              />
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                {/* <label>College (optional) </label> */}
                {/* <Select /> */}
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
            onClick={() => handleChange2()}
          >
            Add Course
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
