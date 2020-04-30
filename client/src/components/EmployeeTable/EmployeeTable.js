import React from "react";
import Table from "react-bootstrap/Table";

export default function TableComponent(props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {props.employees.map((emp) => (
          <tr key={emp._id}>
            <td>{emp.name}</td>
            <td>{emp.phone}</td>
            <td>{emp.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
