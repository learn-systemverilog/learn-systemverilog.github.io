import React from 'react';
import mainBoard from './mainBoard.png'

const styles = {
    mainBoardContainer: {
        width: 'fit-content',
        height: 'fit-content',
        borderStyle: 'solid',
        borderImage: `url(${mainBoard}) 2 fill`,
        paddingRight: 2,
        paddingBottom: 2,
    }
};

export default function MainBoard(props) {
    return (
        <div style={styles.mainBoardContainer}>
            {props.children}
        </div>
    );
}
