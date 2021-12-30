/*
* Tag
* Function: Functional component that allows user to add tag attribute for each user
* Authored: Donal Moloney
*/
import React, { useState, useEffect } from 'react';
import "./Tag.css";
import Card from 'react-bootstrap/Card';

function Tag(props) {
    const [tagNameAppended, setTagNameAppeneded] = useState("")
    const [hasBeenAppended, setAppended] = useState(false) 
    const MAX_CARD_LENGTH = 6 //To ensure that the text stays inside of card setting max card length to 7.
    useEffect(() => {
        if(props.tagName.length > MAX_CARD_LENGTH){
            setAppended(true)
            setTagNameAppeneded(props.tagName.substring(0, 6) + "...")
        }else{
            setAppended(false)
        }
      }, [])

    return (
        <Card body className="userTags">{hasBeenAppended ? tagNameAppended:props.tagName}</Card>
    );
    
}

export default Tag;