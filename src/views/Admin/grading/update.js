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

export default function GradingUpdate() {
  const [opened, setOpened] = useState(false);
  //   const [dara, setDara] = useState([]);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [valuex, setValue] = useState("");
  const [gradex, setGrade] = useState("");
  const [zino, setZino] = useState("");
  const [minScorex, setMinScore] = useState("");
  const [maxScorex, setMaxScore] = useState("");
  const [gradePoint, setGradePoint] = useState("");

  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/grading/getByIds/${idx}`, {
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
        setMaxScore(result[0].maxScore);
        setMinScore(result[0].minScore);
        setGrade(result[0].grade);
        setValue(result[0].value);
        setGradePoint(result[0].gradePoint);
        // setCourseCode(result[0].courseCode);
        // setUnit(result[0].unit);
        // setFaculty({
        //   value: result[0].facultyID,
        //   label: result[0].facultyName,
        // });
        // setDepartment({
        //   value: result[0].depID,
        //   label: result[0].departmentName,
        // });
        setZino(result[0]);
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
    const raw2 = JSON.stringify({
      id: zino.id,
      schoolID: userInfo.schoolID,
      value: valuex,
      grade: gradex,
      gradePoint: Number(gradePoint),
      //   colorCode: colorCodex,
      minScore: minScorex,
      maxScore: maxScorex,
      createdTime: zino.createdTime,
      deleteFlag: zino.deleteFlag,
    });
    console.log(raw2);
    const requestOptions2 = {
      method: "PUT",
      headers: myHeaders,
      body: raw2,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/grading/update`,
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
            Navigate("/grading");
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
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Grade Point</label>
                <Input
                    onChange={(e) => {
                      setGradePoint(e.target.value);
                    }}
                    placeholder="e.g A for 7, B for 6"
                    // defaultValue={`${data11.firstName}`}
                    //   placeholder="Value"
                    //   value={firstName}
                    type="text"
                  />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Grade</label>
                <Input
                  onChange={(e) => {
                    setGrade(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Grade"
                  value={gradex}
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Minimum Score</label>
                <Input
                  onChange={(e) => {
                    setMinScore(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Minimum Score"
                  value={minScorex}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Maximum Score</label>
                <Input
                  onChange={(e) => {
                    setMaxScore(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Maximum Score"
                  value={maxScorex}
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
            <Row>
              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <label>Value</label>
                  <Input
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    placeholder="e.g Excellent, Faillure"
                    // defaultValue={`${data11.firstName}`}
                    //   placeholder="Value"
                    //   value={firstName}
                    type="text"
                  />
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
