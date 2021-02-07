import logo from './logo.svg';
import './App.css';
import MainBoard from './components/MainBoard.js';
import TopBoard from './components/TopBoard';
import BottomBoard from './components/BottomBoard';

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
      <MainBoard>
        <TopBoard></TopBoard>
        <BottomBoard></BottomBoard>
      </MainBoard>
    </div>
  );
}

export default App;
