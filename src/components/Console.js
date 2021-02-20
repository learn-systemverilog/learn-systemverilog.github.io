import React from "react";
import { TextArea } from '@patternfly/react-core';

const styles = {
    console: {
        minHeight: '600px',
        fontFamily: 'Courier New, sans-serif',
    },
}

export default function (props) {
    return (
        <TextArea value={props.value} isReadOnly={true} resizeOrientation="vertical" aria-label="console" style={styles.console} />
    );
}
