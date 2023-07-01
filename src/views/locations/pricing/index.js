import { Settings, TwoWheeler } from "@mui/icons-material";
import { Box, Card, Paper, Typography, Modal, TextField } from "@mui/material";
import DataTable from "examples/TableList";
import React, { useState, useEffect } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import Navigate from "useNavigate";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import "./st.css";
import Button2 from "@mui/material/Button";
import AllCountriesAndStates from "countries-states-master/countries";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Pricing() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid gray",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState([]);

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const [allStates, setAllStates] = useState([]);
  const [IDx, setIDx] = useState({});
  const [distance, setDistance] = useState("");
  const [amount, setAmount] = useState("");
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [locations, setLocations] = useState([]);
  const [selLocation, setSelLocation] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setSelLocation("");
  };
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => {
    setOpen3(false);
  };
  const [open2, setOpen2] = useState(false);
  const [opened, setOpened] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
    setResidentialState("");
    setResidentialCountry("");
  };
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
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const location = urlParams.get("id");
    setOpened(true);
    fetch(`${process.env.REACT_APP_MAZA_URL}/pricing/gets/${location}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        // console.log(result);
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
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(
          `${process.env.REACT_APP_MAZA_URL}/pricing/delete/${id}`,
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
                text: resx.message,
              }).then(() => window.location.reload());
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
  };
  const handleGetLocations = () => {
    handleClose2();
    setOpened(true);
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
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_MAZA_URL}/locations/getByState`,
      requestOptions
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        setOpen(true);

        setLocations(result);
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
  const handleChooseLocation = () => {
    setOpen(false);
    console.log(selLocation);
  };
  const handlePricing = () => {
    setOpen3(false);
    const locationB = JSON.parse(selLocation);
    const raw = JSON.stringify([
      {
        locationA: new URLSearchParams(window.location.search).get("id"),
        locationB: locationB.id,
        distance: Number(distance),
        amount: Number(amount),
      },
    ]);
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_MAZA_URL}/pricing/add`, requestOptions)
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
  };
  return (
    <div className="content">
      <Card
        style={{
          width: "60vw",
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
      >
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
            marginTop: "1rem",
            marginBottom: "20px",
          }}
        >
          <Typography style={{ color: "white" }} variant="h5" className="headz">
            Pricing
          </Typography>
        </Button>
        <br />
        <br />
      </Card>
      <Card>
        <Box
          style={{
            width: "70vw",
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "20px",
            padding: "20px",
          }}
        >
          <Paper elevation={8} className="paperz" style={{ width: "20vw" }}>
            <Button
              tag="label"
              className="data1"
              color="info"
              style={{
                //   width: "10vw",
                marginRight: "auto",
                marginLeft: "auto",
                height: "30px",
                width: "100%",
                padding: 0,
              }}
            >
              <Typography
                variant="h6"
                style={{
                  color: "white",
                  height: "50px",
                  marginTop: "1px",
                  fontSize: "1rem",
                }}
              >
                From
              </Typography>
            </Button>
            <br />
            <Typography
              variant="p"
              style={{
                position: "relative",
                left: "0.5vw",
                wordWrap: "break-word",
                fontSize: "1rem",
              }}
            >
              {new URLSearchParams(window.location.search).get("name")},&nbsp;
              {new URLSearchParams(window.location.search).get("state")},&nbsp;
              {new URLSearchParams(window.location.search).get("country")}.
            </Typography>
          </Paper>
          <TwoWheeler
            className="arrow"
            style={{ width: "25vw", fontSize: "4rem" }}
          />
          <Paper elevation={8} style={{ width: "20vw", marginLeft: "20px" }}>
            <Button
              tag="label"
              className="data1"
              color="info"
              style={{
                //   width: "10vw",
                fontSize: "20px",
                marginRight: "auto",
                marginLeft: "auto",
                height: "30px",
                textAlign: "center",
                width: "100%",
                padding: 0,
              }}
            >
              <Typography
                variant="h6"
                style={{
                  color: "white",
                  height: "50px",
                  marginTop: "1px",
                  fontSize: "1rem",
                }}
              >
                To
              </Typography>
            </Button>
            <br />
            <Typography
              variant="p"
              style={{
                position: "relative",
                left: "0.5vw",
                wordWrap: "break-word",
                fontSize: "1rem",
              }}
            >
              {selLocation
                ? `${JSON.parse(selLocation)?.name}, ${
                    JSON.parse(selLocation)?.state
                  }, ${JSON.parse(selLocation)?.country}.`
                : "Select Location Below"}
            </Typography>
          </Paper>
          <br />
        </Box>{" "}
        <Box mt={8}>
          {selLocation && (
            <Button
              variant="gradient"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                marginBottom: "20px",
              }}
              color="success"
              onClick={() => handleOpen3()}
            >
              Add Price
            </Button>
          )}
          <Button
            variant="gradient"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
            }}
            color="info"
            onClick={() => handleOpen2()}
          >
            {selLocation ? "Change Location" : "Select Location"}
          </Button>
        </Box>
        <br />
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Button2 size="large" mb={20}>
              Select Location
            </Button2>
            <br />
            <Form.Select
              value={residentialCountryx || ""}
              aria-label="Default select example"
              onChange={handleOnChangeRCCountry}
            >
              <option value="">--Select Countries--</option>
              {AlCountry.map((apic) => (
                <option key={apic.code3} value={apic.name}>
                  {apic.name}
                </option>
              ))}
            </Form.Select>
            <br />
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
            <Button
              variant="gradient"
              style={{
                // marginLeft: "auto",
                // marginRight: "auto",
                // display: "flex",
                marginTop: "20px",
              }}
              color="info"
              onClick={() => handleGetLocations()}
            >
              Get Locations
            </Button>
            <Button
              variant="gradient"
              style={{
                // marginLeft: "auto",
                // marginRight: "auto",
                // display: "flex",
                marginTop: "20px",
              }}
              color="warning"
              onClick={() => handleClose2()}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Button2 size="large" mb={20}>
              Select Location
            </Button2>
            <br />
            <br />
            <Form.Select
              value={selLocation || ""}
              aria-label="Default select example"
              onChange={(e) => {
                setSelLocation(e.target.value);
                setIDx(JSON.parse(e.target.value));
              }}
            >
              <option value="{}">Available Locations</option>
              {locations.map((apis) => (
                <option key={apis.id} value={JSON.stringify(apis)}>
                  {apis.name}, {apis.state}, {apis.country}
                </option>
              ))}
            </Form.Select>
            <Button
              variant="gradient"
              style={{
                // marginLeft: "auto",
                // marginRight: "auto",
                // display: "flex",
                marginTop: "20px",
              }}
              color="info"
              onClick={() => handleChooseLocation()}
            >
              Proceed
            </Button>
            <Button
              variant="gradient"
              style={{
                // marginLeft: "auto",
                // marginRight: "auto",
                // display: "flex",
                marginTop: "20px",
              }}
              color="warning"
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Button2 size="large" mb={20}>
              PRICING
            </Button2>
            <Typography>
              <br />
              You are adding the price of going from&nbsp;
              <b>
                {new URLSearchParams(window.location.search).get("name")},&nbsp;
                {new URLSearchParams(window.location.search).get("state")}
                ,&nbsp;
                {new URLSearchParams(window.location.search).get("country")}
              </b>{" "}
              to{" "}
              <b>
                {IDx.name},&nbsp;{IDx.state},&nbsp;{IDx.state}.
              </b>
            </Typography>
            <br />
            <br />
            <TextField
              variant="standard"
              // id="standard-basic"
              type="number"
              label="amount *"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <br />
            <TextField
              variant="standard"
              // id="standard-basic"
              type="number"
              label="distance (km)"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
            <br />
            <br />
            <Button
              variant="gradient"
              style={{
                // marginLeft: "auto",
                // marginRight: "auto",
                // display: "flex",
                marginTop: "20px",
              }}
              color="info"
              onClick={() => handlePricing()}
            >
              Add Price
            </Button>
            <Button
              variant="gradient"
              style={{
                // marginLeft: "auto",
                // marginRight: "auto",
                // display: "flex",
                marginTop: "20px",
              }}
              color="warning"
              onClick={() => handleClose3()}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </Card>
      <br />
      <DataTable
        data={{
          columns: [
            {
              Header: "From",
              width: 180,
              accessor: "locationDataA",
              renderCell: (params) => {
                return `${params.row.locationDataA.name}, ${params.row.locationDataA.state}`;
              },
            },
            {
              Header: "To",
              width: 180,
              accessor: "locationDataB",
              renderCell: (params) => {
                return `${params.row.locationDataB.name}, ${params.row.locationDataB.state}`;
              },
            },
            {
              Header: "Distance (km)",
              accessor: "distance",
              renderCell: (params) => {
                if (params.row.distance === 0) return "---";
                return `${params.row.distance}`;
              },
            },
            { Header: "Price", accessor: "amount" },
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
                        sessionStorage.setItem(
                          "loca",
                          JSON.stringify(cell.row)
                        );
                        Navigate(
                          `/locations/pricing/update?A=${cell.row.locationA}&B=${cell.row.locationB}`
                        );
                      }}
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
