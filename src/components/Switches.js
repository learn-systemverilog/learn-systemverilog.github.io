import React from 'react';
import Switch from './Switch.js';

const styles = {
    switches: {
        display: 'flex',
        flexDirection: 'row-reverse',
    }
};

export default function Switches() {
    return (
        <div style={styles.switches}>
            <Switch />
            <Switch />
            <Switch />
            <Switch />
            <Switch />
            <Switch />
            <Switch />
            <Switch />
        </div>
    );
}
