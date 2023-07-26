/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

// reactstrap components
import { Button, Card } from "reactstrap";
import Button2 from "@mui/material/Button";
import { Typography, TextField } from "@mui/material";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Navigate from "useNavigate";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

export default function Settings() {
  useEffect(() => {
    const headers = miHeaders;
    setOpened(true);
    fetch(`${process.env.REACT_APP_MAZA_URL}/settings/get`, { headers })
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
        // console.log(result);
        setPriceIncrease(result.emergencyRequestPriceIncrease);
        setCommission(result.commissionPercentage);
        // setItems(result);
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

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [opened, setOpened] = useState(false);
  const [commission, setCommission] = useState("");
  const [priceIncrease, setPriceIncrease] = useState("");
  const handleSave = () => {
    setOpened(true);
    const raw = JSON.stringify({
      commissionPercentage: Number(commission),
      emergencyRequestPriceIncrease: Number(priceIncrease),
    });
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_MAZA_URL}/settings/save`, requestOptions)
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
          style={{
            // width: "45rem",
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
              style={{ color: "white", fontSize: "1.2rem" }}
              variant="h5"
              className="headz"
            >
              Settings
              {/* For {new URLSearchParams(window.location.search).get("field")} */}
            </Typography>
          </Button>
          <div
            className="row"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              marginTop: "40px",
              justifyContent: "center",
            }}
          >
            <div
              className="col-sm-5"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "30px",
                // display: "flex",
              }}
            >
              <Button2
                // tag="label"
                className="data1"
                variant="contained"
                color="inherit"
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                emergency request price increase (%)
              </Button2>
              <TextField
                variant="standard"
                id="standard-basic"
                label=" "
                value={priceIncrease}
                type="number"
                onChange={(e) => {
                  if (e.target.value.length <= 2)
                    setPriceIncrease(e.target.value);
                }}
              />
              <div style={{ marginTop: "-26.5px", marginLeft: "20px" }}>%</div>
            </div>
            <br />
            <div className="col-sm-5" style={{ marginBottom: "30px" }}>
              <Button2
                // tag="label"
                className="data1"
                variant="contained"
                color="inherit"
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                commission percentage (%)
              </Button2>
              <TextField
                variant="standard"
                type="number"
                label=" "
                value={commission}
                onChange={(e) => {
                  if (e.target.value.length <= 2) setCommission(e.target.value);
                }}
              />
              <div style={{ marginTop: "-26.5px", marginLeft: "20px" }}>%</div>
            </div>
          </div>
          <br />
          <Button
            style={{
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "40px",
            }}
            color="success"
            onClick={() => {
              handleSave();
              //   myRef.current.scrollIntoView();
            }}
          >
            Save
          </Button>
        </Card>
        <Backdrop
          sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={opened}
        >
          <CircularProgress style={{ color: "white" }} />
        </Backdrop>
      </div>
    </>
  );
}
