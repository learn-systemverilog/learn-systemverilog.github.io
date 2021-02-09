import React, { useEffect, useState } from "react";
import Board from './components/Board.js';
import Switches from './components/Switches';
import Leds from './components/Leds';

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
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setTime(time + 1);
    }, 1000);
  });

  return (
    <div style={styles.overlay}>
      <div style={styles.inner}>
        <Board background="#4285f4" border="#4b45cb">
          <Board background="#ffc90b" border="#9a5f05">
            <Switches />
          </Board>
          <Leds led={time} />
          <Board background="#3cdb83" border="#127141">
            XX XXXX XX XXXXX
        </Board>
        </Board>
      </div>
    </div>
  );
}

export default App;
