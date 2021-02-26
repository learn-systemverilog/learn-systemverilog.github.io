import React, { useState } from "react";
import { Page, PageHeader, PageHeaderTools, PageSection, PageSectionVariants, Stack, StackItem } from '@patternfly/react-core';
import { Bullseye, Card, CardBody, CardTitle } from '@patternfly/react-core';
import Simulator from "./components/Simulator.js";
import EditorCard from "./components/EditorCard.js";
import ConsoleCard from "./components/ConsoleCard.js";

const styles = {
  stack: {
    width: '70%',
  },
};

function App() {
  const [logs, setLogs] = useState('');
  const [transpiledCode, setTranspiledCode] = useState('');

  function clearLogs() {
    setLogs('');
  }

  const Header = (
    <PageHeader logo="Learn SystemVerilog" headerTools={<PageHeaderTools>header-tools</PageHeaderTools>} />
  );

  return (
    <Page header={Header}>
      <PageSection variant={PageSectionVariants.default}>
        <Bullseye>
          <Stack hasGutter style={styles.stack}>
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
              <ConsoleCard logs={logs} onClearLogs={clearLogs} />
            </StackItem>
          </Stack>
        </Bullseye>
      </PageSection>
    </Page>
  );
}

export default App;
