import React, { useEffect, useState } from "react";
import API from "../utils/API";
import {
  Card,
  Button,
  Row,
  Col,
  Navbar,
  Accordion,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Input, FormBtn, SelectState } from "../components/Form";
import EmployeeTable from "../components/EmployeeTable/EmployeeTable";
import "./page.css";
import SideNavBar from "../components/SideNav/SideNav";

export default function Offices() {
  const [offices, setOffices] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [updatedOfficeObject, setUpdateOfficeObject] = useState({});
  const [employees, setEmployees] = useState([]);
  const [toggleArrowState, setToggleArrowState] = useState("");
  const [toggleArrowListState, setToggleArrowListState] = useState("");
  const [editState, setEditState] = useState({
    locked: true,
    _id: "",
  });
  const [isValid, setIsValid] = useState({phone: true});

  useEffect(() => {
    loadOffices();
    loadEmployees();
  }, []);

  //Get office
  function loadOffices() {
    API.getOffices()
      .then((res) => setOffices(res.data))
      .catch((err) => console.log(err));
  }

  //Get employee
  function loadEmployees() {
    API.getEmployees()
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  }

  //update office
  const updateOffice = (id, officeData) => {
    API.updateOffice(id, officeData)
      .then(loadOffices)
      .then(switchEditState)
      .catch((err) => console.log(err));
      setIsValid({phone: true});
  };

  //delete office
  function deleteOffice(id) {
    API.deleteOffice(id)
      .then((res) => loadOffices())
      .catch((err) => console.log(err));
  }

  //sets state for form object for its contents
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleInputChangeUpdateOffice(event) {
    const { name, value } = event.target;
    setUpdateOfficeObject({ ...updatedOfficeObject, [name]: value });
  }

  function clearForm() {
    document.getElementById("create-course-form").reset();
  }

  function switchEditState(id) {
    if (editState._id === id) {
      setEditState({
        _id: "",
      });
      setIsValid({phone: true});
    } else {
      setEditState({
        _id: id,
      });
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

  
  function phoneNumberValidator(phoneField) {
    var expression = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const phoneNumber = phoneField.target.value;
    if(phoneNumber) {
      setIsValid({...isValid, phone : phoneNumber.match(expression)});
    }
  }

  const handleSelectStateChange = (event, office) => {
    const selectedState = event.target.value;
    setFormObject({ ...formObject, state: selectedState });
    setUpdateOfficeObject({ ...updatedOfficeObject, state: selectedState });
    if (office) {
      setOffices(
        offices.map((item) => {
          if (item._id === office._id) {
            return { ...item, state: selectedState };
          }
          return item;
        })
      );
    }
  };

  //Add office when button click
  function handleFormSubmit(event) {
    event.preventDefault();
    if (
      formObject.name &&
      formObject.address &&
      formObject.city &&
      formObject.state &&
      formObject.zip &&
      formObject.managementContact &&
      formObject.managementContactPhone
    ) {
      API.insertOffice({
        // office DATA HERE
        name: formObject.name,
        address: formObject.address,
        city: formObject.city,
        state: formObject.state,
        zip: formObject.zip,
        managementContact: formObject.managementContact,
        managementContactPhone: formObject.managementContactPhone,
      })
        .then((res) => loadOffices())
        .then(clearForm())
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <SideNavBar />
      <Navbar className="mr-5 pt-3 shadow">
        <Navbar.Brand className="ml-auto">
          <i
            className="fas fa-cat mr-5"
            style={{ color: "#ffffff", fontSize: "1.6em" }}
          ></i>
        </Navbar.Brand>
      </Navbar>

      <div className="container-fluid shadow-sm">
        <div className="mainbodycontainer">
          <Row>
            <Col>
              <div className="page-header shadow-sm">
                <h1 className=" mb-5 pb-3 page-headerText">Offices</h1>
              </div>
              {offices.length ? (
                offices.map((office) => (
                  <Accordion key={office._id} className="ml-2 mb-1">
                    <Card>
                      <Accordion.Toggle
                        onClick={() => {
                          toggleArrow(office.name);
                        }}
                        as={Card.Header}
                        eventKey="0"
                      >
                        <h6
                          style={{
                            color: "#1F2833",
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "1.15em",
                          }}
                        >
                          <i className="fas fa-building mr-3"></i>
                          {office.name}
                          {toggleArrowState[office.name] === false ? (
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
                              {office._id === editState._id ? (
                                <i className="fas fa-lock-open ml-3 mb-3 "></i>
                              ) : (
                                <i className="fas fa-lock ml-3 mb-3 "></i>
                              )}
                              <Input
                                data-value={office._id}
                                label="Office Name"
                                onChange={handleInputChangeUpdateOffice}
                                name="name"
                                placeholder={office.name}
                                width={12}
                                disabled={
                                  office._id === editState._id ? false : true
                                }
                              />
                            </Row>
                            <Row>
                              <Input
                                data-value={office._id}
                                label="Address"
                                onChange={handleInputChangeUpdateOffice}
                                name="address"
                                placeholder={office.address}
                                width={5}
                                disabled={
                                  office._id === editState._id ? false : true
                                }
                              />
                              <Input
                                data-value={office._id}
                                label="City"
                                onChange={handleInputChangeUpdateOffice}
                                name="city"
                                placeholder={office.city}
                                width={3}
                                disabled={
                                  office._id === editState._id ? false : true
                                }
                              />
                              <SelectState
                                label="State"
                                value={office.state}
                                onChange={(e) =>
                                  handleSelectStateChange(e, office)
                                }
                                name="state"
                                placeholder={office.state}
                                width={2}
                                disabled={
                                  office._id === editState._id ? false : true
                                }
                              />

                              <Input
                                data-value={office._id}
                                label="Zip"
                                onChange={handleInputChangeUpdateOffice}
                                name="zip"
                                placeholder={office.zip}
                                width={2}
                                disabled={
                                  office._id === editState._id ? false : true
                                }
                              />
                            </Row>
                            <Row>
                              <Input
                                data-value={office._id}
                                label="Management Contact"
                                onChange={handleInputChangeUpdateOffice}
                                name="managementContact"
                                placeholder={office.managementContact}
                                width={3}
                                disabled={
                                  office._id === editState._id ? false : true
                                }
                              />
                              <Input
                                data-value={office._id}
                                label="Management Contact Phone"
                                onChange={handleInputChangeUpdateOffice}
                                name="managementContactPhone"
                                placeholder={office.managementContactPhone}
                                width={3}
                                disabled={
                                  office._id === editState._id ? false : true
                                }
                                onBlur={phoneNumberValidator}
                                valid={{
                                  managementContactPhone : office._id === editState._id ? isValid.phone : true ,
                                  message: "Please insert a valid phone number!"
                                }}
                              />
                            </Row>
                            <Row className="mt-5">
                              <div className="col">
                                <Button
                                  variant="outline-info"
                                  onClick={() => switchEditState(office._id)}
                                >
                                  {office._id === editState._id
                                    ? "Cancel Update"
                                    : "Update This Office"}
                                </Button>
                                {office._id === editState._id ? (
                                  <Button
                                    variant="outline-success"
                                    disabled= {!isValid.phone}
                                    onClick={() =>
                                      updateOffice(
                                        office._id,
                                        updatedOfficeObject
                                      )
                                    }
                                  >
                                    Save and Update
                                  </Button>
                                ) : (
                                  ""
                                )}
                                {office._id === editState._id ? (
                                  ""
                                ) : (
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip id="tooltip-disabled">
                                        This office will be permanently deleted!
                                      </Tooltip>
                                    }
                                  >
                                    <Button
                                      variant="outline-danger"
                                      className="float-right"
                                      onClick={() => deleteOffice(office._id)}
                                    >
                                      <span>
                                        <i className="far fa-trash-alt mr-2"></i>
                                        Delete Office
                                      </span>
                                    </Button>
                                  </OverlayTrigger>
                                )}
                              </div>
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
                                      toggleArrowList(office.name);
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
                                      Show Employee List
                                      {toggleArrowListState[office.name] ===
                                      false ? (
                                        <i className="fas fa-caret-up float-right mt-1"></i>
                                      ) : (
                                        <i className="fas fa-caret-down float-right mt-1"></i>
                                      )}
                                    </h6>
                                  </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                      <EmployeeTable
                                        employees={employees.filter(
                                          (employee) =>
                                            employee.office_id === office._id
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
              <Accordion className="ml-2">
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
                      Create Office{" "}
                      <i className="fas fa-plus float-right mt-1">
                        <i className="fas fa-building float-right ml-1"></i>
                      </i>
                    </h6>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <form id="create-course-form">
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
                          name="managementContact"
                          placeholder="Managment Contact Name (required)"
                        />
                        <Input
                          onChange={handleInputChange}
                          name="managementContactPhone"
                          placeholder="Managment Contact Phone (required)"
                          onBlur={phoneNumberValidator}
                          valid={{
                            managementContactPhone : isValid.phone,
                            message: "Please insert a valid phone number!"
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
                              formObject.managementContact &&
                              formObject.managementContactPhone &&
                              isValid.phone

                            )
                          }
                          onClick={handleFormSubmit}
                        >
                          Create New Office
                        </FormBtn>
                      </form>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
