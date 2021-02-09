import React from 'react';
import Led from './Led.js';

const styles = {
    leds: {
        width: 'fit-content',
        margin: 'auto',
        display: 'grid',
        gridAutoFlow: 'column',
    }
};

export default function Leds() {
    return (
        <div style={styles.leds}>
            <Led />
            <Led />
            <Led />
            <Led />
            <Led />
            <Led />
            <Led />
            <Led />
        </div>
    );
}
