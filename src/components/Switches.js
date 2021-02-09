import React, { useEffect, useState } from 'react';
import Switch from './Switch.js';

const styles = {
    switches: {
        display: 'grid',
        gridAutoFlow: 'column',
    }
};

export default function Switches() {
    const [swi, setSwi] = useState(0);

    function onSwitch(on, index) {
        console.log(on, index);
        const diff = 2 ** index;
        if (on) {
            setSwi(swi + diff);
        } else {
            setSwi(swi - diff);
        }
    }

    useEffect(() => {
        console.log(swi);
    }, [swi]);

    return (
        <div style={styles.switches}>
            <Switch index={7} onSwitch={onSwitch} />
            <Switch index={6} onSwitch={onSwitch} />
            <Switch index={5} onSwitch={onSwitch} />
            <Switch index={4} onSwitch={onSwitch} />
            <Switch index={3} onSwitch={onSwitch} />
            <Switch index={2} onSwitch={onSwitch} />
            <Switch index={1} onSwitch={onSwitch} />
            <Switch index={0} onSwitch={onSwitch} />
        </div>
    );
}
