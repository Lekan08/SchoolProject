import React, { useState, useEffect } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "@mui/material";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import { CardBody, Input, Button, Row, Col, FormGroup } from "reactstrap";
import { Form } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { Typography, Paper } from "@mui/material";

function CourseRegistartion() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [opened, setOpened] = useState(false);
  const [phonex, setPhonex] = useState(0);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [matric, setMatric] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [levelx, setLevelx] = useState("");
  const [levelss, setLevelsss] = useState([]);
  const [depart, setDepart] = useState([]);
  const [headOfDepart, setHeadOfDepart] = useState("");
  const [studentId, setStudentId] = useState("");
  const [compulsory, setCompulsory] = useState([]);
  const [coursex, setCoursex] = useState([]);
  const [checked, setChecked] = useState([]);
  const [sessionx, setSession] = useState("");
  const [elective, setElective] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);
  //   const [faculties, setFaculties] = useState([]);
  //   const [departments, setDepartments] = useState([]);

  useEffect(() => {
    handleGetStudents();
    handleGetDepartments();
    handleGetLevels();
    handleGets();
  }, []);

  // useEffect(() => {
  const handleGetStudents = () => {
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
        setStudentId(result[0]);
        setFname(result[0].firstName);
        setLname(result[0].lastName);
        setMatric(result[0].matricNumber);
        setPhonex(`+${result[0].phoneNumber}`);
        setFaculty(result[0].facultyName);
        setDepartment(result[0].departmentName);
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
  const handleGetDepartments = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user2"));
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

  // useEffect(() => {
  const handleGetLevels = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user2"));
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

  console.log(levelx);
  console.log(headOfDepart);
  const userInfo = JSON.parse(localStorage.getItem("user2"));
  const schID = userInfo.schoolID;
  const schoolName = userInfo.schoolName;
  const levelName = userInfo.levelName;
  console.log(schID);
  console.log(userInfo);

  const handleAdd = (value) => {
    const userInfo = JSON.parse(localStorage.getItem("user2"));
    console.log(userInfo);
    const level = userInfo.levelID;
    const dep = userInfo.depID;
    const schID = userInfo.schoolID;
    const student = userInfo.id;

    const raw = JSON.stringify([
      {
        // schoolID: schID,
        // depID: headOfDepart,
        // levelID: levelx,
        // staffID: staff,

        levelID: level,
        depID: dep,
        studentID: student,
        schoolID: schID,
        courseID: value,
        session: sessionx,
      },
    ]);
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/courseRegistration/register`,
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
          handleGets();
          // Swal.fire({
          //   title: result.status,
          //   icon: "success",
          //   text: result.message,
          // }).then(() => {
          //   window.location.reload();
          // });
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

  const handleRemove = (value, inn) => {
    console.log(value);
    const requestOptions = {
      method: "DELETE",
      headers: miHeaders,
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/courseRegistration/remove/${value.target.value}`,
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
          handleGets();
          // coursex[inn].checked = false;
          // setCoursex(coursex);
          // Swal.fire({
          //   title: result.status,
          //   icon: "success",
          //   text: result.message,
          // }).then(() => {
          window.location.reload();
          // });
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

  const handleUNCheck = (value) => {
    const requestOptions = {
      method: "DELETE",
      headers: miHeaders,
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/classCourses/delete/${value}`,
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

  // useEffect(() => {
  const handleGets = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user2"));
    console.log(userInfo);
    const levelID = userInfo.levelID;
    const depID = userInfo.depID;
    const headers = miHeaders;
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/classCourses/getForClass/${levelID}/${depID}`,
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
        console.log("zerrydl");
        console.log(result);
        if (result.length) {
          // setShow(true);
          setCompulsory(result);
          const userInfo = JSON.parse(localStorage.getItem("user2"));
          console.log(userInfo);
          const schID = userInfo.schoolID;
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const idx = urlParams.get("id");

          const headers = miHeaders;
          fetch(
            `${process.env.REACT_APP_SCHPROJECT_URL}/courses/gets/${schID}`,
            {
              headers,
            }
          )
            .then(async (resx) => {
              const aToken = resx.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return resx.json();
            })
            .then((resultr) => {
              setOpened(false);
              console.log(resultr);
              const newCompul = [];
              resultr.map((val) => {
                // console.log(val);
                let comp = result.filter((valx) => valx.courseID === val.id);
                // console.log(val);
                if (comp.length) {
                  // console.log(comp);
                  return null;
                } else {
                  // console.log(comp);
                  newCompul.push(val);
                }
              });
              console.log(newCompul);
              // setCoursex(newCompul);
              if (resultr.length) {
                const userInfo = JSON.parse(localStorage.getItem("user2"));
                console.log(userInfo);
                const student = userInfo.id;

                const headers = miHeaders;
                fetch(
                  `${process.env.REACT_APP_SCHPROJECT_URL}/courseRegistration/getForStudent/${student}`,
                  {
                    headers,
                  }
                )
                  .then(async (resz) => {
                    const aToken = resz.headers.get("token-1");
                    localStorage.setItem("rexxdex", aToken);
                    return resz.json();
                  })
                  .then((resultrz) => {
                    setOpened(false);
                    console.log(resultrz);
                    const newCompulx = [];
                    resultrz.map((val) => {
                      console.log(val);
                      let comp = resultr.filter(
                        (valx) => valx.id === val.courseID
                      );
                      console.log(comp);
                      if (comp.length) {
                        console.log("comp");
                        console.log(val);
                        newCompulx.push(val);
                        console.log("comp");
                        console.log(newCompul);
                      } else {
                        return null;
                        // console.log(comp);
                      }
                    });
                    console.log(newCompulx);
                    setElective(newCompulx);

                    // const combinedArray = newCompulx.courseUnit.concat(
                    //   result.courseUnit
                    // );
                    // console.log(combinedArray);
                    const newCompulxx = [];
                    console.log(newCompulxx);
                    const newCompulz = [];
                    newCompul.map((val) => {
                      // console.log(val);
                      let comp = resultrz.filter(
                        (valx) => valx.courseID === val.id
                      );
                      // console.log(val);
                      if (comp.length) {
                        // console.log(comp);
                        return null;
                      } else {
                        // console.log(comp);
                        newCompulz.push(val);
                      }
                    });
                    console.log(newCompulz);
                    // setCoursex(newCompulz);
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
  console.log(elective);

  const handleCheck = (event, inn) => {
    if (event.target.checked) {
      setOpened(true);
      // console.log("checked", "courseID:", event.target.value);
      coursex[inn].checked = true;
      // console.log(coursex);
      handleAdd(event.target.value);
      setCoursex(coursex);
      console.log(coursex);
      // setOpened(false);
    } else {
      console.log("unchecked", "courseID:", event.target.value);
      setOpened(true);
      // setTimeout(() => setOpened(false), 500);
      console.log(event);
      console.log("checked", "courseID:", event.target.value);
      coursex[inn].checked = false;
      console.log(coursex);
      // handleRemove(event.target.value);
      // setCoursex(coursex);
      console.log(coursex);
      // setOpened(false);
    }
    // var updatedList = [...checked];
    // if (sessionx !== "") {
    //   if (event.target.checked) {
    //     updatedList = [...checked, event.target.value];
    //   } else {
    //     updatedList.splice(checked.indexOf(event.target.value), 1);
    //   }
    //   console.log(event.target.value);
    //   console.log(event.target.checked);
    //   setChecked(updatedList);
    // } else {
    //   Swal.fire({
    //     title: "Empty_Textfield",
    //     icon: "error",
    //     text: "Please select session",
    //   }).then(() => {
    //     window.location.reload();
    //   });
    // }
  };
  const handleUnCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    console.log(event.target.checked);
    // handleUNCheck(event.target.value);
    // setChecked(updatedList);
  };

  const handleOnChange = (value) => {
    console.log(value);
    setHeadOfDepart(value);
    const userInfo = JSON.parse(localStorage.getItem("user2"));
    console.log(userInfo);
    const IDs = userInfo.schoolID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const headers = miHeaders;
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/courses/getByDepID/${value}`,
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
        const every = [];
        console.log(compulsory);
        if (result.length) {
          // setItems(result);
          for (let i = 0; i < result.length; i++) {
            const selElec = elective.find((r) => r.courseID === result[i].id);
            const selComp = compulsory.find((r) => r.courseID === result[i].id);

            if (selElec !== undefined) {
              every.push({ ...selElec, checked: true });
            } else if (selComp !== undefined) {
              // console.log(selComp);
            } else {
              every.push(result[i]);
            }
          }

          setShowEmpty(false);
          setCoursex(every);
          console.log("eeeeeeeee", every);
        } else {
          setShowEmpty(true);
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

  const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <>
      <div className="content">
        <Paper elevation={8}>
          <Card mx={2}>
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
              </Typography>
              <Typography
                className="card-category"
                style={{
                  // textTransform: "uppercase",
                  // fontSize: 25,
                  // fontWeight: "bold",
                  textAlign: "center",
                  color: "#7D7C7C",
                }}
              >
                <h4> {levelName}Level</h4>
              </Typography>
              <Row>
                {/* <Col md="4" className="pl-md-1">
                  <Button
                    tag="label"
                    className="data1"
                    color="secondary"
                    style={{
                      width: "45vw",
                      fontSize: "15px",
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
                      Compulsory Course:
                    </Typography>
                  </Button>
                  <br />
                  {compulsory.map((item, index) => (
                    <div key={index}>
                      <input
                        value={item.id}
                        type="checkbox"
                        // onChange={"handleUnCheck"}
                        checked={true}
                        // disabled
                      />
                      &nbsp;
                      <span className={isChecked(item.courseName)}>
                        {item.courseName} (Compulsory)
                      </span>{" "}
                    </div>
                  ))}
                </Col> */}
                {/* <Col md="3">
                  <></>
                </Col> */}
                <Button
                  tag="label"
                  className="data1"
                  color="secondary"
                  style={{
                    width: "45vw",
                    fontSize: "15px",
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
                    Register Course
                  </Typography>
                </Button>
                <br />
                <Row>
                  <Col md="6" className="pl-md-1">
                    <FormGroup>
                      <label>Session</label>
                      <Form.Select
                        style={{ marginBottom: "20px" }}
                        value={sessionx || ""}
                        aria-label="Default select example"
                        onChange={(e) => setSession(e.target.value)}
                      >
                        <option value="">--Sessions--</option>
                        <option value="2019/2020">2019/2020</option>
                        <option value="2020/2021">2020/2021</option>
                        <option value="2021/2022">2021/2022</option>
                        <option value="2022/2023">2022/2023</option>
                        <option value="2023/2024">2023/2024</option>
                        <option value="2024/2025">2024/2025</option>
                        <option value="2025/2026">2025/2026</option>
                        <option value="2026/2027">2026/2027</option>
                        <option value="2027/2028">2027/2028</option>
                        <option value="2028/2029">2028/2029</option>
                        <option value="2029/2030">2029/2030</option>
                        <option value="2030/2031">2030/2031</option>
                        <option value="2031/2032">2031/2032</option>
                        <option value="2032/2033">2032/2033</option>
                        <option value="2033/2034">2033/2034</option>
                        <option value="2034/2035">2034/2035</option>
                        <option value="2035/2036">2035/2036</option>
                        <option value="2036/2037">2036/2037</option>
                        <option value="2037/2038">2037/2038</option>
                        <option value="2037/2039">2037/2039</option>
                        <option value="2039/2040">2039/2040</option>
                      </Form.Select>
                    </FormGroup>
                  </Col>{" "}
                  <Col md="6" className="pl-md-1">
                    <FormGroup>
                      <label>Department</label>
                      <Form.Select
                        style={{ marginBottom: "20px" }}
                        value={headOfDepart || ""}
                        aria-label="Default select example"
                        onChange={(e) => handleOnChange(e.target.value)}
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
                  {/* {showEmpty ? 
                    
                   : (
                    <></>
                  )} */}
                  {showEmpty ? (
                    <h4>No Course in this departments</h4>
                  ) : (
                    coursex.map((item, index) => (
                      <div key={index}>
                        <input
                          value={item.courseID ? item.courseID : item.id}
                          type="checkbox"
                          onChange={(e) => handleCheck(e, index)}
                          checked={item.checked ? true : false}
                        />
                        &nbsp;
                        <span className={isChecked(item.name)}>
                          {item.courseCode ? item.courseCode : item.courseCode}{" "}
                          ({item.unit}
                          {item.courseUnit} units)
                        </span>{" "}
                      </div>
                    ))
                  )}
                </Row>
                {/* <Col md="8" className="pl-md-1"> */}
                {/* <Button
                    tag="label"
                    className="data1"
                    color="secondary"
                    style={{
                      width: "35vw",
                      fontSize: "15px",
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
                      Elective Course:
                    </Typography>
                  </Button> */}
                {/* {elective.map((item, index) => (
                    <div key={index}>
                      <input
                        value={item.id}
                        type="checkbox"
                        onChange={handleUnCheck}
                        checked={true}
                      />
                      &nbsp;
                      <span className={isChecked(item.courseName)}>
                        {item.courseName}
                      </span>{" "}
                    </div>
                  ))} */}
                {/* </Col> */}
                {/* <Col md="2">
                  <></>
                </Col> */}
              </Row>
              <Row>
                <Button
                  tag="label"
                  className="data1"
                  color="secondary"
                  style={{
                    width: "45vw",
                    fontSize: "15px",
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
                    Total Course
                  </Typography>
                </Button>
                <label style={{ color: "red", marginTop: 10 }}>
                  Note: This Shows all the courses to be taken by the student
                </label>
                <br />
                {compulsory.map((item, index) => (
                  <div key={index}>
                    <input
                      value={item.id}
                      type="checkbox"
                      onChange={"handleUnCheck"}
                      checked={true}
                    />
                    &nbsp;
                    <span className={isChecked(item.courseName)}>
                      {item.courseCode} ({item.courseUnit} units) -{" "}
                      {item.courseName} (Compulsory)
                    </span>{" "}
                  </div>
                ))}
                {elective.map((item, index) => (
                  <div key={index}>
                    <input
                      value={item.id}
                      type="checkbox"
                      onChange={(e) => handleRemove(e, index)}
                      // onChange={handleUnCheck}
                      checked={true}
                    />
                    &nbsp;
                    <span className={isChecked(item.courseName)}>
                      {item.courseCode} ({item.courseUnit} units) -{" "}
                      {item.courseName}
                    </span>{" "}
                  </div>
                ))}
              </Row>
              <h4>Total units = </h4>
            </CardBody>
          </Card>
        </Paper>
      </div>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </>
  );
}
export default CourseRegistartion;
