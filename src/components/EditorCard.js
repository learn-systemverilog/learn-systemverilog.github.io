import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Stack, StackItem, Split, SplitItem } from '@patternfly/react-core';
import { Button, Card, CardBody, CardTitle, Tooltip } from '@patternfly/react-core';
import { CodeIcon, RedoIcon } from '@patternfly/react-icons'
import { defaultCode } from '../constants.js'

const styles = {
    editorWrapper: {
        borderStyle: 'solid',
        borderWidth: 'thin',
        borderColor: 'var(--pf-global--BorderColor--100)',
    },
};

export default function EditorCard(props) {
    const [code, setCode] = useState('');
    const [isTranspiling, setIsTranspiling] = useState(false);

    const localStorageLastSessionCodeKey = 'lastSessionCode';
    const localStorageLastSimulationCodeKey = 'lastSimulationCode';

    useEffect(() => {
        const localStorageCode = localStorage.getItem(localStorageLastSessionCodeKey);

        if (localStorageCode === null) {
            setCode(defaultCode);
        } else {
            setCode(localStorageCode);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem(localStorageLastSessionCodeKey, code);
        }, 2000);

        return () => clearTimeout(timer);
    }, [code]);

    function log(text) {
        props.setLogs(prev => prev + text + '\n');
    }

    function simulate() {
        setIsTranspiling(true);

        localStorage.setItem(localStorageLastSimulationCodeKey, code);

        const url = new URL('/transpile', process.env.REACT_APP_API_URL);
        url.searchParams.append('code', code);

        // TODO: It can be dangerous! Replace it with something else in the future.
        url.searchParams.append('tokenId', props.user.tokenId);

        let sse = new EventSource(url.href);
        log('[local]: Connecting...');

        sse.onopen = function () {
            log('[local]: Connected!');
        }

        sse.addEventListener('internal', e => {
            const data = JSON.parse(e.data);

            log(`[internal][${data.severity}]: ` + data.message);
        });

        sse.addEventListener('stdout', e => {
            const data = JSON.parse(e.data);

            log('[stdout]: ' + data.stdout);
        });

        sse.addEventListener('stderr', e => {
            const data = JSON.parse(e.data);

            log('[stderr]: ' + data.stderr);
        });

        sse.addEventListener('output', e => {
            const data = JSON.parse(e.data);

            props.setTranspiledCode(data);

            log('[local]: Success! Check the simulator to see the results.');
        });

        sse.onerror = function () {
            sse.close();

            setIsTranspiling(false);

            log('[local]: Connection closed.');
        }
    }

    function onEditorChange(value) {
        setCode(value);
    }

    function reloadCodeFromLastSimulation() {
        setCode(localStorage.getItem(localStorageLastSimulationCodeKey));
    }

    function resetToDefaultCodeDefiniton() {
        setCode(defaultCode);
    }

    return (
        <Card>
            <CardTitle>
                Code Editor
                </CardTitle>
            <CardBody>
                <Stack hasGutter>
                    <StackItem>
                        <div style={styles.editorWrapper}>
                            <Editor height="500px" defaultLanguage="systemverilog" value={code} onChange={onEditorChange} />
                        </div>
                    </StackItem>
                    <StackItem>
                        <Split hasGutter>
                            <SplitItem>
                                <Button variant="primary" isLoading={isTranspiling} isDisabled={isTranspiling} onClick={simulate}>Simulate!</Button>
                            </SplitItem>
                            <SplitItem isFilled />
                            <SplitItem>
                                <Tooltip content={<div>Reset to last submitted code</div>}>
                                    <Button variant="secondary" aria-label="reload" icon={<RedoIcon />} onClick={reloadCodeFromLastSimulation}>Reload</Button>
                                </Tooltip>
                            </SplitItem>
                            <SplitItem>
                                <Tooltip content={<div>Reset to default code definition</div>}>
                                    <Button variant="secondary" aria-label="reset" icon={<CodeIcon />} onClick={resetToDefaultCodeDefiniton}>Reset</Button>
                                </Tooltip>
                            </SplitItem>
                        </Split>
                    </StackItem>
                </Stack>
            </CardBody>
        </Card>
    );
}
