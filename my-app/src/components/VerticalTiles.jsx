/*
* VerticalTiles
* Function: Functional component to that displays all the tiles vertically in the web app. Is also location where user input entered
* Authored: Donal Moloney
*/
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Tile from './Tile'
import axios from 'axios';
import "./VerticalTiles.css";

function VerticalTiles() {
    const [tileInfo, setTileInfo] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchTag, setSearchTag] = useState("");

    useEffect(() => {
        (async () => {
            const res = await axios.get('https://api.hatchways.io/assessment/students');
            setTileInfo(res.data.students)
        })()
    }, [])


    return (
        <form className='verticleTileForm'>
            <input type="text" className="form-control" placeholder="Search Name" value={searchName} onChange={e => setSearchName(e.target.value)} />
            <input type="text" className="form-control" placeholder="Search Tags" value={searchTag} onChange={e => setSearchTag(e.target.value)} />
            <Container className="tileContainer">
                {tileInfo.map(tileInfo => (
                    <Tile key={tileInfo.id} data={tileInfo} searchName={searchName} searchTag={searchTag} fullName={tileInfo.firstName + tileInfo.lastName}></Tile>
                ))}
            </Container>
        </form>
    );
}

export default VerticalTiles;