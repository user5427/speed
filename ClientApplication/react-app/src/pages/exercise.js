import React, { useState, useEffect } from 'react';
import "../styles/exerciseStyle.css"; 
import { Row, Col, Button } from 'react-bootstrap';

const Exercise = () => {
    const text = "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.";
    const words = text.split(" ");

    const [inputValue, setInputValue] = useState(""); // Track input field value
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // Index of the current word
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);

    const avgReadingSpeed = 238;

    // The flashing words loop
    useEffect(() => {
        if (!started) return;

        const wpm = parseInt(inputValue) || 0; // Get WPM value, default to 0 if invalid
        const intervalTime = wpm > 0 ? 60000 / wpm : 60000 / avgReadingSpeed; // Convert WPM to milliseconds, default to 238 WPM (average)

        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => {
                if (prevIndex < words.length - 1) {
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
            <div ><h3 >Biology</h3></div>
            <div className='exerciseWindow'>
                <p className="singleWord">
                    {started ? words[currentWordIndex] : "Press Go to begin"}
                    {finished ? "― H. Jackson Brown Jr., P.S. I Love You" : ""}
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
                        Go
                    </Button>
                </Col>
                
                <Col>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px'}}>
                        <input 
                            type="number" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)} 
                            placeholder={avgReadingSpeed}
                            className="form-control"
                            style={{ width: '100px', height: '100%', backgroundColor:'#0e0e13', color:'white !important', borderColor: '#0d0d0d', marginRight: '5px'}}
                            disabled={started}
                        /> 
                        WPM
                    </div>
                </Col>
                
                <Col style={{ marginRight: '10px' }}>
                    <Button 
                        className='subjectButtons' 
                        size="lg" 
                        style={{ backgroundColor: '#e67300', borderColor: '#994d00' }} 
                        onClick={() => setStarted(true)} 
                        disabled={!finished}
                    >
                        Go to question
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Exercise;
