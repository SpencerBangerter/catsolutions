import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import API from "../utils/API";
import { Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "./page.css";
import { BarChart, PieChart } from "../components/Chart/Chart";
import SideNavBar from "../components/SideNav/SideNav";
import {useHistory} from "react-router-dom";
import AuthService from '../Services/AuthService';

export default function HomePage() {
  let history = useHistory();
  const [officeReport, setOfficeReport] = useState([]);
  const [equipReport, setEquipReport] = useState([]);
  const [chartData, setChartData] = useState({
    average: {},
    percent: {},
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
          value: res.data.assignedValue,
        });
        result.push({
          name: "Unassigned",
          count: res.data.notAssignedCount,
          value: res.data.notAssignedValue,
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

  function loadAverageGraph() {
    const graph = {
      labels: [],
      data: [],
    };

    officeReport.forEach((office) => {
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
        assignedPercent = Math.round(
          (equipReport[0].count * 100) / totalCount,
          2
        );
        notAssignedPercent = 100 - assignedPercent;
      } else {
        notAssignedPercent = (equipReport[0].count * 100) / totalCount;
        assignedPercent = 100 - notAssignedPercent;
      }
    }
    const data = {
      labels: ["Assigned", "Unassigned"],
      data: [assignedPercent, notAssignedPercent],
    };
    setChartData({ ...chartData, percent: data });
  }

  function handleLogout(){
    AuthService.logout().then(history.push("/"));
  }

  return (
    <div>
      <SideNavBar />
      <Navbar className="mr-5 pt-3 shadow">
        <Navbar.Text onClick={handleLogout} className="ml-auto">
        <i className="fas fa-sign-out-alt mr-1" style={{ color: "#ffffff" }} />
          logout
        </Navbar.Text>
        <Navbar.Brand>
          <i
            className="fas fa-cat mr-5 ml-5"
            style={{ color: "#ffffff", fontSize: "1.6em" }}
          ></i>
        </Navbar.Brand>
      </Navbar>
      <div className="container-fluid shadow-sm">
        <div className="mainbodycontainer">
          <Row>
            <Col>
              <div className="page-header">
                <h1 className=" mb-5 pb-3 page-headerText">Dashboard</h1>
              </div>
            </Col>
          </Row>
          <Row className="ml-2 mb-5">
            <Col md={6}>
              <BarChart
                chart={chartData.average}
                title={"Equipment Costs Per Employees Per Office"}
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
          <Row className="ml-2 mb-5">
            <Col>
              <Table
                header={["Office", "Employees", "Equipment Value(US$)"]}
                keys={["name", "employees", "equipmentValue"]}
                elements={officeReport}
                title={"Offices"}
              />
            </Col>
            <Col>
              <Table
                header={["Status", "Quantity", "Value(US$)"]}
                keys={["name", "count", "value"]}
                elements={equipReport}
                title={"Equipment"}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
