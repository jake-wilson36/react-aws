import React, { useState, useEffect, useRef, Fragment } from 'react'; //, { useState }

import { connect } from "react-redux";
// import { Row, Col } from "reactstrap";

import { Link } from "react-router-dom";

// Reactstrap
// import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

// import megamenuImg from "../../assets/images/megamenu-img.png";
import logo from "../../assets/images/apazuc/fips-logo.png";

// Redux Store
import { showRightSidebarAction, toggleLeftmenu, changeSidebarType } from "../../store/actions";

//Import Functions 
import { GetUserData, Roles, GetTwoName, regions, isConnection } from '../../helpers/utility';


const version_system = "V6.26.0";

const Header = (props) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    props.toggleLeftmenu(!props.leftMenu);
    if (props.leftSideBarType === "default") {
      props.changeSidebarType("condensed", isMobile);
    } else if (props.leftSideBarType === "condensed") {
      props.changeSidebarType("default", isMobile);
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex" style={{ width: "100%", justifyContent: "center" }}>
            <h1 className='pt-3 text-center'>Physical Shopping Stores</h1>
          </div>

          {(GetUserData() && regions.some(x => x.value == GetUserData().region_id)) && <strong> Region : {`${regions.find(x => x.value == GetUserData().region_id).display}`}</strong>}
          {GetUserData() &&
            <div className="d-flex">
              <ProfileMenu />
            </div>
          }

        </div>
      </header>
    </React.Fragment>
  );
}
const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, { showRightSidebarAction, toggleLeftmenu, changeSidebarType })(Header);
