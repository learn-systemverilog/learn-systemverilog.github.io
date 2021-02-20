import React from 'react';
import { TextArea } from '@patternfly/react-core';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

const styles = {
    console: {
        minHeight: '600px',
        fontFamily: 'Courier New, sans-serif',
    },
}

export default function ConsoleCard(props) {
    return (
        <Card>
            <CardTitle>
                Console
            </CardTitle>
            <CardBody >
                <TextArea value={props.logs} isReadOnly resizeOrientation="vertical" aria-label="console" style={styles.console} />
            </CardBody>
        </Card>
    );
}
