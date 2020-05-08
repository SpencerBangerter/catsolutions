import React from "react";
import Table from "react-bootstrap/Table";

export default function TableComponent(props) {
  let rowKey = 0;
  return (
    <div>
      <h2
        style={{
          fontFamily: "Arvo, serif",
        }}
        className="text-center"
      >
        {props.title}
      </h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            {props.header.map((th) => (
              <th key={th}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.elements ? (
            props.elements.map((elm) => (
              <tr key={elm._id ? elm._id : rowKey++}>
                {props.keys.map((key) =>       
                (               
                  <td key={key}>
                    { (key.toLowerCase().includes("value")) ?
                     new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2
                    }).format(elm[key]) 
                    : elm[key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <p>No data</p>
          )}
        </tbody>
      </Table>
    </div>
  );
}
