import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CanvasDraw from "react-canvas-draw";
import ColorPicker from "./colorPicker";
import Tools from "./tools.js";

import "./styles.css";
export default function App() {
  const [brushColor, setBrusholor] = useState("#444");
  const [lastPenColor, setLastPenColor] = useState("#444");
  const [brushRadius, setBrushRadius] = useState(2);
  // const [savedData, setSavedData] = useState('');

  const canvasRef = useRef(null);

  const handleColorChange = React.useCallback((color) => {
    const {
      rgb: { r, g, b, a },
    } = color;
    setBrusholor(`rgba(${r}, ${g}, ${b},${a})`);
    setLastPenColor(`rgba(${r}, ${g}, ${b},${a})`);
  }, []);

  const toolChange = React.useCallback(
    (tool, size) => {
      if (tool === "eraser") {
        setBrusholor("#ffffff");
      }
      if (tool === "pen") {
        setBrusholor(lastPenColor);
      }
    },
    [lastPenColor]
  );

  const saveData = () => {
    const data = canvasRef.current.getSaveData();
    console.log(data);
  };

  return (
    <>
      <div className="left-container">
        <ColorPicker
          brushColor={brushColor}
          handleColorChange={handleColorChange}
        />
        <div className="canvass-container">
          <CanvasDraw
            ref={canvasRef}
            brushColor={brushColor}
            brushRadius={brushRadius}
            lazyRadius={5}
          />
        </div>
        <Tools
          setBrushRadius={setBrushRadius}
          handleToolChange={toolChange}
          canvasRef={canvasRef}
          brushRadius={brushRadius}
        />
      </div>

      <div className="saveCanvasDiv">
        <button className="saveCanvas" onClick={saveData}>
          Ulož kresbu
        </button>
      </div>
    </>
  );
}
