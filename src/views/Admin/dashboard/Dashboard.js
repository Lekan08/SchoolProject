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
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import { Doughnut } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import { CustomNotification } from "views/Admin/notification/Notifications";
import { Typography } from "@mui/material";
import { object } from "prop-types";
import GHeaders from "getHeader";

function Dashboard(props) {
  const [firer, setFirer] = React.useState(false);
  const [bigChartData, setbigChartData] = React.useState("data1");
  const [numTeacher, setNumTeacher] = useState("");
  const [numStudent, setNumStudent] = useState("");
  const [maleStudents, setMaleStudents] = useState("");
  const [femaleStudents, setFemaleStudents] = useState("");
  const [maleTeachers, setMaleTeachers] = useState("");
  const [femaleTeachers, setFemaleTeachers] = useState("");

  const { allGHeaders: miHeaders } = GHeaders();
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  const fire = () => {
    setFirer(true);
  };

  useEffect(() => {
    getTeachers();
    getStudents();
  });

  const getTeachers = () => {
    const headers = miHeaders;

    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    const schId = userData.schoolID;

    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/staffs/gets/${schId}`, {
      headers,
    })
      .then(async (res) => {
        // const aToken = res.headers.get("token-1");
        // localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
        console.log(result);
        var object = 0;
        if (result.length) {
          var arr = result;
          for (let i = 0; i < arr.length; i++) {
            // if (arr[i] instanceof object) {
            object++;
            // }
          }
        }
        console.log(object);
        const male = result.filter((val) => val.sex === "Male");
        console.log(male);
        var maleObject = 0;
        for (let i = 0; i < male.length; i++) {
          maleObject++;
        }
        console.log(maleObject);
        const female = result.filter((val) => val.sex === "Female");
        var femaleObject = 0;
        for (let i = 0; i < female.length; i++) {
          femaleObject++;
        }
        setFemaleTeachers(femaleObject);
        setMaleTeachers(maleObject);
        setNumTeacher(object);
      });
  };
  const getStudents = () => {
    const headers = miHeaders;

    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    const schID = userData.schoolID;

    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/students/gets/${schID}`, {
      headers,
    })
      .then(async (res) => {
        // const aToken = res.headers.get("token-1");
        // localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
        console.log(result);
        var object = 0;
        if (result.length) {
          var arr = result;
          for (let i = 0; i < arr.length; i++) {
            // if (arr[i] instanceof object) {
            object++;
            console.log(arr[i]);
            // if (arr[i].sex === "Male") {

            // }
            // }
          }
        }
        console.log("male");
        const male = result.filter((val) => val.sex === "Male");
        console.log(male);
        var maleObject = 0;
        for (let i = 0; i < male.length; i++) {
          maleObject++;
        }
        const female = result.filter((val) => val.sex === "Female");
        var femaleObject = 0;
        for (let i = 0; i < female.length; i++) {
          femaleObject++;
        }
        setFemaleStudents(femaleObject);
        console.log(maleObject);
        setMaleStudents(maleObject);
        console.log(object);
        setNumStudent(object);
      });
  };

  const data = {
    labels: ["Male Students", "Female Students"],
    datasets: [
      {
        data: [Number(maleStudents), Number(femaleStudents)],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };
  const dataTeacher = {
    labels: ["Male Teachers", "Female Teachers"],
    datasets: [
      {
        data: [Number(maleTeachers), Number(femaleTeachers)],
        backgroundColor: ["#FFCE56", "#db3d44"],
        hoverBackgroundColor: ["#FFCE56", "#db3d44"],
      },
    ],
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="6">
            <Card>
              <div className="row">
                <div
                  className="col-sm-6"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <SchoolIcon
                    sx={{
                      // textAlign: "center",
                      fontSize: "100px",
                      fill: "#4caf50",
                    }}
                  />
                </div>
                <div
                  className="col-sm-6"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    variant="h6"
                    paddingTop={"40px"}
                    // justifyContent="center"
                  >
                    Students ({Number(numStudent)})
                  </Typography>
                  {/* <Typography variant="h4">500000</Typography> */}
                </div>
              </div>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <div className="row">
                <div
                  className="col-sm-6"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <GroupsIcon
                    sx={{
                      // textAlign: "center",
                      fontSize: "100px",
                      fill: "#0096FF",
                    }}
                  />
                </div>
                <div
                  className="col-sm-6"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    variant="h6"
                    paddingTop={"40px"}
                    // justifyContent="center"
                  >
                    Teachers ({Number(numTeacher)})
                  </Typography>
                  {/* <Typography variant="h4">5000</Typography> */}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card>
              <h4>Students</h4>
              <Doughnut data={data} />
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <h4>Teachers</h4>
              <Doughnut data={dataTeacher} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card>
              <div className="row">
                <div
                  className="col-sm-6"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <GroupsIcon
                    sx={{
                      // textAlign: "center",
                      fontSize: "100px",
                      fill: "#0096FF",
                    }}
                  />
                </div>
                <div
                  className="col-sm-6"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    variant="h6"
                    paddingTop={"40px"}
                    // justifyContent="center"
                  >
                    No Of Faculties (500)
                  </Typography>
                  {/* <Typography variant="h4">5000</Typography> */}
                </div>
              </div>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <div className="row">
                <div
                  className="col-sm-6"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <SchoolIcon
                    sx={{
                      // textAlign: "center",
                      fontSize: "100px",
                      fill: "#4caf50",
                    }}
                  />
                </div>
                <div
                  className="col-sm-6"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    variant="h6"
                    paddingTop={"40px"}
                    // justifyContent="center"
                  >
                    No Of Courses (700)
                  </Typography>
                  {/* <Typography variant="h4">500000</Typography> */}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Shipments</h5>
                    <CardTitle tag="h2" onClick={() => fire()}>
                      Performance
                    </CardTitle>
                    {firer && (
                      <CustomNotification message="Hopefully performing well 😀" />
                    )}
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="secondary"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Accounts
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Purchases
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Shipments</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 763,215
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Daily Sales</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  3,500€
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Completed Tasks</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 12,100K
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Tasks(5)</h6>
                <p className="card-category d-inline"> today</p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Update the Documentation</p>
                          <p className="text-muted">
                            Dwuamish Head, Seattle, WA 8:47 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">GDPR Compliance</p>
                          <p className="text-muted">
                            The GDPR is a regulation that requires businesses to
                            protect the personal data and privacy of Europe
                            citizens for transactions that occur within EU
                            member states.
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip457194718"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip457194718"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Solve the issues</p>
                          <p className="text-muted">
                            Fifty percent of all respondents said they would be
                            more likely to shop at a company
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip362404923"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip362404923"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Release v2.0.0</p>
                          <p className="text-muted">
                            Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip818217463"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip818217463"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Export the processed files</p>
                          <p className="text-muted">
                            The report also shows that consumers will not easily
                            forgive a company once a breach exposing their
                            personal data occurs.
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip831835125"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip831835125"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Arival at export process</p>
                          <p className="text-muted">
                            Capitol Hill, Seattle, WA 12:34 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip217595172"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip217595172"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-center">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-center">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-center">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-center">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-center">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-center">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
      </div>
    </>
  );
}

export default Dashboard;
