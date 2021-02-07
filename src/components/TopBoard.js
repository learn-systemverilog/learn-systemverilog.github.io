import React from 'react';
import topBoard from './topBoard.png'

const styles = {
    topBoardContainer: {
        width: 'fit-content',
        height: 'fit-content',
        margin: 4,
        borderStyle: 'solid',
        borderImage: `url(${topBoard}) 2 fill`,
        paddingRight: 2,
        paddingBottom: 2,
    }
};

export default function TopBoard() {
    return (
        <div style={styles.topBoardContainer}>
            <p>aaaaaa</p>
            <p>bbbbbbbbbb</p>
            <p>ccccccccccccc</p>
        </div>
    );
}
