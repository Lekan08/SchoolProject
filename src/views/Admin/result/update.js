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

export default function ResultUpdate() {
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
  const [sessionx, setSession] = useState("");
  const [course, setCourse] = useState([]);
  const [coursex, setCoursex] = useState("");
  const [update, setUpdate] = useState("");

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
  }, []);

  useEffect(() => {
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
  }, []);

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
        console.log("level");
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

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/result/getByIds/${idx}`, {
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
        console.log("Kpurkish");
        setScore(result[0].score);
        setLevelx(result[0].levelName);
        setSession(result[0].session);
        setCoursex(result[0].courseID);
        setMatNumerx(result[0].matricNumber);
        setUpdate(result[0]);
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
  const handleAdd = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    console.log("userInfo");
    const schID = userInfo.schoolID;

    const raw = JSON.stringify({
      id: update.id,
      schoolID: schID,
      courseID: coursex,
      matricNumber: matNumerx,
      score: scorex,
      level: levelx,
      session: sessionx,
      createdTime: update.createdTime,
      deleteFlag: update.deleteFlag,
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
      `${process.env.REACT_APP_SCHPROJECT_URL}/result/update`,
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
              marginTop: "20px",
            }}
          >
            <Typography
              style={{ color: "white", fontSize: "1.5rem" }}
              variant="h5"
              className="head"
            >
              Update Result{" "}
            </Typography>
          </Button>
          <CardBody>
            <Row>
              <Col md="6" className="pl-md-1">
                <FormGroup>
                  <label>Matric Number</label>
                  <Form.Select
                    style={{ marginBottom: "20px" }}
                    value={matNumerx || ""}
                    aria-label="Default select example"
                    onChange={(e) => setMatNumerx(e.target.value)}
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
              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <label>Score</label>
                  <Input
                    onChange={(e) => {
                      setScore(e.target.value);
                    }}
                    placeholder="Score"
                    type="text"
                    value={scorex}
                  />
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
                      <option key={apic.id} value={apic.levelName}>
                        {apic.name}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              </Col>
              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <label>Session</label>
                  <Input
                    onChange={(e) => {
                      setSession(e.target.value);
                    }}
                    placeholder="Session"
                    type="text"
                    value={sessionx}
                  />
                </FormGroup>
              </Col>
              <Col md="6" className="pl-md-1">
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
                        {apic.name}
                      </option>
                    ))}
                  </Form.Select>
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
              Update
            </Button>
          </CardBody>
        </Card>
      </Paper>
      <br />
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
