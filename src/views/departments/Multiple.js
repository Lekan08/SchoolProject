/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import Papa from "papaparse";
import { Button } from "reactstrap";
import { Typography, Box, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PHeaders from "postHeader";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp, School } from "@mui/icons-material";
import { Card } from "@mui/material";
import {
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  CardBody,
  //   Card,
} from "reactstrap";
import example from "./example.jpg";
import DataTable from "examples/TableList";

export default function DepartmentMultiple() {
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
  const navigate = useNavigate();
  const [file, setFile] = useState([]);

  const [opened, setOpened] = useState(false);
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        const obj = results.data.map((r) => ({
          name: r.name,
          state: r.state.charAt(0).toUpperCase() + r.state.slice(1),
          country: r.country.charAt(0).toUpperCase() + r.country.slice(1),
          descrip: r.description,
        }));
        setFile(obj);
      },
    });
  };
  const handleUpload = () => {
    setOpened(true);
    handleClose();
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(file),
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_MAZA_URL}/locations/add`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        setOpened(false);
        if (result.status === "SUCCESS") {
          Swal.fire({
            title: result.status,
            icon: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
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
      <Card mx={2}>
        <CardBody style={{ textAlign: "center" }}>
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
              Add Departments Through CSV
            </Typography>
          </Button>
          <br />
          {/* <Typography mt={2}>
            <u>Before Proceeding Please Read carefully:</u>
          </Typography>
          <Box p={3} mt={1}>
            <Typography
              // variant="h4"
              fontWeight="regular"
              // fontSize="75%"
              textAlign="left"
              color="text"
            >
              In your excelsheet csv file, the first line or row must be exactly
              the same as the words in the image below in row 1 A - D and having
              no spaces in them. Your details in each row should be
              corresponding to the information in the first row (header).
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
          <Button onClick={handleOpen2} variant="success">
            Preview
          </Button>
          <Button onClick={handleUpload} color="success">
            Upload
          </Button>
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
                    { Header: "Name", accessor: "name" },
                    { Header: "State", accessor: "state" },
                    { Header: "Country", accessor: "country" },
                    { Header: "Description", accessor: "descrip" },
                  ],
                  rows: file.map((r, index) => ({ ...r, id: index })),
                }}
              />
              <Button onClick={handleClose2} color="danger">
                Close
              </Button>
            </Box>
          </Modal> */}
        </CardBody>
      </Card>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opened}
      >
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
