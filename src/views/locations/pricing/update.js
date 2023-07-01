import { TwoWheeler } from "@mui/icons-material";
import { Box, Card, Paper, Typography, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import Navigate from "useNavigate";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import "./st.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function UpdatePricing() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [distance, setDistance] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = React.useState({
    locationDataA: { name: "", state: "", country: "" },
    locationDataB: { name: "", state: "", country: "" },
  });
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const locationA = urlParams.get("A");
    const locationB = urlParams.get("B");
    setOpened(true);
    setData(JSON.parse(sessionStorage.getItem("loca")));
    fetch(
      `${process.env.REACT_APP_MAZA_URL}/pricing/getFor/${locationA}/${locationB}`,
      {
        headers,
      }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
      })
      .then((result) => {
        setOpened(false);
        // setItems(result);
        setAmount(result.amount);
        setDistance(result.distance);
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
  const handlePricing = () => {
    const raw = JSON.stringify({
      id: data.id,
      locationA: data.locationA,
      locationB: data.locationB,
      distance: Number(distance),
      amount: Number(amount),
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    setOpened(true);
    fetch(`${process.env.REACT_APP_MAZA_URL}/pricing/update`, requestOptions)
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
          <Typography style={{ color: "white" }} variant="h5">
            Update Pricing
          </Typography>
        </Button>
        <br />
        <br />
      </Card>
      <Card>
        <div
          className="row"
          style={{
            marginTop: "20px",
            display: "flex",
            width: "50vw",
            padding: "20px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="col-sm-6" style={{ marginBottom: "10px" }}>
            <TextField
              variant="outlined"
              // id="standard-basic"
              type="number"
              label="amount *"
              size="small"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <TextField
              variant="outlined"
              // id="standard-basic"
              size="small"
              type="number"
              label="distance (km) *"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </div>
        </div>
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
              {data.locationDataA.name},&nbsp;
              {data.locationDataA.state},&nbsp;
              <br />
              {data.locationDataA.country}.
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
              {data.locationDataB.name},&nbsp;
              {data.locationDataB.state},&nbsp;
              <br />
              {data.locationDataB.country}.
            </Typography>
          </Paper>
          <br />
        </Box>{" "}
        <Box mt={5} mb={3}>
          <Button
            variant="gradient"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
            }}
            color="success"
            onClick={() => handlePricing()}
          >
            Update
          </Button>
        </Box>
      </Card>
      <br />
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
