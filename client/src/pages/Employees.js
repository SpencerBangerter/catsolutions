import React, { useEffect, useState } from "react";
import API from "../utils/API";
import {
  Navbar,
  Row,
  Col,
  Button,
  Accordion,
  Card,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Input, FormBtn, SelectOffice, SelectState } from "../components/Form";
import EquipmentTable from "../components/EquipmentTable/EquipmentTable";
import "./page.css";
import SideNavBar from "../components/SideNav/SideNav";
import {useHistory} from "react-router-dom";
import AuthService from '../Services/AuthService';

export default function Employees() {
  let history = useHistory();
  const [employees, setEmployees] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [officeNameList, setOfficeNameList] = useState([]);
  const [toggleArrowState, setToggleArrowState] = useState("");
  const [toggleArrowListState, setToggleArrowListState] = useState("");
  const [formObject, setFormObject] = useState({});
  const [updatedEmployeeObject, setUpdateEmployeeObject] = useState({});
  const [isValid, setIsValid] = useState({email: true, phone: true});
  const [authenticatedState, setAuthenticatedState] = useState("user");

  const [editState, setEditState] = useState({
    locked: true,
    _id: "",
  });
  useEffect(() => {
    loadEmployees();
    getOfficeNames();
    loadEquipment();
    checkAuthentication();
  }, []);

  function checkAuthentication() {
    AuthService.isAuthenticated().then(res => setAuthenticatedState(res.user.role));
  }

  //Get equipment
  function loadEquipment() {
    API.getEquipment()
      .then((res) => setEquipment(res.data))
      .catch((err) => console.log(err));
  }

  //Get employee
  function loadEmployees() {
    API.getEmployees()
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  }

  function getOfficeNames() {
    API.getOfficeNames()
      .then((res) => setOfficeNameList(res.data))
      .catch((err) => console.log(err));
  }

  //update employee
  const updateEmployee = (id, employeeData) => {
    API.updateEmployee(id, employeeData)
      .then(loadEmployees)
      .then(switchEditState)
      .catch((err) => console.log(err));
      setIsValid({email: true, phone: true});
  };

  //delete employee
  function deleteEmployee(id) {
    API.deleteEmployee(id)
      .then((res) => loadEmployees())
      .catch((err) => console.log(err));
  }

  //sets state for form object for its contents
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleInputChangeUpdateEmployee(event) {
    const { name, value } = event.target;
    setUpdateEmployeeObject({ ...updatedEmployeeObject, [name]: value });
  }

  const handleSelectOfficeChange = (event, employee) => {
    const office = { _id: event.target.value };
    setFormObject({ ...formObject, office_id: office });
    setUpdateEmployeeObject({ ...updatedEmployeeObject, office_id: office });
    if (employee) {
      setEmployees(
        employees.map((item) => {
          if (item._id === employee._id) {
            return { ...item, office_id: office._id };
          }
          return item;
        })
      );
    }
  };

  const handleSelectStateChange = (event, employee) => {
    const selectedState = event.target.value;
    setFormObject({ ...formObject, state: selectedState });
    setUpdateEmployeeObject({ ...updatedEmployeeObject, state: selectedState });
    if (employee) {
      setEmployees(
        employees.map((item) => {
          if (item._id === employee._id) {
            return { ...item, state: selectedState };
          }
          return item;
        })
      );
    }
  };

  function clearForm() {
    document.getElementById("create-course-form").reset();
    setFormObject({});
  }

  function switchEditState(id) {
    if (editState._id === id) {
      setEditState({
        _id: "",
      });
      setIsValid({email: true, phone: true});
    } else {
      setEditState({
        _id: id,
      });
    }
  }

  //Add employee when button click
  function handleFormSubmit(event) {
    event.preventDefault();
    if (
      formObject.name &&
      formObject.address &&
      formObject.city &&
      formObject.state &&
      formObject.zip &&
      formObject.phone &&
      formObject.email
    ) {
      API.insertEmployee({
        // employee DATA HERE
        name: formObject.name,
        address: formObject.address,
        city: formObject.city,
        state: formObject.state,
        zip: formObject.zip,
        office_id: formObject.office_id,
        phone: formObject.phone,
        email: formObject.email,
      })
        .then((res) => loadEmployees())
        .then(clearForm())
        .catch((err) => console.log(err));
    }
  }

  function toggleArrow(officeName) {
    if (toggleArrowState[officeName] === false) {
      setToggleArrowState({ ...toggleArrowState, [officeName]: true });
    } else {
      setToggleArrowState({ ...toggleArrowState, [officeName]: false });
    }
  }

  function toggleArrowList(officeName) {
    if (toggleArrowListState[officeName] === false) {
      setToggleArrowListState({ ...toggleArrowListState, [officeName]: true });
    } else {
      setToggleArrowListState({ ...toggleArrowListState, [officeName]: false });
    }
  }

  function emailValidator(emailField) {
    const expression = /\S+@\S+\.\S+/;
    const email = emailField.target.value
    if(email !== "") {
      setIsValid({...isValid, email : expression.test(String(email).toLowerCase())});
    }
  }

  function phoneNumberValidator(phoneField) {
    var expression = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const phoneNumber = phoneField.target.value;
    if(phoneNumber) {
      setIsValid({...isValid, phone : phoneNumber.match(expression)});
    }
  }

  function handleLogout(){
    AuthService.logout().then(history.push("/"));
  }

  return (
    <div>
      <SideNavBar />
      <Navbar className="mr-5 pt-3 shadow">
        <Navbar.Text onClick={handleLogout} className="ml-auto">
        <i className="fas fa-sign-out-alt mr-1" style={{ color: "#ffffff" }} />
          logout
        </Navbar.Text>
        <Navbar.Brand>
          <i
            className="fas fa-cat mr-5 ml-5"
            style={{ color: "#ffffff", fontSize: "1.6em" }}
          ></i>
        </Navbar.Brand>
      </Navbar>
      <div className="container-fluid shadow-sm">
        <div className="mainbodycontainer">
          <Row>
            <Col>
              <div className="page-header shadow-sm">
                <h1 className="mb-5 pb-3 page-headerText">Employees</h1>
              </div>
              {employees.length ? (
                employees.map((employee) => (
                  <Accordion key={employee._id} className="ml-2 mb-1">
                    <Card>
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey="0"
                        onClick={() => {
                          toggleArrow(employee.name);
                        }}
                      >
                        {" "}
                        <h6
                          style={{
                            color: "#1F2833",
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "1.15em",
                          }}
                        >
                          <i className="fas fa-user mr-3"></i>
                          {employee.name}
                          {toggleArrowState[employee.name] === false ? (
                            <i className="fas fa-caret-up float-right mt-1"></i>
                          ) : (
                            <i className="fas fa-caret-down float-right mt-1"></i>
                          )}
                        </h6>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <form>
                            <Row>
                              {employee._id === editState._id ? (
                                <i className="fas fa-lock-open ml-4 mb-4"></i>
                              ) : (
                                <i className="fas fa-lock ml-4 mb-4"></i>
                              )}
                              <SelectOffice
                                label="Current Office"
                                onChange={(e) =>
                                  handleSelectOfficeChange(e, employee)
                                }
                                options={officeNameList}
                                value={employee.office_id}
                                width={12}
                                disabled={
                                  employee._id === editState._id ? false : true
                                }
                              />
                            </Row>
                            <Row>
                              <Input
                                data-value={employee._id}
                                label="Employee Name"
                                onChange={handleInputChangeUpdateEmployee}
                                name="name"
                                placeholder={employee.name}
                                width={12}
                                disabled={
                                  employee._id === editState._id ? false : true
                                }
                              />
                            </Row>
                            <Row>
                              <Input
                                data-value={employee._id}
                                label="Address"
                                onChange={handleInputChangeUpdateEmployee}
                                name="address"
                                placeholder={employee.address}
                                width={5}
                                disabled={
                                  employee._id === editState._id ? false : true
                                }
                              />
                              <Input
                                data-value={employee._id}
                                label="City"
                                onChange={handleInputChangeUpdateEmployee}
                                name="city"
                                placeholder={employee.city}
                                width={3}
                                disabled={
                                  employee._id === editState._id ? false : true
                                }
                              />
                              <SelectState
                                label="State"
                                value={employee.state}
                                onChange={(e) =>
                                  handleSelectStateChange(e, employee)
                                }
                                name="state"
                                placeholder={employee.state}
                                width={2}
                                disabled={
                                  employee._id === editState._id ? false : true
                                }
                              />

                              <Input
                                data-value={employee._id}
                                label="Zip"
                                onChange={handleInputChangeUpdateEmployee}
                                name="zip"
                                placeholder={employee.zip}
                                width={2}
                                disabled={
                                  employee._id === editState._id ? false : true
                                }
                              />
                              <Input
                                data-value={employee._id}
                                label="Phone"
                                onChange={handleInputChangeUpdateEmployee}
                                name="phone"
                                placeholder={employee.phone}
                                width={2}
                                disabled={
                                  employee._id === editState._id ? false : true
                                }
                                onBlur={phoneNumberValidator}
                                valid={{
                                  phone : employee._id === editState._id ? isValid.phone : true ,
                                  message: "Please insert a valid phone number!"
                                }}
                              />
                              <Input
                                data-value={employee._id}
                                label="Email"
                                onChange={handleInputChangeUpdateEmployee}
                                name="email"
                                placeholder={employee.email}
                                width={3}
                                disabled={
                                  employee._id === editState._id ? false : true
                                }
                                onBlur={emailValidator}
                                valid={{
                                  email : employee._id === editState._id ? isValid.email : true ,
                                  message: "Please insert a valid e-mail address!"
                                }}
                              />
                            </Row>
                            <Row className="mt-5">
                              {authenticatedState === "admin" ? 
                              <div className="col">
                                <Button
                                  variant="outline-info"
                                  onClick={() => {
                                    switchEditState(employee._id)
                                    setUpdateEmployeeObject({});
                                  }}
                                >
                                  {employee._id === editState._id ? (
                                    <span>
                                      <i className="far fa-window-close mr-2"></i>
                                      Cancel Update
                                    </span>
                                  ) : (
                                    <span>
                                      <i className="far fa-edit mr-2"></i>
                                      Edit Employee
                                    </span>
                                  )}
                                </Button>
                                {employee._id === editState._id ? (
                                  <Button
                                    className="ml-5"
                                    variant="outline-success"
                                    disabled={
                                      !(                               
                                        isValid.phone && isValid.email
                                      )
                                    }
                                    onClick={() =>
                                      updateEmployee(
                                        employee._id,
                                        updatedEmployeeObject
                                      )
                                    }
                                  >
                                    <span>
                                      <i className="far fa-save mr-2"></i>
                                      Save and Update
                                    </span>
                                  </Button>
                                ) : (
                                  ""
                                )}
                                {employee._id !== editState._id ? (
                                  ""
                                ) : (
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip id="tooltip-disabled">
                                        This employee will be permanently
                                        deleted!
                                      </Tooltip>
                                    }
                                  >
                                    <Button
                                      variant="outline-danger"
                                      className="float-right"
                                      onClick={() =>
                                        deleteEmployee(employee._id)
                                      }
                                    >
                                      <span>
                                        <i className="far fa-trash-alt mr-2"></i>
                                        Delete Employee
                                      </span>
                                    </Button>
                                  </OverlayTrigger>
                                )}
                              </div>
                              : <div></div>}
                            </Row>
                          </form>
                          <br />
                          <Row>
                            <Col>
                              <Accordion>
                                <Card>
                                  <Accordion.Toggle
                                    as={Card.Header}
                                    eventKey="0"
                                    onClick={() => {
                                      toggleArrowList(employee.name);
                                    }}
                                  >
                                    <h6
                                      style={{
                                        color: "#1F2833",
                                        fontFamily: "Roboto, sans-serif",
                                        fontSize: "1.15em",
                                      }}
                                    >
                                      <i className="fas fa-list mr-3"></i>
                                      Show Equipment List
                                      {toggleArrowListState[employee.name] ===
                                      false ? (
                                        <i className="fas fa-caret-up float-right mt-1"></i>
                                      ) : (
                                        <i className="fas fa-caret-down float-right mt-1"></i>
                                      )}
                                    </h6>
                                  </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                      <EquipmentTable
                                        equipment={equipment.filter(
                                          (eq) =>
                                            eq.employee_id === employee._id
                                        )}
                                      />
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>
                              </Accordion>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                ))
              ) : (
                <div></div>
              )}
              {authenticatedState === "admin" ? <Accordion className="ml-2">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <h6
                      style={{
                        color: "#1F2833",
                        fontFamily: "Roboto, sans-serif",
                        fontSize: "1.15em",
                      }}
                      className="ml-1"
                    >
                      Add Employee{" "}
                      <i className="fas fa-plus float-right mt-1">
                        <i className="fas fa-user float-right ml-1"></i>
                      </i>
                    </h6>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <form id="create-course-form">
                        <SelectOffice
                          label="Select Office"
                          name="office_id"
                          onChange={handleSelectOfficeChange}
                          options={officeNameList}
                          width={12}
                        />

                        <Input
                          onChange={handleInputChange}
                          name="name"
                          placeholder="Name (required)"
                        />
                        <Input
                          onChange={handleInputChange}
                          name="address"
                          placeholder="Address (required)"
                        />
                        <Input
                          onChange={handleInputChange}
                          name="city"
                          placeholder="City (required)"
                        />
                        <SelectState
                          onChange={handleSelectStateChange}
                          name="state"
                          defaultValue="0"
                        />
                        <Input
                          onChange={handleInputChange}
                          name="zip"
                          placeholder="Zip (required)"
                        />
                        <Input
                          onChange={handleInputChange}
                          name="phone"
                          placeholder="Phone (required)"
                          onBlur={phoneNumberValidator}
                          valid={{
                            phone : isValid.phone,
                            message: "Please insert a valid phone number!"
                          }}
                        />
                         <Input
                        onChange={handleInputChange}
                        name="email"
                        placeholder="Email (required)"
                        onBlur={emailValidator}
                        valid={{
                          email : isValid.email,
                          message: "Please insert a valid e-mail address!"
                        }}            
                        />
                        <FormBtn
                          disabled={
                            !(
                              formObject.name &&
                              formObject.address &&
                              formObject.city &&
                              formObject.state &&
                              formObject.zip &&
                              formObject.phone &&
                              formObject.email &&
                              isValid.phone && isValid.email
                            )
                          }
                          onClick={handleFormSubmit}
                        >
                          Add New Employee
                        </FormBtn>
                      </form>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion> : <div></div>}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
