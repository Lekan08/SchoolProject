/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import "./Css.css";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import PHeaders from "postHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

export default function ViewProfile() {
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState({});
  const { allPHeaders: myHeaders } = PHeaders();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idx = urlParams.get("id");
  useEffect(() => {
    setOpened(true);
    const raw2 = JSON.stringify({
      email: idx,
    });
    const requestOptions2 = {
      method: "POST",
      headers: myHeaders,
      body: raw2,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_MAZA_URL}/users/getByEmail`, requestOptions2)
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
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">View Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                        disabled
                          value={`${items.firstName}`}
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                        disabled
                        value={`${items.lastName}`}
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Other Name</label>
                        <Input
                        disabled
                        value={`${items.otherName}`}
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-md-3" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input
                          disabled
                          value={`${items.email}`}
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-3" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Country</label>
                        <Input
                        disabled
                        value={`${items.country}`} type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Street</label>
                        <Input
                        disabled
                        value={`${items.street}`}
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>City</label>
                        <Input
                        disabled
                        value={`${items.city}`}
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-3" md="6">
                      <FormGroup>
                        <label>State</label>
                        <Input
                        disabled
                        value={`${items.state}`}
                          placeholder="Your country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className="px-md-3" md="6">
                      <FormGroup>
                        <label>Date Of Birth</label>
                        <Input
                          style={{ marginTop: "0.3rem" }}
                        disabled
                        value={`${new Date(
                            items.dateOfBirth
                          ).toDateString()}`}
                          placeholder="Your country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <PhoneInput
                          id="phone"
                          placeholder="+234 812 345 6789"
                          inputStyle={{ marginTop: "3.8%" }}
                        disabled
                        value={`${items.pno}`}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-3" md="6">
                      <FormGroup>
                        <label>Created On</label>
                        <Input
                          style={{ marginTop: "0.3rem" }}
                        disabled
                        value={`${new Date(
                            items.createdTime
                          ).toDateString()}`}
                          placeholder="Your country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/react-logo.png")}
                    />
                    <h5 className="title">
                      {items.firstName} {items.lastName} {items.otherName}
                    </h5>
                  </a>
                  {/* <p className="description">Ceo/Co-Founder</p> */}
                </div>
                {/* <div className="card-description">
                  Do not be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </div> */}
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  {/* <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button> */}
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Backdrop
          sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={opened}
        >
          <CircularProgress style={{ color: "white" }} />
        </Backdrop>
      </div>
    </>
  );
}
