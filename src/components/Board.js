import React from 'react';

export default function Board(props) {
    const styles = {
        boardContainer: {
            display: 'grid',
            gridGap: '8px',
            padding: '8px 8px',
            borderStyle: 'solid',
            borderColor: props.border,
            borderWidth: '1px 4px 4px 1px',
            borderRadius: '4px',
            backgroundColor: props.background,
        }
    };

    return (
        <div style={styles.boardContainer}>
            {props.children}
        </div>
    );
}
