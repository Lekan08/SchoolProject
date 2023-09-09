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
// import withReactContent from "sweetalert2-react-content";
// import "../Css.css";
// import { School } from "@mui/icons-material";

export default function ClassCourses() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState([]);
  const [levels, setLevels] = useState("");
  const [description, setDescription] = useState("");
  const [opened, setOpened] = useState(false);
  const [depart, setDepart] = useState([]);
  const [descriptionx, setDescriptionx] = useState("");
  const [levelx, setLevelx] = useState("");
  const [levelss, setLevelsss] = useState([]);
  const [headOfDepart, setHeadOfDepart] = useState("");
  const [getAllStaff, setGetAllStaff] = useState([]);
  const [course, setCourse] = useState("");
  // const [courseAdvisor, setCourseAdvisor] = useState("");
  const [coursex, setCoursex] = useState([]);
  // const [courseAdviserx, setCourseAdviserx] = useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid gray",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/courseAdvisers/gets/${schID}`,
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
  }, []);

  const handleUpdate = (val) => {
    console.log(val);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;

    const raw = JSON.stringify({
      id: val,
      name: levels,
      description: descriptionx,
      schoolID: schID,
      // college:
    });
    console.log(raw);
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/levels/update`,
      requestOptions
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        if (result.message === "Expired Access") {
          Navigate("/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          Navigate("/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          Navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        console.log(result);
        if (result.status === "SUCCESS") {
          Swal.fire({
            title: result.status,
            icon: "success",
            text: result.message,
          }).then(() => Navigate("/faculties"));
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
  const handleDelete = (val) => {
    console.log(val);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(
          `${process.env.REACT_APP_SCHPROJECT_URL}/courseAdvisers/delete/${val}`,
          requestOptions
        )
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            const resultres = await res.text();
            if (
              resultres === null ||
              resultres === undefined ||
              resultres === ""
            ) {
              return {};
            }
            return JSON.parse(resultres);
          })
          .then((result) => {
            if (result.status === "SUCCESS") {
              Swal.fire({
                title: result.status,
                type: "success",
                text: result.message,
              }).then(() => {
                window.location.reload();
              });
            } else {
              Swal.fire({
                title: result.status,
                type: "error",
                text: result.message,
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: error.status,
              type: "error",
              text: error.message,
            });
          });
      }
    });
  };

  const handleAdd = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");

    const raw = JSON.stringify({
      schoolID: schID,
      depID: headOfDepart,
      levelID: levelx,
      courseID: course,
      courseAdviserID: idx,

      // schoolID: schID,
      // depID: headOfDepart,
      // levelID: levelx,
      // staffID: staff,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/classCourses/add`,
      requestOptions
    )
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
            window.location.reload();
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

  useEffect(() => {
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
        setCoursex(result);
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
  //   setOpened(true);
  //   const userInfo = JSON.parse(localStorage.getItem("user"));
  //   console.log(userInfo);
  //   const schID = userInfo.schoolID;
  //   const headers = miHeaders;
  //   fetch(
  //     `${process.env.REACT_APP_SCHPROJECT_URL}/courseAdvisers/gets/${schID}`,
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
  //       setCourseAdviserx(result);
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
  }, []);

  useEffect(() => {
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
  }, []);

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
              Class Course
            </Typography>
          </Button>
          <CardBody>
            {/* <School
              sx={{
                fontSize: 230,
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
              }}
            />
            <br /> */}
            <Row>
              <Col md="6" className="pl-md-1">
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
            </Row>
            <Row>
              <Col md="6" className="pl-md-1">
                <FormGroup>
                  <label>Course</label>
                  <Form.Select
                    style={{ marginBottom: "20px" }}
                    value={course || ""}
                    aria-label="Default select example"
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option value="">--Select Course--</option>
                    {coursex.map((apic) => (
                      <option key={apic.id} value={apic.id}>
                        {apic.name}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              </Col>{" "}
              {/* <Col md="6" className="pl-md-1">
                <FormGroup>
                  <label>Level</label>
                  <Form.Select
                    style={{ marginBottom: "20px" }}
                    value={courseAdvisor || ""}
                    aria-label="Default select example"
                    onChange={(e) => setCourseAdvisor(e.target.value)}
                  >
                    <option value="">--Select Course Advisor--</option>
                    {courseAdviserx.map((apic) => (
                      <option key={apic.id} value={apic.id}>
                        {apic.name}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              </Col>{" "} */}
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
              Add Level
            </Button>
          </CardBody>
        </Card>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Row>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Level</label>
                <Input
                  onChange={(e) => {
                    setLevels(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Level"
                  value={levels}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Description</label>
                <Input
                  onChange={(e) => {
                    setDescriptionx(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="description"
                  //   onChange={() => console.log()}
                  type="textarea"
                  // value={String(items[0]?.verificationComment)}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Box mt={8}>
            <Button
              variant="gradient"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
              }}
              color="info"
              onClick={() => handleUpdate()}
            >
              Update
            </Button>
          </Box>
          <br />
        </Box>
      </Modal>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
