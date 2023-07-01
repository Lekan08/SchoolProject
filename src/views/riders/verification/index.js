import React from "react";
import Swal from "sweetalert2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Button2 from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Card, Paper, TextField } from "@mui/material";
import Navigate from "useNavigate";

export default function Verification() {
  const [opened, setOpened] = React.useState(false);
  const [verDoc, setVerDoc] = React.useState("");
  const [vehDoc, setVehDoc] = React.useState("");
  const [comment, setComment] = React.useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  React.useEffect(() => {
    setOpened(true);

    const data = JSON.parse(sessionStorage.getItem("rider"));
    // console.log(data);
    if (data.verification?.document) setVerDoc("https://loadingTheDocument.c");
    if (data.vehicle?.document) setVehDoc("https://PleaseWait.c");
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_MAZA_URL}/deliveryMen/getByIds/${data.id}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        let key = result[0].verification?.document.name;
        if (key !== undefined) {
          fetch(`${process.env.REACT_APP_MAZA_URL}/media/getS3Urls/${key}`, {
            headers,
          })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((result2) => {
              setVerDoc(result2[0]);
            });
        }
        let key2 = result[0].vehicle?.document.name;
        if (key2 !== undefined) {
          fetch(`${process.env.REACT_APP_MAZA_URL}/media/getS3Urls/${key2}`, {
            headers,
          })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((result2) => {
              setOpened(false);
              // console.log(result2);
              setVehDoc(result2[0]);
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
  }, []);
  const handleVerification = (val) => {
    const rider = JSON.parse(sessionStorage.getItem("rider"));

    const raw = JSON.stringify({
      id: rider.id,
      status: val,
      comment: comment,
    });
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_MAZA_URL}/deliveryMen/markVerificationStatus`,
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
        if (result.status === "SUCCESS") {
          Swal.fire({
            title: result.status,
            icon: "success",
            text: result.message,
          }).then(() => Navigate("/riders"));
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
      <Card>
        <Paper
          elevation={8}
          tag="label"
          className="data1"
          color="info"
          //   backgroundColor="info"
          style={{
            width: "100%",
            fontSize: "20px",
            marginRight: "auto",
            marginLeft: "auto",
            padding: 30,
            backgroundColor: "#3d5afe",
            textAlign: "center",
            color: "white",
          }}
        >
          <b>Vehicle Document</b>
        </Paper>
        {!vehDoc && (
          <div style={{ textAlign: "center", marginTop: 5, fontSize: "20px" }}>
            <b>No Document Uploaded.</b>
          </div>
        )}
        <iframe
          id="msdoc-iframe"
          title="msdoc-iframe"
          src={vehDoc}
          width="100%"
          styles={{ maxHeight: "80vh", maxWidth: "80vh" }}
          style={{ height: "50vh" }}
          className=""
          display="block"
          position="relative"
        />
      </Card>
      <br />
      <Card>
        <Paper
          elevation={8}
          tag="label"
          className="data1"
          color="info"
          //   backgroundColor="info"
          style={{
            width: "100%",
            fontSize: "20px",
            marginRight: "auto",
            marginLeft: "auto",
            padding: 30,
            backgroundColor: "#3d5afe",
            textAlign: "center",
            color: "white",
          }}
        >
          <b>Verification Document</b>
        </Paper>
        {!verDoc && (
          <div style={{ textAlign: "center", marginTop: 5, fontSize: "20px" }}>
            <b>No Document Uploaded.</b>
          </div>
        )}
        <iframe
          id="msdoc-iframe"
          title="msdoc-iframe"
          src={verDoc}
          width="100%"
          styles={{ maxHeight: "80vh", maxWidth: "80vh" }}
          style={{ height: "50vh" }}
          className=""
          display="block"
          position="relative"
        />
      </Card>
      <br />
      {vehDoc && verDoc && (
        <Paper
          elevation={8}
          style={{
            padding: 20,
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "center",
          }}
        >
          <TextField
            id="outlined-textarea"
            rows={4}
            label="Add Verification Comment "
            sx={{
              width: "30rem",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              // marginLeft: "5vw",
            }}
            className="description"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <div
            style={{
              // width: "30rem",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              justifyContent: "center",
              // marginLeft: "5vw",
            }}
          >
            <Button2
              color="success"
              onClick={() => {
                handleVerification(2);
              }}
              style={{
                width: "10vw",
              }}
              variant="outlined"
              size="large"
            >
              Verify
            </Button2>
            <Button2
              color="error"
              onClick={() => {
                handleVerification(0);
              }}
              variant="outlined"
              // style={{
              //   width: "10vw",
              // }}
              size="large"
            >
              Terminate Verification
            </Button2>
          </div>
        </Paper>
      )}
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
