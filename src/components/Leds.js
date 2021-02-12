import React, { useEffect, useState } from 'react';
import Led from './Led.js';

const styles = {
    leds: {
        width: 'fit-content',
        display: 'grid',
        gridAutoFlow: 'column',
    }
};

export default function Leds(props) {
    const [led, setLed] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        let value = props.led;
        let arr = [];

        for (let i = 0; i < 8; i++) {
            arr.push(value % 2);
            value = Math.floor(value / 2);
        }

        setLed(arr);
    }, [props.led]);

    return (
        <div style={styles.leds}>
            <Led on={led[7]} />
            <Led on={led[6]} />
            <Led on={led[5]} />
            <Led on={led[4]} />
            <Led on={led[3]} />
            <Led on={led[2]} />
            <Led on={led[1]} />
            <Led on={led[0]} />
        </div>
    );
}
