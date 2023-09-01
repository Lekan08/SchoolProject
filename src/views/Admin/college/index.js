import React, { useState, useEffect } from "react";
import { Box, Modal, Paper, Typography } from "@mui/material";
import { Button, Card, FormGroup, Col, Input, CardBody, Row } from "reactstrap";
import DataTable from "examples/TableList";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Swal from "sweetalert2";
import AllCountriesAndStates from "countries-states-master/countries";
import { Dropdown, Form } from "react-bootstrap";
import { Settings } from "@mui/icons-material";
import Navigate from "useNavigate";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../Css.css";
import { School } from "@mui/icons-material";

export default function College() {
  const [open, setOpen] = React.useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState([]);
  const [levels, setLevels] = useState("");
  const [opened, setOpened] = useState(false);
  const [depart, setDepart] = useState([]);
  const [nameOfColl, setNameOfColl] = useState("");
  const [emailx, setEmail] = useState("");
  const [descriptionx, setDescriptionx] = useState("");

  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/colleges/getAll`, {
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

  const handleDelete = (val) => {
    console.log(val);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(
          `${process.env.REACT_APP_SCHPROJECT_URL}/colleges/delete/${val}`,
          requestOptions
        )
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            const resultres = await res.text();
            if (
              resultres === null ||
              resultres === undefined ||
              resultres === ""
            ) {
              return {};
            }
            return JSON.parse(resultres);
          })
          .then((result) => {
            if (result.status === "SUCCESS") {
              Swal.fire({
                title: result.status,
                type: "success",
                text: result.message,
              }).then(() => {
                window.location.reload();
              });
            } else {
              Swal.fire({
                title: result.status,
                type: "error",
                text: result.message,
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: error.status,
              type: "error",
              text: error.message,
            });
          });
      }
    });
  };

  const handleAdd = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const raw2 = JSON.stringify({
      //   name: fname,
      //   description: lname,
      //   head: email,
      //   schoolID: userInfo.schoolID,
      //   depID: department,
      //   facultyID: faculty,
      //   courseCode: courseCodex,
      //   unit: unitx,

      name: nameOfColl,
      email: emailx,
      description: descriptionx,
      //   head: "string",
      schoolID: userInfo.schoolID,
    });
    console.log(raw2);
    const requestOptions2 = {
      method: "POST",
      headers: myHeaders,
      body: raw2,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/colleges/add`,
      requestOptions2
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultx = await res.text();
        if (resultx === null || resultx === undefined || resultx === "") {
          return {};
        }
        return JSON.parse(resultx);
      })
      .then((result) => {
        setOpened(false);
        if (result.status === "SUCCESS") {
          //   localStorage.setItem("admin", result.data);
          Swal.fire({
            title: result.status,
            icon: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: result.status,
            icon: "error",
            text: result.message,
          });
        }
      })
      .catch((error) => {
        setOpened(false);
        Swal.fire({
          title: error.status,
          icon: "error",
          text: error.message,
        });
      });
  };

  return (
    <div className="content">
      <Paper elevation={8}>
        <Card mx={2}>
          <Button
            tag="label"
            className="data1"
            color="secondary"
            style={{
              width: "40vw",
              fontSize: "20px",
              marginRight: "auto",
              marginLeft: "auto",
              // height: "50px",
              marginTop: "20px",
            }}
          >
            <Typography
              style={{ color: "white", fontSize: "1.5rem" }}
              variant="h5"
              className="head"
            >
              College
            </Typography>
          </Button>
          <CardBody>
            {/* <School
              sx={{
                fontSize: 230,
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
              }}
            />
            <br /> */}
            <Row>
              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <label>Name</label>
                  <Input
                    onChange={(e) => {
                      setNameOfColl(e.target.value);
                    }}
                    // defaultValue={`${data11.firstName}`}
                    placeholder="Name"
                    //   value={firstName}
                    //   disabled
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <label>Email</label>
                  <Input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    // defaultValue={`${data11.firstName}`}
                    placeholder="Email"
                    //   value={firstName}
                    //   disabled
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              {/* <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Description</label>
                <Input
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Description"
                  //   value={firstName}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col> */}
              <Col className="pl-md-1" md="8">
                <FormGroup>
                  <label>Description</label>
                  <Input
                    onChange={(e) => {
                      setDescriptionx(e.target.value);
                    }}
                    // defaultValue={`${data11.lastName}`}
                    placeholder="Description"
                    // onChange={() => console.log()}
                    type="textarea"
                    //   value={items[0]?.lastName}
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
              color="info"
              onClick={() => handleAdd()}
            >
              Add College
            </Button>
          </CardBody>
        </Card>
      </Paper>
      <br />
      <DataTable
        data={{
          columns: [
            { Header: "Name", accessor: "name" },
            { Header: "Email", accessor: "email" },
            { Header: "Description", accessor: "description" },
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
                        Navigate(`/college/update?id=${cell.row.id}`)
                      }
                    >
                      Update
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() => handleDelete(cell.row.id)}
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
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
