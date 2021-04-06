import React, { FunctionComponent, useRef, useEffect } from "react";

interface IProps {
  classname?: string;
}

const Canvas: FunctionComponent<IProps> = ({ classname }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    // drawLine(context, { x: 0, y: 0 }, { x: 100, y: 100 }, 4, "red");
  });

  const drawLine = (
    canvasContext: CanvasRenderingContext2D,
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number },
    lineWidth: number = 1,
    strokeStyle: string = "black"
  ) => {
    canvasContext.beginPath();
    canvasContext.lineWidth = lineWidth;
    canvasContext.strokeStyle = strokeStyle;
    canvasContext.moveTo(startPoint.x, startPoint.y);
    canvasContext.lineTo(endPoint.x, endPoint.y);
    canvasContext.stroke();
  };

  return (
    <canvas
      className={classname}
      ref={canvasRef}
      width="747px"
      height="747px"
    />
  );
};

export default Canvas;
