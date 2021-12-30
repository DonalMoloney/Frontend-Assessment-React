/*
* Tile
* Function: Functional component that displays all the info passed in from verticle tiles obtained from axios
* Authored: Donal Moloney
*/
import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ViewTestGrades from './ViewTestGrades'
import Tag from './Tag'
import "./Tile.css";

function Tile(props) {
    const [averageGrade, setAverageGrade] = useState(0);
    const [tileProps, setTileProps] = useState({});
    const [fullName, setFullName] = useState();
    const [tagArray, addTag] = useState([]); // TODO implement this for adding tags
    const [tagInput, setNewTag] = useState(""); // TODO implement this for adding tags
    const [tagToSearch, setTagToSearch] = useState("");
    const [nameToSearch, setNameToSearch] = useState("");
    const [containsSearchTag, setContainsSearchTag] = useState(true);
    const [containsSearchName, setContainsSearchName] = useState(true);
    const [toggle, setToggle] = useState(false);

    function handleChange(newValue) {
        if (toggle !== newValue) { // Plus button was clicked
            setToggle(newValue)
        } else if (tagToSearch !== props.searchTag) {
            if (!props.searchTag || props.searchTag.length === 0) { //string empty set contains to true
                setContainsSearchTag(true)
            } else { //string not empty
                setTagToSearch(props.searchTag)
                var matches = tagArray.filter(s =>
                    s.includes(props.searchTag) //returns first array matches, we just need to know if it has values
                ); // returns first 
                matches.length > 0 ? setContainsSearchTag(true) : setContainsSearchTag(false);
            }
        } else if (nameToSearch !== props.searchName) {
            if (!props.searchName || props.searchName.length === 0) { //string empty set contains to true
                setContainsSearchName(true)
            } else { //else compare passed in string to current name
                fullName.toLowerCase().includes(props.searchName.toLowerCase()) ? setContainsSearchName(true) : setContainsSearchName(false);
            }
            setNameToSearch(props.searchName)
        }
    }

    useEffect(() => {
        var arrayInt = props.data.grades.map((number) => parseInt(number))
        var sum = arrayInt.reduce(function (a, b) {
            return a + b;
        }, 0);
        setAverageGrade(sum / props.data.grades.length)
        setTileProps(props.data)
        setTagToSearch(props.searchTag)
        setNameToSearch(props.searchName)
        setFullName(props.fullName)
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (tagInput) {
                if (!tagArray.includes(tagInput)) { // check if array doesnt contain
                    addTag(tagArray => [...tagArray, tagInput]);
                }

            }
        }
    }

    return (
        (
            <Row id='tileRow' className="justify-content-md-left" style={{ display: (containsSearchTag && containsSearchName) === true ? null : 'none', }}>
                <Col className="colIcon" xs lg="2">
                    <Image className="iconElement" src={props.data.pic} roundedCircle />
                </Col>
                <Col className="colText">
                    <span>
                        <h1 className="colTextHeader">{props.data.firstName + " " + props.data.lastName}</h1>
                        <p className="colTextSub">{"Email: " + props.data.email}</p>
                        <p className="colTextSub">{"Company: " + props.data.company}</p>
                        <p className="colTextSub">{"Skill: " + props.data.skill}</p>
                        <p className="colTextSub">{"Average: " + String(averageGrade)}</p>
                        <span>
                            <span>
                                <ul className="tagListContainer">
                                    {
                                        tagArray.map(
                                            (tag, index) => (
                                                <Tag key={index} className="tagRow" tagName={tag}></Tag>
                                            )
                                        )

                                    }
                                </ul>
                            </span>
                            <input id="tagCreate" type="text" className="form-control" placeholder="Add a tag" value={tagInput} onChange={e => setNewTag(e.target.value)} onKeyDown={handleKeyDown} />
                        </span>
                        <span>
                            <ul className="listContainer">
                                {
                                    toggle ?
                                        (tileProps.grades ? tileProps.grades.map(
                                            (grade, index) => (
                                                <li className="listRow">Test {index}: {grade}</li>
                                            )
                                        ) : null
                                        ) : null
                                }
                            </ul>
                        </span>
                    </span>
                </Col>
                <Col className="colPlus">
                    <ViewTestGrades onChange={handleChange}></ViewTestGrades>
                </Col>
            </Row>
        )
    );
}

export default Tile;