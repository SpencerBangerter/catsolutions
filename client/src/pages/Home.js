import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table"
import API from "../utils/API";
import { Row, Col } from "react-bootstrap";

export default function HomePage() {

    const [officeReport, setOfficeReport] = useState([]);
    const [equipReport, setEquipReport] = useState([]);

    useEffect(() => {
        loadReports();
    }, []);


    function loadReports() {
        API.getEquipmentCount()
            .then((res) => {
                let result = [];
                result.push( {
                    name: "Assigned",
                    count :res.data.assignedCount,
                    value: res.data.assignedValue
                });
                result.push({
                    name: "Not assigned",
                    count :res.data.notAssignedCount,
                    value: res.data.notAssignedValue
                });
                setEquipReport(result);
            })
            .catch((err) => console.log(err));
        
            API.getOfficesCount()
            .then((res) => setOfficeReport(res.data))
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <h1>HOME PAGE</h1>
            <Row>
                <Col>
                    <Table
                        header={["Office", "Employees", "Equipment Value"]}
                        keys={["name", "employees", "equipmentValue"]}
                        elements={officeReport}
                        title={"Office"}
                    />
                </Col>
                <Col>
                    <Table
                        header={["Status", "Quantity", "Value"]}
                        keys={["name", "count", "value"]}
                        elements={equipReport}
                        title={"Equipment"}
                    />
                </Col>
            </Row>
        </div>
    )
}
