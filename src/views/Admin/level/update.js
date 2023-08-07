import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp, School } from "@mui/icons-material";
import { Card } from "@mui/material";
import { Form } from "react-bootstrap";
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  CardBody,
  //   Card,
} from "reactstrap";
import Navigate from "useNavigate";

export default function LevelUpdate() {
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [school, setSchool] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const idx = urlParams.get("id");

  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/levels/getByIds/${idx}`, {
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
        setLevel(result[0].name);
        setDescription(result[0].description);
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
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const idx = urlParams.get("id");

    const raw = JSON.stringify({
      id: items[0].id,
      name: level,
      description: description,
      schoolID: schID,
      //   createdTime: items[0].createdTime,
      //   deleteFlag: items[0].deleteFlag,
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
          }).then(() => Navigate("/level"));
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
                <label>Level</label>
                <Input
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Level"
                  value={level}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Description</label>
                <Input
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="description"
                  //   onChange={() => console.log()}
                  type="textarea"
                  value={description}
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
