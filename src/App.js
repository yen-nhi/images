import Canvas from "./components/Canvas";
import Images from "./components/Images";
import classes from './App.module.css';
import { useState } from 'react';
import { storage } from './firebase/firebase';
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { getDatabase, ref as rtref, push } from "firebase/database";

function App() {

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageKey, setImageKey] = useState(null);

  const fileChangeHandler = (e) => {
    setImage(e.target.files[0])
  }

  const saveImageIntoDb = (url) => {
    const db = getDatabase();
    const newKey = push(rtref(db, 'images/' ), {
      url : url
    }).key;
    return newKey;
  };

 const fileUploadHandler = () => {
    if (image === null) {
      return
    }
   
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed', (snapshot) => {},
    (err) => {console.log(err)},
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then(url => {
        setImageUrl(url);
        const newKey = saveImageIntoDb(url);
        console.log('new key', newKey)
        setImageKey(newKey);
      })
    }
 )};

 const reload = () => {
   window.location.replace('/')
 }


  return(
      <div className={classes.app}>
        <h3>Upload some image to annotate</h3>
        <input type="file" onChange={fileChangeHandler} className={classes.chooseFile}/>
        <button type="button" onClick={fileUploadHandler}>Upload</button>
        {imageUrl !== null && <Canvas imageUrl={imageUrl} imageKey={imageKey}/>}
        {imageUrl !== null && <button onClick={reload}>Finish</button>}
        <Images/>
      </div>
  )
};

export default App;