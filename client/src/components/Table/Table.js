import React from "react";
import Table from "react-bootstrap/Table";


export default function TableComponent(props) {
  let rowKey = 0;
  return (
    <div>
      <h3>{props.title}</h3>
    <Table striped bordered hover>
    
      <thead>
        <tr>
        {props.header.map((th) => (
            <th key={th}>{th}</th>
        ))}
        </tr>
      </thead>
      <tbody>
        {props.elements ? props.elements.map((elm) => (
          <tr key={elm._id ? elm._id :rowKey++}>
            {props.keys.map((key) => (
             <td key={key}>{elm[key]}</td>
           ))}
          </tr>
        )): <p>No data</p>}
      </tbody>
    </Table>
    </div>
  );
}
