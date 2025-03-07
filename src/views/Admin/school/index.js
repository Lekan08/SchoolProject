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
import Typography from "@mui/material/Typography";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Box } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FloatingLabel } from "react-bootstrap";

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
  const [websitex, setWebsite] = useState("");
  const [phonex, setPhone] = useState("");
  const [yearEst, setYearEst] = useState(new Date());
  const [visionStatementx, setVisionStatement] = useState("");
  const [missionStatementx, setMissionStatement] = useState("");

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
    const idx = JSON.parse(localStorage.getItem("user"));
    // console.log(idx);
    const headers = miHeaders;
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/schools/getByIds/${idx.schoolID}`,
      {
        headers,
      }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        console.log(result);
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
        setWebsite(result[0].website);
        setPhone(result[0].phoneNumber);
        const date = parseInt(result[0].yearEstablished);
        console.log(result[0].dateOfBirth);
        console.log(date);
        // setStartDate(new Date(date));
        setYearEst(new Date(date));
        setVisionStatement(result[0].visionStatement);
        setMissionStatement(result[0].missionStatement);
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
    const id = JSON.parse(localStorage.getItem("user1"));

    const yearEsta = new Date(yearEst).getTime();

    const raw = JSON.stringify({
      id: id.schoolID,
      name: name,
      email: email,
      head: head,
      city: city,
      street: street,
      state: residentialStatex,
      country: residentialCountryx,
      schoolType: Number(type),
      phoneNumber: phonex,
      website: websitex,
      yearEstablished: yearEsta,
      visionStatement: visionStatementx,
      missionStatement: missionStatementx,
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
            text: "UPDATED SCHOOL PROFILE SUCCESSFULLY",
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
                <label>School Name</label>
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
                <label>Admin</label>
                <Input
                  // defaultValue={`${data11.lastName}`}
                  placeholder="Admin"
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
            <Col className="pl-md-1" md="4">
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
          </Row>
          <Row>
            <Col className="pl-md-1" md="6">
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
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Website Url</label>
                <Input
                  onChange={(e) => setWebsite(e.target.value)}
                  // defaultValue={`${data11.lastName}`}
                  value={websitex}
                  placeholder="website"
                  //   onChange={() => console.log()}
                  type="text"
                  // value={String(items[0]?.verificationComment)}
                  // disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Typography variant="button" fontWeight="regular" color="text">
                Phone Number
              </Typography>
              <PhoneInput
                value={phonex}
                inputStyle={{ width: "100%" }}
                buttonStyle={{}}
                onChange={setPhone}
              />
            </Col>
            <br />
            <Col sm={6}>
              <Typography
                variant="button"
                fontWeight="regular"
                color="black"
                mt={1}
              >
                Year Established
              </Typography>
              <Box mb={4} mt={1}>
                <div>
                  <style>
                    {`.date-picker input {
                      width: 180%
                 }`}
                  </style>
                  <DatePicker
                    date={yearEst}
                    wrapperClassName="date-picker"
                    placeholder="Select Birth Date"
                    dateFormat="dd/MM/yyyy"
                    confirmBtnText="Confirm"
                    showCancelButton="true"
                    customStyles={{
                      placeholderText: {
                        fontSize: 5,
                      },
                      dateIcon: {
                        height: 0,
                        width: 0,
                      },
                      dateText: {
                        color: "#b3b4b5",
                        fontSize: 16,
                      },
                      dateInput: {
                        borderWidth: 0,
                      },
                    }}
                    selected={yearEst}
                    onChange={(date) => setYearEst(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
              </Box>
            </Col>
          </Row>
          <Row>
            <Col sm={6} style={{ marginBottom: "10px" }}>
              <Form.Group>
                <FloatingLabel
                  controlId="visionStatement"
                  label="Vision Statement"
                >
                  <Form.Control
                    type="text"
                    value={visionStatementx}
                    onChange={(e) => setVisionStatement(e.target.value)}
                    // placeholder="First name"
                    required
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  Do not leave empty
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6} style={{ marginBottom: "10px" }}>
              <FloatingLabel
                controlId="misionstatement"
                label="Mision Statement"
              >
                <Form.Control
                  type="text"
                  value={missionStatementx}
                  onChange={(e) => setMissionStatement(e.target.value)}
                  // placeholder="Last name"
                  required
                />
              </FloatingLabel>
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
            color="info"
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
