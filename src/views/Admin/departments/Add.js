import React, { useState, useEffect } from "react";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp, School } from "@mui/icons-material";
import { Card } from "@mui/material";
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  CardBody,
  //   Card,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Form from "react-bootstrap/Form";

export default function DepartmentAdd() {
  const [opened, setOpened] = useState(false);
  const [namex, setName] = useState("");
  const [descrip, setDescrip] = useState("");
  const [headOfDepart, setHeadOfDepart] = useState("");
  const MySwal = withReactContent(Swal);
  const { allGHeaders: miHeaders } = GHeaders();
  const [faculties, setFaculties] = useState([]);
  const [facultyx, setFaculty] = useState("");
  //   const { allPHeaders: myHeaders } = PHeaders();
  //   const { allGHeaders: miHeaders } = GHeaders();
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const idx = urlParams.get("id");

  console.log(faculties);
  // useEffect(() => {
  //   setOpened(true);
  //   const userData = JSON.parse(localStorage.getItem("user"));
  //   console.log(userData);
  //   const schId = userData.schoolID;
  //   const headers = miHeaders;
  //   fetch(`${process.env.REACT_APP_SCH_URL}/faculties/gets/${schId}`, {
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
  //       if (result === []) {
  //         setFaculty(result);
  //       }
  //     })
  //     .catch((error) => {
  //       setOpened(false);
  //       console.log(error);
  //       Swal.fire({
  //         title: error.status,
  //         icon: "error",
  //         text: error.message,
  //       });
  //     });
  // }, []);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    const schId = userData.schoolID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SCH_URL}/faculties/gets/${schId}`, {
      headers,
    })
      .then(async (res) => {
        // const aToken = res.headers.get("token-1");
        // localStorage.setItem("rexxdex", aToken);
        // return res.json();
        const result = await res.text();
        // if (result === null || result === undefined || result === "") {
        //   return {};
        // }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (isMounted) {
          console.log(result);
          if (Object.keys(result).length !== 0) {
            console.log("omo");
            setFaculty(result);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleClick = () => {
    // sessionStorage.getItem("user");
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    // setOpened(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      name: namex,
      description: descrip,
      head: headOfDepart,
      schoolID: userData.schoolID,
      // collegeID: userData.schoolID,
      facultyID: facultyx,
    });
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    // setOpened(true);
    // if (passwordx === confirmPassword) {
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/departments/add`,
      requestOptions
    )
      .then(async (res) => {
        // Navigate("/sign-up-admin");
        // console.log(res.headers);;;;
        // const aToken = res.headers.get("token-1");
        // localStorage.setItem("rexxdex1", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.status === "SUCCESS") {
          // const getId = result.data;
          //   localStorage.setItem("admin", result.data);
          // Navigate(
          //   `/sign-up-admin?id=${idx}&facId=${facId}&deptId=${getId.id}`
          // );
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
        } else {
          MySwal.fire({
            title: result.status,
            type: "error",
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
    // }
  };

  const handleFaculty = (val) => {
    // const data11 = JSON.parse(localStorage.getItem("user1"));
    // const id = data11.id;
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/faculties/gets/${val}`, {
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
        // setItems(result);
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
        <CardBody>
          <School
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
                <label>Name Of Department</label>
                <Input
                  // onChange={() => {}}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Name Of Department"
                  value={namex}
                  onChange={(e) => setName(e.target.value)}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Description</label>
                <Input
                  onChange={(e) => setDescrip(e.target.value)}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="description"
                  //   onChange={() => console.log()}
                  type="textarea"
                  value={descrip}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Head of Department</label>
                <Input
                  onChange={(e) => setHeadOfDepart(e.target.value)}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="head"
                  //   onChange={() => console.log()}
                  type="text"
                  value={headOfDepart}
                  // disabled
                />
              </FormGroup>
            </Col>{" "}
            {/* <Col md="1" /> */}
            <Col
              md="4"
              className="pl-md-1"
              style={{
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <FormGroup>
                <label>Faculty</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={facultyx || ""}
                  aria-label="Default select example"
                  onChange={(e) => setFaculty(e.target.value)}
                >
                  <option value="">--Select Faculty--</option>
                  {faculties.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>
            {/* <Col md="3" className="pl-md-1">
              <FormGroup>
                <label>School</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="school"
                  //   onChange={() => console.log()}
                  type="text"
                  //   value={items[0]?.walletBalance}
                  // disabled
                />
              </FormGroup>
            </Col>{" "} */}
            {/* <Col md="3" className="pl-md-1">
              <FormGroup>
                <label>Faculty</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="faculty"
                  //   onChange={() => console.log()}
                  type="text"
                  //   value={items[0]?.walletBalance}
                  // disabled
                />
              </FormGroup>
            </Col> */}
            {/* <Col md="3" className="pl-md-1">
              <FormGroup>
                <label>College</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="College"
                  //   onChange={() => console.log()}
                  type="text"
                  //   value={items[0]?.walletBalance}
                  // disabled
                />
              </FormGroup>
            </Col> */}
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
            onClick={() => handleClick()}
          >
            Add Department
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
