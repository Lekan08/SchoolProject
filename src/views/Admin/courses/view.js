import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp, School } from "@mui/icons-material";
import { Card, TextField, Typography } from "@mui/material";
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  CardBody,
  //   Card,
} from "reactstrap";
import { Form } from "react-bootstrap";

export default function StudentView() {
  const [opened, setOpened] = useState(false);
  const [phonex, setPhonex] = useState(0);
  const [dob, setDob] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [matric, setMatric] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  //   const [items, setItems] = useState([]);
  //   const { allPHeaders: myHeaders } = PHeaders();
  //   const { allGHeaders: miHeaders } = GHeaders();
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const idx = urlParams.get("id");

  return (
    <div className="content">
      <Card mx={2}>
        <CardBody>
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
              className="headz"
            >
              Name Of Student
            </Typography>
          </Button>
          <br />
          <Row>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>First Name</label>
                <Input
                  //   onChange={(e) => {
                  //     setFname(e.target.value);
                  //   }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="First Name"
                  //   value={firstName}
                  disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Last Name</label>
                <Input
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Last Name"
                  // onChange={() => console.log()}
                  type="text"
                  //   value={items[0]?.lastName}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="5" className="pl-md-1">
              <FormGroup>
                <label>Sex</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={sex || ""}
                  aria-label="Default select example"
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">--Select Sex--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Email</label>
                <Input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Mail"
                  //   onChange={() => console.log()}
                  type="text"
                  //   value={items[0]?.email}
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col md="6" className="pl-md-1">
              <label>Phone Number</label>
              <PhoneInput
                // value={phonex}
                onChange={(val) => setPhonex(val)}
                id="phone"
                placeholder="+234 812 345 6789"
                // value="+"
                inputStyle={{ marginTop: "3.8%" }}
                // onChange={setPhone}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col className="pl-md-1" md="3">
              <FormGroup>
                <label>School</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  // value={sex || ""}
                  size="sm"
                  aria-label="Default select example"
                  // onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">--Choose--</option>
                  {/* <option value="Male">Male</option>
                  <option value="Female">Female</option> */}
                </Form.Select>
              </FormGroup>
            </Col>{" "}
            <Col className="pl-md-1" md="3">
              <FormGroup>
                <label>Faculty</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  // value={sex || ""}
                  size="sm"
                  aria-label="Default select example"
                  // onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">--Choose--</option>
                  {/* <option value="Male">Male</option>
                  <option value="Female">Female</option> */}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="3">
              <FormGroup>
                <label>Department</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  // value={sex || ""}
                  size="sm"
                  aria-label="Default select example"
                  // onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">--Choose--</option>
                  {/* <option value="Male">Male</option>
                  <option value="Female">Female</option> */}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="3">
              <FormGroup>
                <label>College (optional) </label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  // value={sex || ""}
                  size="sm"
                  aria-label="Default select example"
                  // onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">--Choose--</option>
                  {/* <option value="Male">Male</option>
                  <option value="Female">Female</option> */}
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Date Of Birth</label>
                <br />
                <TextField
                  id="datetime-local"
                  // label="*"
                  color="secondary"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                    width: "20px",
                  }}
                  size="small"
                  value={dob}
                  // disabled={disab}
                  onChange={(e) => setDob(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Matric Number</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="0000-0000-0000"
                  //   onChange={() => console.log()}
                  type="text"
                  //   value={String(items[0]?.referralCode)}
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
            // onClick={() => handleGetStates()}
          >
            Add Student
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
