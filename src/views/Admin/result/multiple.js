/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Button } from "reactstrap";
import { Typography, Box, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Navigate from "useNavigate";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp, School } from "@mui/icons-material";

import ResultCSV from "./resultCSV.png";
import { Card } from "@mui/material";
import {
  FormGroup,
  Input,
  Row,
  Col,
  CardBody,
  //   Card,
} from "reactstrap";
// import example from "./example.jpg";
import DataTable from "examples/TableList";
import Form from "react-bootstrap/Form";

export default function ResultMultiple() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid gray",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
  };
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [facultyx, setFaculty] = useState("");
  const [level, setLevel] = useState([]);
  const [levelx, setLevelx] = useState("");
  const [sessionx, setSessionx] = useState("");
  // const [mySession, setSession] = useState([]);
  const [course, setCourse] = useState([]);
  const [coursex, setCoursex] = useState("");

  const [opened, setOpened] = useState(false);
  // const changeHandler = (event) => {
  //   Papa.parse(event.target.files[0], {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete(results) {
  //       const obj = results.data.map((r) => ({
  //         name: r.name,
  //         description: r.description,
  //         head: r.head,
  //         descrip: r.description,
  //       }));
  //       setFile(obj);
  //     },
  //   });
  // };

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
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData);
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log(userData);
        const schoolID = userData.schoolID;
        const courseID = coursex;
        const levelID = levelx;
        console.log(levelx);
        const obj = results.data;
        const objx = obj.map(
          ({
            matricNumber,
            score,
            session,
            // eslint-disable-next-line arrow-body-style
          }) => {
            return {
              matricNumber,
              score,
              session,
            };
          }
        );
        console.log(obj);
        console.log(objx);

        objx.forEach((element) => {
          element.courseID = courseID;
          element.schoolID = schoolID;
          element.level = levelID;
          // element.sessionID = schoolID;
        });
        console.log(objx);
        const objc = objx.map(
          ({
            schoolID,
            courseID,
            matricNumber,
            score,
            level,
            session,

            // eslint-disable-next-line arrow-body-style
          }) => {
            return {
              schoolID,
              courseID,
              matricNumber,
              score,
              level,
              session,
            };
          }
        );
        console.log(objc);
        const why = JSON.stringify(objc);
        console.log(why);
        setFile(why);
      },
    });
  };
  const handleUpload = () => {
    setOpened(true);
    handleClose();
    console.log(file);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: file,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/result/addMultiple`,
      requestOptions
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
        // if (result.message === "Expired Access") {
        //   navigate("/authentication/sign-in");
        //   window.location.reload();
        // }
        // if (result.message === "Token Does Not Exist") {
        //   navigate("/authentication/sign-in");
        //   window.location.reload();
        // }
        // if (result.message === "Unauthorized Access") {
        //   navigate("/authentication/forbiddenPage");
        //   window.location.reload();
        // }
        setOpened(false);
        if (result.status === "SUCCESS") {
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
  return (
    <div className="content">
      <Card mx={2}>
        <CardBody style={{ textAlign: "center" }}>
          <Button
            tag="label"
            className="data1"
            color="success"
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
              className="headz"
            >
              Add Result Through CSV
            </Typography>
          </Button>
          <br />
          <Row>
            {" "}
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <Typography
                  variant="button"
                  fontWeight="regular"
                  fontSize="80%"
                  textAlign="center"
                  color="text"
                >
                  Level
                </Typography>
                <br />{" "}
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
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <Typography
                  variant="button"
                  fontWeight="regular"
                  fontSize="80%"
                  textAlign="center"
                  color="text"
                >
                  Course
                </Typography>
                <br />{" "}
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
          </Row>
          {/* </Container> */}
          {/* </div>
            </div>
          </Box> */}
          <Typography mt={2}>
            <u>Before Proceeding Please Read carefully:</u>
          </Typography>
          <Box p={3} mt={1}>
            <Typography
              // variant="h4"
              fontWeight="regular"
              // fontSize="75%"
              textAlign="left"
              color="text"
            >
              In your excelsheet csv file, the first line or row must be exactly
              the same as the words in the image below in row 1 A - C and having
              no spaces in them. Your details in each row should be
              corresponding to the information in the first row (header).
            </Typography>
          </Box>
          {/* <img className="img" src={example} alt="example" /> */}
          <br />

          <img className="img" src={ResultCSV} alt="ResultCSV" />
          <br />
          <Box textAlign="center" p={5}>
            <Typography
              variant="h4"
              fontWeight="regular"
              fontSize="75%"
              textAlign="center"
              color="text"
            >
              <input
                type="file"
                name="file"
                accept=".csv"
                onChange={changeHandler}
                style={{ display: "block", margin: "10px auto" }}
              />
            </Typography>
          </Box>

          {/* <Button onClick={handleOpen2} variant="success">
            Preview
          </Button> */}
          <Button onClick={handleUpload} color="success">
            Upload
          </Button>
          {/* <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box mt={3} sx={style2} className="preview">
              <DataTable
                data={{
                  columns: [
                    { Header: "Name", accessor: "name" },
                    { Header: "State", accessor: "state" },
                    { Header: "Country", accessor: "country" },
                    { Header: "Description", accessor: "descrip" },
                  ],
                  rows: file.map((r, index) => ({ ...r, id: index })),
                }}
              />
              <Button onClick={handleClose2} color="danger">
                Close
              </Button>
            </Box>
          </Modal> */}
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
