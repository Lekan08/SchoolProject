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
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp, School } from "@mui/icons-material";
import { Card } from "@mui/material";
import {
  FormGroup,
  Input,
  Row,
  Col,
  CardBody,
  //   Card,
} from "reactstrap";
import Select from "react-select";
import example from "./example.jpeg"
import DataTable from "examples/TableList";
import Form from "react-bootstrap/Form";

export default function CourseMultiple() {
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
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

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

  const handleDepartment = (w) => {
    setFaculty(w);
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
        const facultyID = facultyx;
        const depID = department;
        console.log(depID);
        const obj = results.data;
        const objx = obj.map(
          ({
            name,
            description,
            courseCode,
            unit,
            // eslint-disable-next-line arrow-body-style
          }) => {
            return {
              name,
              description,
              courseCode,
              unit: Number(unit),
            };
          }
        );
        console.log(obj);
        console.log(objx);

        objx.forEach((element) => {
          element.facultyID = facultyID;
          element.schoolID = schoolID;
          element.depID = depID;
        });
        const objc = objx.map(
          ({
            facultyID,
            schoolID,
            depID,
            name,
            description,
            courseCode,
            unit,
            // eslint-disable-next-line arrow-body-style
          }) => {
            return {
              name,
              description,
              courseCode,
              unit,
              facultyID,
              schoolID,
              depID,
            };
          }
        );
        const why = JSON.stringify(objc);
        console.log(why);
        setFile(why);
      },
    });
  };
  const handleUpload = () => {
    setOpened(true);
    handleClose();
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: file,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/courses/addMultiple`,
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
              Add Courses Through CSV
            </Typography>
          </Button>
          <br />
          {/* <Box >
            <div className="row">
              <div className="col-sm-6"> */}
          {/* <Container> */}
          <Row style={{ marginTop: 20 }}>
            {/* <Col className="pl-md-1" md="6"> */}
              {/* <Typography
                variant="button"
                fontWeight="regular"
                fontSize="80%"
                textAlign="center"
                color="text"
              >
                Select Faculty
              </Typography> */}
              {/* <br />
              <Form.Select
                style={{ marginBottom: "20px" }}
                value={facultyx || ""}
                aria-label="Default select example"
                onChange={(e) => handleDepartment(e.target.value)}
              >
                <option value="">--Select Faculty--</option>
                {faculties.map((apic) => (
                  <option key={apic.id} value={apic.id}>
                    {apic.name}
                  </option>
                ))}
              </Form.Select>
            </Col> */}
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Faculty</label>
                <Select
                  options={faculties}
                  onChange={(e) => {
                    handleDepartment(e.value);
                    setFaculty(e.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Department</label>
                <Select
                  options={departments}
                  onChange={(e) => {
                    setDepartment(e.value);
                  }}
                />
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
          <img className="img" src={example} alt="example" />
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
