import React, { useState, useEffect } from "react";
import { Box, ButtonGroup, Paper, Typography } from "@mui/material";
import { Button, Card } from "reactstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button2 from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Swal from "sweetalert2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { Form } from "react-bootstrap";
import Navigate from "useNavigate";

export default function Permissions() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState("");
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_MAZA_URL}/permissions/gets`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        const roleID = new URLSearchParams(window.location.search).get("id");
        fetch(
          `${process.env.REACT_APP_MAZA_URL}/rolesPermissions/getByRole/${roleID}`,
          {
            headers,
          }
        )
          .then(async (resz) => {
            const aToken = resz.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return resz.json();
          })
          .then((resultx) => {
            // console.log(1, resultx);
            const AllMixed = [];
            for (let i = 0; i < result.length; i++) {
              let found = resultx.find(
                (r) => r.permissionCall === result[i].actionCall
              );
              if (found) {
                AllMixed.push({
                  ...found,
                  descrip: result[i].descrip,
                  displayName: result[i].displayName,
                });
              } else {
                AllMixed.push({ ...result[i], isCheck: 0 });
              }
            }
            // channels of ma spirit, OPEN UP.
            AllMixed.sort((a, b) => {
              let fa = a.displayName.toLowerCase(),
                fb = b.displayName.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            });
            setItems(AllMixed);
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
  const handleCheck = (a, b) => {
    const roleID = new URLSearchParams(window.location.search).get("id");
    const raw = JSON.stringify([
      {
        roleID: roleID,
        permissionCall: b.actionCall ? b.actionCall : b.permissionCall,
        isCheck: a === true ? 1 : 0,
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
    fetch(
      `${process.env.REACT_APP_MAZA_URL}/rolesPermissions/save`,
      requestOptions
    )
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
        if (result.status !== "SUCCESS") {
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
  const handleSelect = (a) => {
    const roleID = new URLSearchParams(window.location.search).get("id");
    let all = [];
    if (a === 1) {
      for (let i = 0; i < items.length; i++) {
        all.push({
          roleID: roleID,
          permissionCall: items[i].actionCall
            ? items[i].actionCall
            : items[i].permissionCall,
          isCheck: 1,
        });
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        all.push({
          roleID: roleID,
          permissionCall: items[i].actionCall
            ? items[i].actionCall
            : items[i].permissionCall,
          isCheck: 0,
        });
      }
    }
    const raw = JSON.stringify(all);
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_MAZA_URL}/rolesPermissions/save`,
      requestOptions
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        // setOpened(false);
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
          window.location.reload();
        } else {
          Swal.fire({
            title: result.status,
            icon: "error",
            text: result.message,
          });
        }
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
              {new URLSearchParams(window.location.search).get("name")}
            </Typography>
          </Button>
        </Card>
      </Paper>
      {/* <div style=p{{ display: "flex", marginRight: "auto", marginLeft: "auto" }}> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button2
            sx={{
              backgroundColor: "white",
            }}
            onClick={() => handleSelect(1)}
          >
            Select All
          </Button2>
          <Button2
            sx={{
              backgroundColor: "white",
            }}
            onClick={() => handleSelect(2)}
          >
            Deselect All
          </Button2>
        </ButtonGroup>
      </Box>
      <br />
      {/* </div> */}
      <Paper style={{ backgroundColor: "rgba(0,0,0,0.01)" }}>
        {items.map((r) => (
          <Accordion key={r.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Form.Check
                style={{
                  marginBottom: "1.5px",
                  marginLeft: "30px",
                  marginRight: "20px",
                }}
                onClick={(e) => handleCheck(e.target.checked, r)}
                defaultChecked={r.isCheck === 1}
              />
              <Typography
                style={{
                  marginLeft: "10px",
                  display: "inline-block",
                }}
              >
                {r.displayName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{r.descrip}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
