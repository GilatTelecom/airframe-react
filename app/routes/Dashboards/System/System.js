import React, { useState, useEffect } from 'react';
import faker from 'faker/locale/en_US';
import {
    Container,
    Row,
    Table,
    Col
} from './../../../components';

import { HeaderMain } from "../../components/HeaderMain";
import {
    CardSystem
} from "./components/CardSystem"
import {
    TrSystem
} from "./components/trSystem"
import axios from "axios"
import { getParsedJwt } from "../../../provider"

const TrColors = [
    {
        fill: "primary-02",
        stroke: "primary"
    },
    {
        fill: "purple-02",
        stroke: "purple"
    },
    {
        fill: "success-02",
        stroke: "success"
    },
    {
        fill: "yellow-02",
        stroke: "yellow"
    }
]


function System() {

    const [systemValues, setSystemValues] = useState(0);
    const [serviceValues, setServiceValues] = useState(0);

    useEffect(() => {
        getValues();

        const interval = setInterval(() => {
            getValues();
        }, 30000);
        return () => clearInterval(interval);

    }, []);

    function getValues() {
        if (getParsedJwt()) {
            axios.defaults.headers.common = { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("tokens"))}` }

            axios.get("http://172.31.0.25/api/v1/status/system", {}, {
                headers: {
                    'Content-Type': 'application/json',

                }
            }).then(result => {
                if (result.status === 200) {

                    setSystemValues(result.data.data);
                } else {
                    console.log("Error fetching system values: " + result);
                }
            }).catch(e => {
                console.log("Error fetching system values: " + e);
            });

            axios.get("http://172.31.0.25/api/v1/services", {}, {
                headers: {
                    'Content-Type': 'application/json',

                }
            }).then(result => {
                if (result.status === 200) {
                    setServiceValues(result.data.data);
                } else {
                    console.log("Error fetching running services: " + result);
                }
            }).catch(e => {
                console.log("Error fetching running services: " + e);
            });

        }
    }

    return (
        <Container>
            <Row className="mb-5">
                <Col lg={12}>
                    <HeaderMain
                        title="System"
                        className="mb-4 mb-lg-5"
                    />
                </Col>
                <Col lg={3} md={6}>
                    <CardSystem
                        title="Memory"
                        badgeColor="primary"
                        pieColor="primary"
                        caret="up"
                        percent="5"
                        value={systemValues.mem_usage * 100}
                    />
                </Col>
                <Col lg={3} md={6}>
                    <CardSystem
                        title="CPU"
                        unit="%"
                        badgeColor="purple"
                        pieColor="purple"
                        caret="down"
                        percent="3"
                        value={Array.isArray(systemValues.load_avg) ? parseInt(systemValues.load_avg[0] * 10) : 0}
                    />
                </Col>
                <Col lg={3} md={6}>
                    <CardSystem
                        title="Traffic"
                        unit="Kb"
                        badgeColor="success"
                        pieColor="success"
                    />
                </Col>
                <Col lg={3} md={6}>
                    <CardSystem
                        title="Disk I/O"
                        unit="%"
                        pieColor="yellow"
                        value={systemValues.disk_usage * 100}
                    />
                </Col>
                <Col lg={12}>
                    <h6 className="mt-5">Running Services</h6>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Memory</th>
                                <th>CPU</th>
                                <th>Traffic</th>
                                <th>Disk I/O</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(serviceValues) && serviceValues.map((service) => (
                                    service.status === "running" &&
                                    <TrSystem
                                        colors={TrColors}
                                        name={service.name}
                                        badge={service.status}
                                        key={service.name}
                                    />
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default System;