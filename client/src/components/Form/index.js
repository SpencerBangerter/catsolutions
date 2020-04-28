import React from "react";
import Col from "react-bootstrap/Col";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  
  return (
    <Col md={props.width}>
    <div className="form-group">
      <label for={props.name}>{props.label}</label>
      <input className={`form-control`}{...props}/>
    </div>
    </Col>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}
