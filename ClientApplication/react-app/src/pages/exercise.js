import React, { useState, useEffect } from 'react';
import "../styles/exerciseStyle.css"; 
import { Row, Col, Button } from 'react-bootstrap';

import Slider from '@mui/material/Slider';
import { VscDebugStart } from "react-icons/vsc";
import { FaQuestion } from "react-icons/fa6";

const Exercise = () => {
    const valuetext = (value) => {
        return `${value}`;
      };

    const text = "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.";
    const subject = "Biology";
    const category = "Plants";
    const part = 1;
    const outOf = 3;

    const startWords = "Press Go to begin";
    const endWords = "― H. Jackson Brown Jr., P.S. I Love You";


    
    const words = text.split(" ");

    const [inputValue, setInputValue] = useState(238); // Track WPM value
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // Index of the current word
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);

    const avgReadingSpeed = 238;

    // The flashing words loop
    useEffect(() => {
        if (!started) return;

        const wpm = parseInt(inputValue) || avgReadingSpeed; // Get WPM value
        const intervalTime = 60000 / wpm; // Convert WPM to milliseconds, default 238 WPM (average)

        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => {
                if (prevIndex < words.length ) {
                    return prevIndex + 1;
                } else {
                    setFinished(true);
                    clearInterval(interval); // Clear interval when finished
                    return prevIndex;
                }
            });
        }, intervalTime);

        return () => clearInterval(interval); // Prevent memory leaks
    }, [started, inputValue, words.length]);

    return (
        
        <div className='mainContainer'>
            <Row style={{ marginTop: '10px', 
                          marginBottom:'10px', 
                          color:'grey'}}>

                <Col><h3>{subject}</h3></Col>
                <Col style={{ textAlign: 'center' , color:'#cccccc'}}><h3>{category}</h3></Col>
                <Col><h3 style={{textAlign: 'right'}}>{part}/{outOf}</h3></Col>
            </Row>

            <div className='exerciseWindow'>
                <p className="singleWord">
                    {started ? words[currentWordIndex] : startWords}
                    {finished ? endWords : ""}
                </p>
            </div>

            <Row style={{ marginTop: '25px' }}>
                <Col xs={12} md={2}>
                    <Button 
                        className='subjectButtons' 
                        size="lg" 
                        style={{ backgroundColor: '#739900', borderColor: '#608000' }} 
                        onClick={() => setStarted(true)} 
                        disabled={started}
                    >
                        Start<VscDebugStart style={{ marginTop: '-3px' }}/> 
                    </Button>
                </Col>
                
                <Col>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                        <Slider
                          aria-label="WPM Slider"
                          value={inputValue} // Binds the slider value to inputValue
                          onChange={(e, newValue) => setInputValue(newValue)} // Updates WPM when slider changes
                          getAriaValueText={valuetext}
                          color="secondary"
                          min={50}
                          max={1000}
                          style={{ marginRight: '20px' }}
                        />
                        <input 
                            type="number" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)} 
                            placeholder={avgReadingSpeed}
                            className="form-control"
                            disabled={started}
                            style={{ marginLeft: '5px', width: "100px" }}
                        /> 
                        <span style={{ marginLeft: '10px'}}>WPM</span>
                    </div>
                </Col>
                <Col>
                    <Button 
                        className='subjectButtons' 
                        size="lg" 
                        style={{ backgroundColor: '#e67300', borderColor: '#994d00' }} 
                        onClick={() => setStarted(true)} 
                        disabled={!finished}
                    >
                       <FaQuestion style={{ marginTop: '-3px' }}/> Go to question
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Exercise;
