import React, { useState } from "react";
import { Button, PageHeaderToolsItem, Stack, StackItem } from '@patternfly/react-core';
import { Page, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { PageHeader, PageHeaderTools } from '@patternfly/react-core';
import { GithubIcon } from '@patternfly/react-icons';
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

  function githubOnClick() {
    window.open("https://github.com/learn-systemverilog", "_blank");
  }

  const Header = (
    <PageHeader logo="Learn SystemVerilog" headerTools={
      <PageHeaderTools>
        <PageHeaderToolsItem>
          <Button variant="plain" aria-label="Github" onClick={githubOnClick}><GithubIcon /></Button>
        </PageHeaderToolsItem>
        <PageHeaderToolsItem>
          <PageHeaderUser user={user} setUser={setUser} />
        </PageHeaderToolsItem>
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
