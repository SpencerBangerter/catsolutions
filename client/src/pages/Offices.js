import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form";
import {Card, Button, Row, Col, Navbar, Accordion} from "react-bootstrap";
import Loader from "../components/Loader/Loader";
import EmployeeTable from "../components/EmployeeTable/EmployeeTable"
import "./page.css"
export default function Offices() {
  const [offices, setOffices] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [updatedOfficeObject, setUpdateOfficeObject] = useState({});
  const [employees, setEmployees] = useState([]);
  const [editState, setEditState] = useState({
    locked: true,
    _id: "",
  });
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
    } else {
      setEditState({
        _id: id,
      });
    }
  }

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
      <Navbar className="mr-5 pt-3 shadow">
        <Navbar.Brand className="ml-auto">
        <i className="fas fa-cat" style={{color: "#ffffff", fontSize: "1.6em"}}></i>
            </Navbar.Brand>
      </Navbar>
      <div className="container shadow-sm">
        <Row>
          <Col>
            <div className="page-header shadow-sm">
              <h1 className=" mb-5 pb-3 page-headerText">Offices</h1>
            </div>
            {
              offices.length ? (
                offices.map((office) => (
                  <Accordion key={office._id} className="ml-2 mb-1">
                    <Card>
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey="0"
                      >
                        <h6 style={{color: "#1F2833", fontFamily: "font-family: 'Arvo', serif;"}}>{office.name} <i className="fas fa-caret-down float-right mt-1"></i></h6>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <form>
                            <Row>
                              <Input
                                data-value={office._id}
                                label="Office Name"
                                onChange={handleInputChangeUpdateOffice}
                                name="name"
                                placeholder={office.name}
                                width={12}
                                disabled={office._id === editState._id ? false : true}
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
                                disabled={office._id === editState._id ? false : true}
                              />
                              <Input
                                data-value={office._id}
                                label="City"
                                onChange={handleInputChangeUpdateOffice}
                                name="city"
                                placeholder={office.city}
                                width={3}
                                disabled={office._id === editState._id ? false : true}
                              />
                              <Input
                                data-value={office._id}
                                label="State"
                                onChange={handleInputChangeUpdateOffice}
                                name="state"
                                placeholder={office.state}
                                width={2}
                                disabled={office._id === editState._id ? false : true}
                              />
                              <Input
                                data-value={office._id}
                                label="Zip"
                                onChange={handleInputChangeUpdateOffice}
                                name="zip"
                                placeholder={office.zip}
                                width={2}
                                disabled={office._id === editState._id ? false : true}
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
                                disabled={office._id === editState._id ? false : true}
                              />
                              <Input
                                data-value={office._id}
                                label="Management Contact Phone"
                                onChange={handleInputChangeUpdateOffice}
                                name="managementContactPhone"
                                placeholder={office.managementContactPhone}
                                width={4}
                                disabled={office._id === editState._id ? false : true}
                              />
                            </Row>
                            <Row className="mt-5">
                              <div className="col">
                                <Button variant="outline-info" onClick={() => switchEditState(office._id)}>
                                  {office._id === editState._id
                                    ? "Cancel Update"
                                    : "Update This Office"}
                                </Button>
                                {office._id === editState._id ? (
                                  <Button
                                    variant="outline-success"
                                    onClick={() =>
                                      updateOffice(office._id, updatedOfficeObject)
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
                                    <Button
                                      variant={"outline-danger"}
                                      className={"float-right"}
                                      onClick={() => deleteOffice(office._id)}
                                    >
                                      Delete
                                    </Button>
                                  )}
                              </div>
                            </Row>
                          </form>
                          <br />
                          <Row>
                            <Col>
                              <Accordion>
                                <Card >
                                    <Accordion.Toggle
                                      as={Card.Header}
                                      eventKey="0"

                                    >
                                      Show Employee List
                            </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                      <EmployeeTable employees={employees.filter(employee => employee.office_id === office._id)} />

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
                  <div>
                    <Loader />
                  </div>
                )
            }
            <Accordion className="ml-2">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <h6 style={{color: "#1F2833", fontFamily: "font-family: 'Arvo', serif;"}}>Create Office <i className="fas fa-plus float-right mt-1"><i className="fas fa-building float-right ml-1"></i></i></h6>
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
                      {/*NEEDS TO BE A DROPDOWN. WILL DO LATER*/}
                      <Input
                        onChange={handleInputChange}
                        name="state"
                        placeholder="State (required)"
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
                            formObject.managementContactPhone
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

      </div >
    </div>
  );
}
