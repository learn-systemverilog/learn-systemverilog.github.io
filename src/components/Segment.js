import React from 'react';
import segmentHOn from './segmentHOn.png';
import segmentVOn from './segmentVOn.png';
import segmentPOn from './segmentPOn.png';
import segmentHOff from './segmentHOff.png';
import segmentVOff from './segmentVOff.png';
import segmentPOff from './segmentPOff.png';

export default function Segment(props) {
    const styles = {
        segment: {
            position: 'absolute',
            top: props.top,
            left: props.left,
        }
    };

    const type = props.type || 'horizontal';
    const isOn = props.isOn || false;

    const src = {
        horizontal: {
            on: segmentHOn,
            off: segmentHOff,
        },
        vertical: {
            on: segmentVOn,
            off: segmentVOff,
        },
        point: {
            on: segmentPOn,
            off: segmentPOff,
        },
    };

    let state = 'off';
    if (isOn) {
        state = 'on';
    }

    return <img src={src[type][state]} alt="" style={styles.segment} />;
}
