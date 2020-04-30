import React from "react";
import Col from "react-bootstrap/Col";
import "./index.css"
// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <Col md={props.width}>
      <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input className={`form-control`} {...props} />
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
  return (
    <div className="form-group">
      <label htmlFor="selectOffice">{props.label}</label>
      <select className="form-control" {...props} id="selectOffice">
        <option value={0}>None</option>
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
  );
}
