import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Bullseye, Button, Card, CardBody, CardTitle } from '@patternfly/react-core';
import { Stack, StackItem, Text, TextContent, TextVariants } from '@patternfly/react-core';
import { Toolbar, ToolbarContent, ToolbarGroup, ToolbarItem, Tooltip } from '@patternfly/react-core';
import CodeIcon from '@patternfly/react-icons/dist/js/icons/code-icon';
import RedoIcon from '@patternfly/react-icons/dist/js/icons/redo-icon';
import Simulator from "./components/Simulator.js";

const styles = {
  padding: {
    paddingTop: '5rem',
    paddingBottom: '5rem',
  },
  stack: {
    width: '70%',
  },
  editorWrapper: {
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderColor: 'var(--pf-global--BorderColor--100)',
  },
};

const defaultCode = `// DESCRIPTION: Verilator: Systemverilog example module
// with interface to switch buttons, LEDs, LCD and register display

parameter NINSTR_BITS = 32;
parameter NBITS_TOP = 8, NREGS_TOP = 32, NBITS_LCD = 64;
module top(input  logic clk_2,
           input  logic [NBITS_TOP-1:0] SWI,
           output logic [NBITS_TOP-1:0] LED,
           output logic [NBITS_TOP-1:0] SEG,
           output logic [NBITS_LCD-1:0] lcd_a, lcd_b,
           output logic [NINSTR_BITS-1:0] lcd_instruction,
           output logic [NBITS_TOP-1:0] lcd_registrador [0:NREGS_TOP-1],
           output logic [NBITS_TOP-1:0] lcd_pc, lcd_SrcA, lcd_SrcB,
             lcd_ALUResult, lcd_Result, lcd_WriteData, lcd_ReadData, 
           output logic lcd_MemWrite, lcd_Branch, lcd_MemtoReg, lcd_RegWrite);

  always_comb begin
    LED <= SWI | clk_2;
    SEG <= SWI;
    lcd_WriteData <= SWI;
    lcd_pc <= 'h12;
    lcd_instruction <= 'h34567890;
    lcd_SrcA <= 'hab;
    lcd_SrcB <= 'hcd;
    lcd_ALUResult <= 'hef;
    lcd_Result <= 'h11;
    lcd_ReadData <= 'h33;
    lcd_MemWrite <= SWI[0];
    lcd_Branch <= SWI[1];
    lcd_MemtoReg <= SWI[2];
    lcd_RegWrite <= SWI[3];
    for(int i=0; i<NREGS_TOP; i++) lcd_registrador[i] <= i+i*16;
    lcd_a <= {56'h1234567890ABCD, SWI};
    lcd_b <= {SWI, 56'hFEDCBA09876543};
  end

endmodule`;

function App() {
  const localStorageLastSessionCodeKey = 'lastSessionCode';
  const localStorageLastSimulationCodeKey = 'lastSimulationCode';

  const [code, setCode] = useState('');
  const [isTranspiling, setIsTranspiling] = useState(false);

  useEffect(() => {
    const localStorageCode = localStorage.getItem(localStorageLastSessionCodeKey);

    if (localStorageCode === null) {
      setCode(defaultCode);
    } else {
      setCode(localStorageCode);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(localStorageLastSessionCodeKey, code);
    }, 2000);

    return () => clearTimeout(timer);
  }, [code]);

  function simulate() {
    setIsTranspiling(true);

    localStorage.setItem(localStorageLastSimulationCodeKey, code);

    let sse = new EventSource("http://localhost:8080/transpile");
    sse.onopen = function () {
      console.log("Open");
    }
    sse.onmessage = function (event) {
      console.log("Message: " + event.data);
    }
    sse.onerror = function (event) {
      console.log("Error");
      sse.close();
    }
  }

  function onEditorChange(value) {
    setCode(value);
  }

  function reloadCodeFromLastSimulation() {
    setCode(localStorage.getItem(localStorageLastSimulationCodeKey));
  }

  function resetToDefaultCodeDefiniton() {
    setCode(defaultCode);
  }

  return (
    <Bullseye style={styles.padding}>
      <Stack hasGutter={true} style={styles.stack}>
        <StackItem>
          <Card>
            <CardTitle>
              Simulator
          </CardTitle>
            <CardBody>
              <Bullseye>
                <Simulator />
              </Bullseye>
            </CardBody>
          </Card>
        </StackItem>
        <StackItem>
          <Card>
            <CardTitle>
              Code Editor
          </CardTitle>
            <CardBody>
              <div style={styles.editorWrapper}>
                <Editor height="500px" defaultLanguage="systemverilog" value={code} onChange={onEditorChange} />
              </div>
              <Toolbar id="toolbar-group-types">
                <ToolbarContent>
                  <ToolbarGroup variant="button-group">
                    <ToolbarItem>
                      <Button variant="primary" isLoading={isTranspiling} isDisabled={isTranspiling} onClick={simulate}>Simulate!</Button>
                    </ToolbarItem>
                  </ToolbarGroup>
                  <ToolbarGroup variant="button-group" alignment={{ default: 'alignRight' }}>
                    <ToolbarItem>
                      <Tooltip content={<div>Reset to last submitted code</div>}>
                        <Button variant="secondary" aria-label="reload" icon={<RedoIcon />} onClick={reloadCodeFromLastSimulation}>Reload</Button>
                      </Tooltip>
                    </ToolbarItem>
                    <ToolbarItem>
                      <Tooltip content={<div>Reset to default code definition</div>}>
                        <Button variant="secondary" aria-label="reset" icon={<CodeIcon />} onClick={resetToDefaultCodeDefiniton}>Reset</Button>
                      </Tooltip>
                    </ToolbarItem>
                  </ToolbarGroup>
                </ToolbarContent>
              </Toolbar>
            </CardBody>
          </Card>
        </StackItem>
        <StackItem>
          <Card>
            <CardTitle>
              Console
          </CardTitle>
            <CardBody>
              <TextContent>
                <Text component={TextVariants.p}>Hello, World!</Text>
              </TextContent>
            </CardBody>
          </Card>
        </StackItem>
      </Stack>
    </Bullseye>
  );
}

export default App;
