import React, { useState } from 'react';
import { GoogleLogin, useGoogleLogout } from 'react-google-login';
import { Bullseye, Split, SplitItem } from '@patternfly/react-core';
import { PageHeaderToolsGroup, PageHeaderToolsItem } from '@patternfly/react-core';
import { Avatar, Spinner, Button, Tooltip } from '@patternfly/react-core';

export default function PageHeaderUser() {
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

    return (
        <>
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
        </>
    );
}
