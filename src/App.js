import React, { useState } from "react";
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { Spinner, Button } from '@patternfly/react-core';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';
import { Bullseye, Stack, StackItem, } from '@patternfly/react-core';
import { Page, PageHeader, PageHeaderTools, PageSection, PageSectionVariants } from '@patternfly/react-core';
import Simulator from "./components/Simulator.js";
import EditorCard from "./components/EditorCard.js";
import ConsoleCard from "./components/ConsoleCard.js";

function App() {
  const [logs, setLogs] = useState('');
  const [transpiledCode, setTranspiledCode] = useState('');

  function clearLogs() {
    setLogs('');
  }

  const [isSignedIn, setIsSignedIn] = useState(undefined);

  const onSignInSuccess = (response) => {
    console.log(response);

    setIsSignedIn(true);
  }
  const onSignInAutoLoadFinished = (isSignedIn) => {
    setIsSignedIn(isSignedIn);
  }

  const onSignInFailure = (response) => {
    console.log(response);
  }

  const onLogoutSuccess = () => {
    setIsSignedIn(false);
  }

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess: onSignInSuccess,
    onAutoLoadFinished: onSignInAutoLoadFinished,
    onFailure: onSignInFailure,
    isSignedIn: true,
    cookiePolicy: 'single_host_origin',
  });

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess: onLogoutSuccess,
  });

  const Header = (
    <PageHeader logo="Learn SystemVerilog" headerTools={
      <PageHeaderTools>
        {isSignedIn === false &&
          <Button variant="primary" onClick={signIn}>Sign in</Button>
        }
        {isSignedIn === true &&
          <Button variant="secondary" onClick={signOut}>Log out</Button>
        }
        {isSignedIn === undefined &&
          <Spinner size="lg" />
        }
      </PageHeaderTools>
    } />
  );

  return (
    <Page header={Header}>
      <PageSection variant={PageSectionVariants.default}>
        <Stack hasGutter>
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
      </PageSection>
    </Page>
  );
}

export default App;
