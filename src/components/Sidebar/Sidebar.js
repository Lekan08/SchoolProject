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
/*eslint-disable*/
import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import Navigate from "useNavigate";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Button } from "reactstrap";
import logoz from "../../assets/img/apple-icon.png";

import Box from "@mui/material/Box";

// reactstrap components
import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";
import {
  BackgroundColorContext,
  backgroundColors,
} from "contexts/BackgroundColorContext";
import { Icon } from "@mui/material";

var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebarRef = React.useRef(null);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const handleLogOut = () => {
    localStorage.clear();
    Navigate("/authentication/sign-in", { replace: true });
    window.location.reload();
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  const linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  const { routes, rtlActive, logo } = props;
  let logoImg = null;
  let logoText = null;
  let data11 = JSON.parse(localStorage.getItem("user1"));
  const si = window.location.pathname;
  if (si === "/dashboard") data11 = JSON.parse(localStorage.getItem("user1"));
  // console.log(si);
  // console.log(data11);
  if (si !== "/sign-in") {
    // if (data11 === null) Navigate("/sign-in");
  }
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a
          // href={logo.outterLink}
          className="simple-text logo-mini"
          target="_blank"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logoz} style={{ width: 80, height: 30 }} alt="user" />
          </div>
        </a>
      );
      logoText = (
        <a
          // href="/user-profile"
          className="simple-text logo-normal"
          // target="_blank"
          onClick={props.toggleSidebar}
        >
          {data11?.firstName} {data11?.lastName}
        </a>
      );
    } else {
      logoImg = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logoa" />
          </div>
        </Link>
      );
      logoText = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-normal"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </Link>
      );
    }
  }
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div
          className="sidebar"
          style={{ visibility: si === "/sign-in" ? "hidden" : "" }}
          data={color}
        >
          <div className="sidebar-wrapper" ref={sidebarRef}>
            {logoImg !== null || logoText !== null ? (
              <div className="logo">
                {logoImg}
                {logoText}
              </div>
            ) : null}
            <Nav>
              {JSON.parse(sessionStorage.getItem("admin"))
                ? routes.map((prop, key) => {
                    if (prop.redirect) return null;
                    if (prop.admin)
                      return (
                        <li
                          className={
                            activeRoute(prop.path) +
                            (prop.pro ? " active-pro" : "")
                          }
                          key={key}
                        >
                          <NavLink
                            to={prop.path}
                            className="nav-link"
                            onClick={props.toggleSidebar}
                          >
                            {/* <i className={prop.icon} /> */}
                            {/* <Icon style={{maginTop: "30px"}}>{prop.icon}</Icon> */}
                            <div>
                              <Icon
                                style={{
                                  position: "absolute",
                                  display: "inline-block",
                                }}
                              >
                                {prop.icon}
                              </Icon>
                              <p
                                style={{ marginLeft: "40px", fontSize: "13px" }}
                              >
                                {rtlActive ? prop.rtlName : prop.name}
                              </p>
                            </div>
                          </NavLink>
                        </li>
                      );
                  })
                : routes.map((prop, key) => {
                    if (prop.redirect) return null;
                    if (prop.admin === false)
                      return (
                        <li
                          className={
                            activeRoute(prop.path) +
                            (prop.pro ? " active-pro" : "")
                          }
                          key={key}
                        >
                          <NavLink
                            to={prop.path}
                            className="nav-link"
                            onClick={props.toggleSidebar}
                          >
                            {/* <i className={prop.icon} /> */}
                            {/* <Icon style={{maginTop: "30px"}}>{prop.icon}</Icon> */}
                            <div>
                              <Icon
                                style={{
                                  position: "absolute",
                                  display: "inline-block",
                                }}
                              >
                                {prop.icon}
                              </Icon>
                              <p
                                style={{ marginLeft: "40px", fontSize: "13px" }}
                              >
                                {rtlActive ? prop.rtlName : prop.name}
                              </p>
                            </div>
                          </NavLink>
                        </li>
                      );
                  })}
              <li className="active-pro"></li>
              <Box p={2} mt="auto">
                <Button
                  color="secondary"
                  onClick={() => Navigate("/sign-in")}
                >
                  Sign Out
                </Button>
              </Box>
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string,
  }),
};

export default Sidebar;
