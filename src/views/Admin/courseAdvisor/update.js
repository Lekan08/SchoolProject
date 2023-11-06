import React, { useState, useEffect } from "react";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp, School } from "@mui/icons-material";
import { Card } from "@mui/material";
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  CardBody,
  //   Card,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Form from "react-bootstrap/Form";

export default function CourseAdvisorUpdate() {
  const [opened, setOpened] = useState(false);
  const [namex, setName] = useState("");
  const [descrip, setDescrip] = useState("");
  const [headOfDepart, setHeadOfDepart] = useState("");
  const MySwal = withReactContent(Swal);
  const { allGHeaders: miHeaders } = GHeaders();
  const [faculties, setFaculties] = useState([]);
  // const [facultyx, setFaculty] = useState("");
  const [items, setItems] = useState("");
  const [showOtherFac, setShowOtherFac] = useState(false);
  const [otherProgFac, setOtherProgFac] = useState("");
  // const [otherProgFaculties, setOtherProgFaculties] = useState([]);
  const [depart, setDepart] = useState([]);
  const [getAllStaff, setGetAllStaff] = useState([]);
  const [levelx, setLevelx] = useState("");
  const [levelss, setLevelsss] = useState([]);
  const [staff, setStaff] = useState("");
  const [fac, setFac] = useState([]);
  const [facultyx, setFaculty] = useState("");
  const [otherProgFaculties, setOtherProgFaculties] = useState([]);
  const [otherProgram, setOtherProg] = useState("");
  //   const { allPHeaders: myHeaders } = PHeaders();
  //   const { allGHeaders: miHeaders } = GHeaders();
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const idx = urlParams.get("id");

  console.log(faculties);

  useEffect(() => {
    // handleGetDepartment();
    handleGetLevel();
    handleGetFaculties();
    handleGetOtherProgram();
    handleGetAll();
    handleGetStaff();
  }, []);

  // useEffect(() => {
  //   setOpened(true);
  //   const userData = JSON.parse(localStorage.getItem("user"));
  //   console.log(userData);
  //   const schId = userData.schoolID;
  //   const headers = miHeaders;
  //   fetch(`${process.env.REACT_APP_SCH_URL}/faculties/gets/${schId}`, {
  //     headers,
  //   })
  //     .then(async (res) => {
  //       // const aToken = res.headers.get("token-1");
  //       // localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setOpened(false);
  //       console.log(result);
  //       if (result === []) {
  //         setFaculty(result);
  //       }
  //     })
  //     .catch((error) => {
  //       setOpened(false);
  //       console.log(error);
  //       Swal.fire({
  //         title: error.status,
  //         icon: "error",
  //         text: error.message,
  //       });
  //     });
  // }, []);
  //   useEffect(() => {
  //     const userData = JSON.parse(localStorage.getItem("user"));
  //     console.log(userData);
  //     const schId = userData.schoolID;
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const idx = urlParams.get("id");
  //     const headers = miHeaders;
  //     let isMounted = true;
  //     fetch(`${process.env.REACT_APP_SCH_URL}/departments/getByIds/${idx}`, {
  //       headers,
  //     })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((result) => {
  //         console.log(result);
  //         if (isMounted) {
  //           console.log(result);
  //           setName(result[0].name);
  //           setDescrip(result[0].description);
  //           setHeadOfDepart(result[0].head);
  //           setFaculty(result[0]);
  //           setItems(result);
  //           //   if (Object.keys(result).length !== 0) {
  //           //     console.log("omo");
  //           //     setFaculty(result);
  //           //   }
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);
  // useEffect(() => {
  const handleGetAll = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const headers = miHeaders;
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/courseAdvisers/getByIds/${idx}`,
      {
        headers,
      }
    )
      .then(async (res) => {
        // const aToken = res.headers.get("token-1");
        // localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        console.log(result);
        setHeadOfDepart(result[0].depID);
        setLevelx(result[0].levelID);
        setStaff(result[0].staffID);
        setFaculty(result[0].facultyID);
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
  // useEffect(() => {
  const handleGetDepartment = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/departments/gets/${schID}`, {
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
        setDepart(result);
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
  const handleUpdate = () => {
    // sessionStorage.getItem("user");
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    // setOpened(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      id: items[0].id,
      name: namex,
      // description: descrip,
      // head: headOfDepart,
      depID: headOfDepart,
      levelID: levelx,
      staffID: staff,
      schoolID: userData.schoolID,
      facultyID: facultyx,
      // collegeID: userData.schoolID,
      // facultyID: facultyx,
    });
    // console.log(raw);
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    // setOpened(true);
    // if (passwordx === confirmPassword) {
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/courseAdvisers/update`,
      requestOptions
    )
      .then(async (res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === "SUCCESS") {
          Swal.fire({
            title: result.status,
            icon: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
        } else {
          MySwal.fire({
            title: result.status,
            type: "error",
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
    // }
  };

  // useEffect(() => {
  const handleGetLevel = () => {
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
        setFac(result);
        // setFaculties(result);
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
  // }, []);

  // useEffect(() => {
  const handleGetStaff = () => {
    setOpened(true);
    const headers = miHeaders;

    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/staffs/gets/${schID}`, {
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
        setGetAllStaff(result);
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
        // console.log(compulsory);
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

  // useEffect(() => {
  //   setOpened(true);
  //   const userInfo = JSON.parse(localStorage.getItem("user"));
  //   console.log(userInfo);
  //   const schID = userInfo.schoolID;
  //   const headers = miHeaders;
  //   fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/faculties/gets/${schID}`, {
  //     headers,
  //   })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setOpened(false);
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       setOpened(false);
  //       Swal.fire({
  //         title: error.status,
  //         icon: "error",
  //         text: error.message,
  //       });
  //     });
  // }, []);

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
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Faculty</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={facultyx || ""}
                  aria-label="Default select example"
                  onChange={(e) => handleOnChangeDepart(e.target.value)}
                >
                  <option value="">--Faculty--</option>
                  {fac.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>{" "}
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
            <Col md="4" className="pl-md-1">
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
            </Col>{" "}
          </Row>
          <Row style={{ marginTop: 20 }}>
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
                  {levelss.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>{" "}
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Staff</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={staff || ""}
                  aria-label="Default select example"
                  onChange={(e) => setStaff(e.target.value)}
                >
                  <option value="">--Staff--</option>
                  {getAllStaff.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.firstName} {apic.lastName}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>{" "}
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
            onClick={() => handleUpdate()}
          >
            Update
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
