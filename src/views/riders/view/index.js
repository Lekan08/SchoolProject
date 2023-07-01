import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Button2 from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Star, TwoWheelerSharp } from "@mui/icons-material";
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

export default function ViewRider() {
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
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_MAZA_URL}/deliveryMen/getByIds/${idx}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setItems(result);
        let key = result[0].verification?.document.name;
        if (key !== undefined) {
          fetch(`${process.env.REACT_APP_MAZA_URL}/media/getS3Urls/${key}`, {
            headers,
          })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((result2) => {
              setVerDoc(result2[0]);
            });
        }
        let key2 = result[0].vehicle?.document.name;
        if (key2 !== undefined) {
          fetch(`${process.env.REACT_APP_MAZA_URL}/media/getS3Urls/${key2}`, {
            headers,
          })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((result2) => {
              setOpened(false);
              // console.log(result2);
              setVehDoc(result2[0]);
            });
        }
        setOpened(false);
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
          <Button2 color="success" variant="contained">
            ACTIVE
          </Button2>
        </div>
      );
    if (param === 1)
      return (
        <div>
          <Button2 color="error" variant="contained">
            DEACTIVATED
          </Button2>
        </div>
      );
    if (param === 2)
      return (
        <div>
          <Button2 color="warning" variant="contained">
            Unavailable
          </Button2>
        </div>
      );
    if (param === 3)
      return (
        <div>
          <Button2 color="info" variant="contained">
            Assigned
          </Button2>
        </div>
      );
    if (param === 4)
      return (
        <div>
          <Button2 color="info" variant="contained">
            On A trip
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
  const handleVerified = (param) => {
    if (param === 1)
      return (
        <div>
          <Button2 color="secondary" variant="contained">
            PENDING
          </Button2>
        </div>
      );
    if (param === 2)
      return (
        <div>
          <Button2 color="success" variant="contained">
            VERIFIED
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
          Unverified
        </Button2>
      </div>
    );
  };
  return (
    <div className="content">
      <Card mx={2}>
        <CardBody>
          <TwoWheelerSharp
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
            <Col md="4" className="pl-md-1">
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
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Total Trips Done</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="trips"
                  //   onChange={() => console.log()}
                  type="text"
                  value={items[0]?.noOfTrips}
                  // disabled
                />
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1">
              <div
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <label>Rider Rating</label>
                <br />
                <Paper
                  elevation={8}
                  sx={{ backgroundColor: "gray", height: 70 }}
                >
                  <Rating
                    sx={{ top: 5 }}
                    defaultValue={items[0].averageRating}
                    color="white"
                    precision={0.1}
                    emptyIcon={<Star sx={{ color: "white" }} />}
                  />
                  <br />
                  <b
                    style={{
                      fontFamily: "Comic Sans MS",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    {items[0].averageRating}
                  </b>
                </Paper>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <div style={{ textAlign: "center" }}>
                  <label>Vehicle: </label>
                  <br />
                  {vehDoc ? (
                    <a alt="doc" href={vehDoc} target="_blank" rel="noreferrer">
                      View Vehicle Document
                    </a>
                  ) : (
                    "No documents"
                  )}
                </div>
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1" style={{ textAlign: "center" }}>
              <FormGroup>
                <label>Status</label>
                {handleStatus(Math.round(items[0]?.status))}
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1">
              <div
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <label>Verification Status</label>
                <br />
                {handleVerified(items[0].verificationStatus)}
              </div>
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
          <Row style={{ marginTop: 20 }}>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <div style={{ textAlign: "center" }}>
                  <label>Verification: </label>
                  <br />
                  {verDoc ? (
                    <a alt="doc" href={verDoc} target="_blank" rel="noreferrer">
                      View Verification Document
                    </a>
                  ) : (
                    "No documents"
                  )}
                </div>
              </FormGroup>
            </Col>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Verification Comment</label>
                <Input
                  onChange={() => {}}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="comment"
                  //   onChange={() => console.log()}
                  type="textarea"
                  value={String(items[0]?.verificationComment)}
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
