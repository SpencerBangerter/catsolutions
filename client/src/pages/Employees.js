import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [updatedEmployeeObject, setUpdateEmployeeObject] = useState({});

  const [editState, setEditState] = useState({
    locked: true,
    _id: "",
  });
  useEffect(() => {
    loadEmployees();
  }, []);

  //Get employee
  function loadEmployees() {
    API.getEmployees()
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  }

  //update employee
  const updateEmployee = (id, employeeData) => {
    API.updateEmployee(id, employeeData)
      .then(loadEmployees)
      .then(switchEditState)
      .catch((err) => console.log(err));
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

  //Add employee when button click
  function handleFormSubmit(event) {
    event.preventDefault();
    if (
        formObject.name &&
        formObject.address &&
        formObject.city &&
        formObject.state &&
        formObject.zip
   
    ) {
      API.insertEmployee({
        // employee DATA HERE
        name: formObject.name,
        address: formObject.address,
        city: formObject.city,
        state: formObject.state,
        zip: formObject.zip
      })
        .then((res) => loadEmployees())
        .then(clearForm())
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="container">
      <h1>Employees</h1>
      {employees.length ? (
        employees.map((employee) => (
          <Accordion key={employee._id}>
            <Card style={{ marginBottom: "10px", borderRadius: "5px"}}>
              <Accordion.Toggle as={Card.Header} eventKey="0" style={{ background: "light-grey" }}>
                {employee.name}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <form>
                    <Row>
                      <Input
                        data-value={employee._id}
                        label="Employee Name"
                        onChange={handleInputChangeUpdateEmployee}
                        name="name"
                        placeholder={employee.name}
                        width={12}
                        disabled={employee._id === editState._id ? false : true}
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
                        disabled={employee._id === editState._id ? false : true}
                      />
                      <Input
                        data-value={employee._id}
                        label="City"
                        onChange={handleInputChangeUpdateEmployee}
                        name="city"
                        placeholder={employee.city}
                        width={3}
                        disabled={employee._id === editState._id ? false : true}
                      />
                      <Input
                        data-value={employee._id}
                        label="State"
                        onChange={handleInputChangeUpdateEmployee}
                        name="state"
                        placeholder={employee.state}
                        width={2}
                        disabled={employee._id === editState._id ? false : true}
                      />
                      <Input
                        data-value={employee._id}
                        label="Zip"
                        onChange={handleInputChangeUpdateEmployee}
                        name="zip"
                        placeholder={employee.zip}
                        width={2}
                        disabled={employee._id === editState._id ? false : true}
                      />
                    </Row>                
                    <Row>
                      <div className="col">
                      <Button onClick={() => switchEditState(employee._id)}>
                        {employee._id === editState._id
                          ? "Cancel Update"
                          : "Update This Employee"}
                      </Button>
                      {employee._id === editState._id ? (
                        <Button variant={"success"}
                          onClick={() =>
                            updateEmployee(employee._id, updatedEmployeeObject)
                          }
                        >
                          Save and Update
                        </Button>
                      ) : (
                          ""
                        )}
                      {employee._id === editState._id ? (
                        ""
                      ) : (
                          <Button variant={"danger"} className={"float-right"} onClick={() => deleteEmployee(employee._id)}>
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
          <p>No Results</p>
        )}
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Add Employee
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
             {/*NEEDS TO ADD THE Employee FIELD*/}
                <FormBtn
                  disabled={
                    !(
                      formObject.name &&
                      formObject.address &&
                      formObject.city &&
                      formObject.state &&
                      formObject.zip
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
      </Accordion>
    </div>
  );
}
