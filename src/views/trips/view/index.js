import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Button2 from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { KeyboardDoubleArrowRight, Star } from "@mui/icons-material";
import { Box, Card, Paper, Rating } from "@mui/material";
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
import trip from "./trip.png";

export default function ViewTrip() {
  const [opened, setOpened] = useState(false);
  const [verDoc, setVerDoc] = useState("");
  const [vehDoc, setVehDoc] = useState("");
  const [items, setItems] = useState([{ verificationStatus: 0 }]);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idx = urlParams.get("id");
  useEffect(() => {
    setOpened(true);
    const raw = JSON.stringify({});
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_MAZA_URL}/trips/getByIds/${idx}`,
      requestOptions
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        // console.log(result);
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
  const handleStatus = (param) => {
    if (param === 0)
      return (
        <div>
          <Button2 color="info" variant="contained">
            Created
          </Button2>
        </div>
      );
    if (param === 1)
      return (
        <div>
          <Button2 color="secondary" variant="contained">
            picked up
          </Button2>
        </div>
      );
    if (param === 2)
      return (
        <div>
          <Button2 color="success" variant="contained">
            delivered
          </Button2>
        </div>
      );
    if (param === 3)
      return (
        <div>
          <Button2 color="error" variant="contained">
            cancelled
          </Button2>
        </div>
      );
    return (
      <div>
        <Button2
          // color="white"
          variant="contained"
          color="secondary"
        >
          Undefined
        </Button2>
      </div>
    );
  };
  const handlePStatus = (param) => {
    if (param === 1)
      return (
        <div>
          <Button2 color="success" variant="contained">
            PAID
          </Button2>
        </div>
      );
    return (
      <div>
        <Button2
          // color="white"
          variant="contained"
          color="warning"
        >
          Pending
        </Button2>
      </div>
    );
  };
  const handleVerified = (param) => {
    if (param === false)
      return (
        <div>
          <Button2 color="success" variant="contained">
            Not an emergency
          </Button2>
        </div>
      );
    return (
      <div>
        <Button2
          // color="white"
          variant="contained"
          color="error"
        >
          Emergency
        </Button2>
      </div>
    );
  };
  return (
    <div className="content">
      <Card mx={2}>
        <CardBody>
          <img
            src={trip}
            alt="road"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              width: "20vw",
            }}
          />
          <br />
          <Row style={{ marginTop: 20 }}>
            <Col md="4" className="pl-md-1">
              <div
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <label>From</label>
                <br />
                <Paper elevation={8} sx={{ backgroundColor: "gray", p: 1.8 }}>
                  <b
                    style={{
                      //   fontFamily: "Comic Sans MS",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    {items[0].from}
                  </b>
                </Paper>
              </div>
            </Col>
            <Col
              md="4"
              className="pl-md-1"
              style={{ justifyContent: "center", textAlign: "center" }}
            >
              <KeyboardDoubleArrowRight
                style={{ fontSize: "40px", top: 30 }}
                className="arrow"
              />
            </Col>
            <Col md="4" className="pl-md-1">
              <div
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <label>To</label>
                <br />
                <Paper elevation={8} sx={{ backgroundColor: "gray", p: 1.8 }}>
                  <b
                    style={{
                      //   fontFamily: "Comic Sans MS",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    {items[0].to}
                  </b>
                </Paper>
              </div>
            </Col>
          </Row>
          <br />
          <Row style={{ textAlign: "center" }}>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Location Closest To Their Origin</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="None Selected"
                  value={items[0].fromClosestLocation?.name}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Location Closest To Their Destination</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="None Selected"
                  type="text"
                  value={items[0].toClosestLocation?.name}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20, textAlign: "center" }}>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Customer's Name</label>
                <Input
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Name of the customer"
                  //   onChange={() => console.log()}
                  value={
                    items[0].customer?.firstName +
                    " " +
                    items[0].customer?.lastName
                  }
                  type="text"
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Rider's Name</label>
                <Input
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Name of the rider"
                  //   onChange={() => console.log()}
                  type="text"
                  value={
                    items[0].deliveryMan?.firstName +
                    " " +
                    items[0].deliveryMan?.lastName
                  }
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="12" className="pl-md-1" style={{ textAlign: "center" }}>
              <FormGroup>
                <label>Description</label>
                <Input
                  // defaultValue={`${data11.lastName}`}
                  placeholder="description of the trip"
                  //   onChange={() => console.log()}
                  type="textarea"
                  value={String(items[0]?.descrip)}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20, textAlign: "center", justifyContent: "center" }}>
            <Col md="4" className="pl-md-1">
              <Paper
                elevation={8}
                sx={{ backgroundColor: "#6fbf73", p: 1.8, color: "white" }}
              >
                <b
                  style={{
                    //   fontFamily: "Comic Sans MS",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Amount (NGN)
                </b>
                <br />
                {items[0].amount}
              </Paper>
            </Col>
            <Col md="4" className="pl-md-1">
              <Paper
                elevation={8}
                sx={{ backgroundColor: "#33eb91", p: 1.8, color: "white" }}
              >
                <b
                  style={{
                    //   fontFamily: "Comic Sans MS",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Commission (NGN)
                </b>
                <br />
                {items[0].commission?.toFixed(2)}
              </Paper>
            </Col>
            <Col md="4" className="pl-md-1">
              <Paper
                elevation={8}
                sx={{ backgroundColor: "white", p: 1.8, color: "black" }}
              >
                <b
                  style={{
                    //   fontFamily: "Comic Sans MS",
                    textAlign: "center",
                  }}
                >
                  Created On
                </b>
                <br />
                {new Date(items[0].createdTime).toLocaleTimeString()}&nbsp;
                {new Date(items[0].createdTime).toDateString()}
              </Paper>
            </Col>
          </Row>
          <br />
          <Row style={{ marginTop: 20 }}>
          <Col md="4" className="pl-md-1">
              <div
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <label>Trip Status</label>
                <br />
                {handleStatus(items[0].status)}
              </div>
            </Col>
            <Col md="4" className="pl-md-1">
              <div
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <label>Payment Status</label>
                <br />
                {handlePStatus(items[0].paymentStatus)}
              </div>
            </Col>
            <Col md="4" className="pl-md-1">
              <div
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <label>Emergency Status</label>
                <br />
                {handleVerified(items[0].emergency)}
              </div>
            </Col>
          </Row>
          <br />
          <Row style={{ marginTop: 20 }}>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Pick Up Time</label>
                <Input
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Not picked up yet"
                  //   onChange={() => console.log()}
                  type="text"
                  value={new Date(items[0].pickupTime ? items[0].pickupTime : "lol").toString()}
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Delivery Time</label>
                <Input
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Not delivered yet"
                  //   onChange={() => console.log()}
                  type="text"
                  value={new Date(items[0].deliveryTime ? items[0].deliveryTime : "lol").toString()}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <br />
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
