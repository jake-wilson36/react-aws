import React, { useState } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions";

import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logo from "../../assets/images/apazuc/fips-logo.png";

//Import Functions 
import { GetUserData, Roles, GetTwoName, regions } from '../../helpers/utility';

//Header compoent
const Header = (props) => {

  const [menu, setMenu] = useState(false);

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
                <span className="logo-lg d-flex">
                  <img src={logo} alt="" height="17" />
                  <label>5.0.0</label>
                </span>
              </Link>

              <Link to="/" className="logo">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
                <span className="logo-lg d-flex">
                  <img src={logo} alt="" height="19" />
                  <label>5.0.0</label>
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
              data-toggle="collapse"
              onClick={() => { props.toggleLeftmenu(!props.leftMenu); }}
              data-target="#topnav-menu-content">
              <i className="fa fa-fw fa-bars"></i>
            </button>

          </div>

          {GetUserData() && regions.some(x => x.value == GetUserData().region_id) && <strong>{`${regions.find(x => x.value == GetUserData().region_id).display}`}</strong>}

          <div className="d-flex">
            {GetUserData() && <ProfileMenu />}
            <div className="dropdown d-inline-block">
              <button
                onClick={() => { props.showRightSidebarAction(!props.showRightSidebar); }}
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect" >
                <i className="bx bx-cog bx-spin"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu };
};

export default connect(mapStatetoProps, { showRightSidebarAction, toggleLeftmenu })(Header);


