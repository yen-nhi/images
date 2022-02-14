import { useEffect, useState } from "react";
import classes from './Images.module.css';
import SingleImage from "./Image";

const Images = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('https://images-4bdb1-default-rtdb.asia-southeast1.firebasedatabase.app/images.json')
        .then(res => res.json())
        .then(data => {
            const imagesList = [];
            for (const key in data) {
                imagesList.push({
                  id: key,
                  url: data[key].url,
                })
              }
            setImages(imagesList.reverse());
        }).catch(err => console.log(err))
    }, [])

    const imagesEl = images.map(image => <SingleImage imgID={image.id} url={image.url}/>);
  
    return(
        <div className={classes.imagesDisplay}>
            {imagesEl}
        </div>
    )
};

export default Images