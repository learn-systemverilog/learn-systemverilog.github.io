import React, { useState } from "react";
import { Stack, StackItem } from '@patternfly/react-core';
import { Bullseye, Card, CardBody, CardTitle } from '@patternfly/react-core';
import Simulator from "./components/Simulator.js";
import Console from "./components/Console.js"
import EditorCard from "./components/EditorCard.js";

const styles = {
  padding: {
    paddingTop: '5rem',
    paddingBottom: '5rem',
  },
  stack: {
    width: '70%',
  },
};

function App() {
  const [logs, setLogs] = useState('');
  const [transpiledCode, setTranspiledCode] = useState('');

  return (
    <Bullseye style={styles.padding}>
      <Stack hasGutter={true} style={styles.stack}>
        <StackItem>
          <Card>
            <CardTitle>
              Simulator
          </CardTitle>
            <CardBody>
              <Bullseye>
                <Simulator code={transpiledCode} />
              </Bullseye>
            </CardBody>
          </Card>
        </StackItem>
        <StackItem>
          <EditorCard setLogs={setLogs} setTranspiledCode={setTranspiledCode} />
        </StackItem>
        <StackItem>
          <Card>
            <CardTitle>
              Console
          </CardTitle>
            <CardBody >
              <Console value={logs} />
            </CardBody>
          </Card>
        </StackItem>
      </Stack>
    </Bullseye>
  );
}

export default App;
