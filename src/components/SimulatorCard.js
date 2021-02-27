import React from 'react';
import { Bullseye } from '@patternfly/react-core';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';
import Simulator from "./Simulator.js";


export default function SimulatorCard(props) {
    return (
        <Card>
            <CardTitle>
                Simulator
        </CardTitle>
            <CardBody>
                <Bullseye>
                    <Simulator code={props.code} />
                </Bullseye>
            </CardBody>
        </Card>
    );
}
