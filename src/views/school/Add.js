import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp, LocationCity, School } from "@mui/icons-material";
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

export default function SchoolAdd() {
  const [opened, setOpened] = useState(false);
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
          <LocationCity
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
                  onChange={() => {}}
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
                <label htmlFor="exampleInputEmail1">Email address</label>
                <Input
                  // value=""
                  placeholder="School mail goes here"
                  type="email"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Head</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="head"
                  //   onChange={() => console.log()}
                  type="text"
                  //   value={items[0]?.walletBalance}
                  // disabled
                />
              </FormGroup>
            </Col>{" "}
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>School Type</label>
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
          </Row>
          <Row>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>City</label>
                <Input
                  // defaultValue={`${data11.city}`}
                  placeholder="City"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-3" md="4">
              <FormGroup>
                <label>Country</label>
                <Input
                  // defaultValue={`${data11.state}`}
                  placeholder="School country"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-3" md="4">
              <FormGroup>
                <label>State</label>
                <Input
                  // defaultValue={`${data11.state}`}
                  placeholder="School state"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="pl-md-1" md="12">
              <FormGroup>
                <label>Street</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="street"
                  //   onChange={() => console.log()}
                  type="text"
                  // value={String(items[0]?.verificationComment)}
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
            Add School
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
