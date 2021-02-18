import React, { useEffect, useState } from "react";
import Board from './Board.js';
import Switches from './Switches';
import Leds from './Leds';
import SegmentsDisplay from "./SegmentsDisplay.js";
import lcd from './lcd.png';

const styles = {
    fit: {
        width: 'fit-content',
    },
    learnSystemVerilog: {
        color: 'white',
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: 'bold',
        fontFamily: "'Roboto Mono', monospace",
    },
};

export default function Simulator(props) {
    const [led, setLed] = useState(0);
    const [seg, setSeg] = useState(0);
    const [swi, setSwi] = useState(0);
    const [clk, setClk] = useState(false);

    const [module, setModule] = useState(null);

    useEffect(() => {
        if (props.code === '') {
            return;
        }

        const Module = new Function(props.code + "\n\nreturn Module;")();
        setModule(Module);
    }, [props.code]);

    function trySimulate() {
        if (module === null) {
            return;
        }

        const simulation = JSON.parse(module.simulate(swi, clk));
        setLed(simulation.led);
        setSeg(simulation.seg);
    }

    useEffect(() => {
        setTimeout(() => {
            setClk(!clk)
        }, 1000);

        trySimulate();
    }, [clk]);

    useEffect(() => {
        trySimulate();
    }, [swi]);

    return (
        <Board background="#4285f4" border="#4b45cb">
            <Board background="#ffc90b" border="#9a5f05">
                <SegmentsDisplay seg={seg} />
                <Switches swi={swi} setSwi={setSwi} />
            </Board>
            <Leds led={led} />
            <p style={styles.learnSystemVerilog}>Learn<br />SystemVerilog</p>
            <Board background="#3cdb83" border="#127141">
                <img src={lcd} alt="" />
            </Board>
        </Board>
    );
}
