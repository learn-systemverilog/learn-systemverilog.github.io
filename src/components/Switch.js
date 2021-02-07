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

    return (
        <div style={styles.switch} onClick={() => { setOn(!on) }}>
            {on
                ? <img src={switchOn} />
                : <img src={switchOff} />
            }
        </div>
    );
}
