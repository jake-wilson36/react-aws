import React, { useEffect } from 'react';

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

import Loading from '../../helpers/Loading';
// actions
import { loginUser, apiError } from '../../store/actions';

import { Auth } from 'aws-amplify';

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";

const Login = (props) => {

    useEffect(() => {
        console.log(props);
    }, [props]);
    // handleValidSubmit
    function handleValidSubmit(event, values) {
        let { username, password } = values;
        Auth.signIn(username, password).then((user) => {
            console.log('Successfully signed up');
            localStorage.setItem("authUser", btoa(JSON.stringify(user)));
            props.history.push('/dashboard');
        }).catch((err) => {
            console.log(`Error signing up: ${err}`);
            props.apiError(err.message);
        });
    }

    return (
        <React.Fragment>
            <div className="home-btn d-none d-sm-block">
            </div>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-soft-primary">
                                    <Row>
                                        <Col className="col-12">
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">physical shopping stores </h5>
                                                <p>Sign in to continue.</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div className="p-2">

                                        <AvForm className="form-horizontal" onValidSubmit={(e, v) => { handleValidSubmit(e, v) }}>

                                            {props.error && props.error ? <Alert color="danger">{props.error}</Alert> : null}

                                            <div className="form-group">
                                                <AvField name="username" label="Username" className="form-control" placeholder="Enter username" type="text" required />
                                            </div>

                                            <div className="form-group">
                                                <AvField name="password" label="Password" type="password" required placeholder="Enter Password" />
                                            </div>

                                            <div className="mt-3">
                                                <button className="btn btn-primary btn-block waves-effect waves-light" type="submit">Log In</button>
                                            </div>
                                            <div className="mt-3">
                                                <Link to="/signup"> <button className="btn btn-primary btn-block waves-effect waves-light" type="button">create account</button> </Link>
                                            </div>
                                        </AvForm>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {props.loaderVisibility && <Loading />}

        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    const { error, loaderVisibility } = state.Login;
    return { error, loaderVisibility };
}

export default withRouter(connect(mapStatetoProps, { loginUser, apiError })(Login));

