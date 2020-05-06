import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table"
import API from "../utils/API";
import { Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "./page.css";

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
            <Navbar className="mr-5 pt-3 shadow">
                <Navbar.Brand className="ml-auto">
                    <i className="fas fa-cat mr-5" style={{ color: "#ffffff", fontSize: "1.6em" }}></i>
                </Navbar.Brand>
            </Navbar>
            <div className="container shadow-sm">
                <Row>
                    <Col>
                        <div className="page-header">
                            <h1 className=" mb-5 pb-3 page-headerText">
                                Dashboard
                            </h1>
                        </div>
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
                    </Col>
                </Row>
                
            </div>
        </div>
    )
}
