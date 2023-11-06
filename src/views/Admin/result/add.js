import React, { useState, useEffect } from "react";
import { Box, Modal, Paper, Typography } from "@mui/material";
import { Button, Card, FormGroup, Col, Input, CardBody, Row } from "reactstrap";
import DataTable from "examples/TableList";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Swal from "sweetalert2";
import AllCountriesAndStates from "countries-states-master/countries";
import { Dropdown, Form } from "react-bootstrap";
import { Settings } from "@mui/icons-material";
import Navigate from "useNavigate";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../Css.css";
import { School } from "@mui/icons-material";

export default function ResultAdd() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState([]);
  const [opened, setOpened] = useState(false);
  const [colorCodex, setColorCode] = useState("");
  const [matNumer, setMatNumer] = useState([]);
  const [matNumerx, setMatNumerx] = useState("");
  const [scorex, setScore] = useState("");
  const [level, setLevel] = useState([]);
  const [levelx, setLevelx] = useState("");
  const [sessionx, setSessionx] = useState("");
  // const [mySession, setSession] = useState([]);
  const [course, setCourse] = useState([]);
  const [coursex, setCoursex] = useState("");
  const [facultyx, setFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [headOfDepart, setHeadOfDepart] = useState("");
  const [depart, setDepart] = useState([]);
  const [student, setStudent] = useState([]);
  const [otherProgram, setOtherProg] = useState("");
  const [otherProgams, setOtherPrograms] = useState([]);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
  };

  const mySession = [
    { value: "2019/2020", key: 1 },
    { value: "2020/2021", key: 2 },
    { value: "2021/2022", key: 3 },
    { value: "2022/2023", key: 4 },
    { value: "2023/2024", key: 5 },
    { value: "2024/2025", key: 6 },
    { value: "2025/2026", key: 7 },
    { value: "2026/2027", key: 8 },
    { value: "2027/2028", key: 9 },
    { value: "2028/2029", key: 10 },
    { value: "2029/2030", key: 11 },
    { value: "2030/2031", key: 12 },
    { value: "2031/2032", key: 13 },
    { value: "2032/2033", key: 14 },
    { value: "2033/2034", key: 15 },
    { value: "2034/2035", key: 16 },
    { value: "2035/2036", key: 17 },
    { value: "2036/2037", key: 18 },
    { value: "2037/2038", key: 19 },
    { value: "2038/2039", key: 20 },
    { value: "2039/2040", key: 21 },
  ];
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "78vw",
    bgcolor: "background.paper",
    border: "2px solid gray",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  useEffect(() => {
    // handleGetCourse();
    handleGetFaculties();
    handleGetStudents();
    handleGetLevels();
    handleGetResult();
    handleGetOtherProgram();
  }, []);

  // useEffect(() => {
  const handleGetCourse = () => {
    setOpened(true);

    const userInfo = JSON.parse(localStorage.getItem("user"));
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/courses/gets/${schID}`, {
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
        setCourse(result);
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
  const handleGetFaculties = () => {
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
  };
  // }, []);

  // useEffect(() => {
  const handleGetStudents = () => {
    setOpened(true);

    const userInfo = JSON.parse(localStorage.getItem("user"));
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/students/gets/${schID}`, {
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
        setMatNumer(result);
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
  const handleGetLevels = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
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
        setLevel(result);
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
  const handleGetResult = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/result/gets/${schID}`, {
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
        setItems(result);
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
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    console.log("userInfo");
    const schID = userInfo.schoolID;

    const raw = JSON.stringify({
      schoolID: schID,
      courseID: coursex,
      matricNumber: matNumerx,
      score: scorex,
      level: levelx,
      session: sessionx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/result/add`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        console.log(result);
        if (result.status === "SUCCESS") {
          Swal.fire({
            title: result.status,
            icon: "success",
            text: result.message,
          }).then(() => {
            // window.location.reload();
            Navigate("/result");
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

  const handleOnChange = (value) => {
    console.log("ben___D");
    // setFaculty(value);
    setHeadOfDepart(value);
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
      `${process.env.REACT_APP_SCHPROJECT_URL}/courses/getByDepID/${value}`,
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
        setCourse(result);
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

  const handleOnGetStudent = (value) => {
    console.log("ben___D");
    // setFaculty(value);
    setMatNumerx(value);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const IDs = userInfo.courseAdviserID;
    console.log(IDs);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    console.log(idx);
    // const userInfo = JSON.parse(localStorage.getItem("user"));
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    // setItems

    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/students/gets/${schID}`, {
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
        if (result.length) {
          const getStuInfo = result.filter((val) => val.matricNumber === value);
          console.log(getStuInfo);
          setStudent(getStuInfo);
        }
        // setCourse(result);
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
      <Paper elevation={8}>
        <Card mx={2}>
          <Button
            tag="label"
            className="data1"
            color="secondary"
            style={{
              width: "40vw",
              fontSize: "20px",
              marginRight: "auto",
              marginLeft: "auto",
              // height: "50px",
              marginTop: "20px",
            }}
          >
            <Typography
              style={{ color: "white", fontSize: "1.5rem" }}
              variant="h5"
              className="head"
            >
              Result
            </Typography>
          </Button>
          <CardBody>
            <Row>
              <Col md="4" className="pl-md-1">
                <FormGroup>
                  <label>Session</label>
                  <Form.Select
                    style={{ marginBottom: "20px" }}
                    value={sessionx || ""}
                    aria-label="Default select example"
                    onChange={(e) => setSessionx(e.target.value)}
                  >
                    <option value="">--Session--</option>
                    {mySession.map((apic) => (
                      <option key={apic.key} value={apic.value}>
                        {apic.value}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              </Col>
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
                  <label>Faculty</label>
                  <Form.Select
                    style={{ marginBottom: "20px" }}
                    value={facultyx || ""}
                    aria-label="Default select example"
                    onChange={(e) => handleOtherProgFalc(e.target.value, "faculty")}
                  >
                    <option value="">--Select Faculty--</option>
                    {faculties.map((apic) => (
                      <option key={apic.id} value={apic.id}>
                        {apic.name}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4" className="pl-md-1">
                <FormGroup>
                  <label>Department</label>
                  <Form.Select
                    style={{ marginBottom: "20px" }}
                    value={headOfDepart || ""}
                    aria-label="Default select example"
                    onChange={(e) => handleOnChange(e.target.value)}
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
              <Col md="4" className="pl-md-1">
                <FormGroup>
                  <label>Course</label>
                  <Form.Select
                    style={{ marginBottom: "20px" }}
                    value={coursex || ""}
                    aria-label="Default select example"
                    onChange={(e) => setCoursex(e.target.value)}
                  >
                    <option value="">--Course--</option>
                    {course.map((apic) => (
                      <option key={apic.id} value={apic.id}>
                        {apic.courseCode}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              </Col>
              <Col md="4" className="pl-md-1">
                <FormGroup>
                  <label>Matric Number</label>
                  <Form.Select
                    style={{ marginBottom: "20px" }}
                    value={matNumerx || ""}
                    aria-label="Default select example"
                    onChange={(e) => handleOnGetStudent(e.target.value)}
                  >
                    <option value="">--Matric Number--</option>
                    {matNumer.map((apic) => (
                      <option key={apic.id} value={apic.matricNumber}>
                        {apic.matricNumber}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              {" "}
              <Col md="6" className="pl-md-1">
                <FormGroup>
                  <label>Level</label>
                  <Form.Select
                    style={{ marginBottom: "20px" }}
                    value={levelx || ""}
                    aria-label="Default select example"
                    onChange={(e) => setLevelx(e.target.value)}
                  >
                    <option value="">--Level--</option>
                    {level.map((apic) => (
                      <option key={apic.id} value={apic.id}>
                        {apic.name}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              </Col>
              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <label>Score</label>
                  <Input
                    onChange={(e) => {
                      setScore(e.target.value);
                    }}
                    placeholder="Score"
                    type="text"
                  />
                </FormGroup>
              </Col>
              {/* <Col className="pl-md-1" md="6">
                <FormGroup>
                  <label>Session</label>
                  <Input
                    onChange={(e) => {
                      setSession(e.target.value);
                    }}
                    placeholder="Session"
                    type="text"
                  />
                </FormGroup>
              </Col> */}
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
              onClick={() => handleOpen2()}
            >
              Add Result
            </Button>
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box mt={3} sx={style2} className="preview">
                <h3>Verifiy Student Information</h3>
                {student.length ? (
                  <>
                    <Row>
                      <Col sm="4">
                        <h4>
                          Student Name: {student[0].firstName}{" "}
                          {student.lastName}
                        </h4>
                      </Col>
                      <Col sm="4">
                        <h4>Matric Number: {student[0].matricNumber}</h4>
                      </Col>
                      <Col sm="4">
                        <h4>Department: {student[0].matricNumber}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="5">
                        <h4>Faculty: {student[0].facultyName}</h4>
                      </Col>
                      <Col sm="5">
                        <h4>Level: {student[0].levelName}</h4>
                      </Col>
                      {/* <Col sm="4">{"Course"}</Col> */}
                    </Row>
                  </>
                ) : (
                  <></>
                )}
                <Button onClick={handleAdd} variant="success">
                  Confirm
                </Button>
                <Button onClick={handleClose2} color="danger">
                  Close
                </Button>
              </Box>
            </Modal>
          </CardBody>
        </Card>
      </Paper>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
