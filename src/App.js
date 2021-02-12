import React from "react";
import Simulator from "./components/Simulator.js";

const styles = {
  center: {
    display: 'grid',
    justifyItems: 'center',
  },
};

function App() {
  return (
    <div style={styles.center}>
      <Simulator />
    </div>
  );
}

export default App;
