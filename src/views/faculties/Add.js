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

export default function FacultyAdd() {
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [school, setSchool] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [head, setHead] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const idx = urlParams.get("id");
  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/schools/getAll`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        console.log(result);
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
  const handleAdd = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;

    const raw = JSON.stringify({
      name: name,
      description: description,
      schoolID: schID,
      head: head,
      // college:
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/faculties/add`,
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
                    setName(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="First Name"
                  //   value={firstName}
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
                  // value={String(items[0]?.verificationComment)}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Head Of Faculty</label>
                <Input
                  onChange={(e) => {
                    setHead(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Head Of Faculty"
                  //   onChange={() => console.log()}
                  type="text"
                  //   value={items[0]?.walletBalance}
                  // disabled
                />
              </FormGroup>
            </Col>{" "}
            {/* <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>School</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={school || ""}
                  aria-label="Default select example"
                  onChange={(e) => setSchool(e.target.value)}
                >
                  <option value="">--Select School--</option>
                  {items.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>{" "} */}
            {/* <Col md="4" className="pl-md-1">
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
            onClick={() => handleAdd()}
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
