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
        width: '121px',
        height: '180px'
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
                <Segment top={'25px'} left={'26px'} isOn={seg[0]} />
                <Segment top={'33px'} left={'74px'} type={'vertical'} isOn={seg[1]} />
                <Segment top={'88px'} left={'74px'} type={'vertical'} isOn={seg[2]} />
                <Segment top={'135px'} left={'26px'} isOn={seg[3]} />
                <Segment top={'88px'} left={'17px'} type={'vertical'} isOn={seg[4]} />
                <Segment top={'33px'} left={'17px'} type={'vertical'} isOn={seg[5]} />
                <Segment top={'80px'} left={'26px'} isOn={true} isOn={seg[6]} />
                <Segment top={'134px'} left={'91px'} type={'point'} isOn={true} isOn={seg[7]} />
            </div>
        </div>
    );
}
