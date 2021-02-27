import React, { useState } from "react";
import { GoogleLogin, useGoogleLogout } from 'react-google-login';
import { Avatar, Spinner, Button, Tooltip } from '@patternfly/react-core';
import { Bullseye, Stack, StackItem, Split, SplitItem } from '@patternfly/react-core';
import { Page, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { PageHeader, PageHeaderTools, PageHeaderToolsGroup, PageHeaderToolsItem } from '@patternfly/react-core';
import SimulatorCard from "./components/SimulatorCard.js";
import EditorCard from "./components/EditorCard.js";
import ConsoleCard from "./components/ConsoleCard.js";

function App() {
  const [logs, setLogs] = useState('');
  const [transpiledCode, setTranspiledCode] = useState('');

  function clearLogs() {
    setLogs('');
  }

  const [isSignedIn, setIsSignedIn] = useState(undefined);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('?');
  const [email, setEmail] = useState('?');

  const onSignInSuccess = (response) => {
    setImageUrl(response.profileObj.imageUrl);
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);

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

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess: onLogoutSuccess,
  });

  const AvatarTooltipContent = (
    <div>
      Google Account<br />
      {name}<br />
      {email}<br />
    </div>
  );

  const Header = (
    <PageHeader logo="Learn SystemVerilog" headerTools={
      <PageHeaderTools>
        <PageHeaderToolsGroup visibility={{ default: isSignedIn !== false ? 'hidden' : 'visible' }}>
          <PageHeaderToolsItem>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={onSignInSuccess}
              onAutoLoadFinished={onSignInAutoLoadFinished}
              onFailure={onSignInFailure}
              isSignedIn={true}
              cookiePolicy={'single_host_origin'}
            />
          </PageHeaderToolsItem>
        </PageHeaderToolsGroup>
        {isSignedIn === true &&
          <Split hasGutter>
            <SplitItem>
              <Bullseye>
                <Tooltip content={AvatarTooltipContent}>
                  <Avatar src={imageUrl} alt="avatar" />
                </Tooltip>
              </Bullseye>
            </SplitItem>
            <SplitItem>
              <Button variant="secondary" onClick={signOut}>Log out</Button>
            </SplitItem>
          </Split>
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
            <SimulatorCard code={transpiledCode} />
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
