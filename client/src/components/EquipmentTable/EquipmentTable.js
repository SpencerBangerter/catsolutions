import React from "react";
import Table from "react-bootstrap/Table";

export default function TableComponent(props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Type</th>
          <th>Model</th>
          <th>Date Issued</th>
          <th>Purchase Date</th>
          <th>Condition</th>
          <th>Initial Cost</th>
          <th>Serial #</th>

        </tr>
      </thead>
      <tbody>
        {props.equipment.map((item) => (
          <tr key={item._id}>
            <td>{item.type}</td>
            <td>{item.model}</td>
            <td>
              {new Intl.DateTimeFormat('en-US').format(new Date(item.dateIssued))}
            </td>
            <td>
              {new Intl.DateTimeFormat('en-US').format(new Date(item.purchaseDate))}
            </td>
            <td>{item.condition}</td>
            <td> 
              {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
              }).format(item.initialCost)}
            </td>
            <td>{item.serialNum}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
