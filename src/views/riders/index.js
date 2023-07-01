import React, { useState, useEffect } from "react";
import { Box, Modal, Paper, Typography } from "@mui/material";
import { Button, Card } from "reactstrap";
import DataTable from "examples/TableList";
import Button2 from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import AllCountriesAndStates from "countries-states-master/countries";
import { Dropdown, Form } from "react-bootstrap";
import { Settings } from "@mui/icons-material";
import Navigate from "useNavigate";
import PHeaders from "postHeader";
import Rating from "@mui/material/Rating";
import GHeaders from "getHeader";

export default function Riders() {
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
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid gray",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };
  useEffect(() => {
    const headers = miHeaders;
    setOpened(true);
    fetch(`${process.env.REACT_APP_MAZA_URL}/deliveryMen/gets`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        setItems(result);
        setOpened(false);
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
  const handleGetRiders = () => {
    const raw = JSON.stringify({
      state: residentialStatex,
      country: residentialCountryx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpen(false);
    setOpened(true);
    fetch(`${process.env.REACT_APP_MAZA_URL}/deliveryMen/find`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
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
  };
  const handleStatus = (param) => {
    if (param === 0)
      return (
        <div>
          <Button2
            color="success"
            variant="contained"
            style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          >
            ACTIVE
          </Button2>
        </div>
      );
    if (param === 1)
      return (
        <div>
          <Button2
            color="error"
            variant="contained"
            style={{ fontSize: "8px", width: 20, textAlign: "center" }}
          >
            DEACTIVATED
          </Button2>
        </div>
      );
    if (param === 2)
      return (
        <div>
          <Button2
            color="warning"
            variant="contained"
            style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          >
            Unavailable
          </Button2>
        </div>
      );
    if (param === 3)
      return (
        <div>
          <Button2
            color="info"
            variant="contained"
            style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          >
            Assigned
          </Button2>
        </div>
      );
    if (param === 4)
      return (
        <div>
          <Button2
            color="info"
            variant="contained"
            style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          >
            On A trip
          </Button2>
        </div>
      );
    return (
      <div>
        <Button2
          // color="white"
          variant="contained"
          color="secondary"
          style={{ fontSize: "10px", width: 20, textAlign: "center" }}
        >
          Error
        </Button2>
      </div>
    );
  };
  const handleVerified = (param) => {
    if (param === 1)
      return (
        <div>
          <Button2
            color="secondary"
            variant="contained"
            style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          >
            PENDING
          </Button2>
        </div>
      );
    if (param === 2)
      return (
        <div>
          <Button2
            color="success"
            variant="contained"
            style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          >
            VERIFIED
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
          Unverified
        </Button2>
      </div>
    );
  };
  const handleActivate = (ids) => {
    setOpened(true);
    const raw = JSON.stringify({});
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_MAZA_URL}/deliveryMen/setAvailable/${ids}`,
      requestOptions
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
            text: "Rider Activated Successfully",
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
              height: "50px",
              marginTop: "20px",
            }}
          >
            <Typography
              style={{ color: "white", fontSize: "1.5rem" }}
              variant="h5"
              className="headz"
            >
              All Riders
            </Typography>
          </Button>
          {/* <br />
          <Box>
            <Button
              color="success"
              style={{
                marginRight: "auto",
                marginLeft: "auto",
                display: "flex",
              }}
              onClick={() => setOpen(true)}
            >
              Filter Riders
            </Button>
          </Box> */}
        </Card>
      </Paper>
      <br />
      <DataTable
        data={{
          columns: [
            {
              Header: "Name",
              accessor: "firstName",
              renderCell: (params) => {
                return `${params.row.firstName} ${params.row.lastName}`;
              },
            },
            {
              Header: "status",
              accessor: "status",
              renderCell: (params) => {
                // if (params.row.noOfTrips === 0) return "Unverified";
                return <div>{handleStatus(params.row.status)}</div>;
              },
            },
            {
              Header: "rating",
              accessor: "averageRating",
              renderCell: (params) => {
                // if (params.row.noOfTrips === 0) return "Unverified";
                return (
                  <div>
                    <Rating
                      // name="half"
                      size="small"
                      sx={{ right: 10 }}
                      defaultValue={params.row.averageRating}
                      precision={0.1}
                    />
                  </div>
                );
              },
            },
            {
              Header: "verification",
              accessor: "verificationStatus",
              renderCell: (params) => {
                return (
                  <div>{handleVerified(params.row.verificationStatus)}</div>
                );
              },
            },
            {
              Header: "Total Trips",
              accessor: "noOfTrips",
            },
            { Header: "country", accessor: "country" },
            { Header: "state", accessor: "state" },
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
                      //get the id of the selected row
                      style={{ fontweight: "bold", color: "black" }}
                      // setIdx(cell.row.id);
                      onClick={() => {
                        handleActivate(cell.row.id);
                      }}
                    >
                      Activate Rider
                    </Dropdown.Item>
                    <Dropdown.Item
                      //get the id of the selected row
                      style={{ fontweight: "bold", color: "black" }}
                      // setIdx(cell.row.id);
                      onClick={() => {
                        sessionStorage.setItem(
                          "rider",
                          JSON.stringify(cell.row)
                        );
                        Navigate(`/riders/verify`);
                      }}
                    >
                      Verify Rider
                    </Dropdown.Item>
                    <Dropdown.Item
                      //get the id of the selected row
                      style={{ fontweight: "bold", color: "black" }}
                      // setIdx(cell.row.id);
                      onClick={() => {
                        Navigate(`/riders/view?id=${cell.row.id}`);
                      }}
                    >
                      View Rider
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() =>
                        Navigate(
                          `/riders/referral?id=${cell.row.id}&name=${cell.row.firstName} ${cell.row.lastName}`
                        )
                      }
                    >
                      View Referrals
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You are about to deactivate this rider!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, Deactivate This Rider!",
                        }).then((result) => {
                          if (result.isConfirmed === true) {
                            const requestOptions = {
                              method: "GET",
                              headers: miHeaders,
                            };
                            fetch(
                              `${process.env.REACT_APP_MAZA_URL}/deliveryMen/setDeactivated/${cell.row.id}`,
                              requestOptions
                            )
                              .then((res) => res.json())
                              .then((resx) => {
                                if (resx.message === "Expired Access") {
                                  Navigate("/sign-in");
                                }
                                if (resx.message === "Token Does Not Exist") {
                                  Navigate("/sign-in");
                                }
                                if (resx.message === "Unauthorized Access") {
                                  Navigate("/sign-in");
                                }
                                if (resx.status === "SUCCESS") {
                                  Swal.fire({
                                    title: resx.status,
                                    icon: "success",
                                    text: "Rider Deactivated Successfully",
                                  }).then(() => {
                                    window.location.reload();
                                  });
                                } else {
                                  Swal.fire({
                                    title: resx.status,
                                    icon: "error",
                                    text: resx.message,
                                  });
                                }
                              })
                              .catch((error) => {
                                Swal.fire({
                                  title: error.status,
                                  icon: "error",
                                  text: error.message,
                                });
                              });
                          }
                        });
                      }}
                      style={{ fontweight: "bold", color: "black" }}
                    >
                      Deactivate Rider
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
