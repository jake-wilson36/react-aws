import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Table, Modal } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import axios from '../../helpers/axiosutil';

import { regions, TempRegions, GetUserData } from '../../helpers/utility';

import toaster from '../../helpers/toaster';

import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';



const roles = [
  {
    id: 1,
    title: 'Administration'
  },
  {
    id: 2,
    title: 'Operation head'
  },
  {
    id: 3,
    title: 'Regional Manager'
  },
  {
    id: 4,
    title: 'Field Manager'
  },
  {
    id: 5,
    title: 'Field Teams'
  }
]

let initState = {
  user_id: 0,
  first_name: '',
  last_name: '',
  email: '',
  mobile: '',
  password: '',
  role: '',
  region: '',
  dpr_access_r: 0,
  dpr_access_w: 0
};

const Users = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modal_standard, setmodal_standard] = useState(false);
  const [users, setUsers] = useState(false);

  useEffect(() => {
    getUsers();
  }, [])

  function tog_standard() {
    debugger
    if (modal_standard == true) {
      initState = {
        user_id: 0,
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        password: '',
        role: '',
        region: '',
        dpr_access_r: 0,
        dpr_access_w: 0
      };
    }
    setmodal_standard(!modal_standard);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }


  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is a required field."),
    last_name: Yup.string().required("Last name is a required field."),
    email: Yup.string().email().required("Email is a required field."),
    mobile: Yup.string().matches(/^[6-9]\d{9}$/, { message: "Please enter valid number.", excludeEmptyString: false }).required(),
    password: Yup.string().required("Password is a required field."),
    role: Yup.string().required("Role is a required field."),
    region: Yup.string().required("Region is a required field.")
  });

  function getUsers() {
    axios.get('get-user-list')
      .then(response => {
        if (response.status) {
          setUsers(response.data);
        }
        setIsLoading(false);
      }).catch(error => {
        console.log(error)
        setIsLoading(false);
      }).finally(() => {
        setIsLoading(false);
      });
  }

  function getRoleName(id) {
    const obj = roles.find(x => x.id === id);
    return obj ? obj.title : '';
  }

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const payload = {
        "user_id": values.user_id,
        "first_name": values.first_name,
        "last_name": values.last_name,
        "email_address": values.email,
        "mobile_no": values.mobile,
        "password": values.password,
        "role_id": values.role,
        "region_id": values.region,
        'dpr_access_r': values.dpr_access_r,
        'dpr_access_w': values.dpr_access_w
      }
      const response = await axios.post('add-update-user', payload);
      if (response.status) {
        getUsers()
        tog_standard();
        toaster.success(response.message);
      } else {
        toaster.error(response.message);
      }

    } catch (err) {
      console.log(err.message)
      setIsLoading(false);
      toaster.error(err.message);
    }
  }

  // function confirmDelete() {

  // }

  function editUsers(data) {
    initState.user_id = data.user_id;
    initState.first_name = data.first_name;
    initState.last_name = data.last_name;
    initState.email = data.email_address;
    initState.mobile = data.mobile_no;
    initState.password = data.password;
    initState.role = data.role_id;
    initState.region = data.region_id;
    initState.dpr_access_r = data.dpr_access_r;
    initState.dpr_access_w = data.dpr_access_w;
    tog_standard();
  }

  function deleteUser(id) {
    axios.delete('active-deactive-user/' + id)
      .then(response => {
        if (response.status) {
          getUsers()
          toaster.success(response.message);
        } else {
          toaster.error(response.message);
        }
        setIsLoading(false);
      }).catch(error => {
        console.log(error)
        setIsLoading(false);
      }).finally(() => {
        setIsLoading(false);
      });
  }

  if (!(GetUserData() && GetUserData().role_id == 1)) {
    return (
      <React.Fragment>
        <div className="page-content text-center">
          <Container fluid>
            <h1>Permission Denied</h1>
          </Container>
        </div>
      </React.Fragment>
    );
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Users" breadcrumbItem="Dashboard" />
          <Modal
            isOpen={modal_standard}
            toggle={() => { tog_standard() }}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">Add User</h5>
              <button
                type="button"
                onClick={() => { { tog_standard() } }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Formik
              initialValues={initState}
              validationSchema={validationSchema}
              validateOnChange
              validateOnBlur
              onSubmit={(values) => {
                handleSubmit(values)
              }}>
              {({ values, handleChange, handleBlur, setFieldValue }) => (
                <Form>
                  <div className="modal-body">
                    <div className="row">
                      <div className="form-group col-lg-6 mb-0">
                        <label htmlFor="example-text-input" className="col-form-label">First name</label>
                        <input className="form-control" type="text" name="first_name" value={values.first_name} onChange={handleChange}
                          onBlur={handleBlur} />
                        <ErrorMessage className="error" name='first_name' component='div' />
                      </div>
                      <div className="form-group col-lg-6 mb-0">
                        <label htmlFor="example-text-input" className="col-form-label">Last name</label>
                        <input className="form-control" type="text" name="last_name" value={values.last_name} onChange={handleChange}
                          onBlur={handleBlur} />
                        <ErrorMessage className="error" name='last_name' component='div' />
                      </div>
                      <div className="form-group col-lg-12 mb-0">
                        <label htmlFor="example-text-input" className="col-form-label" >Email</label>
                        <input className="form-control" type="email" name="email" value={values.email} onChange={handleChange}
                          onBlur={handleBlur} />
                        <ErrorMessage className="error" name='email' component='div' />
                      </div>
                      <div className="form-group col-lg-6 mb-0">
                        <label htmlFor="example-text-input" className="col-form-label">Mobile</label>
                        <input className="form-control" type="text" name="mobile" value={values.mobile} onChange={handleChange}
                          onBlur={handleBlur} />
                        <ErrorMessage className="error" name='mobile' component='div' />
                      </div>
                      <div className="form-group col-lg-6 mb-0">
                        <label htmlFor="example-text-input" className="col-form-label">Password</label>
                        <input className="form-control" type="text" name="password" value={values.password} onChange={handleChange}
                          onBlur={handleBlur} />
                        <ErrorMessage className="error" name='password' component='div' />
                      </div>

                      <div className="form-group col-lg-12 mb-0">
                        <label htmlFor="example-select-input" className="col-form-label" >Role</label>
                        <select className="form-control" id="example-select-input" name="role" value={values.role} onChange={handleChange}
                          onBlur={handleBlur}>
                          <option value="" disabled>Select</option>
                          {roles.map(x => <option value={x.id}>{x.title}</option>)}
                        </select>
                        <ErrorMessage className="error" name='role' component='div' />
                      </div>
                      <div className="form-group col-lg-12 mb-0">
                        <label htmlFor="example-select-input" className="col-form-label" >regions</label>
                        <select className="form-control" id="example-select-input" name="region" value={values.region} onChange={handleChange}
                          onBlur={handleBlur}>
                          <option value="" disabled>Select</option>
                          <option value="7">Access All Regions</option>
                          {regions.map(x => <option value={x.value}>{`${x.title} (${x.display})`} </option>)}
                        </select>
                        <ErrorMessage className="error" name='region' component='div' />
                      </div>
                      <div className="form-group col-lg-12 mb-0" >
                        <label htmlFor="example-select-input" className="col-form-label" >DPR Access</label>
                        <div className="pl-0 d-flex">
                          <div className="custom-control custom-checkbox ml-2 mt-2 pr-2 w-25">
                            <input type="checkbox"
                              id="dpr_access_r1"
                              checked={values.dpr_access_r}
                              name="dpr_access_r"
                              className="custom-control-input"
                              onChange={() => setFieldValue('dpr_access_r', values.dpr_access_r == 0 ? 1 : 0)} onBlur={handleBlur} />
                            <label className="custom-control-label" htmlFor="dpr_access_r1">Read</label>
                          </div>
                          <div className="custom-control custom-checkbox ml-2 mt-2 pr-2 w-25">
                            <input type="checkbox"
                              id="dpr_access_w1"
                              checked={values.dpr_access_w}
                              name="dpr_access_w"
                              className="custom-control-input"
                              onChange={() => setFieldValue('dpr_access_w', values.dpr_access_w == 0 ? 1 : 0)} onBlur={handleBlur} />
                            <label className="custom-control-label" htmlFor="dpr_access_w1">Write</label>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" onClick={() => { tog_standard() }} className="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary waves-effect waves-light">Save changes</button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="text-right mb-4">
                    <button className="btn btn-primary" onClick={() => { tog_standard() }}>Add User</button>
                  </div>
                  <div className="table-responsive">
                    <Table className="table-centered table-nowrap table-hover">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col" style={{ width: "70px" }}>#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Mobile</th>
                          <th scope="col">Role</th>
                          <th scope="col">Region</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading && <tr>
                          <td colSpan="6" className="text-center">
                            <b>Loading...</b>
                          </td>
                        </tr>
                        }
                        {(!isLoading && users) && users.map((x, i) =>
                          <tr key={x.user_id}>
                            <td>{i + 1}</td>
                            <td>{x.first_name} {x.last_name}</td>
                            <td>{x.email_address}</td>
                            <td>{x.mobile_no}</td>
                            <td>{getRoleName(x.role_id)}</td>
                            <td>{regions.concat(TempRegions).find(z => z.value == x.region_id).title}</td>


                            <td>
                              {x.user_id != 1 &&
                                <button className="btn btn-info btn-sm mr-1" onClick={() => { editUsers(x) }}>
                                  <i className="fa fa-pencil"></i>
                                </button>
                              }

                              {x.user_id != 1 &&
                                <button className="btn btn-danger btn-sm" onClick={() => { deleteUser(x.user_id) }} >
                                  <i className="fa fa-trash"></i>
                                </button>
                              }



                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );

}

export default Users;