import React, { useState, useEffect } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPen, faUndo } from "@fortawesome/free-solid-svg-icons";
import UndoIcon from "@mui/icons-material/Undo";
import ModeIcon from "@mui/icons-material/Mode";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";

import Slider from "react-input-slider";

const Tools = ({
  handleToolChange,
  brushRadius,
  setBrushRadius,
  canvasRef,
}) => {
  const [eraserSize, setEraserSize] = useState(30);
  const [brushSize, setBrushSize] = useState(30);
  useEffect(() => {
    setEraserSize(brushRadius);
    setBrushSize(brushRadius);
  }, []);

  return (
    <div style={{ boxShadow: "none" }}>
      <div className="slider-container">
        <div className="icon-container">
          <FormatPaintIcon
            icon={faEraser}
            onClick={() => {
              handleToolChange("eraser");
              setBrushRadius(eraserSize);
            }}
          />
        </div>
        <Slider
          axis="y"
          y={eraserSize * -1 + 61}
          ymin={1}
          ymax={60}
          onChange={({ y }) => {
            setBrushRadius(y * -1 + 61);
            setEraserSize(y * -1 + 61);
          }}
          onDragEnd={() => {
            handleToolChange("eraser");
          }}
        />
        <p style={{ marginBottom: 0, marginTop: "5px" }}>{eraserSize}</p>
      </div>

      <div className="slider-container">
        <div className="icon-container">
          <ModeIcon onClick={() => handleToolChange("pen", brushSize)} />
        </div>
        <Slider
          axis="y"
          y={brushSize * -1 + 61}
          ymin={1}
          ymax={60}
          onChange={({ y }) => {
            setBrushRadius(y * -1 + 61);
            setBrushSize(y * -1 + 61);
          }}
          onDragEnd={() => {
            handleToolChange("pen");
          }}
        />
        <p style={{ marginBottom: 0, marginTop: "5px" }}>{brushSize}</p>
      </div>
      <UndoIcon
        icon={faUndo}
        cursor="pointer"
        onClick={() => canvasRef.current.undo()}
      />
    </div>
  );
};

export default Tools;
