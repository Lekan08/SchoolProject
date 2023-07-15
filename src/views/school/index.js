import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import AllCountriesAndStates from "countries-states-master/countries";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircleSharp, LocationCity } from "@mui/icons-material";
import { Form } from "react-bootstrap";
import { Card } from "@mui/material";
import { Button, FormGroup, Input, Row, Col, CardBody } from "reactstrap";
import Navigate from "useNavigate";

export default function School() {
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [head, setHead] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const [allStates, setAllStates] = useState([]);
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");

  const handleOnChangeRCCountry = (e) => {
    console.log(type);
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
  const [type, setType] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  useEffect(() => {
    setOpened(true);
    const idx = JSON.parse(localStorage.getItem("user1"));
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/schools/getByIds/${idx.schoolID}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        setName(result[0].name);
        setEmail(result[0].email);
        setHead(result[0].head);
        setCity(result[0].city);
        setId(result[0].id);
        setStreet(result[0].street);
        // setResidentialCountry(result[0].country);
        const c = { target: { value: result[0].country } };
        handleOnChangeRCCountry(c);
        setType(String(result[0].schoolType));
        // console.log(result);
        setResidentialState(result[0].state);
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
      id: id,
      name: name,
      email: email,
      head: head,
      city: city,
      street: street,
      state: residentialStatex,
      country: residentialCountryx,
      schoolType: Number(type),
    });
    console.log(raw);
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/schools/update`,
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
        <CardBody>
          <LocationCity
            sx={{
              fontSize: 230,
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
            }}
          />
          <br />
          <Row>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Name</label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="First Name"
                  value={name}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label htmlFor="exampleInputEmail1">Email address</label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  // value=""
                  placeholder="School mail goes here"
                  type="email"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>Head</label>
                <Input
                  // defaultValue={`${data11.lastName}`}
                  placeholder="head"
                  value={head}
                  //   onChange={() => console.log()}
                  type="text"
                  onChange={(e) => setHead(e.target.value)}
                  //   value={items[0]?.walletBalance}
                  // disabled
                />
              </FormGroup>
            </Col>{" "}
            <Col md="6" className="pl-md-1">
              <FormGroup>
                <label>School Type</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={type || ""}
                  aria-label="Default select example"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">--Select Type--</option>
                  <option value="0">University</option>
                  <option value="1">Polytechnic</option>
                  <option value="2">College Of Education</option>
                </Form.Select>
              </FormGroup>
            </Col>{" "}
          </Row>
          <Row>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>City</label>
                <Input
                  // defaultValue={`${data11.city}`}
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  placeholder="City"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-3" md="4">
              <FormGroup>
                <label>Country</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
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
              </FormGroup>
            </Col>
            <Col className="pl-md-3" md="4">
              <FormGroup>
                <label>State</label>
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
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="pl-md-1" md="12">
              <FormGroup>
                <label>Street</label>
                <Input
                  onChange={(e) => setStreet(e.target.value)}
                  // defaultValue={`${data11.lastName}`}
                  value={street}
                  placeholder="street"
                  //   onChange={() => console.log()}
                  type="text"
                  // value={String(items[0]?.verificationComment)}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Button
            variant="gradient"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              marginTop: "20px",
            }}
            color="success"
            onClick={() => handleAdd()}
          >
            Update School Profile
          </Button>
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
