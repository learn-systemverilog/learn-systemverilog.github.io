import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button, Card, CardBody, CardTitle } from '@patternfly/react-core';
import { Toolbar, ToolbarContent, ToolbarGroup, ToolbarItem, Tooltip } from '@patternfly/react-core';
import CodeIcon from '@patternfly/react-icons/dist/js/icons/code-icon';
import RedoIcon from '@patternfly/react-icons/dist/js/icons/redo-icon';
import { defaultCode } from "../constants.js"

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

        const encodedCode = encodeURIComponent(code);

        // TODO: Use env vars.
        let sse = new EventSource("https://learn-systemverilog-api.herokuapp.com/transpile?code=" + encodedCode);
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

            log('[out]: ' + data.stdout);
        });

        sse.addEventListener('stderr', e => {
            const data = JSON.parse(e.data);

            log('[err]: ' + data.stderr);
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
                <div style={styles.editorWrapper}>
                    <Editor height="500px" defaultLanguage="systemverilog" value={code} onChange={onEditorChange} />
                </div>
                <Toolbar id="toolbar-group-types">
                    <ToolbarContent>
                        <ToolbarGroup variant="button-group">
                            <ToolbarItem>
                                <Button variant="primary" isLoading={isTranspiling} isDisabled={isTranspiling} onClick={simulate}>Simulate!</Button>
                            </ToolbarItem>
                        </ToolbarGroup>
                        <ToolbarGroup variant="button-group" alignment={{ default: 'alignRight' }}>
                            <ToolbarItem>
                                <Tooltip content={<div>Reset to last submitted code</div>}>
                                    <Button variant="secondary" aria-label="reload" icon={<RedoIcon />} onClick={reloadCodeFromLastSimulation}>Reload</Button>
                                </Tooltip>
                            </ToolbarItem>
                            <ToolbarItem>
                                <Tooltip content={<div>Reset to default code definition</div>}>
                                    <Button variant="secondary" aria-label="reset" icon={<CodeIcon />} onClick={resetToDefaultCodeDefiniton}>Reset</Button>
                                </Tooltip>
                            </ToolbarItem>
                        </ToolbarGroup>
                    </ToolbarContent>
                </Toolbar>
            </CardBody>
        </Card>
    );
}
