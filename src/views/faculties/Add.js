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
  Form,
  Input,
  Row,
  Col,
  CardBody,
  //   Card,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function FacultyAdd() {
  const [opened, setOpened] = useState(false);
  const [namex, setName] = useState("");
  const [descrip, setDescrip] = useState("");
  const [headOfFaculty, setHeadOfFaculty] = useState("");
  const MySwal = withReactContent(Swal);
  //   const [items, setItems] = useState([]);
  //   const { allPHeaders: myHeaders } = PHeaders();
  //   const { allGHeaders: miHeaders } = GHeaders();
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const idx = urlParams.get("id");

  const handleClick = () => {
    // sessionStorage.setItem("admin", true);
    // Navigate("/departments");
    // setOpened(true);

    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const idx = urlParams.get("id");

    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      name: namex,
      description: descrip,
      head: headOfFaculty,
      schoolID: userData.schoolID,
      // collegeID: userData.schoolID,
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
      `${process.env.REACT_APP_SCHPROJECT_URL}/faculties/add`,
      requestOptions
    )
      .then(async (res) => {
        // console.log(res.headers);;;;
        // const aToken = res.headers.get("token-1");
        // localStorage.setItem("rexxdex1", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.status === "SUCCESS") {
          //   localStorage.setItem("admin", result.data);
          // Navigate("/departments");
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
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
                <label>Name</label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Name"
                  //   value={firstName}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Head Of Faculty</label>
                <Input
                  // onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="head"
                  onChange={(e) => setHeadOfFaculty(e.target.value)}
                  type="text"
                  value={headOfFaculty}
                  // disabled
                />
              </FormGroup>
            </Col>{" "}
          </Row>
          <Row style={{ marginTop: 20 }} align={"center"}>
            <Col
              className="pl-md-1"
              md="8"
              // style={{ alignSelf: "center", flex: "center" }}
            >
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
            {/* <Col md="4" className="pl-md-1">
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
            </Col>{" "}
            <Col md="4" className="pl-md-1">
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
            color="success"
            onClick={() => handleClick()}
          >
            Add Faculty
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
