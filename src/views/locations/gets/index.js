import React, { useState, useEffect } from "react";

// reactstrap components
import { Button, Card } from "reactstrap";

import { Typography, TextField, Box, Modal } from "@mui/material";
import AllCountriesAndStates from "countries-states-master/countries";
import { Dropdown, Form } from "react-bootstrap";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Navigate from "useNavigate";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import DataTable from "examples/TableList";
import { Settings } from "@mui/icons-material";

export default function Locationgets() {
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState("");
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type =
      Number(urlParams.get("type")) === 0 ? "getByCountry" : "getByState";
    const field = urlParams.get("field");
    const state = urlParams.get("state");
    const raw =
      type === 0
        ? JSON.stringify({
            country: field,
          })
        : JSON.stringify({
            state: state,
            country: field,
          });
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_MAZA_URL}/locations/${type}`, requestOptions)
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
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const [allStates, setAllStates] = useState([]);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState("");
  const [descrip, setDescrip] = useState("");
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setResidentialCountry("");
    setAllStates([]);
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
  const handleUpdate = () => {
    // const data11 = JSON.parse(localStorage.getItem("user1"));
    // const id = data11.id;
    setOpen(false);
    const raw = JSON.stringify({
      id: idx,
      name: name,
      state: residentialStatex,
      country: residentialCountryx,
      descrip: descrip,
    });
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_MAZA_URL}/locations/update`, requestOptions)
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

        Swal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => window.location.reload());
      })
      .catch((error) => {
        setOpened(false);
        Swal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };
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
          `${process.env.REACT_APP_MAZA_URL}/locations/delete/${id}`,
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
            Swal.fire({
              title: resx.status,
              icon: "success",
              text: resx.message,
            }).then(() => {
              window.location.reload();
            });
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
  return (
    <>
      <div className="content">
        <Card
          style={{
            width: "60vw",
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
              // marginTop: "20px",
            }}
          >
            <Typography
              style={{ color: "white", fontSize: "1.2rem" }}
              variant="h5"
              className="headz"

            >
              Locations
              {/* For {new URLSearchParams(window.location.search).get("field")} */}
            </Typography>
          </Button>
        </Card>
        <DataTable
          data={{
            columns: [
              { Header: "Name", accessor: "name" },
              { Header: "State", accessor: "state" },
              { Header: "Country", accessor: "country" },
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
                          Navigate(
                            `/locations/pricing?id=${cell.row.id}&name=${cell.row.name}&state=${cell.row.state}&country=${cell.row.country}`
                          )
                        }
                      >
                        Pricing
                      </Dropdown.Item>
                      <Dropdown.Item
                        //get the id of the selected row
                        onClick={() => {
                          // console.log(cell.row);
                          setName(cell.row.name);
                          setResidentialCountry(cell.row.country);
                          const filteredItems = AlCountry.filter(
                            (item) => item.name === cell.row.country
                          );
                          setAllStates(filteredItems[0].states);
                          setResidentialState(cell.row.state);
                          setIdx(cell.row.id);
                          setDescrip(cell.row.descrip);
                          setOpen(true);
                        }}
                        style={{ fontweight: "bold", color: "black" }}
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <TextField
                variant="standard"
                id="standard-basic"
                label="location name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <br />
              <TextField
                id="outlined-textarea"
                rows={2}
                label="description "
                sx={{
                  width: 400,
                  marginLeft: "5vw",
                }}
                multiline
                value={descrip}
                onChange={(e) => setDescrip(e.target.value)}
              />
            </div>
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
                onClick={() => handleUpdate()}
              >
                Update Location
              </Button>
            </Box>
            <br />
          </Box>
        </Modal>
      </div>
    </>
  );
}
