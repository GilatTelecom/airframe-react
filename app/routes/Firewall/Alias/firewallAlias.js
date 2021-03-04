import React, {useState, useEffect} from 'react';
import { Row, Col, CardBody, Card, Badge } from './../../../components';
import axios from "axios"
import { getParsedJwt } from "../../../provider"

import {
    AdvancedTable
} from './components';
import { HeaderMain } from "../../components/HeaderMain";
import { CardHeader } from 'reactstrap';


const sortCaret = (order) => {
    if (!order)
        return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order)
        return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>
};

export function FirewallAlias() {

    const [ruleValues, setRuleValues] = useState(0);

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

            axios.get("http://172.31.0.25/api/v1/firewall/rule", {}, {
                headers: {
                    'Content-Type': 'application/json',

                }
            }).then(result => {
                if (result.status === 200) {
                    console.log(result);
                    setRuleValues(result.data.data);
                } else {
                    console.log("Error fetching system values: " + result);
                }
            }).catch(e => {
                console.log("Error fetching system values: " + e);
            });
        }
    }

    return (
        <Card>
        <CardBody>
            
            <HeaderMain 
                title="Routing Rules"
                className="mb-5 mt-4"
            />
            <Row className="mb-5">
                <Col>
                    <AdvancedTable
                        columns={[
                            {
                            dataField: 'protocol',
                            text: 'Protocol',
                            sort: true,
                            sortCaret
                        }, {
                            dataField: 'source',
                            text: 'Source',
                            sort: true,
                            sortCaret
                        }, {
                            dataField: 'destination',
                            text: 'Destination',
                            sort: true,
                            sortCaret
                        }, {
                            dataField: 'descr',
                            text: 'Description',
                            sort: true,
                            sortCaret
                        }]}
                        keyField="tracker"
                        data={
                        Array.isArray(ruleValues) ? ruleValues.map(returnResource => ({
                            ...returnResource,
                            source: returnResource.source.[Object.keys(returnResource.source)[0]],
                            destination: returnResource.destination.[Object.keys(returnResource.source)[0]],
                            
                        })) : []
                    }
                    />
                </Col>
            </Row>

        
        </CardBody>
    </Card>
    );
}

export default FirewallAlias;