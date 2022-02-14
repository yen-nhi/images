import { useRef } from 'react';
import classes from './BoxForm.module.css';

const BoxForm = (props) => {

    const description = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const desc = description.current.value;
        props.setNewDraw();
        props.postAnnotation(desc);

        const newBox = {
            coordinate: props.coordinate,
            description: desc,
        }

        fetch(
            `https://images-4bdb1-default-rtdb.asia-southeast1.firebasedatabase.app/images/${props.id}/boxes.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBox)
            
        }).catch(err => console.log(err));

    };

    return(
        <form 
            className={classes.description} 
            style={{ top: `${props.coordinate.y + props.coordinate.h}px`, left: `${props.coordinate.x}px`}}
            onSubmit={submitHandler}>
            <input  
                type="text" 
                placeholder="Description" 
                ref={description} 
                required/>
            <button type='submit'>Save</button>
        </form>
    )
};

export default BoxForm;