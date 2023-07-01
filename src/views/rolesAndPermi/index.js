import React, { useState, useEffect } from "react";

// reactstrap components
import { Button, Card } from "reactstrap";

import { Typography, TextField, Box, Modal } from "@mui/material";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Navigate from "useNavigate";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import DataTable from "examples/TableList";
import { Dropdown } from "react-bootstrap";
import { Settings } from "@mui/icons-material";

export default function Roles() {
  const { allPHeaders: myHeaders } = PHeaders();
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
  const { allGHeaders: miHeaders } = GHeaders();
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [descrip, setDescrip] = useState("");
  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_MAZA_URL}/roles/gets`, { headers })
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
  const handleAdd = () => {
    // const data11 = JSON.parse(localStorage.getItem("user1"));
    // const id = data11.id;

    const raw = JSON.stringify({
      name: name,
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
    fetch(`${process.env.REACT_APP_MAZA_URL}/roles/add`, requestOptions)
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
              Roles
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
                  label="Role Name"
                  value={name}
                  style={{
                    marginBottom: "20px",
                    marginRight: "auto",
                    marginLeft: "auto",
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
                  label="Description "
                  sx={{
                    width: "30rem",
                    marginRight: "auto",
                    marginLeft: "auto",
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
            <Box mt={3}>
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
                Add Role
              </Button>
            </Box>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}></Box>
          </Modal>
          <Backdrop
            sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={opened}
          >
            <CircularProgress style={{ color: "white" }} />
          </Backdrop>
        </Card>
        <DataTable
          data={{
            columns: [
              {
                Header: "Name",
                accessor: "name",
                width: 250,
              },
              {
                Header: "Desciption",
                accessor: "descrip",
                width: 400,
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
                        //get the id of the selected row
                        style={{ fontweight: "bold", color: "black" }}
                        // setIdx(cell.row.id);
                        onClick={() => {
                          Navigate(
                            `/permissions?id=${cell.row.id}&name=${cell.row.name}`
                          );
                        }}
                      >
                        Add Permissions
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
                            confirmButtonText: "Yes, Delete this role!",
                          }).then((result) => {
                            if (result.isConfirmed === true) {
                              const requestOptions = {
                                method: "DELETE",
                                headers: miHeaders,
                              };
                              fetch(
                                `${process.env.REACT_APP_MAZA_URL}/roles/delete/${cell.row.id}`,
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
                        }}
                        style={{ fontweight: "bold", color: "black" }}
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
      </div>
    </>
  );
}
