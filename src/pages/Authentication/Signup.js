import React, { useEffect, useState } from 'react';

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";

import { Auth } from 'aws-amplify';


// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

import Loading from '../../helpers/Loading';
// actions
import { apiError } from '../../store/actions';

// import images
// import profile from "../../assets/images/profile-img.png";
// import logo from "../../assets/images/logo.svg";
// Amplify.configure(awsconfig);

//Signup compoent
const Signup = (props) => {

    useEffect(() => {
        console.log(props);
    }, [props]);


    const [registration, setRegistration] = useState(localStorage.getItem('email') ? true : false);
    const [registerUser, setRegisterUser] = useState(localStorage.getItem('email') ? localStorage.getItem('email') : '');
    // handleValidSubmit
    function handleValidSubmit(event, values) {
        let { fname, lname, password, email } = values;
        Auth.signUp({
            username: email,
            password,
            attributes: {
                email,
                name: `${fname} ${lname}`
            }
        }).then(() => {
            setRegistration(true);
            setRegisterUser(email);
            localStorage.setItem('email', email);
            console.log('Successfully signed up');
        }).catch((err) => { 
            console.log(`Error signing up: ${err}`);
            props.apiError(err.message); 
        });
    }

    async function confirmSignUp(e, value) {
        try {
            const { code } = value;
            await Auth.confirmSignUp(registerUser, code);
            props.history.push('/login');
        } catch (err) {
            console.log('error confirming sign up', err);
            props.apiError(err.message); 
        }
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
                                        {!registration && <AvForm className="form-horizontal" onValidSubmit={(e, v) => { handleValidSubmit(e, v) }}>

                                            {props.error && props.error ? <Alert color="danger">{props.error}</Alert> : null}

                                            <div className="form-group">
                                                <AvField name="fname" label="first name" className="form-control" placeholder="Enter first name" type="text" required />
                                            </div>

                                            <div className="form-group">
                                                <AvField name="lname" label="last name" type="text" required placeholder="Enter Password" />
                                            </div>

                                            <div className="form-group">
                                                <AvField name="email" label="email" className="form-control" placeholder="Enter email" type="text" required />
                                            </div>

                                            <div className="form-group">
                                                <AvField name="password" label="Password" type="password" required placeholder="Enter Password" />
                                            </div>


                                            <div className="mt-3">
                                                <button className="btn btn-primary btn-block waves-effect waves-light" type="signup">create account</button>
                                            </div>

                                        </AvForm>}

                                        {registration && <AvForm className="form-horizontal" onValidSubmit={(e, v) => { confirmSignUp(e, v) }}>

                                            {props.error && props.error ? <Alert color="danger">{props.error}</Alert> : null}

                                            <div className="form-group">
                                                <AvField name="code" label="code" className="form-control" placeholder="Enter code" type="number" required />
                                            </div>

                                            <div className="mt-3">
                                                <button className="btn btn-primary btn-block waves-effect waves-light" type="submit">Submit</button>
                                            </div>

                                        </AvForm>}


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

export default withRouter(connect(mapStatetoProps, { apiError })(Signup));

