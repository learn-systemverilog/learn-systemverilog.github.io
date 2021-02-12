import React from "react";
import Simulator from "./components/Simulator.js";

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
};

function App() {
  return (
    <div style={styles.overlay}>
      <div style={styles.inner}>
        <Simulator />
      </div>
    </div>
  );
}

export default App;
