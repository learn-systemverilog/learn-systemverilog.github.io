import React, { useEffect, useState } from "react";
import Board from './components/Board.js';
import Switches from './components/Switches';
import Leds from './components/Leds';
import SegmentsDisplay from "./components/SegmentsDisplay.js";
import lcd from './components/lcd.png';

import Module from './simulator.js'

const styles = {
  overlay: {
    width: '100wh',
    height: '100vh',
    display: 'flex',
    overflow: 'auto',
  },
  inner: {
    margin: 'auto',
  },
  learnSystemVerilog: {
    color: 'white',
    textAlign: 'center',
    fontFamily: "'Roboto Mono', monospace",
  },
};

function App() {
  const [led, setLed] = useState(0);
  const [seg, setSeg] = useState(0);
  const [swi, setSwi] = useState(0);
  const [clk, setClk] = useState(false);

  const [module, setModule] = useState(null);

  useEffect(() => {
    new Module().then(module => {
      setModule(module);
    });
  }, []);

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
    <div style={styles.overlay}>
      <div style={styles.inner}>
        <Board background="#4285f4" border="#4b45cb">
          <Board background="#ffc90b" border="#9a5f05">
            <SegmentsDisplay seg={seg} />
            <Switches swi={swi} setSwi={setSwi} />
          </Board>
          <Leds led={led} />
          <h1 style={styles.learnSystemVerilog}>
            Learn
            <br />
            SystemVerilog
          </h1>
          <Board background="#3cdb83" border="#127141">
            <img src={lcd} alt="" />
          </Board>
        </Board>
      </div>
    </div>
  );
}

export default App;
