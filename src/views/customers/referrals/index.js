import { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import React from "react";
import { Button, Card } from "reactstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navigate from "useNavigate";
import DataTable from "examples/TableList";
import Swal from "sweetalert2";
import GHeaders from "getHeader";
import { Dropdown, Form } from "react-bootstrap";
import { Settings } from "@mui/icons-material";

export default function CustomerReferrals() {
  const { allGHeaders: miHeaders } = GHeaders();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idx = urlParams.get("id");
  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_MAZA_URL}/customers/getForReferral/${idx}`, {
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
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState([]);
  return (
    <div className="content">
      <Paper elevation={8}>
        <Card>
          <Button
            tag="label"
            className="data1"
            color="info"
            style={{
              width: "60vw",
              fontSize: "20px",
              marginRight: "auto",
              marginLeft: "auto",
              height: "50px",
              marginTop: "20px",
            }}
          >
            <Typography
              style={{ color: "white", fontSize: "1.5rem" }}
              variant="h5"
              className="headz"
            >
              All Customers {urlParams.get("name")} has referred
            </Typography>
          </Button>
        </Card>
        <Backdrop
          sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={opened}
        >
          <CircularProgress style={{ color: "white" }} />
        </Backdrop>
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
            { Header: "Balance", accessor: "walletBalance" },
            { Header: "city", accessor: "city" },
            { Header: "state", accessor: "state" },
            { Header: "country", accessor: "country" },

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
                        Navigate(`/customers/view?id=${cell.row.id}`);
                      }}
                    >
                      View
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontweight: "bold", color: "black" }}
                      onClick={() =>
                        Navigate(
                          `/customers/referral?id=${cell.row.id}&name=${cell.row.firstName} ${cell.row.lastName}`
                        )
                      }
                    >
                      View Referrals
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
  );
}
