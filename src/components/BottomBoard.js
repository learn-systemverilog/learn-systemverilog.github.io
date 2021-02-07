import React from 'react';
import bottomBoard from './bottomBoard.png'

const styles = {
    bottomBoardContainer: {
        width: 'fit-content',
        height: 'fit-content',
        margin: '4px',
        borderStyle: 'solid',
        borderImage: `url(${bottomBoard}) 2 fill`,
        paddingRight: '2px',
        paddingBottom: '2px',
    }
};

export default function BottomBoard() {
    return (
        <div style={styles.bottomBoardContainer}>
            <p>aaaaaa</p>
            <p>bbbbbbbbbb</p>
            <p>ccccccccccccc</p>
        </div>
    );
}
