import React, { useEffect, useState } from 'react';
import Segment from './Segment.js';
import segmentsDisplay from './segmentsDisplay.png';

const styles = {
    center: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        position: 'relative',
        width: '112px',
        height: '164px'
    },
};

export default function SegmentsDisplay(props) {
    const [seg, setSeg] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        let value = props.seg;
        let arr = [];

        for (let i = 0; i < 8; i++) {
            arr.push(value % 2);
            value = Math.floor(value / 2);
        }

        setSeg(arr);
    }, [props.seg]);

    return (
        <div style={styles.center}>
            <div style={styles.container}>
                <img src={segmentsDisplay} alt="" style={styles.segmentsDisplay} />
                <Segment top={'17px'} left={'19px'} isOn={seg[0]} />
                <Segment top={'25px'} left={'67px'} type={'vertical'} isOn={seg[1]} />
                <Segment top={'80px'} left={'67px'} type={'vertical'} isOn={seg[2]} />
                <Segment top={'127px'} left={'19px'} isOn={seg[3]} />
                <Segment top={'80px'} left={'10px'} type={'vertical'} isOn={seg[4]} />
                <Segment top={'25px'} left={'10px'} type={'vertical'} isOn={seg[5]} />
                <Segment top={'72px'} left={'19px'} isOn={true} isOn={seg[6]} />
                <Segment top={'126px'} left={'84px'} type={'point'} isOn={true} isOn={seg[7]} />
            </div>
        </div>
    );
}
