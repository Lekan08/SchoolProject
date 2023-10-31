import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp, School } from "@mui/icons-material";
import Select from "react-select";
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
  const [dob, setDob] = useState("2000-01-01");
  const [fname, setFname] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [lname, setLname] = useState("");
  // const [type, setType] = useState("");
  const [matric, setMatric] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  // const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  // const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [oName, setOName] = useState("");
  const [levelx, setLevelx] = useState("");
  const [level, setLevel] = useState([]);
  const [facultyx, setFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [headOfDepart, setHeadOfDepart] = useState("");
  const [depart, setDepart] = useState([]);
  const [otherProgram, setOtherProg] = useState("");
  const [otherProgams, setOtherPrograms] = useState([]);

  useEffect(() => {
    handleGetOtherProgram();
  }, [])

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
        const spec = result.map((r) => ({ value: r.id, label: r.name }));

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
    console.log(`${fname}/${matric}`);
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const raw2 = JSON.stringify({
      firstName: fname,
      lastName: lname,
      otherName: oName,
      schoolID: userInfo.schoolID,
      depID: headOfDepart,
      facultyID: facultyx,
      matricNumber: matric,
      levelID: levelx,
      otherProgramsID: otherProgram,
      // studentType: Number(type),
    });
    console.log(raw2);
    const requestOptions2 = {
      method: "POST",
      headers: myHeaders,
      body: raw2,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/students/add`,
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
            username: matric,
            password: `${fname}/${matric}`,
          });
          console.log(raw);
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          // setOpened(true);
          fetch(
            `${process.env.REACT_APP_SCHPROJECT_URL}/studentLogin/addLogin`,
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
                  Navigate("/students");
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

  useEffect(() => {
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
  }, []);

  // const handleOnChange = (value) => {
  //   console.log("ben___D");
  //   // setFaculty(value);
  //   setHeadOfDepart(value);
  //   const userInfo = JSON.parse(localStorage.getItem("user"));
  //   console.log(userInfo);
  //   const IDs = userInfo.courseAdviserID;
  //   console.log(IDs);
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const idx = urlParams.get("id");
  //   console.log(idx);
  //   const headers = miHeaders;
  //   // setItems

  //   fetch(
  //     `${process.env.REACT_APP_SCHPROJECT_URL}/courses/getByDepID/${value}`,
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
  //       // setCourse(result);
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
            <Col className="pl-md-1" md="4">
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
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Last Name</label>
                <Input
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                  placeholder="Last Name"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Other Name (optional)</label>
                <Input
                  onChange={(e) => {
                    setOName(e.target.value);
                  }}
                  placeholder="Last Name"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
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
              {/* <FormGroup>
                <label>Department</label>
                <Select
                  options={departments}
                  onChange={(e) => {
                    setDepartment(e.value);
                  }}
                />
              </FormGroup> */}
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Matric Number</label>
                <Input
                  onChange={(e) => setMatric(e.target.value)}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="0000-0000-0000"
                  //   onChange={() => console.log()}
                  type="text"
                />
                {/* <label style={{ color: "red", marginTop: 10 }}>
                  Password to the student's profile will be the first name /
                  matric number : {fname}/{matric}
                </label> */}
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
                  <option value="">--Select Level--</option>
                  {level.map((apic) => (
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
                <Select />
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
