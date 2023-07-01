import React, { useState } from "react";

// reactstrap components
import { Button, Card, CardBody, Col, Row } from "reactstrap";

import Button2 from "@mui/material/Button";
import { Typography, TextField, Box, Modal } from "@mui/material";
import AllCountriesAndStates from "countries-states-master/countries";
import { Form } from "react-bootstrap";
import PHeaders from "postHeader";
// import GHeaders from "getHeader";
import Navigate from "useNavigate";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import LocationsCSV from "./locationsCSV";
import { CustomNotification } from "views/notification/Notifications";
import PricingsCSV from "./pricing/pricingsCSV";

export default function Location() {
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
  // const { allGHeaders: miHeaders } = GHeaders();
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState("");
  const [descrip, setDescrip] = useState("");
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const [allStates, setAllStates] = useState([]);
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setResidentialCountry("");
    setAllStates([]);
  };

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
  const handleAdd = () => {
    // const data11 = JSON.parse(localStorage.getItem("user1"));
    // const id = data11.id;

    const raw = JSON.stringify([
      {
        name: name,
        state: residentialStatex,
        country: residentialCountryx,
        descrip: descrip,
      },
    ]);
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_MAZA_URL}/locations/add`, requestOptions)
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
  const handleGetCountries = () => {
    if (residentialCountryx) {
      // console.log(residentialCountryx);
      Navigate(`/locations/gets?type=0&field=${residentialCountryx}`);
    }
  };
  const handleGetStates = () => {
    if (residentialStatex) {
      // console.log("states");
      Navigate(
        `/locations/gets?type=1&field=${residentialCountryx}&state=${residentialStatex}`
      );
    }
  };
  const [notify, setNotify] = useState(false);
  React.useEffect(() => {
    const check = Number(localStorage.getItem("notify"));
    if (check !== null) {
      localStorage.setItem("notify", check + 1);
    } else {
      localStorage.setItem("notify", 0);
    }
    if (check <= 2) {
      setNotify(true);
    }
  }, []);
  return (
    <>
      <div className="content">
        <Card
          className="cards"
          style={{
            // width: "60vw",
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
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
              marginTop: "20px",
            }}
          >
            <Typography
              style={{ color: "white", fontSize: "1.7vw" }}
              className="headz"
              variant="h5"
            >
              Locations
            </Typography>
          </Button>
          <br />
          <Box
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: "40px",
            }}
          >
            <div className="row">
              <div className="col-sm-4">
                <TextField
                  variant="standard"
                  id="standard-basic"
                  label="location name"
                  value={name}
                  style={{
                    marginBottom: "20px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "flex",
                    width: "90%",
                  }}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-sm-8">
                <TextField
                  id="outlined-textarea"
                  rows={2}
                  label="description "
                  sx={{
                    width: "30rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "flex",
                    // marginLeft: "5vw",
                  }}
                  className="description"
                  multiline
                  value={descrip}
                  onChange={(e) => setDescrip(e.target.value)}
                />
              </div>
            </div>
            <br />
            <CardBody>
              <div className="row" style={{ marginTop: "40px" }}>
                <div className="col-sm-6">
                  <Form.Select
                    style={{ marginBottom: "20px" }}
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
            </CardBody>
            <Box mt={8}>
              <Button
                variant="gradient"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "flex",
                  marginBottom: "10px",
                }}
                color="success"
                onClick={() => handleAdd()}
              >
                Add Location
              </Button>
              <Row
                style={{
                  width: "90%",
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginBottom: "6%",
                  marginTop: "5%",
                }}
              >
                <Col>
                  <PricingsCSV />
                </Col>
                <Col>
                  <LocationsCSV />
                </Col>
                <Col>
                  <Button
                    variant="gradient"
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "flex",
                    }}
                    // color="warning"
                    onClick={handleOpen}
                  >
                    See All Locations By Country
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="gradient"
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "flex",
                    }}
                    // color="warning"
                    onClick={handleOpen2}
                  >
                    See All Locations By State
                  </Button>
                </Col>
              </Row>
            </Box>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Button2 size="large" mb={20}>
                Select Country
              </Button2>
              <br />
              <Form.Select
                value={residentialCountryx || ""}
                aria-label="Default select example"
                onChange={handleOnChangeRCCountry}
              >
                <option value="">Countries</option>
                {AlCountry.map((apic) => (
                  <option key={apic.code3} value={apic.name}>
                    {apic.name}
                  </option>
                ))}
              </Form.Select>
              <Button
                variant="gradient"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "flex",
                  marginTop: "20px",
                }}
                color="info"
                onClick={() => handleGetCountries()}
              >
                Get Locations
              </Button>
            </Box>
          </Modal>
          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Button2 size="large" mb={20}>
                Select State
              </Button2>
              <br />
              <Form.Select
                value={residentialCountryx || ""}
                aria-label="Default select example"
                onChange={handleOnChangeRCCountry}
              >
                <option value="">Countries</option>
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
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "flex",
                  marginTop: "20px",
                }}
                color="info"
                onClick={() => handleGetStates()}
              >
                Get locations
              </Button>
            </Box>
          </Modal>

          {notify && (
            <CustomNotification message="Pricings can be created or adjusted when you see locations that have been created. Pricings can also be added directly using CSV files." />
          )}
          <Backdrop
            sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={opened}
          >
            <CircularProgress style={{ color: "white" }} />
          </Backdrop>
        </Card>
      </div>
    </>
  );
}
