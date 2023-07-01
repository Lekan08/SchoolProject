/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import Papa from "papaparse";
import { Button } from "reactstrap";
import { Typography, Box, Modal } from "@mui/material";
import PHeaders from "postHeader";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AllCountriesAndStates from "countries-states-master/countries";
import example from "./example.jpg";
import DataTable from "examples/TableList";
import Navigate from "useNavigate";
import { Form } from "react-bootstrap";

export default function PricingsCSV() {
  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid gray",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "78vw",
    bgcolor: "background.paper",
    border: "2px solid gray",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
  };
  const { allPHeaders: myHeaders } = PHeaders();
  const [file, setFile] = useState([]);

  const [opened, setOpened] = useState(false);
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        const obj = results.data.map((r) => ({
          locationA: r.from,
          locationB: r.to,
          amount: Number(r.amount),
          distance: Number(r.distance),
        }));
        setFile(obj);
      },
    });
  };
  const handleUpload = () => {
    setOpened(true);
    handleClose();
    const all = {
      state: residentialStatex,
      country: residentialCountryx,
      pricings: file,
    };
    const raw = JSON.stringify(all);
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_MAZA_URL}/pricing/addExternal`,
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
        console.log(result);
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
  return (
    <div>
      <Button
        variant="gradient"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
        }}
        color="info"
        onClick={() => handleOpen()}
      >
        Add Multiple Pricings (CSV)
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box mt={3} sx={style}>
          <u>Before Proceeding Please Read carefully:</u>
          <Box p={3} mt={1}>
            <Typography
              variant="h4"
              fontWeight="regular"
              fontSize="75%"
              textAlign="left"
              color="text"
            >
              In your excelsheet csv file, the first line or row must be exactly
              the same as the words in the image below in row 1 A - D and having
              no spaces in them. Your details in each row should be
              corresponding to the information in the first row (header).
              Distance is in kilometers. Note that locations must first have been
              created before creating pricings.
            </Typography>
          </Box>
          <img className="img" src={example} alt="example" />
          <br />
          <Box textAlign="center" p={5}>
            <Typography
              variant="h4"
              fontWeight="regular"
              fontSize="75%"
              textAlign="center"
              color="text"
            >
              <input
                type="file"
                name="file"
                accept=".csv"
                onChange={changeHandler}
                style={{ display: "block", margin: "10px auto" }}
              />
            </Typography>
          </Box>
          <Form.Select
            value={residentialCountryx || ""}
            aria-label="Default select example"
            onChange={handleOnChangeRCCountry}
          >
            <option value="">--Select Country-- *</option>
            {AlCountry.map((apic) => (
              <option key={apic.code3} value={apic.name}>
                {apic.name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            style={{ marginTop: "5px" }}
            value={residentialStatex || ""}
            aria-label="Default select example"
            onChange={handleOnChangeRCState}
          >
            <option value="">--Select State-- *</option>
            {allStates.map((apis) => (
              <option key={apis.code} value={apis.name}>
                {apis.name}
              </option>
            ))}
          </Form.Select>
          <br />
          <Button onClick={handleOpen2} variant="success">
            Preview
          </Button>
          <Button
            onClick={handleUpload}
            disabled={
              residentialCountryx === "" ||
              residentialStatex === "" ||
              file.length === 0
            }
            color="success"
          >
            Upload
          </Button>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box mt={3} sx={style2} className="preview">
          <DataTable
            data={{
              columns: [
                { Header: "From", accessor: "locationA" },
                { Header: "To", accessor: "locationB" },
                { Header: "Amount", accessor: "amount" },
                { Header: "Distance", accessor: "distance" },
              ],
              rows: file.map((r, index) => ({ ...r, id: index })),
            }}
          />
          <Button onClick={handleClose2} color="danger">
            Close
          </Button>
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
