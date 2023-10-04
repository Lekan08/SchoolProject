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

function SeeResult() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [opened, setOpened] = useState(false);
  const [phonex, setPhonex] = useState(0);
  const [dob, setDob] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [type, setType] = useState("");
  const [matric, setMatric] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [sex, setSex] = useState("");
  const [oName, setOName] = useState("");
  const [email, setEmail] = useState("");
  const [sessionx, setSessionx] = useState("");
  const [items, setItems] = useState({});
  const [viewres, setViewres] = useState([]);
  const [elective, setElective] = useState([]);
  //   const [faculties, setFaculties] = useState([]);
  //   const [departments, setDepartments] = useState([]);

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

  // const handleAdd = (value) => {
  //   const userInfo = JSON.parse(localStorage.getItem("user2"));
  //   console.log(userInfo);
  //   const level = userInfo.levelID;
  //   const dep = userInfo.depID;
  //   const schID = userInfo.schoolID;

  //   const mact = userInfo.matricNumber;
  //   const student = userInfo.id;

  //   const raw = JSON.stringify([
  //     {
  //       // schoolID: schID,
  //       // depID: headOfDepart,
  //       // levelID: levelx,
  //       // staffID: staff,

  //       levelID: level,
  //       depID: dep,
  //       studentID: student,
  //       schoolID: schID,
  //       courseID: value,
  //       session: sessionx,
  //     },
  //   ]);
  //   console.log(raw);
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     // body: raw,
  //     redirect: "follow",
  //   };

  //   setOpened(true);
  //   fetch(
  //     `${process.env.REACT_APP_SCHPROJECT_URL}/result/get/${mact}`,
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
  //       if (result.status === "SUCCESS") {
  //         Swal.fire({
  //           title: result.status,
  //           icon: "success",
  //           text: result.message,
  //         }).then(() => {
  //           window.location.reload();
  //         });
  //       } else {
  //         Swal.fire({
  //           title: result.status,
  //           icon: "error",
  //           text: result.message,
  //         });
  //       }
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

  useEffect(() => {
    setOpened(true);

    const userInfo = JSON.parse(localStorage.getItem("user2"));
    console.log(userInfo);
    const matricNum = userInfo.matricNumber;
    // const
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");

    // const headers = miHeaders;
    const raw = JSON.stringify({
      schoolID: "string",
      courseID: "string",
      matricNumber: matricNum,
      score: "string",
      levelID: "string",
      session: "string",
      createdBy: 0,
      createdTime: 0,
      schoolName: "string",
      courseName: "string",
      courseCode: "string",
      levelName: "string",
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: miHeaders,
      body: raw,
      // redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/result/get/{matricNum}`,
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
        setViewres(result);
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
  //   const queryString = window.location.search;
  //   // const urlParams = new URLSearchParams(queryString);
  //   const idx = userInfo.id;
  //   const headers = miHeaders;
  //   fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/result/getByIds/${idx}`, {
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
  //       // setScore(result[0].score);
  //       // setLevelx(result[0].levelName);
  //       // setSession(result[0].session);
  //       // setCoursex(result[0].courseID);
  //       // setMatNumerx(result[0].matricNumber);
  //       // setUpdate(result[0]);
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
    // handleAdd();
  });
  // useEffect(() => {
  //   setOpened(true);
  //   const userInfo = JSON.parse(localStorage.getItem("user2"));
  //   console.log(userInfo);
  //   const schID = userInfo.schoolID;
  //   const headers = miHeaders;
  //   fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/departments/gets/${schID}`, {
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
  //       setDepart(result);
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

  // useEffect(() => {
  //   setOpened(true);
  //   const userInfo = JSON.parse(localStorage.getItem("user2"));
  //   console.log(userInfo);
  //   const mact = userInfo.matricNumber;
  //   console.log(mact);
  //   const headers = myHeaders;
  //   fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/result/get/${mact}`, {
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
  //       setViewres(result);
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
  // console.log(levelx);
  // console.log(headOfDepart);
  // const userInfo = JSON.parse(localStorage.getItem("user2"));
  // const schID = userInfo.schoolID;
  // console.log(schID);
  // console.log(studentId);

  // useEffect(() => {
  //   setOpened(true);

  //   const userInfo = JSON.parse(localStorage.getItem("user2"));
  //   console.log(userInfo);
  //   const schID = userInfo.schoolID;
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const idx = urlParams.get("id");

  //   const headers = miHeaders;
  //   fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/courses/gets/${schID}`, {
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
  //       setCoursex(result);
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

  // const handleCheck = (event, inn) => {
  //   if (event.target.checked) {
  //     setOpened(true);
  //     // console.log("checked", "courseID:", event.target.value);
  //     coursex[inn].checked = true;
  //     // console.log(coursex);
  //     handleAdd(event.target.value);
  //     setCoursex(coursex);
  //     // setOpened(false);
  //   } else {
  //     console.log("unchecked", "courseID:", event.target.value);
  //     setOpened(true);
  //     // setTimeout(() => setOpened(false), 500);
  //     console.log("checked", "courseID:", event.target.value);
  //     coursex[inn].checked = false;
  //     console.log(coursex);
  //     handleRemove(event.target.value);
  //     setCoursex(coursex);
  //     // setOpened(false);
  //   }
  //   // var updatedList = [...checked];
  //   // if (sessionx !== "") {
  //   //   if (event.target.checked) {
  //   //     updatedList = [...checked, event.target.value];
  //   //   } else {
  //   //     updatedList.splice(checked.indexOf(event.target.value), 1);
  //   //   }
  //   //   console.log(event.target.value);
  //   //   console.log(event.target.checked);
  //   //   setChecked(updatedList);
  //   // } else {
  //   //   Swal.fire({
  //   //     title: "Empty_Textfield",
  //   //     icon: "error",
  //   //     text: "Please select session",
  //   //   }).then(() => {
  //   //     window.location.reload();
  //   //   });
  //   // }
  // };
  // const handleUnCheck = (event) => {
  //   var updatedList = [...checked];
  //   if (event.target.checked) {
  //     updatedList = [...checked, event.target.value];
  //   } else {
  //     updatedList.splice(checked.indexOf(event.target.value), 1);
  //   }
  //   console.log(event.target.checked);
  //   // handleUNCheck(event.target.value);
  //   // setChecked(updatedList);
  // };

  // const isChecked = (item) =>
  //   checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <div className="content">
      <Card mx={2}>
        <CardBody>
          <CardBody>
            <Row>
              <Col md="12" className="pl-md-1">
                <h5
                  className="card-category"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {schoolName}
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="pl-md-1">
                <h5
                  className="card-category"
                  style={{
                    textTransform: "capitalize",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  Faculty of {faculty},
                </h5>
                <h6
                  className="card-category"
                  style={{
                    textTransform: "capitalize",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  {department}
                </h6>
              </Col>
            </Row>
            <Row>
              <Col md="12" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    // textAlign: "center",
                    textTransform: "capitalize",
                    fontSize: 17,
                  }}
                >
                  {fname} {lname}
                </Typography>
              </Col>{" "}
              <Col md="4" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    // textAlign: "center",
                    textTransform: "capitalize",
                    fontSize: 17,
                  }}
                >
                  {email}
                </Typography>
              </Col>
              {/* <Col md="6" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "capitalize",
                    fontSize: 17,
                  }}
                >
                  {lname}
                </Typography>
              </Col> */}
            </Row>
            {/* <Row>
              <Col md="4" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 17,
                  }}
                >
                  {" "}
                  {department}
                </Typography>
              </Col> */}
            {/* </Row> */}
            <Row>
              <Col md="4" className="pl-md-1">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 17,
                  }}
                >
                  {matric}
                </Typography>
              </Col>
            </Row>
            {/* <Row>
              <Col className="pl-md-1" md="6">
                <Typography
                  className="card-category"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 17,
                  }}
                >
                  {" "}
                  Matric Number :{matric}
                </Typography>
              </Col>
              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <label> Choose a Session</label>
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
            </Row> */}
          </CardBody>
          <br />
          <DataTable
            data={{
              columns: [
                { Header: "Course", accessor: "courseCode" },
                { Header: "Unit", accessor: "levelNamess" },
                { Header: "Level", accessor: "levelName" },
                { Header: "Score", accessor: "score" },
                { Header: "GPA", accessor: "scores" },
                { Header: "CGPA", accessor: "scoresss" },
              ],
              rows: viewres,
            }}
          />
        </CardBody>
      </Card>
      {/* <br />
      <DataTable
        data={{
          columns: [
            { Header: "Course", accessor: "courseCode" },
            // { Header: "Unit", accessor: "levelName" },
            // { Header: "Department ", accessor: "departmentName" },
            { Header: "Course", accessor: "courseCode" },
            { Header: "Score", accessor: "score" },
            { Header: "Session", accessor: "session" },
          ],
          rows: viewres,
        }}
      /> */}
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
export default SeeResult;
