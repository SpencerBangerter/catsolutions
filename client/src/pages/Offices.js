import React, { useEffect, useState } from "react";
import API from "../utils/API";
export default function Offices() {
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    API.getOffices().then((res) => setOffices(res.data));
  }, []);

  return (
    <div>
      <h1>Offices</h1>
      {offices ? (
        offices.map((office) => <div>{office.name}</div>)
      ) : (
        <p>No Results</p>
      )}
    </div>
  );
}
