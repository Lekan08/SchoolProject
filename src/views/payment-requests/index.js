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
import Button2 from "@mui/material/Button";
import Navigate from "useNavigate";
import PHeaders from "postHeader";
import GHeaders from "getHeader";

export default function PaymentRequests() {
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
  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_MAZA_URL}/paymentRequests/gets`, { headers })
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
  const handleStatus = (param) => {
    if (param === 1)
      return (
        <div>
          <Button2
            color="success"
            variant="contained"
            style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          >
            Paid
          </Button2>
        </div>
      );
    if (param === 0)
      return (
        <div>
          <Button2
            color="warning"
            variant="contained"
            style={{ fontSize: "8px", width: 20, textAlign: "center" }}
          >
            Not Paid
          </Button2>
        </div>
      );
    return (
      <div>
        <Button2
          // color="white"
          variant="contained"
          color="error"
          style={{ fontSize: "10px", width: 20, textAlign: "center" }}
        >
          Error
        </Button2>
      </div>
    );
  };
  return (
    <div className="content">
      <Paper elevation={8}>
        <Card>
          <Button
            tag="label"
            className="data1"
            color="info"
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
              Payment Requests
            </Typography>
          </Button>
        </Card>
      </Paper>
      <br />
      <DataTable
        data={{
          columns: [
            {
              Header: "Name",
              accessor: "ownerName",
            },
            { Header: "Amount", accessor: "amount" },
            {
              Header: "status",
              accessor: "status",
              renderCell: (params) => {
                // if (params.row.noOfTrips === 0) return "Unverified";
                return <div>{handleStatus(params.row.status)}</div>;
              },
            },
            {
              Header: "Identity",
              accessor: "userType",
              renderCell: (params) => {
                if (params.row.userType === 1) {
                  return `Rider`;
                }
                if (params.row.userType === 2) {
                  return "Customer";
                }
                if (params.row.userType === 3) {
                  return "Admin";
                }
                return "Unknown";
              },
            },
            {
              Header: "requested On",
              accessor: "createdTime",
              renderCell: (params) => {
                return `${new Date(
                  params.row.createdTime
                ).toLocaleTimeString()} ${new Date(
                  params.row.createdTime
                ).toLocaleDateString()}`;
              },
              width: 180,
            },
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
                        const data11 = JSON.parse(
                          localStorage.getItem("user1")
                        );

                        const headers = miHeaders;
                        setOpened(true);
                        fetch(
                          `${process.env.REACT_APP_MAZA_URL}/paymentRequests/pay/${cell.row.id}/${data11.id}`,
                          { headers }
                        )
                          .then(async (res) => {
                            const aToken = res.headers.get("token-1");
                            localStorage.setItem("rexxdex", aToken);
                            return res.json();
                          })
                          .then((result) => {
                            setOpened(false);
                            if (result.status === "SUCCESS") {
                              Swal.fire({
                                title: result.status,
                                icon: "success",
                                text: "Paid Successfully",
                              }).then(() => {
                                window.location.reload();
                              });
                            } else {
                              Swal.fire({
                                title: result.status,
                                icon: "success",
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
                      }}
                    >
                      Pay
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
