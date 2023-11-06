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
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function AdminProfile() {
  const [opened, setOpened] = useState(false);
  const [firstNamex, setFirstName] = useState("");
  const [lastNamex, setLastName] = useState("");
  const [otherNamex, setOtherName] = useState("");
  const [emailx, setEmail] = useState("");
  const [phonex, setPhone] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [sexx, setSex] = useState("");
  const [headOfDepart, setHeadOfDepart] = useState("");
  const [fac, setFac] = useState([]);
  const [facultyx, setFaculty] = useState("");
  const [depart, setDepart] = useState([]);
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
    handleGetFac();
    handleGetDepart();
    const idx = JSON.parse(localStorage.getItem("user"));
    console.log(idx);
    const headers = miHeaders;
    fetch(
      `${process.env.REACT_APP_SCHPROJECT_URL}/staffs/getByIds/${idx.staffID}`,
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
        setFirstName(result[0].firstName);
        setLastName(result[0].lastName);
        setOtherName(result[0].otherName);
        setEmail(result[0].email);
        setPhone(result[0].phoneNumber);
        setFacultyName(result[0].facultyName);
        setDepartment(result[0].depName);
        // setFaculty(result[0].)
        // setStartDate(result[0].dateOfBirth);
        const date = parseInt(result[0].dateOfBirth);
        console.log(result[0].dateOfBirth);
        console.log(date);
        setStartDate(new Date(date));
        setSex(result[0].sex);
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
    const id = JSON.parse(localStorage.getItem("user"));
    const dob = new Date(startDate).getTime();

    const raw = JSON.stringify({
      id: id.id,
      firstName: firstNamex,
      lastName: lastNamex,
      otherName: otherNamex,
      email: emailx,
      phoneNumber: phonex,
      sex: sexx,
      dateOfBirth: dob,
      roleID: id.roleID,
      schoolID: id.schoolID,
      facultyID: facultyx,
      depID: headOfDepart,
      deleteFlag: id.deleteFlag,
      lecturer: id.lecturer,
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
      `${process.env.REACT_APP_SCHPROJECT_URL}/staffs/update`,
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

  //   useEffect(() => {
  const handleGetDepart = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/departments/gets/${schID}`, {
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
        setDepart(result);
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
  //   }, []);

  //   useEffect(() => {
  const handleGetFac = () => {
    setOpened(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    const schID = userInfo.schoolID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SCHPROJECT_URL}/faculties/gets/${schID}`, {
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
        setFac(result);
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
  //   }, []);

  return (
    <div className="content">
      <Card mx={2}>
        <CardBody>
          <AccountBoxIcon
            sx={{
              fontSize: 230,
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
            }}
          />
          <br />
          <Row>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>First Name</label>
                <Input
                  onChange={(e) => setFirstName(e.target.value)}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="First Name"
                  value={firstNamex}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>LastName</label>
                <Input
                  onChange={(e) => setLastName(e.target.value)}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="Last Name"
                  value={lastNamex}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Other Name</label>
                <Input
                  onChange={(e) => setOtherName(e.target.value)}
                  // defaultValue={`${data11.firstName}`}
                  placeholder="First Name"
                  value={otherNamex}
                  //   disabled
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label htmlFor="exampleInputEmail1">Email address</label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={emailx}
                  // value=""
                  placeholder="School mail goes here"
                  type="email"
                />
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Department</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={headOfDepart || ""}
                  aria-label="Default select example"
                  onChange={(e) => setHeadOfDepart(e.target.value)}
                >
                  <option value="">--Department--</option>
                  {depart.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col md="4" className="pl-md-1">
              <FormGroup>
                <label>Faculty</label>
                <Form.Select
                  style={{ marginBottom: "20px" }}
                  value={facultyx || ""}
                  aria-label="Default select example"
                  onChange={(e) => setFaculty(e.target.value)}
                >
                  <option value="">--Faculty--</option>
                  {fac.map((apic) => (
                    <option key={apic.id} value={apic.id}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
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
            <Col sm={4}>
              <Typography
                variant="button"
                fontWeight="regular"
                color="black"
                mt={1}
              >
                Date Of Birth
              </Typography>
              <Box mb={3} mt={1}>
                <div>
                  <style>
                    {`.date-picker input {
                      width: 100%
                 }`}
                  </style>
                  <DatePicker
                    date={startDate}
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
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
              </Box>
            </Col>
            <Col sm={4}>
              <Typography
                variant="button"
                fontWeight="regular"
                color="black"
                mt={1}
              >
                Sex
              </Typography>
              <Box mb={4}>
                {/* <Typography variant="button" fontWeight="regular" color="text">
      School Type
    </Typography> */}
                <Form.Select
                  onChange={(e) => setSex(e.target.value)}
                  value={sexx || ""}
                  aria-label="Default select example"
                >
                  <option>---Sex---</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Box>
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
            Edit Profile
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
