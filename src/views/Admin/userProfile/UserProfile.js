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
import React from "react";
import "./Css.css";
import PhoneInput from "react-phone-input-2";
// reactstrap components
import {
  Button,
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

function UserProfile() {
  const data11 = JSON.parse(localStorage.getItem("user1"));
  console.log(data11);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">My Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue={`${data11.firstName}`}
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue={`${data11.lastName}`}
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Other Name</label>
                        <Input
                          defaultValue={`${data11.otherName}`}
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
                          defaultValue={`${data11.email}`}
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-3" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Country</label>
                        <Input
                          defaultValue={`${data11.country}`}
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Street</label>
                        <Input
                          defaultValue={`${data11.street}`}
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
                          defaultValue={`${data11.city}`}
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-3" md="6">
                      <FormGroup>
                        <label>State</label>
                        <Input
                          defaultValue={`${data11.state}`}
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
                          defaultValue={`${new Date(
                            data11.dateOfBirth
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
                          value={`${data11.pno}`}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-3" md="6">
                      <FormGroup>
                        <label>Created On</label>
                        <Input
                          style={{ marginTop: "0.3rem" }}
                          defaultValue={`${new Date(
                            data11.createdTime
                          ).toDateString()}`}
                          placeholder="Your country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                {/* <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button> */}
              </CardFooter>
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
                      {data11.firstName} {data11.lastName} {data11.otherName}
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
      </div>
    </>
  );
}

export default UserProfile;
