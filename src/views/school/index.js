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

export default function Schools() {
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
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/schools/gets`, { headers })
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
              All Schools
            </Typography>
          </Button>
          <div
            className="row-res"
            style={{
              // height: "100vh",
              margin: "4vw",
              display: "grid",
              gridTemplateColumns: "30vw",
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
                onClick={() => Navigate("/schools/add")}
              >
                Add School
              </div>
            </Paper>
          </div>
        </Card>
      </Paper>
      <br />
      <DataTable
        data={{
          columns: [
            { Header: "Name", accessor: "name" },
            { Header: "head", accessor: "head" },
            { Header: "city", accessor: "city" },
            { Header: "state", accessor: "state" },
            { Header: "country", accessor: "country" },
            {
              Header: "type",
              accessor: "schoolType",
              renderCell: (params) => {
                if (params.row.schoolType === 1) return "Polytechnic";
                if (params.row.schoolType === 2) return "College";
                return "University";
              },
            },
            // {
            //   Header: "options",
            //   accessor: "id",
            //   renderCell: (cell) => (
            //     <Dropdown style={{ position: "absolute" }}>
            //       <Dropdown.Toggle
            //         style={{ width: "5rem", height: "30px", padding: 0 }}
            //         variant="info"
            //         size="lg"
            //       >
            //         <Settings
            //           sx={{
            //             textAlign: "center",
            //             fontSize: "18px",
            //           }}
            //         />
            //       </Dropdown.Toggle>

            //       <Dropdown.Menu>
            //         <Dropdown.Item
            //           style={{ fontweight: "bold", color: "black" }}
            //           onClick={() => {
            //             Navigate(`/customers/view?id=${cell.row.id}`);
            //           }}
            //         >
            //           View
            //         </Dropdown.Item>
            //         {/* <Dropdown.Item
            //           style={{ fontweight: "bold", color: "black" }}
            //           onClick={() =>
            //             Navigate(
            //               `/customers/referral?id=${cell.row.id}&name=${cell.row.firstName} ${cell.row.lastName}`
            //             )
            //           }
            //         >
            //           View Referrals
            //         </Dropdown.Item> */}
            //       </Dropdown.Menu>
            //     </Dropdown>
            //   ),
            // },
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
