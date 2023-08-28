import React, { useState, useEffect } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, TextField } from "@mui/material";
import { Form } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import GHeaders from "getHeader";
import { FormGroup, Input, CardBody } from "reactstrap";
import PhoneInput from "react-phone-input-2";

function StudentProfile() {
  const [opened, setOpened] = useState(false);
  const [phonex, setPhonex] = useState(0);
  const [dob, setDob] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [type, setType] = useState("");
  const [matric, setMatric] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [items, setItems] = useState({});
  const { allGHeaders: miHeaders } = GHeaders();
  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const idx = userInfo.id;
    // console.log(idx);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/students/getByIds/${idx}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        const dateOfBirth = Number(result[0].dateOfBirth);
        const day = () => {
          let day = new Date(dateOfBirth).getDate();
          if (String(day).length === 1) return `0${day}`;
          return day;
        };
        const month = () => {
          let day = new Date(dateOfBirth).getMonth() + 1;
          if (String(day).length === 1) return `0${day}`;
          return day;
        };
        setOpened(false);
        console.log(result);
        setFname(result[0].firstName);
        setLname(result[0].lastName);
        setSex(result[0].sex);
        setType(String(result[0].studentType));
        setEmail(result[0].email);
        setMatric(result[0].matricNumber);
        setDob(`${new Date(dateOfBirth).getFullYear()}-${month()}-${day()}`);
        setPhonex(`+${result[0].phoneNumber}`);
        setFaculty(result[0].facultyName);
        setDepartment(result[0].departmentName);
        setItems(result[0]);
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
      <Card mx={2}>
        <CardBody>
          <div>
            <div class="container">
              <div class="main-body">
                <div class="row gutters-sm">
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <div class="card-body">
                        <div class="d-flex flex-column align-items-center text-center">
                          {/* <img
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            alt="Admin"
                            class="rounded-circle"
                            width="150"
                          /> */}
                          <img
                            alt="..."
                            src={require("assets/img/anime3.png")}
                          />
                          <div class="mt-3">
                            <h4>
                              {lname} {fname}
                            </h4>
                            <p class="text-secondary mb-1">
                              Full Stack Developer
                            </p>
                            <p class="text-muted font-size-sm">
                              Bay Area, San Francisco, CA
                            </p>
                            <button class="btn btn-primary">
                              Upload Picture
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="card mb-3">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">First Name</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            <FormGroup>
                              <Input
                                onChange={(e) => {
                                  setFname(e.target.value);
                                }}
                                // disabled
                                placeholder="First Name"
                                value={fname}
                                type="text"
                              />
                            </FormGroup>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Last Name</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            <FormGroup>
                              <Input
                                onChange={(e) => {
                                  setFname(e.target.value);
                                }}
                                // disabled
                                placeholder="Last Name"
                                value={lname}
                                type="text"
                              />
                            </FormGroup>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Matric</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            <FormGroup>
                              <Input
                                onChange={(e) => setMatric(e.target.value)}
                                placeholder="0000-0000-0000"
                                type="text"
                                value={matric}
                                disabled
                              />
                            </FormGroup>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Sex</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            <FormGroup>
                              <Form.Select
                                style={{ marginBottom: "20px" }}
                                value={sex || ""}
                                // disabled
                                aria-label="Default select example"
                                onChange={(e) => setSex(e.target.value)}
                              >
                                <option value="">--Select Sex--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </Form.Select>
                            </FormGroup>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Email</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            <FormGroup>
                              <Input
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                placeholder="Email"
                                type="text"
                                value={email}
                                // disabled
                              />
                            </FormGroup>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Faculty</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            {" "}
                            <FormGroup>
                              <Form.Select
                                style={{ marginBottom: "20px" }}
                                value={faculty || ""}
                                size="sm"
                                disabled
                                aria-label="Default select example"
                                onChange={(e) => {
                                  setFaculty(e.target.value);
                                }}
                              >
                                <option key={faculty} value={faculty}>
                                  {faculty}
                                </option>
                              </Form.Select>
                            </FormGroup>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Department</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            {" "}
                            <FormGroup>
                              <Form.Select
                                style={{ marginBottom: "20px" }}
                                value={department || ""}
                                disabled
                                size="sm"
                                aria-label="Default select example"
                                onChange={(e) => setDepartment(e.target.value)}
                              >
                                <option key={department} value={department}>
                                  {department}
                                </option>
                              </Form.Select>
                            </FormGroup>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Phone Number</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            {" "}
                            <FormGroup>
                              <PhoneInput
                                onChange={(val) => setPhonex(val)}
                                id="phone"
                                disabled
                                placeholder="+234 812 345 6789"
                                value={phonex}
                                inputStyle={{ marginTop: "3.8%" }}
                              />
                            </FormGroup>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Student Type</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            <FormGroup>
                              <Form.Select
                                style={{ marginBottom: "20px" }}
                                value={type || ""}
                                disabled
                                aria-label="Default select example"
                                onChange={(e) => setType(e.target.value)}
                              >
                                <option value="">--Select Type--</option>
                                <option value="0">Major</option>
                                <option value="1">Minor</option>
                              </Form.Select>
                            </FormGroup>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">College</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            <Form.Select
                              style={{ marginBottom: "20px" }}
                              disabled
                              size="sm"
                              aria-label="Default select example"
                            >
                              <option value=""></option>
                            </Form.Select>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">D.O.B</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            <FormGroup>
                              <br />
                              <TextField
                                color="secondary"
                                type="date"
                                InputLabelProps={{
                                  shrink: true,
                                  width: "20px",
                                }}
                                size="small"
                                value={dob}
                                disabled
                                onChange={(e) => setDob(e.target.value)}
                              />
                            </FormGroup>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-12">
                            <a
                              class="btn btn-info "
                              target="__blank"
                              href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                            >
                              Edit
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </>
  );
}
export default StudentProfile;
