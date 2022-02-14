import classes from './Canvas.module.css';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import BoxForm from "./BoxForm";

const Canvas = (props) => {
  const canvas = useRef();
  let image = new Image();
  image.src = props.imageUrl;
  image.className = classes.image;
  const [currentBox, setCurrentBox] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [annotated, setAnnotated] = useState(false);
  const [newDraw, setNewDraw] = useState(false);
  const [coordinate, setCoordinate] = useState({x: 0, y: 0, w: 0, h: 0});
  const [firstBox, setFirstBox] = useState(true);
  
  const drawBox = (ctx, box) => {
    const { x, y, w, h } = box.coor;
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.rect(x, y, w, h);
    ctx.stroke();
    ctx.font = "20px Arial";
    ctx.fillText(box.desc, x, y - 5);
    
  }

  const drawBoxes = () => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
    let ctx = canvasEle.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);  
    ctx.drawImage(image, 0, 0, 500, 500);
    boxes.map(box => drawBox(ctx, box));
    if (currentBox !== null) {
      drawBox(ctx, currentBox);
           
    }
  }

  const handleMouseDown = e => {
    console.log('DOWN');
    console.log('Down boxes', boxes);
    console.log('Down current box', currentBox);

    if (!firstBox && !annotated) {
      boxes.pop();
      setBoxes(boxes);
    } 
    const x = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const y = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    setCurrentBox({coor: {x, y, w: 0, h: 0}, desc: ''});  
    setAnnotated(false);
    setNewDraw(false);
  }  

  const handleMouseUp = e => {
    console.log('UP');
    console.log('Up boxes', boxes);
    console.log('Up current box', currentBox);


    if (currentBox !== null && currentBox.coor.w !== 0 && currentBox.coor.h !== 0) {
      setBoxes([...boxes, currentBox]);
      setCoordinate(currentBox.coor);
      setNewDraw(true);
      setFirstBox(false);
      drawBoxes();
    }
    setCurrentBox(null); 
  }  

  const handleMouseOut = e => {
    
    console.log('OUT');
    console.log('Out boxes', boxes);
    console.log('Out current box', currentBox);
    if (currentBox !== null) {
      setCurrentBox(null);
      setAnnotated(true);
      // drawBoxes();  
    }
  }

  const handleMouseMove = e => {
    console.log('MOVE');

    if (currentBox !== null) {
      const { x, y, w, h } = currentBox.coor;
      const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
      const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
      setCurrentBox({coor: {x, y, w: mouseX - x, h: mouseY - y}, desc: ''});
      drawBoxes();
      console.log('Move current box', currentBox);

    }
  }

  const annotationHandler = (text) => {
    let arr = [...boxes];
    let lastBox = arr[arr.length-1];
    lastBox.desc = text;
    setBoxes(arr);
    setAnnotated(true);
  };

  useEffect(() => {   
    drawBoxes();
  }, [boxes]);

  return (
      <div className={classes.page}>
        <canvas 
          className={classes.canvasDrawing}
          onMouseDown={handleMouseDown} 
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseOut}
          onMouseMove={handleMouseMove}
          ref={canvas}>    
        </canvas>
        {newDraw && <BoxForm 
          setNewDraw={() => setNewDraw(false)}
          coordinate={coordinate}
          postAnnotation={annotationHandler}
          url={props.imageUrl}
          id={props.imageKey}
          />}
      </div>
      );
}

export default Canvas;