import { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import React from "react";
import { Button, Card } from "reactstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button2 from "@mui/material/Button";
import Navigate from "useNavigate";
import DataTable from "examples/TableList";
import Swal from "sweetalert2";
import GHeaders from "getHeader";
import { Dropdown, Form } from "react-bootstrap";
import { Settings, Star } from "@mui/icons-material";

export default function RiderReferrals() {
  const { allGHeaders: miHeaders } = GHeaders();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idx = urlParams.get("id");
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    fetch(
      `${process.env.REACT_APP_MAZA_URL}/deliveryMen/getForReferral/${idx}`,
      {
        headers,
      }
    )
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
  const handleRating = (param) => {
    if (param === 0)
      return (
        <div>
          <Star sx={{ fontSize: "15px", color: "gray" }} />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
        </div>
      );
    if (param === 1)
      return (
        <div>
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
        </div>
      );
    if (param === 2)
      return (
        <div>
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
        </div>
      );
    if (param === 3)
      return (
        <div>
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
        </div>
      );
    if (param === 4)
      return (
        <div>
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px", color: "gray" }} />
        </div>
      );
    if (param === 5)
      return (
        <div>
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px" }} color="warning" />
          <Star sx={{ fontSize: "15px" }} color="warning" />
        </div>
      );
    return (
      <div>
        <Star sx={{ fontSize: "15px", color: "gray" }} />
        <Star sx={{ fontSize: "15px", color: "gray" }} />
        <Star sx={{ fontSize: "15px", color: "gray" }} />
        <Star sx={{ fontSize: "15px", color: "gray" }} />
        <Star sx={{ fontSize: "15px", color: "gray" }} />
      </div>
    );
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
  return (
    <div className="content">
      <Paper elevation={8}>
        <Card>
          <Button
            tag="label"
            className="data1"
            color="info"
            style={{
              width: "60vw",
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
              All Riders {urlParams.get("name")} has referred
            </Typography>
          </Button>
        </Card>
        <Backdrop
          sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={opened}
        >
          <CircularProgress style={{ color: "white" }} />
        </Backdrop>
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
                return <div>{handleRating(params.row.averageRating)}</div>;
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
                          text: "You won't be able to revert this!",
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
                                if (result.status === "SUCCESS") {
                                  Swal.fire({
                                    title: resx.status,
                                    icon: "success",
                                    text: "Rider Deactivated Successfully",
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
                      Deactivate
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ),
            },
          ],
          rows: items,
        }}
      />
    </div>
  );
}
