import React from 'react';
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

export default function SegmentsDisplay() {
    return (
        <div style={styles.center}>
            <div style={styles.container}>
                <img src={segmentsDisplay} alt="" style={styles.segmentsDisplay} />
                <Segment top={'25px'} left={'26px'} />
                <Segment top={'33px'} left={'74px'} type={'vertical'} />
                <Segment top={'88px'} left={'74px'} type={'vertical'} isOn={true} />
                <Segment top={'135px'} left={'26px'} />
                <Segment top={'88px'} left={'17px'} type={'vertical'} />
                <Segment top={'33px'} left={'17px'} type={'vertical'} />
                <Segment top={'80px'} left={'26px'} isOn={true} />
                <Segment top={'134px'} left={'91px'} type={'point'} isOn={true} />
            </div>
        </div>
    );
}
