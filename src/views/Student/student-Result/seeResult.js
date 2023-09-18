import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import PHeaders from "postHeader";
import DataTable from "examples/TableList";
import { Settings } from "@mui/icons-material";
import { Dropdown, Form } from "react-bootstrap";
import Navigate from "useNavigate";
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
  CardHeader,
  CardTitle,
  Table,
  //   Card,
} from "reactstrap";
// import { Form } from "react-bootstrap";

export default function SeeResult() {
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
  const [viewres, setViewres] = useState([]);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // useEffect(() => {
  //   setOpened(true);
  //   const userInfo = JSON.parse(localStorage.getItem("user"));
  //   const idx = userInfo.id;
  //   // console.log(idx);
  //   const headers = miHeaders;
  //   fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/students/getByIds/${idx}`, {
  //     headers,
  //   })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       const dateOfBirth = Number(result[0].dateOfBirth);
  //       const day = () => {
  //         let day = new Date(dateOfBirth).getDate();
  //         if (String(day).length === 1) return `0${day}`;
  //         return day;
  //       };
  //       const month = () => {
  //         let day = new Date(dateOfBirth).getMonth() + 1;
  //         if (String(day).length === 1) return `0${day}`;
  //         return day;
  //       };
  //       setOpened(false);
  //       console.log(result);
  //       setFname(result[0].firstName);
  //       setLname(result[0].lastName);
  //       setSex(result[0].sex);
  //       setType(String(result[0].studentType));
  //       setEmail(result[0].email);
  //       setMatric(result[0].matricNumber);
  //       setDob(`${new Date(dateOfBirth).getFullYear()}-${month()}-${day()}`);
  //       setPhonex(`+${result[0].phoneNumber}`);
  //       setFaculty(result[0].facultyName);
  //       setDepartment(result[0].departmentName);
  //       setItems(result[0]);
  //     })
  //     .catch((error) => {
  //       setOpened(false);
  //       Swal.fire({
  //         title: error.status,
  //         icon: "error",
  //         text: error.message,
  //       });
  //     });
  // }, []);

  // useEffect(() => {
  //   setOpened(true);
  //   const userInfo = JSON.parse(localStorage.getItem("user2"));
  //   console.log(userInfo);
  //   // const queryString = window.location.search;
  //   // const urlParams = new URLSearchParams(queryString);
  //   // const idx = urlParams.get("id");
  //   const idx = userInfo.id;
  //   const headers = miHeaders;
  //   fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/result/getByIds/${idx}`, {
  //     headers,
  //   })
  //     .then(async (res) => {
  //       // const aToken = res.headers.get("token-1");
  //       // localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setOpened(false);
  //       console.log(result);
  //       console.log("Kpurkish");
  //       //   setScore(result[0].score);
  //       //   setLevelx(result[0].levelName);
  //       //   setSession(result[0].session);
  //       //   setCoursex(result[0].courseID);
  //       //   setMatNumerx(result[0].matricNumber);
  //       //   setUpdate(result[0]);
  //     })
  //     .catch((error) => {
  //       setOpened(false);
  //       Swal.fire({
  //         title: error.status,
  //         icon: "error",
  //         text: error.message,
  //       });
  //     });
  // }, []);

  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    // const schID = userInfo.schoolID;
    const headers = miHeaders;
    const idx = userInfo.id;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/result/getByIds/${idx}`, {
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
        setViewres(result);
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

  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/result/gets/${schID}`, {
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
          {/* <CardHeader> */}
          <h5
            className="card-category"
            style={{
              textTransform: "uppercase",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            University Of benin
          </h5>{" "}
          <h5
            className="card-category"
            style={{
              textTransform: "capitalize",
              fontSize: 25,
            }}
          >
            {fname} {lname}
          </h5>
          {/* </CardHeader> */}
        </CardBody>

        <br />
        <DataTable
          data={{
            columns: [
              { Header: "Course", accessor: "matricNumber" },
              { Header: "Unit", accessor: "levelName" },
              // { Header: "Department ", accessor: "departmentName" },
              { Header: "Course", accessor: "courseCode" },
              { Header: "Score", accessor: "score" },
              { Header: "Session", accessor: "session" },
              {
                Header: "options",
                accessor: "id",
                renderCell: (cell) => (
                  <Dropdown style={{ position: "absolute" }}>
                    <Dropdown.Toggle
                      style={{ width: "5rem", height: "30px", padding: 0 }}
                      variant="info"
                      size="lg"
                    >
                      <Settings
                        sx={{
                          textAlign: "center",
                          fontSize: "18px",
                        }}
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* <Dropdown.Item
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() =>
                        Navigate(
                          `/courseAdvisor/classCourses?id=${cell.row.id}`
                        )
                      }
                    >
                      Class Course
                    </Dropdown.Item> */}
                      <Dropdown.Item
                        style={{ fontweight: "bold", color: "black" }}
                        onClick={() =>
                          Navigate(`/result/update?id=${cell.row.id}`)
                        }
                      >
                        Update
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{ fontweight: "bold", color: "black" }}
                        //   onClick={() => handleDelete(cell.row.id)}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ),
              },
            ],
            rows: items,
          }}
        />
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
