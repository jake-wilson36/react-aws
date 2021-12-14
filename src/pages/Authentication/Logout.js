import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../../store/actions';

//Logout compoent
const Logout = (props) => {

    useEffect(() => {
        props.logoutUser(props.history);
        localStorage.clear();
      });

    return (
            <Fragment></Fragment>
          );
    }

export default withRouter(
    connect(
        null,
        { logoutUser }
    )(Logout)
);
