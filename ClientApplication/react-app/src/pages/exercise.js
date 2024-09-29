import React, { useState, useEffect } from 'react';
import "../styles/exerciseStyle.css"; 
import { Row, Col, Button } from 'react-bootstrap';

const Exercise = () => {

    const text = "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.";
    const words = text.split(" ");

    //State trackers
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // basically i = 0
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);

    //The flashing words loop
    useEffect(() => {
        if (!started) return;

        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => {
                if (prevIndex < words.length) {
                    return prevIndex + 1;
                } else {
                    setFinished(true);
                    return prevIndex;
                }
            });
            
        }, 200 /*Adjust this for speed*/ );
        
        return () => clearInterval(interval); //Preventing memory leaks
    }, [started, words.length]);


    return (
        <div className='mainContainer'>
            <div className='exerciseWindow'>
                <p className="singleWord">
                    {started ? words[currentWordIndex] : "Press Go to begin"}
                    {finished ? "― H. Jackson Brown Jr., P.S. I Love You" : ""}
                </p>
            </div>

            <Row style={{ marginTop: '25px' }}>
                <Col xs={12} md={2}>
                    <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#739900', borderColor: '#608000' }} onClick={() => setStarted(true)} disabled={started}>
                        Go
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Exercise;
