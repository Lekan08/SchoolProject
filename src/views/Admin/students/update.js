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

export default function StudentUpdate() {
  const [opened, setOpened] = useState(false);
  const [phonex, setPhonex] = useState(0);
  const [dob, setDob] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [type, setType] = useState("");
  const [matric, setMatric] = useState("");
  // const [faculties, setFaculties] = useState([]);
  // const [departments, setDepartments] = useState([]);
  // const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [oName, setOName] = useState("");
  const [levelx, setLevelx] = useState("");
  const [levelss, setLevelsss] = useState([]);
  const [facultyx, setFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [headOfDepart, setHeadOfDepart] = useState("");
  const [depart, setDepart] = useState([]);
  const [otherProgram, setOtherProg] = useState("");
  const [otherProgams, setOtherPrograms] = useState([]);

  const [items, setItems] = useState({});

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    handleGetLevel();
    handleGetFaculties();
    handleGetOtherProgram();
  }, []);

  // useEffect(() => {
  const handleGetFaculties = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
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
        // console.log(result);
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
  // const handleDepartment = (w) => {
  //   setOpened(true);
  //   const headers = miHeaders;
  //   fetch(
  //     `${process.env.REACT_APP_SCHPROJECT_URL}/departments/getByFacultyID/${w}`,
  //     {
  //       headers,
  //     }
  //   )
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setOpened(false);
  //       console.log(result);
  //       setDepartments(result);
  //     })
  //     .catch((error) => {
  //       setOpened(false);
  //       Swal.fire({
  //         title: error.status,
  //         icon: "error",
  //         text: error.message,
  //       });
  //     });
  // };
  useEffect(() => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
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
        setOName(result[0].otherName);
        setSex(result[0].sex);
        setType(String(result[0].studentType));
        setEmail(result[0].email);
        setMatric(result[0].matricNumber);
        setDob(`${new Date(dateOfBirth).getFullYear()}-${month()}-${day()}`);
        setPhonex(`+${result[0].phoneNumber}`);
        handleOnChangeDepart(result[0].facultyID);
        setFaculty(result[0].facultyID);
        setHeadOfDepart(result[0].depID);
        setOtherProg(result[0].otherProgramsID);
        setLevelx(result[0].levelID);
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
  // useEffect(() => {
  const handleGetLevel = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    // if ()
    // const data = JSON.parse({data: localStorage.getItem("resultData")});
    // console.log(data);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/levels/gets/${schID}`, {
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
        setLevelsss(result);
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
  const handleAdd = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const raw2 = JSON.stringify({
      id: items.id,
      schoolName: items.schoolName,
      firstName: fname,
      lastName: lname,
      otherName: oName,
      email: email,
      phoneNumber: phonex,
      sex: sex,
      dateOfBirth: new Date(dob).getTime(),
      schoolID: userInfo.schoolID,
      depID: department,
      facultyID: facultyx,
      departmentName: items.departmentName,
      facultyName: items.facultyName,
      matricNumber: matric,
      otherProgramsID: otherProgram,
      collegeID: "string",
      levelID: levelx,
      // studentType: Number(type),

      // id: "string",
      // firstName: "string",
      // lastName: "string",
      // email: "string",
      // phoneNumber: "string",
      // sex: "string",
      // dateOfBirth: "string",
      // schoolID: "string",
      // facultyID: "string",
      // depID: "string",
      // matricNumber: "string",
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
      `${process.env.REACT_APP_SCHPROJECT_URL}/students/update`,
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
        console.log(result);
        setOpened(false);
        if (result.status === "SUCCESS") {
          Swal.fire({
            title: result.status,
            icon: "success",
            text: "UPDATED STUDENT PROFILE SUCCESSFULLY",
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
        setOtherPrograms(result);
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

  const handleOnGetOtherProgram = (value) => {
    console.log(value);
    setOtherProg(value);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const IDs = userInfo.courseAdviserID;
    console.log(IDs);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    console.log(idx);
    const headers = miHeaders;
    // setItems

    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/otherPrograms/getByDepID/${value}`,
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
        setDepart(result);
        // setDepart(result);
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
  const handleOnChangeDepart = (value) => {
    console.log(value);
    setFaculty(value);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const IDs = userInfo.courseAdviserID;
    console.log(IDs);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    console.log(idx);
    const headers = miHeaders;
    // setItems

    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/departments/getByFacultyID/${value}`,
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
        setDepart(result);
        // setDepart(result);
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

  const handleOtherProgFalc = (value, item) => {
    console.log(value);
    console.log(item);
    if (item === "oP") {
      console.log("other_program");
      // setOtherProg(value);
      handleOnGetOtherProgram(value);
    } else if (item === "faculty") {
      console.log("facultyDepartment");
      handleOnChangeDepart(value);
    }
  };

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
                  // disabled
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
                  // disabled
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
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1">
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
            <Col md="4" className="pl-md-1">
              <label>Phone Number</label>
              <PhoneInput
                // value={phonex}
                onChange={(val) => setPhonex(val)}
                id="phone"
                placeholder="+234 812 345 6789"
                value={phonex}
                inputStyle={{ marginTop: "3.8%" }}
                // onChange={setPhone}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            {/* <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Faculty</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={facultyx || ""}
                  size="sm"
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleDepartment(e.target.value);
                    setFaculty(e.target.value);
                    console.log(e.target.key);
                  }}
                >
                  <option value="">--Select Faculty--</option>
                  {faculties.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col> */}
            {/* <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Department</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={department || ""}
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
              </FormGroup>
            </Col> */}
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Other Programs</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={otherProgram || ""}
                  aria-label="Default select example"
                  onChange={(e) => handleOtherProgFalc(e.target.value, "oP")}
                >
                  <option value="">--Select Other Program--</option>
                  {otherProgams.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Faculty</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={facultyx || ""}
                  aria-label="Default select example"
                  onChange={(e) =>
                    handleOtherProgFalc(e.target.value, "faculty")
                  }
                >
                  <option value="">--Select Faculty--</option>
                  {faculties.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
              {/* <FormGroup>
                <label>Faculty</label>
                <Select
                  options={faculties}
                  onChange={(e) => {
                    handleDepartment(e.value);
                    setFaculty(e.value);
                  }}
                />
              </FormGroup> */}
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Department</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={headOfDepart || ""}
                  aria-label="Default select example"
                  onChange={(e) => setHeadOfDepart(e.target.value)}
                >
                  <option value="">--Department--</option>
                  {depart.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>
            {/* <Col className="pl-md-1" md="4">
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
                </Form.Select>
              </FormGroup>
            </Col> */}
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
                  // disabled={disab}
                  onChange={(e) => setDob(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Matric Number</label>
                <Input
                  onChange={(e) => setMatric(e.target.value)}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="0000-0000-0000"
                  //   onChange={() => console.log()}
                  type="text"
                  value={matric}
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Level</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={levelx || ""}
                  aria-label="Default select example"
                  onChange={(e) => setLevelx(e.target.value)}
                >
                  <option value="">--Level--</option>
                  {levelss.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>{" "}
          </Row>
          {/* <Row style={{ marginTop: 20 }}>
            <Col md="5" className="pl-md-1">
              <FormGroup>
                <label>Student Type</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={type || ""}
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
            Update Student Profile
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
