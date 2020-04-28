import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Offices() {
  const [offices, setOffices] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [updatedOfficeObject, setUpdateOfficeObject] = useState({});

  const [editState, setEditState] = useState({
    locked: true,
    _id: "",
  });
  useEffect(() => {
    loadOffices();
  }, []);

  //Get office
  function loadOffices() {
    API.getOffices()
      .then((res) => setOffices(res.data))
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
    <div className="container">
      <h1>Offices</h1>
      {offices.length ? (
        offices.map((office) => (
          <Accordion key={office._id}>
            <Card style={{ marginBottom: "10px", borderRadius: "5px"}}>
              <Accordion.Toggle as={Card.Header} eventKey="0" style={{ background: "light-grey" }}>
                {office.name}
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
                        width={3}
                        disabled={office._id === editState._id ? false : true}
                      />
                    </Row>

                    <Row>
                      <div className="col">
                      <Button onClick={() => switchEditState(office._id)}>
                        {office._id === editState._id
                          ? "Cancel Update"
                          : "Update This Office"}
                      </Button>
                      {office._id === editState._id ? (
                        <Button variant={"success"}
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
                          <Button variant={"danger"} className={"float-right"} onClick={() => deleteOffice(office._id)}>
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
            Create Office
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
    </div>
  );
}
