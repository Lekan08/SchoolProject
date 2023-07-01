import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp } from "@mui/icons-material";
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

export default function ViewCustomer() {
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState([]);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idx = urlParams.get("id");
  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_MAZA_URL}/customers/getByIds/${idx}`, {
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
  return (
    <div className="content">
      <Card mx={2}>
        <CardBody>
          <AccountCircleSharp
            sx={{
              fontSize: 230,
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
            }}
          />
          <br />
          <Row>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>First Name</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="First Name"
                  value={items[0]?.firstName}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Last Name</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Last Name"
                  // onChange={() => console.log()}
                  type="text"
                  value={items[0]?.lastName}
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Other Name</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Other Name"
                  //   onChange={() => console.log()}
                  type="text"
                  value={String(items[0]?.otherName)}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="5" className="pl-md-1">
              <FormGroup>
                <label>Wallet Balance (NGN)</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="wallet balance"
                  //   onChange={() => console.log()}
                  type="text"
                  value={items[0]?.walletBalance}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Email</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Mail"
                  //   onChange={() => console.log()}
                  type="text"
                  value={items[0]?.email}
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Phone Number</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="+234..."
                  //   onChange={() => console.log()}
                  type="text"
                  value={String(items[0]?.pno)}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col className="pl-md-1" md="3">
              <FormGroup>
                <label>Street</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="street"
                  value={String(items[0]?.street)}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>{" "}
            <Col className="pl-md-1" md="3">
              <FormGroup>
                <label>City</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="City"
                  value={items[0]?.city}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="3">
              <FormGroup>
                <label>State</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="State"
                  // onChange={() => console.log()}
                  type="text"
                  value={items[0]?.state}
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="3">
              <FormGroup>
                <label>Country</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Country"
                  //   onChange={() => console.log()}
                  type="text"
                  value={items[0]?.country}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Date Of Birth</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="D.O.B"
                  //   onChange={() => console.log()}
                  type="text"
                  value={new Date(items[0]?.dateOfBirth).toDateString()}
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Created On</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="created d ate"
                  //   onChange={() => console.log()}
                  type="text"
                  value={new Date(items[0]?.createdTime).toString()}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Referral Code</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="0000-0000-0000"
                  //   onChange={() => console.log()}
                  type="text"
                  value={String(items[0]?.referralCode)}
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Referral Paid</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="0000-0000-0000"
                  //   onChange={() => console.log()}
                  type="text"
                  value={String(items[0]?.referralPaid)}
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Registration Referral Code</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="0000-0000-0000"
                  //   onChange={() => console.log()}
                  type="text"
                  value={String(items[0]?.registrationReferralCode)}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
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
