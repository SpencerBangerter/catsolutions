import React from "react";
import Col from "react-bootstrap/Col";
import "./index.css";
// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <Col md={props.width}>
      <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input className={"form-control"} {...props}/>  
      </div>
    </Col>
  );
}

export function TextArea(props) {
  return (
    <Col md={props.width}>
      <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <textarea className="form-control" rows="10" {...props} />
      </div>
    </Col>
  );
}

export function FormBtn(props) {
  return (
    <button
      {...props}
      style={{ float: "right", marginBottom: 10 }}
      className="btn btn-success"
    >
      {props.children}
    </button>
  );
}

export function SelectOffice(props) {
  var fakeId = require('mongoose').Types.ObjectId();
  return (
    <Col md={props.width}>
      <div className="form-group">
        <label htmlFor="selectOffice">{props.label}</label>
        <select className="form-control" {...props} id="selectOffice">
          <option value={fakeId}>Remote</option>
          {props.options.length ? (
            props.options.map((opt) => (
              <option key={opt._id} value={opt._id}>
                {opt.name}
              </option>
            ))
          ) : (
            <option className="disabled">No Offices</option>
          )}
        </select>
      </div>
    </Col>
  );
}

export function SelectEmployee(props) {
  var fakeId = require('mongoose').Types.ObjectId();
  return (
    <Col md={props.width}>
      <div className="form-group">
        <label htmlFor="selectEmployee">{props.label}</label>
        <select className="form-control" {...props} id="selectEmployee">
          <option value={fakeId}>None</option>
          {props.options.length ? (
            props.options.map((opt) => (
              <option key={opt._id} value={opt._id}>
                {opt.name}
              </option>
            ))
          ) : (
            <option className="disabled">No Employees</option>
          )}
        </select>
      </div>
    </Col>
  );
}

export function SelectState(props) {
  return (
    <Col>
      <div className="form-group">
        <label htmlFor="selectState">{props.label}</label>
        <select className="form-control" {...props} id="selectState">
          <option disabled value="0" >Select State</option>
          <option value="AL">Alabama</option>
\          <option value="AK">Alaska</option>
          <option value="AS">American Samoa</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">Dist of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="GU">Guam</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="UM">Minor Outlying Islands</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="MP">Northern Mariana Islands</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="PR">Puerto Rico</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="VI">U.S. Virgin Islands</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
      </div>
    </Col>
  );
}
