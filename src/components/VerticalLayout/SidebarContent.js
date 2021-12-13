import React, { useEffect } from 'react';

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";


import { GetUserData, Roles } from '../../helpers/utility';


const SidebarContent = (props) => {
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    var pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      var matchingMenuItem = null;
      var ul = document.getElementById("side-menu");
      var items = ul.getElementsByTagName("a");
      for (var i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  }

  return (
    <React.Fragment>
      {GetUserData() &&

        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Menu</li>
            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="fa fa-home"></i>
                <span>Dashboards</span>
              </Link>
            </li>
            {GetUserData().role_id == 1 && (
              <li>
                <Link to="/users" className="waves-effect">
                  <i className="fa fa-users"></i>
                  <span>Users</span>
                </Link>
              </li>
            )}

            {GetUserData().role_id == 1 && (
              <li>
                <Link to="/site-details" className="waves-effect">
                  <i className="fa fa-sitemap" aria-hidden="true"></i>
                  <span>Site details list</span>
                </Link>
              </li>
            )}

            {GetUserData().role_id == 1 && (
              <li>
                <Link to="/manage-contact" className="waves-effect">
                  <i className="fa fa-address-book"></i>
                  <span>Manage Contact</span>
                </Link>
              </li>
            )}

            <li>
              <Link to="/Survey" className="waves-effect">
                <i className="fa fa-file"></i>
                <span>Survey</span>
              </Link>
            </li>
            <li>
              <Link to="/installation" className="waves-effect">
                <i className="fa fa-server"></i>
                <span>I & C</span>
              </Link>
            </li>

            {(GetUserData().role_id == 1 || GetUserData().dpr_access_w == 1) && (
              <li className="mm-active">
                <Link to="/dpr-setting" className="waves-effect">
                  <i className="fa fa-file"></i>
                  <span>DPR Setting</span>
                </Link>
              </li>
            )}

            {(GetUserData().role_id == 1 || GetUserData().dpr_access_r == 1) && (
              <li className="mm-active">
                <Link to="/dpr-report" className="waves-effect">
                  <i className="fa fa-file"></i>
                  <span>IPS DPR</span>
                </Link>
              </li>
            )}
            {/* {(GetUserData().role_id == 1 || GetUserData().dpr_access_r == 1) && (
          <li className="mm-active">
            <Link to="/Send-dpr-report" className="waves-effect">
              <i className="fa fa-file"></i>
              <span>Send DPR</span>
            </Link>
          </li>
        )} */}
          </ul>
        </div>

      }
    </React.Fragment>
  );
};

export default withRouter(SidebarContent);
