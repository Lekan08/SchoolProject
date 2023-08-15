import React, { useState, useEffect } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "@mui/material";
import GHeaders from "getHeader";
import { CardBody, Input, Button } from "reactstrap";
import { Form } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

function CourseRegistartion() {
  const { allGHeaders: miHeaders } = GHeaders();
  const [opened, setOpened] = useState(false);
  const [phonex, setPhonex] = useState(0);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [matric, setMatric] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  //   const [faculties, setFaculties] = useState([]);
  //   const [departments, setDepartments] = useState([]);

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
        setOpened(false);
        console.log(result);
        setFname(result[0].firstName);
        setLname(result[0].lastName);
        setMatric(result[0].matricNumber);
        setPhonex(`+${result[0].phoneNumber}`);
        setFaculty(result[0].facultyName);
        setDepartment(result[0].departmentName);
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
      <div>
        <div className="container">
          <div className="main-body">
            <div className="row gutters-sm">
              <div class="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Admin"
                        className="rounded-circle"
                        width="150"
                      />
                      <div className="mt-3">
                        <h4>
                          {fname} {lname}
                        </h4>
                        <h4>{matric}</h4>
                        <h4>{phonex}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Faculty</h6>
                      </div>
                      <div className="col-sm-9 ">
                        <Input
                          disabled
                          placeholder="Faculty"
                          value={faculty}
                          type="text"
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Department</h6>
                      </div>
                      <div className="col-sm-9 ">
                        <Input
                          disabled
                          placeholder="Faculty"
                          value={department}
                          type="text"
                        />
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Course List</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <Form.Select
                          style={{ marginBottom: "20px" }}
                          value={""}
                          disabled
                          aria-label="Default select example"
                          //   onChange={(e) => setSex(e.target.value)}
                        >
                          <option value="">--Select Sex--</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Form.Select>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-12">
                        <Button>Save</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </>
  );
}
export default CourseRegistartion;
