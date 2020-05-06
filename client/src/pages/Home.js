import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table"
import API from "../utils/API";
import { Row, Col } from "react-bootstrap";
import { BarChart, PieChart } from "../components/Chart/Chart"


export default function HomePage() {

    const [officeReport, setOfficeReport] = useState([]);
    const [equipReport, setEquipReport] = useState([]);
    const [chartData, setChartData] = useState({
        average: {},
        percent: {}
    });

    useEffect(() => {
        loadReports();

    }, []);

    useEffect(() => {
        loadAverageGraph();
    }, [officeReport]);

    useEffect(() => {
        loadPercentGraph();
    }, [equipReport]);

    function loadReports() {
        API.getEquipmentCount()
            .then((res) => {
                let result = [];
                result.push({
                    name: "Assigned",
                    count: res.data.assignedCount,
                    value: res.data.assignedValue
                });
                result.push({
                    name: "Not assigned",
                    count: res.data.notAssignedCount,
                    value: res.data.notAssignedValue
                });
                setEquipReport(result);

            })
            .catch((err) => console.log(err));

        API.getOfficesCount()
            .then((res) => {
                setOfficeReport(res.data);

            })
            .catch((err) => console.log(err));
    }

    function setColors(length) {
        const colors = [];
        for (let i = 0; i < length; i++) {
            colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        }
        console.log(colors);
        return colors;

    }

    function loadAverageGraph() {
        const graph = {
            labels: [],
            data: []
        }

        officeReport.forEach(office => {
            graph.labels.push(office.name);
            graph.data.push(office.equipmentValue / office.employees);
        });

        setChartData({ ...chartData, average: graph });

    }

    function loadPercentGraph() {
        let assignedPercent = 0;
        let notAssignedPercent = 100;
        if (equipReport.length > 0) {
            const totalCount = equipReport[0].count + equipReport[1].count;

            if (equipReport[0].name === "Assigned") {
                assignedPercent = Math.round( (equipReport[0].count * 100) / totalCount, 2);
                notAssignedPercent = 100 - assignedPercent;
            } else {
                notAssignedPercent = (equipReport[0].count * 100) / totalCount;
                assignedPercent = 100 - notAssignedPercent;
            }

        }
        const data = {
            labels: ["Assigned", "Not assigned"],
            data: [assignedPercent, notAssignedPercent]
        }
        console.log(equipReport);
        setChartData({ ...chartData, percent: data });
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
            <Row>
                <Col md={6}>
                    <BarChart
                        chart={chartData.average}
                        title={"Equipment costs by employee/office"}
                        label={"Average costs by office"}
                    />
                </Col>
                <Col md={6}>
                    <PieChart
                        chart={chartData.percent}
                        title={"Assigned Equipment(%)"}
                    />
                </Col>
            </Row>
        </div>
    )
}
