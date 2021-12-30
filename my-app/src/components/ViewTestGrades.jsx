/*
* ViewTestGrades
* Function: Functional component to allowing the user to toggle between plus and false button. Will be used in another component to show / hide the test grades
* Authored: Donal Moloney
*/
import React, { useState, useEffect  } from 'react';
import { BsPlus } from 'react-icons/bs';
import "./ViewTestGrades.css";
import { TiMinus } from 'react-icons/ti';

function ViewTestGrades(props) {
    const [toggle, setToggle] = useState(false);
   
    useEffect(() => {
            props.onChange(toggle);
    });
    return (
        <div className="buttonContainer">
            {
                toggle ? <TiMinus className="buttonMinus" onClick={() => setToggle(false)}/> : <BsPlus className="buttonAdd" onClick={() => setToggle(true)}/>
            }
        </div>
        
    );

}

export default ViewTestGrades;