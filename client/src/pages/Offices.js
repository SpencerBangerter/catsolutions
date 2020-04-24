import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";

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

  //insert office
  const addOffice = (officeData) => {
    API.insertOffice(officeData).catch((err) => console.log(err));
  };

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

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

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
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <h1>Offices</h1>
      {offices ? (
        offices.map((office) => <div>{office.name}</div>)
      ) : (
        <p>No Results</p>
      )}

      <form>
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
    </div>
  );
}
