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

export default function Students() {
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

    const userInfo = JSON.parse(localStorage.getItem("user"));
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/students/gets/${schID}`, {
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
              All Students
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
                onClick={() => Navigate("/students/add")}
              >
                Add a student
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
                onClick={() => Navigate("/students/multiple")}
              >
                Add multiple students (CSV)
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
              Header: "Name",
              accessor: "firstName",
              renderCell: (params) => {
                return `${params.row.firstName} ${params.row.lastName}`;
              },
            },
            { Header: "Matric number", accessor: "matricNumber" },
            { Header: "department", accessor: "departmentName" },
            { Header: "faculty", accessor: "facultyName" },
            { Header: "sex", accessor: "sex" },
            { Header: "city", accessor: "city" },
            { Header: "state", accessor: "state" },
            { Header: "country", accessor: "country" },
            { Header: "phone number", accessor: "phoneNumber" },
            { Header: "email", accessor: "email" },
            {
              Header: "Date Of Birth",
              width: 200,
              accessor: "dateOfBirth",
              renderCell: (params) => {
                return `${new Date(
                  Number(params.row.dateOfBirth)
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
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() => {
                        Navigate(`/students/view?id=${cell.row.id}`);
                      }}
                    >
                      View
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() =>
                        Navigate(`/students/update?id=${cell.row.id}`)
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
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
