import React, { useState, useEffect } from "react";
import { Box, Modal, Paper, Typography } from "@mui/material";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { MenuBook } from "@mui/icons-material";
import { CalendarViewDay } from "@mui/icons-material";
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

export default function ResultUpdate() {
  const [opened, setOpened] = useState(false);
  //   const [dara, setDara] = useState([]);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState([]);
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
    const schID = userInfo.schoolID;

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
        setScore(result[0].score);
        setLevelx(result[0].level);
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
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const schID = userInfo.schoolID;
    const raw2 = JSON.stringify({
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
    console.log(raw2);
    const requestOptions2 = {
      method: "PUT",
      headers: myHeaders,
      body: raw2,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/result/update`,
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
      <Card mx={2}>
        <CardBody>
          <CalendarViewDay
            sx={{
              fontSize: 230,
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
            }}
          />
          <br />
          <Row>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Matric Number</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={matNumerx || ""}
                  aria-label="Default select example"
                  onChange={(e) => setMatNumerx(e.target.value)}
                >
                  <option value="">-- Matric Number--</option>
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
                  value={scorex}
                  placeholder="Score"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="pl-md-1" md="6">
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
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
