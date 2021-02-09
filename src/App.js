import Board from './components/Board.js';
import Switches from './components/Switches';
import Leds from './components/Leds';

const styles = {
  overlay: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function App() {
  return (
    <div style={styles.overlay}>
      <Board background="#4285f4" border="#4b45cb">
        <Board background="#ffc90b" border="#9a5f05">
          <Switches />
        </Board>
        <Leds />
        <Board background="#3cdb83" border="#127141">
          XX XXXX XX XXXXX
        </Board>
      </Board>
    </div>
  );
}

export default App;
