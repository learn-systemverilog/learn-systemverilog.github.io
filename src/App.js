import logo from './logo.svg';
import './App.css';
import Board from './components/Board.js';
import Switches from './components/Switches';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Board background="#4285f4" border="#4b45cb">
        <Board background="#ffc90b" border="#9a5f05">
          <Switches />
        </Board>
        <Board background="#3cdb83" border="#127141">
          XX XXXX XX XXXXX
        </Board>
      </Board>
    </div>
  );
}

export default App;
