import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
export default function Offices() {
  const [offices, setOffices] = useState([]);
  const [formObject, setFormObject] = useState({});

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
    API.updateOffice(officeData).catch((err) => console.log(err));
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

  function clearForm() {
    document.getElementById("create-course-form").reset();
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
      <h1>Offices</h1>
      {offices.length ? (
        offices.map((office) => (
          <Accordion key={office._id}>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                {office.name}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {office.address}
                  <div>
                    <Button onClick={() => deleteOffice(office._id)}>
                      Delete
                    </Button>
                  </div>
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
