import React from 'react';
import Switch from './Switch.js';

const styles = {
    switches: {
        display: 'grid',
        gridAutoFlow: 'column',
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
