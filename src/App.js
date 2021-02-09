import React, { useEffect, useState } from "react";
import Board from './components/Board.js';
import Switches from './components/Switches';
import Leds from './components/Leds';
import lcd from './components/lcd.png';

const styles = {
  overlay: {
    width: '100wh',
    height: '100vh',
    display: 'flex',
    overflow: 'auto',
  },
  inner: {
    margin: 'auto',
  }
};

function App() {
  const [led, setLed] = useState(0);
  const [swi, setSwi] = useState(0);

  useEffect(() => {
    setLed(swi);
  }, [swi]);

  return (
    <div style={styles.overlay}>
      <div style={styles.inner}>
        <Board background="#4285f4" border="#4b45cb">
          <Board background="#ffc90b" border="#9a5f05">
            <Switches swi={swi} setSwi={setSwi} />
          </Board>
          <Leds led={led} />
          <Board background="#3cdb83" border="#127141">
            <img src={lcd} />
          </Board>
        </Board>
      </div>
    </div>
  );
}

export default App;
