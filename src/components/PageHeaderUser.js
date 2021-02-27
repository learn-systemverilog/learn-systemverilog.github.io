import React, { useState } from 'react';
import { GoogleLogin, useGoogleLogout } from 'react-google-login';
import { Bullseye, Split, SplitItem } from '@patternfly/react-core';
import { PageHeaderToolsGroup, PageHeaderToolsItem } from '@patternfly/react-core';
import { Avatar, Spinner, Button, Tooltip } from '@patternfly/react-core';

export default function PageHeaderUser(props) {
    const user = props.user;
    const setUser = props.setUser;

    const onSignInSuccess = (response) => {
        setUser(user => ({
            ...user,
            isSignedIn: true,
            imageUrl: response.profileObj.imageUrl,
            name: response.profileObj.name,
            email: response.profileObj.email,
        }));
    }

    const onSignInAutoLoadFinished = (isSignedIn) => {
        setUser(user => ({
            ...user,
            isSignedIn: isSignedIn,
        }));
    }

    const onSignInFailure = (response) => {
        console.log(response);
    }

    const onLogoutSuccess = () => {
        setUser(user => ({
            ...user,
            isSignedIn: false,
        }));
    }

    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        onLogoutSuccess: onLogoutSuccess,
    });

    const AvatarTooltipContent = (
        <div>
            Google Account<br />
            {user.name}<br />
            {user.email}<br />
        </div>
    );

    return (
        <>
            <PageHeaderToolsGroup visibility={{ default: user.isSignedIn !== false ? 'hidden' : 'visible' }}>
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
            {user.isSignedIn === true &&
                <Split hasGutter>
                    <SplitItem>
                        <Bullseye>
                            <Tooltip content={AvatarTooltipContent}>
                                <Avatar src={user.imageUrl} alt="avatar" />
                            </Tooltip>
                        </Bullseye>
                    </SplitItem>
                    <SplitItem>
                        <Button variant="secondary" onClick={signOut}>Log out</Button>
                    </SplitItem>
                </Split>
            }
            {user.isSignedIn === undefined &&
                <Spinner size="lg" />
            }
        </>
    );
}
