import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Input, FormBtn, TextArea, SelectEmployee } from "../components/Form";
import { Navbar, Row, Col, Card, Accordion, Button } from "react-bootstrap";
import Loader from "../components/Loader/Loader";
import PickDate from "../components/DatePicker/DatePicker";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [updatedEquipmentObject, setUpdateEquipmentObject] = useState({});
  const [employeeNameList, setEmployeeeNameList] = useState([]);

  const [editState, setEditState] = useState({
    locked: true,
    _id: "",
  });
  useEffect(() => {
    loadEquipment();
    loadEmployeeNames();
  }, []);

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

  return (
    <div>
      <Navbar className="mr-5 pt-3 shadow">
        <Navbar.Brand className="ml-auto">
          <i className="fas fa-cat mr-5" style={{color: "#ffffff", fontSize: "1.6em" }}></i>
        </Navbar.Brand>
      </Navbar>
      <div className="container shadow-sm">
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
                    >
                      <h6 style={{ color: "#1F2833", fontFamily: "Roboto, sans-serif", fontSize: "1.15em" }}>
                        <i className="fas fa-toolbox mr-3"></i>
                        {equipment.type + " " + equipment.model}
                        <i className="fas fa-caret-down float-right mt-1"></i>
                      </h6>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <form>
                          <Row>
                            {equipment._id === editState._id ?
                              <i className="fas fa-lock-open ml-3 "></i>
                              : <i className="fas fa-lock ml-3 "></i>}
                            <SelectEmployee
                              label="Assigned Employee"
                              onChange={(e) => handleSelectEmployeeChange(e, equipment)}
                              options={employeeNameList}
                              value={equipment.employee_id}
                              width={12}
                              disabled={equipment._id === editState._id ? false : true}
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
                            <Input
                              data-value={equipment._id}
                              label="Purchase Date"
                              onChange={handleInputChangeUpdateEquipment}
                              name="purchaseDate"
                              placeholder={equipment.purchaseDate}
                              width={2}
                              disabled={
                                equipment._id === editState._id ? false : true
                              }
                            />
                            <Input
                              data-value={equipment._id}
                              label="Date Issued"
                              onChange={handleInputChangeUpdateEquipment}
                              name="dateIssued"
                              placeholder={equipment.dateIssued}
                              width={2}
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
                            <div className="col">
                              <Button variant="outline-info" onClick={() => switchEditState(equipment._id)}>
                                {equipment._id === editState._id
                                  ? "Cancel Update"
                                  : "Update This Equipment"}
                              </Button>
                              {equipment._id === editState._id ? (
                                <Button
                                  variant="outline-success"
                                  onClick={() =>
                                    updateEquipment(
                                      equipment._id,
                                      updatedEquipmentObject
                                    )
                                  }
                                >
                                  Save and Update
                                </Button>
                              ) : (
                                  ""
                                )}
                              {equipment._id === editState._id ? (
                                ""
                              ) : (
                                  <Button
                                    variant="outline-danger"
                                    className="float-right"
                                    onClick={() => deleteEquipment(equipment._id)}
                                  >
                                    Delete
                                  </Button>
                                )}
                            </div>
                          </Row>
                        </form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              ))
            ) : (
                <div>
                  <Loader />
                </div>
              )}
            <Accordion className="ml-2">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <h6 style={{ color: "#1F2833", fontFamily: "Roboto, sans-serif", fontSize: "1.15em" }} className="ml-1">
                    Add Equipment <i className="fas fa-plus float-right mt-1"><i className="fas fa-toolbox float-right ml-1"></i></i>
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
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
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
                      {/*NEEDS TO BE A DROPDOWN. WILL DO LATER*/}
                      <TextArea
                        onChange={handleInputChange}
                        name="condition"
                        placeholder="Condition (required)"
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
                        width={2}
                        value={!updatedEquipmentObject.purchaseDate ? new Date(equipment.purchaseDate) : updatedEquipmentObject.purchaseDate}
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
                      />

                      <PickDate
                        data-value={equipment._id}
                        label="Date Issued"
                        onChange={handleInputChangeUpdateEquipment}
                        name="dateIssued"
                        width={2}
                        onChange={(date) =>
                          handleInputChangeUpdateDatesEquipment(
                            date,
                            "dateIssued"
                          )
                        }
                        value={!updatedEquipmentObject.dateIssued ? new Date(equipment.dateIssued) : updatedEquipmentObject.purchaseDate}
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
                      />
                      <Input
                        onChange={handleInputChange}
                        name="initialCost"
                        placeholder="Initial Cost (required)"
                      />
                      {/*NEEDS TO ADD THE Equipment FIELD*/}
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
                      />
                                              Add New Equipment

                    </form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </div>
    </div>
  );
}