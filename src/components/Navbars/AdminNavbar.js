/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Navigate from "useNavigate";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
} from "reactstrap";
import { Paper } from "@mui/material";
import routes from "routes";
import { validateLocaleAndSetLanguage } from "typescript";

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  const si = window.location.pathname;
  useEffect(() => {
    handleOnGets();
  }, []);

  // if ()
  const handleOnGets = () => {
    // const route = routes;
    // const filterAdmin = route.filter((val) => val.admin === true);
    // console.log(filterAdmin);
    const adminStudent = JSON.parse(localStorage.getItem("adminStudent"));
    console.log(adminStudent);
    // const mapp = route.map((val) => {
    if (adminStudent.userType === "STAFF") {
      console.log("Admin");
      setShowProfile(true);
    } else if (adminStudent.userType === "STUDENT") {
      console.log("Student");
      setShowProfile(false);
    }
    // });
    // console.log(mapp);

    // console.log(route);
  };

  return (
    <>
      <Navbar
        style={{ visibility: si === "/sign-in" ? "hidden" : "" }}
        className={classNames("navbar-absolute", color)}
        expand="lg"
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              <Paper
                elevation={8}
                style={{
                  width: "120%",
                  textAlign: "center",
                  height: "40px",
                  paddingTop: "10px",
                }}
              >
                {props.brandText}
              </Paper>
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              {/* <InputGroup className="search-bar">
                <Button color="link" onClick={toggleModalSearch}>
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup> */}
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                >
                  <div className="notification d-none d-lg-block d-xl-block" />
                  <i className="tim-icons icon-sound-wave" />
                  <p className="d-lg-none">Notifications</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      This is a school Portal 😀!
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img alt="..." src={require("assets/img/anime3.png")} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Sign out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  {showProfile ? (
                    <NavLink tag="li" onClick={() => Navigate("/adminProfile")}>
                      <DropdownItem className="nav-item">Profile</DropdownItem>
                    </NavLink>
                  ) : (
                    <NavLink
                      tag="li"
                      onClick={() => Navigate("/student-profile-update")}
                    >
                      <DropdownItem className="nav-item">
                        Student Profile
                      </DropdownItem>
                    </NavLink>
                  )}

                  {/* <NavLink tag="li" onClick={() => Navigate("/complete-reset-password")}>
                    <DropdownItem className="nav-item">Change Password</DropdownItem>
                  </NavLink> */}
                  {/* <NavLink tag="li" onClick={() => Navigate("/settings")}>
                    <DropdownItem className="nav-item">Settings</DropdownItem>
                  </NavLink> */}
                  <DropdownItem divider tag="li" />
                  {/* <NavLink tag="li" onClick={() => Navigate("/sign-in")}>
                    <DropdownItem className="nav-item">Sign out</DropdownItem>
                  </NavLink> */}
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default AdminNavbar;
