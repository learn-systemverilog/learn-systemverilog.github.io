import React, { useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { Dropdown, DropdownItem, DropdownToggle } from '@patternfly/react-core';

export default function PageHeaderUser(props) {
    const user = props.user;
    const setUser = props.setUser;

    const [isOpen, setIsOpen] = useState(false);

    const onToggle = (isOpen) => {
        setIsOpen(isOpen);
    };

    const onSelect = () => {
        setIsOpen(false);
    };

    const onSignInSuccess = (response) => {
        setUser(user => ({
            ...user,
            isSignedIn: true,
            imageUrl: response.profileObj.imageUrl,
            name: response.profileObj.name,
            givenName: response.profileObj.givenName,
            email: response.profileObj.email,
            tokenId: response.tokenId,
        }));
    }

    const onSignInAutoLoadFinished = (isSignedIn) => {
        if (!isSignedIn) {
            setUser({ isSignedIn: isSignedIn });
        }
    }

    const onSignInFailure = (response) => {
        console.log(response);
    }

    const onLogoutSuccess = () => {
        setUser({ isSignedIn: false });
    }

    const { signIn } = useGoogleLogin({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        buttonText: "Sign in with Google",
        onSuccess: onSignInSuccess,
        onAutoLoadFinished: onSignInAutoLoadFinished,
        onFailure: onSignInFailure,
        isSignedIn: true,
        cookiePolicy: 'single_host_origin'
    });

    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        onLogoutSuccess: onLogoutSuccess,
    });

    const dropdownToggle = (
        <DropdownToggle isDisabled={user.isSignedIn === undefined} onToggle={onToggle}>
            {user.isSignedIn === true
                ? user.email
                : user.isSignedIn === false
                    ? 'Sign in'
                    : 'Loading...'
            }
        </DropdownToggle>
    );

    const dropdownItemsSignedIn = [
        <DropdownItem key="signout" onClick={signOut}>Sign out</DropdownItem>
    ];

    const dropdownItemsLoggedOut = [
        <DropdownItem key="signin" onClick={signIn}>Sign in with Google</DropdownItem>
    ];

    const dropdownItems = () => {
        if (user.isSignedIn) {
            return dropdownItemsSignedIn;
        }

        return dropdownItemsLoggedOut;
    };

    return (
        <Dropdown isPlain position="right" isOpen={isOpen} onSelect={onSelect} toggle={dropdownToggle} dropdownItems={dropdownItems()} />
    );
}
