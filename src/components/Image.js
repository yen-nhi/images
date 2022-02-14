import React, { useRef, useEffect } from "react";
import classes from './Image.module.css';

const SingleImage = (props) => {

    const canvasRef = useRef(null);
    const img = new Image()
    img.src = props.url;

    useEffect(() => {
        fetch(`https://images-4bdb1-default-rtdb.asia-southeast1.firebasedatabase.app/images/${props.imgID}/boxes.json`)
        .then(res => res.json())
        .then(data => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            img.onload = () => {
                ctx.drawImage(img, 0, 0, 300, 300)

                //Transform Firebase data structure to JS object array
                const boxes = [];
                for (const key in data){
                    boxes.push({
                        coordinate: data[key].coordinate, 
                        description: data[key].description
                    })
                }
                boxes.map(box => {
                    let coor = box.coordinate;
                    Object.keys(coor).map(function(key) {
                        coor[key] = coor[key] * 3/5;
                      });
                    const {x, y, w, h} = coor;  
                    ctx.strokeStyle = 'blue';
                    ctx.strokeRect(x, y, w, h);
                    ctx.font = "20px Arial";
                    ctx.fillText(box.description, x, y - 5);
                })
            }
        })
      }, [])

    return(
        <div className={classes.image}>
            <canvas 
                ref={canvasRef} 
                width={300} 
                height={300}>
            </canvas> 
        </div>
    )
};

export default SingleImage;