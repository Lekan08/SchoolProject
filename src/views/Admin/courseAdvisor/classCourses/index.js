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
import "./style.css";

export default function ClassCourses() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState("");
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
  const [checked, setChecked] = useState([]);
  const [compulsory, setCompulsory] = useState([]);
  const [show, setShow] = useState(false);
  const [sessionx, setSession] = useState("");
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
  console.log(items);

  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    // if ()
    // const data = JSON.parse({data: localStorage.getItem("resultData")});
    // console.log(data);
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

  const handleAdd = (value) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const courseAdv = userInfo.courseAdviserID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    console.log(items);

    const raw = JSON.stringify([
      {
        schoolID: schID,
        depID: headOfDepart,
        levelID: levelx,
        courseID: value,
        courseAdviserID: courseAdv,
        // facultyID: items[0].facultyID,
        session: sessionx,

        // schoolID: schID,
        // depID: headOfDepart,
        // levelID: levelx,
        // staffID: staff,
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
      `${process.env.REACT_APP_SCHPROJECT_URL}/classCourses/addMultiple`,
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
          // localStorage.setItem("resultData", JSON.stringify(result));
          // setOpened(true);
          // Swal.fire({
          //   title: result.status,
          //   icon: "success",
          //   text: result.message,
          // }).then(() => {
            window.location.reload();
          // });
          // setHeadOfDepart
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
    console.log(value);
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
  //   setOpened(true);

  //   const userInfo = JSON.parse(localStorage.getItem("user"));
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
  //     .then((resultr) => {
  //       setOpened(false);
  //       console.log(resultr);
  //       const queryString = window.location.search;
  //       const urlParams = new URLSearchParams(queryString);
  //       const idx = urlParams.get("id");
  //       const headers = miHeaders;
  //       fetch(
  //         `${process.env.REACT_APP_SCHPROJECT_URL}/courseAdvisers/getByIds/${idx}`,
  //         {
  //           headers,
  //         }
  //       )
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
  //         })
  //         .then((result) => {
  //           setOpened(false);
  //           console.log(result);
  //           const userInfo = JSON.parse(localStorage.getItem("user"));
  //           console.log(userInfo);
  //           if (result[0].staffID !== userInfo.id) {
  //             Swal.fire({
  //               title: "Access_Denied",
  //               icon: "error",
  //               text: "You are not the Course Advisor for this course",
  //             }).then(() => {
  //               Navigate("/courseAdvisor");
  //             });
  //           }
  //           if (result !== []) {
  //             setItems(result);
  //             const levelID = result[0].levelID;
  //             const depID = result[0].depID;
  //             fetch(
  //               `${process.env.REACT_APP_SCHPROJECT_URL}/classCourses/getForClass/${levelID}/${depID}`,
  //               {
  //                 headers,
  //               }
  //             )
  //               .then(async (res) => {
  //                 const aToken = res.headers.get("token-1");
  //                 localStorage.setItem("rexxdex", aToken);
  //                 return res.json();
  //               })
  //               .then((result) => {
  //                 setOpened(false);
  //                 const newCompul = [];
  //                 console.log(result);
  //                 if (result.length !== 0) {
  //                   console.log(result);
  //                   setShow(true);
  //                 }
  //                 resultr.map((val) => {
  //                   // console.log(val);
  //                   let comp = result.filter(
  //                     (valx) => valx.courseID === val.id
  //                   );
  //                   // console.log(val);
  //                   if (comp.length) {
  //                     // console.log(comp);
  //                     return null;
  //                   } else {
  //                     // console.log(comp);
  //                     newCompul.push(val);
  //                   }
  //                 });
  //                 console.log(newCompul);
  //                 // setCoursex(newCompul);
  //                 setCompulsory(result);
  //                 console.log(newCompul);
  //               })
  //               .catch((error) => {
  //                 setOpened(false);
  //                 Swal.fire({
  //                   title: error.status,
  //                   icon: "error",
  //                   text: error.message,
  //                 });
  //               });
  //           }
  //         })
  //         .catch((error) => {
  //           setOpened(false);
  //           Swal.fire({
  //             title: error.status,
  //             icon: "error",
  //             text: error.message,
  //           });
  //         });
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

  const handleOnChange = (value) => {
    console.log(value);
    setHeadOfDepart(value);
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
        // setCoursex(result);
        console.log(compulsory);
        // setDepart(result);
        // setCoursex(newCompul);
        // setCompulsory(result);
        if (IDs === "") {
          Swal.fire({
            title: "Cannot Perform Request",
            icon: "error",
            text: "You are not the Course Advisor to this department",
          });
        } else {
          if (result.length) {
            // setItems(result);
            console.log("result");
            fetch(
              `${process.env.REACT_APP_SCHPROJECT_URL}/courseAdvisers/getByIds/${IDs}`,
              {
                headers,
              }
            )
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((resultl) => {
                setOpened(false);
                setItems(resultl);
                console.log(resultl);
                const userInfo = JSON.parse(localStorage.getItem("user2"));
                console.log(userInfo);
                // if (result[0].staffID !== userInfo.id) {
                //   Swal.fire({
                //     title: "Access_Denied",
                //     icon: "error",
                //     text: "You are not the Course Advisor for this course",
                //   }).then(() => {
                //     Navigate("/courseAdvisor");
                //   });
                // }
                if (resultl.length) {
                  // setItems(resultl);
                  const levelID = resultl[0].levelID;
                  const depID = resultl[0].depID;
                  fetch(
                    `${process.env.REACT_APP_SCHPROJECT_URL}/classCourses/getForClass/${levelx}/${value}`,
                    {
                      headers,
                    }
                  )
                    .then(async (res) => {
                      const aToken = res.headers.get("token-1");
                      localStorage.setItem("rexxdex", aToken);
                      return res.json();
                    })
                    .then((resultc) => {
                      setOpened(false);
                      const newCompul = [];
                      const compdep = resultc.filter(
                        (val) => val.depID === value
                      );

                      console.log(compdep);
                      if (resultc.length !== 0) {
                        console.log(resultc);
                        setShow(true);
                      }
                      console.log(resultc);
                      result.map((val) => {
                        console.log(val);
                        console.log(compdep);
                        let comp = compdep.filter(
                          (valx) => valx.courseID === val.id
                        );
                        console.log(comp);
                        if (comp.length) {
                          // console.log(comp);
                          return null;
                        } else {
                          console.log("comp");
                          newCompul.push(val);
                        }
                      });
                      setCompulsory(resultc);
                      console.log(newCompul);
                      setCoursex(newCompul);
                      console.log(newCompul);
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
          } else {
            setCompulsory([]);
            console.log("workss");
            setCoursex([]);
          }
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
  //   setOpened(true);
  //   // const userInfo = JSON.parse(localStorage.getItem("user"));
  //   // console.log(userInfo);
  //   // const schID = userInfo.schoolID;
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const idx = urlParams.get("id");
  //   const headers = miHeaders;
  //   fetch(
  //     `${process.env.REACT_APP_SCHPROJECT_URL}/courseAdvisers/getByIds/${idx}`,
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
  //       const userInfo = JSON.parse(localStorage.getItem("user"));
  //       console.log(userInfo);
  //       if (result[0].staffID !== userInfo.id) {
  //         Swal.fire({
  //           title: "Access_Denied",
  //           icon: "error",
  //           text: "You are not the Course Advisor for this course",
  //         }).then(() => {
  //           Navigate("/courseAdvisor");
  //         });
  //       }
  //       if (result !== []) {
  //         setItems(result);
  //         const levelID = result[0].levelID;
  //         const depID = result[0].depID;
  //         fetch(
  //           `${process.env.REACT_APP_SCHPROJECT_URL}/classCourses/getForClass/${levelID}/${depID}`,
  //           {
  //             headers,
  //           }
  //         )
  //           .then(async (res) => {
  //             const aToken = res.headers.get("token-1");
  //             localStorage.setItem("rexxdex", aToken);
  //             return res.json();
  //           })
  //           .then((result) => {
  //             setOpened(false);
  //             const newCompul = [];
  //             console.log(result);
  //             if (result.length !== 0) {
  //               console.log(result);
  //               setShow(true);
  //               coursex.map((val) => {
  //                 let comp = result.filter((valx) => valx.courseID === val.id);
  //                 console.log(comp);
  //                 console.log(val);
  //                 if (comp) {
  //                   return null;
  //                 } else {
  //                   newCompul.push(val);
  //                 }
  //               });
  //               setCoursex(newCompul);
  //               setCompulsory(result);
  //               console.log(newCompul);
  //             }
  //           })
  //           .catch((error) => {
  //             setOpened(false);
  //             Swal.fire({
  //               title: error.status,
  //               icon: "error",
  //               text: error.message,
  //             });
  //           });
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
  // }, []);

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
      handleAdd(event.target.value);
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    console.log(checked);
    console.log(event.target.value);
    console.log(event.target.checked);
    setChecked(updatedList);
  };
  const handleUnCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    console.log(event.target.checked);
    handleUNCheck(event.target.value);
    // setChecked(updatedList);
  };
  console.log(show);

  // useEffect(() => {
  //   setOpened(true);
  //   const levelID = items[0].levelID;
  //   const depID = items[0].depID;
  //   const headers = miHeaders;
  //   fetch(
  //     `${process.env.REACT_APP_SCHPROJECT_URL}/classCourses/getForClass/${levelID}/${depID}`,
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
  //       if (result !== []) {
  //         setShow(true);
  //         setCompulsory(result);
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
  // }, []);

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  const checkList = coursex;
  console.log(checkList);

  const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

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
              Select Compulsory Course
            </Typography>
          </Button>
          {/* <div className="title">Courses:</div> */}

          {/* <div className="list-container"> */}
          {/* <div className="row">
            <div className="col-sm-5">
              {checkList.map((item, index) => (
                <div key={index}> */}
          {/* <input value={item.id} type="checkbox" /> &nbsp;
                <span className={isChecked(item.name)}>{item.name}</span> */}
          {/* <input
                    value={item.id}
                    type="checkbox"
                    onChange={handleCheck}
                  />
                  &nbsp;
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <div className="col-sm-2" style={{ backgroundColor: "#offwhite" }}>
              <></>
            </div>
            <Typography variant="h5">Compulsory Courses:</Typography>
            <div className="col-sm-5">
              {checkList.map((item, index) => (
                <div key={index}>
                  {/* <input value={item.id} type="checkbox" /> &nbsp;
                <span className={isChecked(item.name)}>{item.name}</span> */}
          {/* <input
                    value={item.id}
                    type="checkbox"
                    onChange={handleCheck}
                  />
                  &nbsp;
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div> */}
          {/* </div> */}
          <CardBody>
            <Row>
              <Col md="4" className="pl-md-1">
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
              <Col md="4" className="pl-md-1">
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
              <Col md="4" className="pl-md-1">
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
            </Row>
            <div class="container">
              <div class="row">
                <div class="col-sm">
                  <Typography variant="h5">Courses:</Typography> <br />
                  {checkList.map((item, index) => (
                    <div key={index}>
                      {/* <input value={item.id} type="checkbox" /> &nbsp;
                <span className={isChecked(item.name)}>{item.name}</span> */}
                      <input
                        value={item.id}
                        type="checkbox"
                        onChange={handleCheck}
                        // checked={item.selected}
                      />
                      &nbsp;
                      <span className={isChecked(item.courseCode)}>
                        {item.courseCode}
                      </span>
                    </div>
                  ))}
                  {compulsory.map((item, index) => (
                    <div key={index}>
                      {/* <input value={item.id} type="checkbox" /> &nbsp;
              <span className={isChecked(item.name)}>{item.name}</span> */}
                      <input
                        value={item.id}
                        type="checkbox"
                        onChange={handleUnCheck}
                        checked={true}
                      />
                      &nbsp;
                      <span className={isChecked(item.courseName)}>
                        {item.courseCode}
                      </span>{" "}
                    </div>
                  ))}
                  {/* <Button
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
                  Save
                </Button> */}
                </div>
                {/* {!show ? (
                  <></>
                ) : (
                  <div class="col-sm">
                    <Typography variant="h5">Compulsory Courses:</Typography>{" "}
                    <br /> */}
                {/* <Button
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
                  Remove
                </Button> */}
                {/* </div>
                )} */}
              </div>
            </div>
          </CardBody>

          {/* <Button
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
            Save
          </Button> */}
        </Card>
      </Paper>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
