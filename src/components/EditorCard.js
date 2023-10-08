import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Stack, StackItem, Split, SplitItem, Modal, ModalVariant } from '@patternfly/react-core';
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

    const [isModalOpen, setIsModalOpen] = useState(false);

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
        if (!props.user.isSignedIn) {
            setIsModalOpen(true);
            return;
        }

        setIsTranspiling(true);

        localStorage.setItem(localStorageLastSimulationCodeKey, code);

        let tempCode = '';
        let sse = new WebSocket(process.env.REACT_APP_API_URL);
        log('[local]: Connecting...');

        sse.onopen = function () {
            log('[local]: Connected!');

            sse.send(JSON.stringify({code}));
        }

        sse.onmessage = function(e) {
            const data = JSON.parse(e.data);

            if (data.action === 'output') {
                tempCode += data.message;
            } else if (data.action === 'output-finished') {
                props.setTranspiledCode(tempCode);

                log('[local]: Success! Check the simulator to see the results.');
            } else {
                log(`[${data.action}]: ` + data.message);
            }
        };

        sse.onclose = function () {
            sse.close();

            setIsTranspiling(false);

            log('[local]: Connection closed.');
        }

        sse.onerror = function (e) {
            sse.close();

            setIsTranspiling(false);

            log(`[local]: Connection error: ${e}.`);
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
                                <Modal
                                    variant={ModalVariant.small}
                                    title="You must be signed in"
                                    titleIconVariant="warning"
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                >
                                    To simulate, you must be signed in before.
                                </Modal>
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
