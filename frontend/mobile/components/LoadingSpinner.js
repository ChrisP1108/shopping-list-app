import React, { useState } from 'react';
import { View } from 'react-native';
import { useInterval } from 'react-interval-hook';
import Svg, { G, Path } from 'react-native-svg';
import { getThemeColor } from '../observables/themeColor.js';

function LoadingSpinner() {
    const spinnerHighlight = getThemeColor()._value;
    const spinnerColors = [spinnerHighlight, "#fff", "#fff", "#fff", spinnerHighlight, "#fff", "#fff", "#fff"]
    
    const [spinner, setSpinner] = useState(spinnerColors);
    const [counter, setCounter] = useState([0, 4]);

    useInterval(() => {
        setSpinner(spinner.map((color, index) => 
            counter.includes(index) ? spinnerHighlight : '#fff'));
        if (counter[0] === 0) {
            setCounter([1, 5]);
        }
        if (counter[0] === 1) {
            setCounter([2, 6]);
        }
        if (counter[0] === 2) {
            setCounter([3, 7]);
        }
        if(counter[0] === 3) {
            setCounter([4, 0]);
        }
        if(counter[0] === 4) {
            setCounter([1, 5]);
        }
    }, 200);

    return (
        <Svg width={80} height={80} viewBox="0 0 128 128">
            <G>
                <Path id="1" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[0]} />
                <Path id="2" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[1]} transform="rotate(45 64 64)"/>
                <Path id="3" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[2]} transform="rotate(90 64 64)"/>
                <Path id="4" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[3]} transform="rotate(135 64 64)"/>
                <Path id="5" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[4]} transform="rotate(180 64 64)"/>
                <Path id="6" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[5]} transform="rotate(225 64 64)"/>
                <Path id="7" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[6]} transform="rotate(270 64 64)"/>
                <Path id="8" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[7]} transform="rotate(315 64 64)"/>
            </G>
        </Svg>
    )
}

export default LoadingSpinner;