import { useRef, useState } from "react";
import { Box, Modal, Paper, TextField, Typography } from "@mui/material";
import Button2 from "@mui/material/Button";
import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import Navigate from "useNavigate";
import PHeaders from "postHeader";
import DataTable from "examples/TableList";
import GHeaders from "getHeader";
import AllCountriesAndStates from "countries-states-master/countries";
import { Dropdown, Form } from "react-bootstrap";
import { Settings } from "@mui/icons-material";
import { CustomNotification } from "views/notification/Notifications";

export default function Trips() {
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
  const { allGHeaders: miHeaders } = GHeaders();
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [clicked4, setClicked4] = useState(false);
  const [hover5, setHover5] = useState(false);
  const [clicked5, setClicked5] = useState(false);
  const [hover6, setHover6] = useState(false);
  const [clicked6, setClicked6] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [opened, setOpened] = useState(false);
  const [status, setStatus] = useState(-1);
  const [pStatus, setPStatus] = useState(-1);
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState("");
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
  const myRef = useRef(null);
  const handleGetTrips = () => {
    setOpened(true);
    const raw = JSON.stringify({
      status: status,
      paymentStatus: pStatus,
      startTime: new Date(start).getTime(),
      endTime: new Date(end).getTime(),
    });
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_MAZA_URL}/trips/gets`, requestOptions)
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
  };
  const handleStatus = (param) => {
    if (param === 0)
      return (
        <div>
          <Button2
            color="info"
            variant="contained"
            style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          >
            Created
          </Button2>
        </div>
      );
    if (param === 1)
      return (
        <div>
          <Button2
            color="secondary"
            variant="contained"
            style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          >
            picked up
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
            delivered
          </Button2>
        </div>
      );
    if (param === 3)
      return (
        <div>
          <Button2
            color="error"
            variant="contained"
            style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          >
            cancelled
          </Button2>
        </div>
      );
    return (
      <div>
        <Button2
          style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          // color="white"
          variant="contained"
          color="secondary"
        >
          Undefined
        </Button2>
      </div>
    );
  };
  const handlePStatus = (param) => {
    if (param === 1)
      return (
        <div>
          <Button2
            color="success"
            variant="contained"
            style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          >
            PAID
          </Button2>
        </div>
      );
    return (
      <div>
        <Button2
          // color="white"
          variant="contained"
          style={{ fontSize: "10px", width: 20, textAlign: "center" }}
          color="warning"
        >
          Pending
        </Button2>
      </div>
    );
  };
  const [notify, setNotify] = useState(false);
  React.useEffect(() => {
    const check = Number(localStorage.getItem("notifyTrip"));
    if (check !== null) {
      localStorage.setItem("notifyTrip", check + 1);
    } else {
      localStorage.setItem("notifyTrip", 0);
    }
    if (check <= 2) {
      setNotify(true);
    }
  }, []);
  return (
    <div className="content">
      {notify && (
        <CustomNotification message="If you select none of the statuses, you will be able to see the history of all trips." />
      )}
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
              Trips
            </Typography>
          </Button>
        </Card>
        <br />
        <div
          className="row"
          style={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "center",
          }}
        >
          <div
            className="col-sm-4"
            style={{
              // width: "50vw",
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "center",
            }}
          >
            <TextField
              id="datetime-local"
              label="From *"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: "10px" }}
              size="small"
              value={start}
              // disabled={disab}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div
            className="col-sm-4"
            style={{
              // width: "50vw",
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "center",
            }}
          >
            <TextField
              id="datetime-local"
              label="To *"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              value={end}
              // disabled={disab}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>
        <br />
        <Box textAlign="center" mb={3}>
          <Typography variant="p" style={{ color: "gray" }}>
            Status
            {/* <span style={{ color: "red" }}>*</span> */}
          </Typography>
        </Box>
        <div
          className="row"
          style={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "center",
          }}
        >
          <div className="col-sm-3">
            <Button2
              color="info"
              variant={
                clicked2 ? "contained" : hover2 ? "contained" : "outlined"
              }
              onMouseOver={() => setHover2(true)}
              onMouseLeave={() => setHover2(false)}
              onClick={() => {
                setStatus(0);
                setClicked2(!clicked2);
                setClicked(false);
                setClicked3(false);
                setClicked4(false);
              }}
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "5px",
              }}
              size="large"
            >
              Created
            </Button2>
          </div>
          <div className="col-sm-3">
            <Button2
              color="secondary"
              variant={
                clicked3 ? "contained" : hover3 ? "contained" : "outlined"
              }
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "5px",
              }}
              onMouseOver={() => setHover3(true)}
              onMouseLeave={() => setHover3(false)}
              onClick={() => {
                setStatus(1);
                setClicked3(!clicked3);
                setClicked2(false);
                setClicked(false);
                setClicked4(false);
              }}
              size="large"
            >
              Picked up
            </Button2>
          </div>
          <div className="col-sm-3">
            <Button2
              color="success"
              variant={
                clicked4 ? "contained" : hover4 ? "contained" : "outlined"
              }
              onMouseOver={() => setHover4(true)}
              onMouseLeave={() => setHover4(false)}
              onClick={() => {
                setStatus(2);
                setClicked4(!clicked4);
                setClicked2(false);
                setClicked3(false);
                setClicked(false);
              }}
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "5px",
              }}
              size="large"
            >
              Delivered
            </Button2>
          </div>
          <div className=" col-md-2">
            <Button2
              color="error"
              variant={clicked ? "contained" : hover ? "contained" : "outlined"}
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => {
                setStatus(3);
                setClicked(!clicked);
                setClicked2(false);
                setClicked3(false);
                setClicked4(false);
              }}
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "5px",
              }}
              size="large"
            >
              Cancelled
            </Button2>
          </div>
        </div>
        <br />
        <hr />
        <Box textAlign="center">
          <Typography variant="p" mb={2} style={{ color: "gray" }}>
            Payment Status
          </Typography>
        </Box>
        <br />
        <Box textAlign="center" mb={4}>
          <Button2
            color="success"
            variant={clicked5 ? "contained" : hover5 ? "contained" : "outlined"}
            onMouseOver={() => setHover5(true)}
            onMouseLeave={() => setHover5(false)}
            onClick={() => {
              setPStatus(1);
              setClicked5(!clicked5);
              setClicked6(false);
            }}
            // style={{
            //   width: "10vw",
            // }}
            size="large"
          >
            PAID
          </Button2>
          <Button2
            color="warning"
            variant={clicked6 ? "contained" : hover6 ? "contained" : "outlined"}
            onMouseOver={() => setHover6(true)}
            onMouseLeave={() => setHover6(false)}
            onClick={() => {
              setPStatus(0);
              setClicked6(!clicked6);
              setClicked5(false);
            }}
            // style={{
            //   width: "10vw",
            // }}
            size="large"
          >
            PENDING
          </Button2>
        </Box>
        <br />
        <Button
          style={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          color="success"
          onClick={() => {
            handleGetTrips();
            myRef.current.scrollIntoView();
          }}
        >
          Get Trips
        </Button>
        <br />
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
            { Header: "From", accessor: "from" },
            { Header: "To", accessor: "to" },
            { Header: "Amount", accessor: "amount" },
            {
              Header: "commission",
              accessor: "commission",
              renderCell: (params) => {
                return `${params.row.commission.toFixed(2)}`;
              },
            },
            {
              Header: "customer",
              accessor: "customer",
              renderCell: (params) => {
                if (params.row.customer === null) {
                  return `----`;
                }
                return `${params.row.customer.firstName} ${params.row.customer.lastName}`;
              },
            },
            {
              Header: "rider",
              accessor: "deliveryMan",
              renderCell: (params) => {
                if (params.row.deliveryMan === null) {
                  return `----`;
                }
                return `${params.row.deliveryMan.firstName} ${params.row.deliveryMan.lastName}`;
              },
            },
            {
              Header: "NEAR (coming)",
              accessor: "fromClosestLocation",
              renderCell: (params) => {
                return `${
                  params.row.fromClosestLocation
                    ? params.row.fromClosestLocation.name
                    : `none selected`
                }`;
              },
            },
            {
              Header: "near (going)",
              accessor: "toClosestLocation",
              renderCell: (params) => {
                return `${
                  params.row.toClosestLocation
                    ? params.row.toClosestLocation.name
                    : `none selected`
                }`;
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
              Header: "payment status",
              accessor: "paymentStatus",
              renderCell: (params) => {
                // if (params.row.noOfTrips === 0) return "Unverified";
                return <div>{handlePStatus(params.row.paymentStatus)}</div>;
              },
            },
            {
              Header: "created On",
              width: 200,
              accessor: "createdTime",
              renderCell: (params) => {
                return `${new Date(
                  params.row.createdTime
                ).toLocaleTimeString()}, ${new Date(
                  params.row.createdTime
                ).toLocaleDateString()}`;
              },
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
                      onClick={() => {
                        setIdx(cell.row.id);
                        setOpen(true);
                      }}
                      style={{ fontweight: "bold", color: "black" }}
                    >
                      Assign Rider
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() => {
                        const headers = miHeaders;
                        setOpened(true);
                        fetch(
                          `${process.env.REACT_APP_MAZA_URL}/trips/changePaymentStatus/${cell.row.id}/1`,
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
                                text: result.message,
                              }).then(() => window.location.reload());
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
                      }}
                    >
                      Mark As Paid
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() => Navigate(`/trips/view?id=${cell.row.id}`)}
                    >
                      View Trip
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ),
            },
          ],
          rows: items,
        }}
      />
      <div ref={myRef} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button2
            // tag="label"
            className="data1"
            variant="contained"
            // color="success"
            color="inherit"
            style={{
              // width: "20vw",
              fontSize: "20px",
              marginRight: "auto",
              marginLeft: "auto",
              height: "50px",
              // color: "red"
              // marginTop: "20px",
            }}
          >
            Riders
          </Button2>
          <div
            className="row"
            style={{
              marginTop: "40px",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="col-sm-8">
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
            <div className="col-sm-8" style={{ marginTop: "20px" }}>
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
          <Box mt={6}>
            <Button
              variant="gradient"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
              }}
              color="info"
              onClick={() => {
                // handleUpdate();

                Navigate(
                  `/trips/riders?id=${idx}&field=${residentialCountryx}&state=${residentialStatex}`
                );
              }}
            >
              Get Riders
            </Button>
          </Box>
          <br />
        </Box>
      </Modal>
    </div>
  );
}
