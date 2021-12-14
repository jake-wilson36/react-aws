import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

//Import Functions 
import { GetUserData, Roles, GetTwoName, regions } from '../../../helpers/utility';

// users
import user1 from '../../../assets/images/users/avatar-1.jpg';

//ProfileMenu compoent
const ProfileMenu = (props) => {

    // Declare a new state variable, which we'll call "menu"
    const [menu, setMenu] = useState(false);

    const [username, setusername] = useState("Admin");

    useEffect(() => {
      
    }, []);

    return (
        <React.Fragment>
            <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block" >
                <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                    <span className="d-none d-xl-inline-block ml-2 mr-1">{`${username}`} <br /><strong></strong></span>
                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </DropdownToggle>
                <DropdownMenu right>
                    <div className="dropdown-divider"></div>
                    <Link to="/logout" className="dropdown-item">
                        <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
                        <span>Logout</span>
                    </Link>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    // const { error, success } = state.Profile;
    // return { error, success };
    return {};
}

export default withRouter(connect(mapStatetoProps, {})(ProfileMenu));

