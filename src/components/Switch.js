import React, { useState } from 'react';
import switchOn from './switchOn.png';
import switchOff from './switchOff.png';

const styles = {
    switch: {
        margin: '8px',
        cursor: 'pointer',
    }
};

export default function Switch() {
    const [on, setOn] = useState(false);

    if (on) {
        return <img src={switchOn} style={styles.switch} onClick={() => { setOn(!on) }} />;
    }

    return <img src={switchOff} style={styles.switch} onClick={() => { setOn(!on) }} />;
}
