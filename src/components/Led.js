import React from 'react';
import ledOn from './ledOn.png';
import ledOff from './ledOff.png';

const styles = {
    led: {
        margin: '8px',
    }
};

export default function Led(props) {
    if (props.on) {
        return <img src={ledOn} alt="" style={styles.led} />;
    }

    return <img src={ledOff} alt="" style={styles.led} />;
}
