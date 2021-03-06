import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Input, FormBtn, TextArea, SelectEmployee } from "../components/Form";
import {
  Navbar,
  Row,
  Col,
  Card,
  Accordion,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import PickDate from "../components/DatePicker/DatePicker";
import SideNavBar from "../components/SideNav/SideNav";
import {useHistory} from "react-router-dom";
import AuthService from '../Services/AuthService';

export default function Equipment() {
  let history = useHistory();
  const [equipment, setEquipment] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [updatedEquipmentObject, setUpdateEquipmentObject] = useState({});
  const [employeeNameList, setEmployeeeNameList] = useState([]);
  const [toggleArrowState, setToggleArrowState] = useState("");
  const [authenticatedState, setAuthenticatedState] = useState("user");

  const [editState, setEditState] = useState({
    locked: true,
    _id: "",
  });
  useEffect(() => {
    loadEquipment();
    loadEmployeeNames();
    checkAuthentication();
  }, []);

  function checkAuthentication() {
    AuthService.isAuthenticated().then(res => setAuthenticatedState(res.user.role));
  }

  function toggleArrow(equipmentName) {
    if (toggleArrowState[equipmentName] === false) {
      setToggleArrowState({ ...toggleArrowState, [equipmentName]: true });
    } else {
      setToggleArrowState({ ...toggleArrowState, [equipmentName]: false });
    }
  }
  // function setPurchaseDate() {}

  // function setIssuedDate() {}
  //Get employee
  function loadEmployeeNames() {
    API.getEmployees()
      .then((res) => setEmployeeeNameList(res.data))
      .catch((err) => console.log(err));
  }

  //Get equipment
  function loadEquipment() {
    API.getEquipment()
      .then((res) => setEquipment(res.data))
      .catch((err) => console.log(err));
  }

  //update equipment
  const updateEquipment = (id, equipmentData) => {
    API.updateEquipment(id, equipmentData)
      .then(loadEquipment)
      .then(switchEditState)
      .catch((err) => console.log(err));
  };

  //delete equipment
  function deleteEquipment(id) {
    API.deleteEquipment(id)
      .then((res) => loadEquipment())
      .catch((err) => console.log(err));
  }

  //sets state for form object for its contents
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleDateChange(date, name) {
    setFormObject({ ...formObject, [name]: date });
  }

  function handleInputChangeUpdateEquipment(event) {
    const { name, value } = event.target;
    setUpdateEquipmentObject({ ...updatedEquipmentObject, [name]: value });
  }
  function handleInputChangeUpdateDatesEquipment(date, name) {
    setUpdateEquipmentObject({ ...updatedEquipmentObject, [name]: date });
  }

  const handleSelectEmployeeChange = (event, eq) => {
    const employee = { _id: event.target.value };
    setFormObject({ ...formObject, employee_id: employee });
    setUpdateEquipmentObject({
      ...updatedEquipmentObject,
      employee_id: employee,
    });
    if (eq) {
      setEquipment(
        equipment.map((item) => {
          if (item._id === eq._id) {
            return { ...item, employee_id: equipment._id };
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
    } else {
      setEditState({
        _id: id,
      });
    }
  }

  //Add equipment when button click
  function handleFormSubmit(event) {
    event.preventDefault();
    if (
      formObject.type &&
      formObject.model &&
      formObject.serialNum &&
      formObject.condition &&
      formObject.purchaseDate &&
      formObject.dateIssued &&
      formObject.initialCost
    ) {
      API.insertEquipment({
        // equipment DATA HERE
        type: formObject.type,
        model: formObject.model,
        serialNum: formObject.serialNum,
        condition: formObject.condition,
        purchaseDate: formObject.purchaseDate,
        dateIssued: formObject.dateIssued,
        employee_id: formObject.employee_id,

        initialCost: formObject.initialCost,
      })
        .then((res) => loadEquipment())
        .then(clearForm())
        .catch((err) => console.log(err));
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
                <h1 className="mb-5 pb-3 page-headerText">Equipment</h1>
              </div>
              {equipment.length ? (
                equipment.map((equipment) => (
                  <Accordion key={equipment._id} className="ml-2 mb-1">
                    <Card>
                      <Accordion.Toggle 
                      as={Card.Header} 
                      eventKey="0"
                      onClick={() => {
                        toggleArrow(equipment._id);
                      }}
                      >
                        <h6
                          style={{
                            color: "#1F2833",
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "1.15em",
                          }}
                        >
                          <i className="fas fa-toolbox mr-3"></i>
                          {equipment.type + " " + equipment.model}
                          {toggleArrowState[equipment._id] === false ? (
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
                              {equipment._id === editState._id ? (
                                <i className="fas fa-lock-open ml-4 mb-4"></i>
                              ) : (
                                <i className="fas fa-lock ml-4 mb-4"></i>
                              )}
                              <SelectEmployee
                                label="Assigned Employee"
                                onChange={(e) =>
                                  handleSelectEmployeeChange(e, equipment)
                                }
                                options={employeeNameList}
                                value={equipment.employee_id}
                                width={12}
                                disabled={
                                  equipment._id === editState._id ? false : true
                                }
                              />
                              <Input
                                data-value={equipment._id}
                                label="Equipment Type"
                                onChange={handleInputChangeUpdateEquipment}
                                name="type"
                                placeholder={equipment.type}
                                width={12}
                                disabled={
                                  equipment._id === editState._id ? false : true
                                }
                              />
                            </Row>
                            <Row>
                              <Input
                                data-value={equipment._id}
                                label="Model"
                                onChange={handleInputChangeUpdateEquipment}
                                name="model"
                                placeholder={equipment.model}
                                width={5}
                                disabled={
                                  equipment._id === editState._id ? false : true
                                }
                              />
                              <Input
                                data-value={equipment._id}
                                label="Serial #"
                                onChange={handleInputChangeUpdateEquipment}
                                name="serialNum"
                                placeholder={equipment.serialNum}
                                width={3}
                                disabled={
                                  equipment._id === editState._id ? false : true
                                }
                              />
                              <TextArea
                                data-value={equipment._id}
                                label="Condition"
                                onChange={handleInputChangeUpdateEquipment}
                                name="condition"
                                placeholder={equipment.condition}
                                width={12}
                                disabled={
                                  equipment._id === editState._id ? false : true
                                }
                              />
                              <PickDate
                                data-value={equipment._id}
                                label="Purchase Date"
                                onChange={(date) =>
                                  handleInputChangeUpdateDatesEquipment(
                                    date,
                                    "purchaseDate"
                                  )
                                }
                                name="purchaseDate"
                                width={3}
                                value={
                                  !updatedEquipmentObject.purchaseDate
                                    ? new Date(equipment.purchaseDate)
                                    : updatedEquipmentObject.purchaseDate
                                }
                                disabled={
                                  equipment._id === editState._id ? false : true
                                }
                              />

                              <PickDate
                                data-value={equipment._id}
                                label="Date Issued"
                                name="dateIssued"
                                width={3}
                                onChange={(date) =>
                                  handleInputChangeUpdateDatesEquipment(
                                    date,
                                    "dateIssued"
                                  )
                                }
                                value={
                                  !updatedEquipmentObject.dateIssued
                                    ? new Date(equipment.dateIssued)
                                    : updatedEquipmentObject.purchaseDate
                                }
                                disabled={
                                  equipment._id === editState._id ? false : true
                                }
                              />
                              <Input
                                data-value={equipment._id}
                                label="Initial Cost"
                                onChange={handleInputChangeUpdateEquipment}
                                name="initialCost"
                                placeholder={equipment.initialCost}
                                width={2}
                                disabled={
                                  equipment._id === editState._id ? false : true
                                }
                              />
                            </Row>
                            <Row className="mt-5">
                              {authenticatedState === "admin" ?
                              <div className="col">
                                <Button
                                  variant="outline-info"
                                  onClick={() => {
                                    switchEditState(equipment._id)
                                    setUpdateEquipmentObject({});
                                  }}
                                >
                                  {equipment._id === editState._id ? (
                                    <span>
                                      <i className="far fa-window-close mr-2"></i>
                                      Cancel Update
                                    </span>
                                  ) : (
                                    <span>
                                      <i className="far fa-edit mr-2"></i>
                                      Edit Equipment
                                    </span>
                                  )}
                                </Button>
                                {equipment._id === editState._id ? (
                                  <Button
                                    className="ml-5"
                                    variant="outline-success"
                                    onClick={() =>
                                      updateEquipment(
                                        equipment._id,
                                        updatedEquipmentObject
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
                                {equipment._id !== editState._id ? (
                                  ""
                                ) : (
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip id="tooltip-disabled">
                                        This equipment will be permanently
                                        deleted!
                                      </Tooltip>
                                    }
                                  >
                                    <Button
                                      variant="outline-danger"
                                      className="float-right"
                                      onClick={() =>
                                        deleteEquipment(equipment._id)
                                      }
                                    >
                                      <span>
                                        <i className="far fa-trash-alt mr-2"></i>
                                        Delete Equipment
                                      </span>
                                    </Button>
                                  </OverlayTrigger>
                                )}
                              </div>
                              : <div></div>}
                            </Row>
                          </form>
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
                      Add Equipment{" "}
                      <i className="fas fa-plus float-right mt-1">
                        <i className="fas fa-toolbox float-right ml-1"></i>
                      </i>
                    </h6>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <form id="create-course-form">
                        <SelectEmployee
                          label="Select Employee"
                          name="employee_id"
                          onChange={handleSelectEmployeeChange}
                          options={employeeNameList}
                          width={12}
                        />
                        <Input
                          onChange={handleInputChange}
                          name="type"
                          placeholder="Type (required)"
                        />
                        <Input
                          onChange={handleInputChange}
                          name="model"
                          placeholder="Model (required)"
                        />
                        <Input
                          onChange={handleInputChange}
                          name="serialNum"
                          placeholder="Serial # (required)"
                        />
                        <TextArea
                          onChange={handleInputChange}
                          name="condition"
                          placeholder="Condition (required)"
                        />
                        <PickDate
                          label="Purchase Date"
                          onChange={(date) =>
                            handleDateChange(date, "purchaseDate")
                          }
                          name="purchaseDate"
                          value={formObject.purchaseDate}
                        />
                        <PickDate
                          label="Date Issued"
                          onChange={(date) =>
                            handleDateChange(date, "dateIssued")
                          }
                          name="dateIssued"
                          value={formObject.dateIssued}
                        />
                        <Input
                          onChange={handleInputChange}
                          name="initialCost"
                          placeholder="Initial Cost (required)"
                        />

                        <FormBtn
                          disabled={
                            !(
                              formObject.type &&
                              formObject.model &&
                              formObject.serialNum &&
                              formObject.condition &&
                              formObject.purchaseDate &&
                              formObject.dateIssued &&
                              formObject.initialCost
                            )
                          }
                          onClick={handleFormSubmit}
                        >
                          Add New Equipment
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
