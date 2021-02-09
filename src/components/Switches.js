import React, { useEffect, useState } from 'react';
import Switch from './Switch.js';

const styles = {
    switches: {
        display: 'grid',
        gridAutoFlow: 'column',
    }
};

export default function Switches(props) {
    function onSwitch(on, index) {
        const diff = 2 ** index;
        if (on) {
            props.setSwi(props.swi + diff);
        } else {
            props.setSwi(props.swi - diff);
        }
    }

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
