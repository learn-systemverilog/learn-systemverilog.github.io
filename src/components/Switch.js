import React, { useState } from 'react';
import switchOn from './switchOn.png';
import switchOff from './switchOff.png';

const styles = {
    switch: {
        margin: '12px',
        cursor: 'pointer',
    }
};

export default function Switch(props) {
    const [on, setOn] = useState(false);

    function setOnWrapper(on) {
        setOn(on);
        props.onSwitch(on, props.index);
    }

    if (on) {
        return <img src={switchOn} alt="" style={styles.switch} onClick={() => { setOnWrapper(!on); }} />;
    }

    return <img src={switchOff} alt="" style={styles.switch} onClick={() => { setOnWrapper(!on); }} />;
}
