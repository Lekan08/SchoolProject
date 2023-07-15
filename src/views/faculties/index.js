import React, { useState, useEffect } from "react";
import { Box, Modal, Paper, Typography } from "@mui/material";
import { Button, Card, FormGroup, Col, Input, Row } from "reactstrap";
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
// import {
//   Button,
//   FormGroup,
//   Input,
//   Row,
//   Col,
//   CardBody,
//   //   Card,
// } from "reactstrap";

export default function Faculties() {
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const [allStates, setAllStates] = useState([]);
  const MySwal = withReactContent(Swal);

  const [schools, setSchools] = useState([]);
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const handleOnChangeRCCountry = (e) => {
    if (e.target.value) {
      const filteredItems = AlCountry.filter(
        (item) => item.name === e.target.value
      );
      setAllStates(filteredItems[0].states);
      setResidentialCountry(e.target.value);
    } else {
      setResidentialCountry(e.target.value);
      setAllStates([]);
    }
  };

  const handleOnChangeRCState = (e) => {
    setResidentialState(e.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState("");
  const [tripID, setTripID] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [head, setHead] = useState("");
  const [opened, setOpened] = useState(false);
  const [value, setValue] = "";
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid gray",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };
  // useEffect(() => {
  //   setOpened(true);
  //   const headers = miHeaders;

  //   const userData = JSON.parse(localStorage.getItem("user"));
  //   console.log(userData);
  //   fetch(
  //     `${process.env.REACT_APP_SCH_URL}/faculties/gets/${userData.schoolID}`,
  //     { headers }
  //   )
  //     .then(async (res) => {
  //       // const aToken = res.headers.get("token-1");
  //       // localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //       console.log(res);
  //     })
  //     .then((result) => {
  //       setOpened(false);
  //       console.log("result");
  //       console.log(result);
  //       // setItems(result);
  //       if (result.status === "SUCCESS") {
  //         //   localStorage.setItem("admin", result.data);
  //         // Navigate("/departments");
  //         MySwal.fire({
  //           title: result.status,
  //           type: "success",
  //           text: result.message,
  //         }).then(() => {
  //           window.location.reload();
  //         });
  //       } else {
  //         MySwal.fire({
  //           title: result.status,
  //           type: "error",
  //           text: result.message,
  //         });
  //       }
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
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    const schId = userData.schoolID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SCH_URL}/faculties/gets/${schId}`, {
      headers,
    })
      .then(async (res) => {
        // const aToken = res.headers.get("token-1");
        // localStorage.setItem("rexxdex", aToken);
        // return res.json();
      })
      .then((result) => {
        console.log(result);
        // if (result.message === "Expired Access") {
        //   navigate("/authentication/sign-in");
        //   window.location.reload();
        // }
        // if (result.message === "Token Does Not Exist") {
        //   navigate("/authentication/sign-in");
        //   window.location.reload();
        // }
        // if (result.message === "Unauthorized Access") {
        //   navigate("/authentication/forbiddenPage");
        //   window.location.reload();
        // }
        if (isMounted) {
          console.log(result);
          // setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/schools/getAll`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        console.log(result);
        setSchools(result);
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
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/faculties/gets/${schID}`, {
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
  const handleUpdate = (val) => {
    console.log(val);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;

    const raw = JSON.stringify({
      id: val,
      name: name,
      description: description,
      schoolID: schID,
      head: head,
      // college:
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/faculties/updateFaculty`,
      requestOptions
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        if (result.message === "Expired Access") {
          Navigate("/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          Navigate("/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          Navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        console.log(result);
        if (result.status === "SUCCESS") {
          Swal.fire({
            title: result.status,
            icon: "success",
            text: result.message,
          }).then(() => Navigate("/faculties"));
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
  // const handleFaculty = (val) => {
  //   // const data11 = JSON.parse(localStorage.getItem("user1"));
  //   // const id = data11.id;
  //   setOpened(true);
  //   const headers = miHeaders;
  //   fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/faculties/gets/${val}`, {
  //     headers,
  //   })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setOpened(false);
  //       console.log(result);
  //       setItems(result);
  //     })
  //     .catch((error) => {
  //       setOpened(false);
  //       Swal.fire({
  //         title: error.status,
  //         icon: "error",
  //         text: error.message,
  //       });
  //     });
  // };
  return (
    <div className="content">
      <Paper elevation={8}>
        <Card>
          <Button
            tag="label"
            className="data1"
            color="success"
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
              className="headz"
            >
              All Faculties
            </Typography>
          </Button>
          <div
            className="row-res"
            style={{
              // height: "100vh",
              margin: "4vw",
              display: "grid",
              gridTemplateColumns: "30vw 30vw",
              gridColumnGap: "5vw",
              marginRight: "auto",
              marginLeft: "auto",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              gridGap: "10vw",
            }}
          >
            <Paper
              elevation={8}
              // className="signbox"
              className="resizer2"
              style={{
                textAlign: "center",
                zIndex: 100,
                borderRadius: 500,
              }}
            >
              <div
                // lg="5"
                className="col-res"
                style={{
                  marginRight: "auto",
                  cursor: "pointer",
                  lineHeight: "4rem",
                  marginLeft: "auto",
                }}
                onClick={() => Navigate("/faculties/add")}
              >
                Add a faculty
              </div>
            </Paper>
            <Paper
              elevation={8}
              // className="signbox"
              className="resizer2"
              style={{
                zIndex: 100,
                borderRadius: 500,
                textAlign: "center",
              }}
            >
              <div
                className="col-res"
                // lg="5"
                style={{
                  cursor: "pointer",
                  marginRight: "auto",
                  lineHeight: "4rem",
                  marginLeft: "auto",
                }}
                onClick={() => Navigate("/faculties/multiple")}
              >
                Add multiple faculties (CSV)
              </div>
            </Paper>
          </div>
        </Card>
      </Paper>
      <br />
      {/* <Col
        md="4"
        className="pl-md-1"
        style={{
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <FormGroup>
          <Form.Select
            style={{ marginBottom: "20px" }}
            // value={idx || ""}
            aria-label="Default select example"
            onChange={(e) => handleFaculty(e.target.value)}
          >
            <option value="">--Select School--</option>
            {schools.map((apic) => (
              <option key={apic.id} value={apic.id}>
                {apic.name}
              </option>
            ))}
          </Form.Select>
        </FormGroup>
      </Col> */}
      <DataTable
        data={{
          columns: [
            { Header: "Name", accessor: "name" },
            { Header: "description", accessor: "description" },
            { Header: "Head Of Faculty", accessor: "head" },
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
                    <Dropdown.Item
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() => {
                        Navigate(`/customers/view?id=${cell.row.id}`);
                      }}
                    >
                      View
                    </Dropdown.Item>
                    {/* <Dropdown.Item
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() => handleOnChange(cell.row.id)}
                    >
                      Update
                    </Dropdown.Item> */}
                    <Dropdown.Item
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() =>
                        Navigate(`/faculties/update?id=${cell.row.id}`)
                      }
                    >
                      Update
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ),
            },
          ],
          rows: items,
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Row>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Name</label>
                <Input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="First Name"
                  //   value={firstName}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Description</label>
                <Input
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="description"
                  //   onChange={() => console.log()}
                  type="textarea"
                  // value={String(items[0]?.verificationComment)}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Head Of Faculty</label>
                <Input
                  onChange={(e) => {
                    setHead(e.target.value);
                  }}
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Head Of Faculty"
                  //   onChange={() => console.log()}
                  type="text"
                  //   value={items[0]?.walletBalance}
                  // disabled
                />
              </FormGroup>
            </Col>{" "}
          </Row>
          {/* <div className="row" style={{ marginTop: "40px" }}>
            <div className="col-sm-6">
              <Form.Select
                value={residentialCountryx || ""}
                aria-label="Default select example"
                onChange={handleOnChangeRCCountry}
              >
                <option value="">--Select Country--</option>
                {AlCountry.map((apic) => (
                  <option key={apic.code3} value={apic.name}>
                    {apic.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-sm-6">
              <Form.Select
                value={residentialStatex || ""}
                aria-label="Default select example"
                onChange={handleOnChangeRCState}
              >
                <option>--Select State--</option>
                {allStates.map((apis) => (
                  <option key={apis.code} value={apis.name}>
                    {apis.name}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div> */}
          <Box mt={8}>
            <Button
              variant="gradient"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
              }}
              color="info"
              onClick={() => handleUpdate()}
            >
              Update
            </Button>
          </Box>
          <br />
        </Box>
      </Modal>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
