import React, { useState } from 'react';
import ledOn from './ledOn.png';
import ledOff from './ledOff.png';

const styles = {
    led: {
        margin: '8px',
    }
};

export default function Led() {
    const [on, setOn] = useState(false);

    if (on) {
        return <img src={ledOn} style={styles.led} />;
    }

    return <img src={ledOff} style={styles.led} />;
}
