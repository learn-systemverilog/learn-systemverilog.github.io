import React from 'react';
import './Switch.css';

export default function Switch() {
    return (
        <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
        </label>
    );
}
