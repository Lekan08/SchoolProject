import React, { useState, useEffect } from "react";
import { Box, Modal, Paper, Typography } from "@mui/material";
import { Button, Card, Input, Row, Col, CardBody } from "reactstrap";
import DataTable from "examples/TableList";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { Dropdown, Form } from "react-bootstrap";
import { Settings } from "@mui/icons-material";
import Navigate from "useNavigate";
import PHeaders from "postHeader";
import GHeaders from "getHeader";

export default function UserManagement() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState([]);
  const [allroles, setAllRoles] = useState([]);
  const [name, setName] = useState({ fname: "", lname: "" });
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
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
    fetch(`${process.env.REACT_APP_MAZA_URL}/users/gets`, { headers })
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
        // console.log(result);
        setAllRoles(result);
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
    const raw = JSON.stringify({
      firstName: name.fname,
      lastName: name.lname,
      email: email,
      roleID: role,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_MAZA_URL}/users/invite`, requestOptions)
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
              Invite A New User
            </Typography>
          </Button>
          <br />
          <CardBody>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                //   alignSelf: "center",
              }}
            >
              <Col md="5">
                <label>First Name</label>
                <Input
                  placeholder="Mazaways"
                  type="text"
                  onChange={(e) => setName({ ...name, fname: e.target.value })}
                />
              </Col>
              <Col md="5">
                <label>Last Name</label>
                <Input
                  placeholder="User"
                  type="text"
                  onChange={(e) => setName({ ...name, lname: e.target.value })}
                />
              </Col>
            </Row>
            <br />
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                //   alignSelf: "center",
              }}
            >
              <Col md="6">
                <label>Email</label>
                <Input
                  placeholder="Mazaways@Mazawayz.com"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col md="4">
                <label>Role</label>
                <Form.Select
                  value={role}
                  aria-label="Default select example"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>--Select Role--</option>
                  {allroles.map((apis) => (
                    <option key={apis.id} value={apis.id}>
                      {apis.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <br />
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
              Invite User
            </Button>
            <br />
          </CardBody>
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
            { Header: "email", accessor: "email", width: 300 },
            { Header: "city", accessor: "city" },
            { Header: "state", accessor: "state" },
            { Header: "country", accessor: "country" },
            {
              Header: "created On",
              accessor: "createdTime",
              renderCell: (params) => {
                return `${new Date(
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
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() => {
                        Navigate(`/view-profile?id=${cell.row.email}`);
                      }}
                    >
                      View Profile
                    </Dropdown.Item>
                    {/* <Dropdown.Item
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() =>
                        Navigate(
                          `/customers/referral?id=${cell.row.id}&name=${cell.row.firstName} ${cell.row.lastName}`
                        )
                      }
                    >
                      View Referrals
                    </Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              ),
            },
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
              {/* <Form.Select
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
              </Form.Select> */}
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
