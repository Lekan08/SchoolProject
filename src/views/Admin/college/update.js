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

export default function CollegeUpdate() {
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState("");
  const MySwal = withReactContent(Swal);
  const { allGHeaders: miHeaders } = GHeaders();
  const [nameOfColl, setNameOfColl] = useState("");
  const [emailx, setEmail] = useState("");
  const [descriptionx, setDescriptionx] = useState("");

  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/colleges/getByIds/${idx}`, {
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
        setNameOfColl(result[0].name);
        setDescriptionx(result[0].description);
        setEmail(result[0].email);
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

  const handleUpdate = () => {
    // sessionStorage.getItem("user");
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    // setOpened(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      id: items[0].id,
      name: nameOfColl,
      email: emailx,
      description: descriptionx,
      //   head: "string",
      schoolID: userData.schoolID,
    });
    console.log(raw);
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/colleges/update`,
      requestOptions
    )
      .then(async (res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === "SUCCESS") {
          Swal.fire({
            title: result.status,
            icon: "success",
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
                  onChange={(e) => {
                    setNameOfColl(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Name"
                  value={nameOfColl}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Email</label>
                <Input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Email"
                  value={emailx}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col className="pl-md-1" md="8">
              <FormGroup>
                <label>Description</label>
                <Input
                  onChange={(e) => {
                    setDescriptionx(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Description"
                  // onChange={() => console.log()}
                  type="textarea"
                  value={descriptionx}
                  // disabled
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
            color="success"
            onClick={() => handleUpdate()}
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
