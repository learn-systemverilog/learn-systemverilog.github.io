import React, { useState } from "react";
import { Stack, StackItem } from '@patternfly/react-core';
import { Page, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { PageHeader, PageHeaderTools } from '@patternfly/react-core';
import SimulatorCard from "./components/SimulatorCard.js";
import EditorCard from "./components/EditorCard.js";
import ConsoleCard from "./components/ConsoleCard.js";
import PageHeaderUser from "./components/PageHeaderUser.js";

function App() {
  const [user, setUser] = useState({});

  const [logs, setLogs] = useState('');
  const [transpiledCode, setTranspiledCode] = useState('');

  function clearLogs() {
    setLogs('');
  }

  const Header = (
    <PageHeader logo="Learn SystemVerilog" headerTools={
      <PageHeaderTools>
        <PageHeaderUser user={user} setUser={setUser} />
      </PageHeaderTools>
    } />
  );

  return (
    <Page header={Header}>
      <PageSection variant={PageSectionVariants.default}>
        <Stack hasGutter>
          <StackItem>
            <SimulatorCard code={transpiledCode} />
          </StackItem>
          <StackItem>
            <EditorCard user={user} setLogs={setLogs} setTranspiledCode={setTranspiledCode} />
          </StackItem>
          <StackItem>
            <ConsoleCard logs={logs} onClearLogs={clearLogs} />
          </StackItem>
        </Stack>
      </PageSection>
    </Page>
  );
}

export default App;
