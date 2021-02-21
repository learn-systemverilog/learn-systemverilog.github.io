import React from 'react';
import { Stack, StackItem, Split, SplitItem } from '@patternfly/react-core';
import { Card, CardBody, CardTitle, Button, TextArea } from '@patternfly/react-core';
import { TimesIcon } from '@patternfly/react-icons'

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
                <Stack hasGutter>
                    <StackItem>
                        <TextArea value={props.logs} isReadOnly resizeOrientation="vertical" aria-label="console" style={styles.console} />
                    </StackItem>
                    <StackItem>
                        <Split>
                            <SplitItem isFilled />
                            <SplitItem>
                                <Button variant="secondary" aria-label="clear" icon={<TimesIcon />} onClick={props.onClearLogs}>Clear</Button>
                            </SplitItem>
                        </Split>
                    </StackItem>
                </Stack>
            </CardBody>
        </Card>
    );
}
