import React from "react";
import DatePicker from 'react-date-picker'

import Col from "react-bootstrap/Col";

export default function PickDate(props) {
  return (
    <Col md={props.width}>
      <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <DatePicker
          className={`form-control`}
          {...props}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </Col>
  );
}
