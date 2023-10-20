import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "@mui/material";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import { CardBody, Input, Button, Row, Col, FormGroup } from "reactstrap";
import { Settings } from "@mui/icons-material";
import { Dropdown, Form } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import DataTable from "examples/TableList";
import Navigate from "useNavigate";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { Typography, Paper } from "@mui/material";
import { AccountCircleSharp, School } from "@mui/icons-material";

function Transcript() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [opened, setOpened] = useState(false);
  const [phonex, setPhonex] = useState(0);
  const [dob, setDob] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [oname, setOname] = useState("");
  const [type, setType] = useState("");
  const [matric, setMatric] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [gpa, setGpa] = useState("");
  const [department, setDepartment] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [sex, setSex] = useState("");
  const [oName, setOName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolInfoCity, setSchoolInfoCity] = useState("");
  const [schoolInfoStreet, setSchoolInfoStreet] = useState("");
  const [schoolInfoState, setSchoolInfoState] = useState("");
  const [schoolInfoCountry, setSchoolInfoCountry] = useState("");
  const [schoolInfoEmail, setSchoolInfoEmail] = useState("");
  const [schoolInfoWebsite, setSchoolInfoWebsite] = useState("");
  const [sessionx, setSessionx] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [items, setItems] = useState({});
  const [viewres, setViewres] = useState([]);
  const [elective, setElective] = useState([]);

  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user2"));
    const idx = userInfo.id;
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
        setOpened(false);
        console.log(result);
        // setStudentId(result[0]);
        setFname(result[0].firstName);
        setLname(result[0].lastName);
        setOname(result[0].otherName);
        setMatric(result[0].matricNumber);
        setPhonex(`+${result[0].phoneNumber}`);
        setFaculty(result[0].facultyName);
        setDepartment(result[0].departmentName);
        setSchoolName(result[0].schoolName);
        setItems(result[0]);
        setSex(result[0].sex);
        setEmail(result[0].email);
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
    const userInfo = JSON.parse(localStorage.getItem("user2"));
    const idx = userInfo.id;
    const schID = userInfo.schoolID;
    // console.log(schID);
    // console.log(userInfo);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/schools/getByIds/${schID}`, {
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
        setSchoolInfoStreet(result.street);
        setSchoolInfoCity(result[0].city);
        setSchoolInfoState(result[0].state);
        setSchoolInfoCountry(result[0].country);
        setSchoolInfoEmail(result[0].email);
        setSchoolInfoWebsite(result[0].website);
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

  //   const userInfo = JSON.parse(localStorage.getItem("user2"));
  //   console.log(userInfo);
  //   const matricNum = userInfo.matricNumber;
  //   const SchID = userInfo.schoolID;
  //   const idx = userInfo.id;
  //   // const
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   // const idx = urlParams.get("id");
  //   console.log(idx);
  //   // const headers = miHeaders;
  //   const raw = JSON.stringify({
  //     id: idx,
  //     schoolID: SchID,
  //     courseID: "string",
  //     matricNumber: matricNum,
  //     score: 0,
  //     value: 0,
  //     grade: "string",
  //     levelID: "string",
  //     session: "string",
  //     createdBy: 0,
  //     createdTime: 0,
  //     schoolName: "string",
  //     courseName: "string",
  //     courseCode: "string",
  //     courseUnit: 0,
  //     levelName: "string",
  //   });
  //   console.log(raw);
  //   const requestOptions = {
  //     method: "POST",
  //     headers: miHeaders,
  //     body: raw,
  //     // redirect: "follow",
  //   };
  //   fetch(
  //     `${process.env.REACT_APP_SCHPROJECT_URL}/result/getTranscriptForSession/{schoolID}/{matricNumber}`,
  //     requestOptions
  //   )
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setOpened(false);
  //       console.log(result);
  //       setViewres(result[0].resultsList);
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

  const handleOnChange = (value) => {
    setSessionx(value);
    setShowNote(true);
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user2"));
    console.log(userInfo);
    const matricNum = userInfo.matricNumber;
    const SchID = userInfo.schoolID;
    const idx = userInfo.id;
    const ggg = userInfo.resultsList;
    console.log(ggg);
    console.log(idx);
    const raw = JSON.stringify({
      id: idx,
      schoolID: SchID,
      courseID: "string",
      matricNumber: matricNum,
      score: 0,
      value: 0,
      grade: "string",
      levelID: "string",
      session: value,
      createdBy: 0,
      createdTime: 0,
      schoolName: "string",
      courseName: "string",
      courseCode: "string",
      courseUnit: 0,
      levelName: "string",
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      // redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/result/getTranscriptForSession/{schoolID}/{matricNumber}/{session}`,
      requestOptions
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.length) {
          setOpened(false);
          console.log(result);
          setViewres(result[0].resultsList);
          setCgpa(result[0].overallGradePoints);
          setGpa(result[0].gradePoints);
        } else {
          setOpened(false);
          setViewres([]);
          Swal.fire({
            title: "Unavailable Transcript",
            icon: "error",
            // text: "error.message",
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
  return (
    <div className="content">
      <Card mx={2}>
        <CardBody>
          <CardBody>
            <Typography
              className="card-category"
              style={{
                textTransform: "uppercase",
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
                color: "#7D7C7C",
              }}
            >
              University of {schoolName}
              {/* {schoolInfoState} {schoolInfoCountry} */}
            </Typography>
            <Typography
              className="card-category"
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                color: "#F99417",
              }}
            >
              {department}
            </Typography>{" "}
            <Typography
              className="card-category"
              style={{
                textTransform: "uppercase",
                fontSize: 15,
                fontWeight: "bold",
                color: "#7D7C7C",
                textAlign: "center",
              }}
            >
              {" "}
              {faculty}
            </Typography>
            <Row>
              <Col md="12" className="pl-md-1">
                <School
                  sx={{
                    fontSize: 180,
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "flex",
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md="9" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#7D7C7C",
                  }}
                >
                  Name: {fname} {lname} {oname}
                </Typography>{" "}
              </Col>
              <Col md="3" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "capitalize",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#7D7C7C",
                  }}
                >
                  Matric Number: {matric}
                </Typography>
              </Col>
            </Row>{" "}
            <Row>
              <Col md="9" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#7D7C7C",
                  }}
                >
                  Email Address: {email}
                </Typography>{" "}
              </Col>
              <Col md="3" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "capitalize",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#7D7C7C",
                  }}
                >
                  Sex: {sex}
                </Typography>
              </Col>
            </Row>{" "}
            {/* <Row>
              <Col md="9" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#7D7C7C",
                  }}
                >
                  Grade Point : {gpa}
                </Typography>{" "}
              </Col>
              <Col md="3" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#7D7C7C",
                  }}
                >
                  Overall Grade Point: {cgpa}
                </Typography>{" "}
              </Col>
            </Row>{" "} */}
            <Row>
              <Col md="9" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#7D7C7C",
                  }}
                >
                  School address : {schoolInfoStreet}, {schoolInfoCity},{" "}
                  {schoolInfoState}, {schoolInfoCountry}.
                </Typography>{" "}
              </Col>
              <Col md="3" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#7D7C7C",
                  }}
                >
                  School email : {schoolInfoEmail}
                </Typography>{" "}
              </Col>
            </Row>{" "}
            <Row>
              <Col md="12" className="pl-md-1">
                <FormGroup>
                  <Form.Select
                    style={{ marginBottom: "2px" }}
                    value={sessionx || ""}
                    aria-label="Default select example"
                    onChange={(e) => handleOnChange(e.target.value)}
                  >
                    <option value="">Sessions</option>
                    {mySession.map((apic) => (
                      <option key={apic.key} value={apic.value}>
                        {apic.value}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
                {showNote ? (
                  <></>
                ) : (
                  <Typography
                    className="card-category"
                    style={{
                      textTransform: "capitalize",
                      fontSize: 11,
                      // fontWeight: "bold",
                      textAlign: "center",
                      // color: "#BB2525",
                      color: "red",
                    }}
                  >
                    Please select a session{" "}
                  </Typography>
                )}
              </Col>
            </Row>{" "}
            <Row>
              <Col md="9" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#7D7C7C",
                  }}
                >
                  Grade Point : {gpa}
                </Typography>{" "}
              </Col>
              <Col md="3" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#7D7C7C",
                  }}
                >
                  Overall Grade Point: {cgpa}
                </Typography>{" "}
              </Col>
            </Row>{" "}
          </CardBody>
          <DataTable
            data={{
              columns: [
                { Header: "Course Name", accessor: "courseName" },
                { Header: "Course Code", accessor: "courseCode" },
                { Header: "Course Description", accessor: "courseDescription" },
                { Header: "Course Unit", accessor: "courseUnits" },
                { Header: "Level", accessor: "levelName" },
                { Header: "Score", accessor: "score" },
                { Header: "Grade", accessor: "grade" },
              ],

              rows: viewres,
            }}
          />
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
export default Transcript;
