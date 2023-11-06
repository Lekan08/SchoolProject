import React, { useState, useEffect } from "react";
import { Box, Modal, Paper, Typography } from "@mui/material";
import { Button, Card } from "reactstrap";
import DataTable from "examples/TableList";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import AllCountriesAndStates from "countries-states-master/countries";
import { Dropdown, Form } from "react-bootstrap";
import { Settings } from "@mui/icons-material";
import Navigate from "useNavigate";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import "../Css.css";

export default function Departments() {
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const [allStates, setAllStates] = useState([]);

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
  const [opened, setOpened] = useState(false);
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
  //   const userData = JSON.parse(localStorage.getItem("user"));
  //   console.log(userData);
  //   const schId = userData.schoolID;
  //   const headers = miHeaders;
  //   fetch(`${process.env.REACT_APP_SCH_URL}/departments/gets/${schId}`, {
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
  // }, []);
  useEffect(() => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/departments/gets/${schID}`, {
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
          `${process.env.REACT_APP_SCHPROJECT_URL}/departments/delete/${val}`,
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
  return (
    <div className="content">
      <Paper elevation={8}>
        <Card>
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
              className="headz"
            >
              All Departments
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
                onClick={() => Navigate("/departments/add")}
              >
                Add a department
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
                onClick={() => Navigate("/departments/multiple")}
              >
                Add multiple departments (CSV)
              </div>
            </Paper>
          </div>
        </Card>
      </Paper>
      <br />
      <DataTable
        data={{
          columns: [
            {
              Header: "Name Of Department",
              accessor: "name",
              // renderCell: (params) => {
              //   return `${params.row.firstName} ${params.row.lastName}`;
              // },
            },
            { Header: "description", accessor: "desc", width: 250 },
            { Header: "Head Of Department", accessor: "headOfDepName" },
            // { Header: "school", accessor: "school" },
            { Header: "faculty", accessor: "facultyName" },
            // { Header: "college", accessor: "college" },
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
                      onClick={() =>
                        Navigate(`/departments/update?id=${cell.row.id}`)
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="row" style={{ marginTop: "40px" }}>
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
          </div>
          <Box mt={8}>
            <Button
              variant="gradient"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
              }}
              color="info"
              //   onClick={() => handleUpdate()}
            >
              Get Riders
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
