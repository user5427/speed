import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import '../../styles/exerciseStyle.css'; 

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const QuestionComponent = ({ question, options = [], onSubmit, currentParagraphIndex }) => {
    const [shuffledOptions, setShuffledOptions] = useState([]); // Store shuffled options
    const [selectedAnswer, setSelectedAnswer] = useState(''); // Track selected answer
    const [submitted, setSubmitted] = useState(false); // Track if the user has submitted the answer

    // Shuffle the options only once when the component is first rendered
    useEffect(() => {
        setShuffledOptions(shuffleArray([...options])); // Shuffle options when the component mounts
    }, [options]);

    // Handle answer selection
    const handleListItemClick = (option) => {
        setSelectedAnswer(option);
    };

    const handleSubmit = () => {
        setSubmitted(true); // Disable the button after submission
        onSubmit(selectedAnswer); // Pass the selected answer to the parent component
    };

    return (
        <div className="questionContainer">
            <Row>
                <Col>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="yellowCircle">
                            {currentParagraphIndex + 1}
                        </div>
                        <h3 style={{ margin: 0 }}>{question}</h3>
                    </div>
                </Col>
            </Row>
            <Divider variant="middle" style={{ margin: '13px 0', backgroundColor: '#666', borderBottomWidth: 3 }} />
            <Box sx={{ width: '100%', bgcolor: '#0e0e13', color: 'white', borderRadius: '8px', padding: '20px', marginBottom: '5px' }}>
                <Grid container spacing={2}>
                    {shuffledOptions.map((option, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <ListItemButton
                                onClick={() => handleListItemClick(option)}
                                disabled={submitted} // Disable interaction on submit
                                sx={{
                                    bgcolor: selectedAnswer === option ? '#4d0039 !important' : '#1f1f2d',
                                    '&:hover': {
                                        bgcolor: '#3f3f5a',
                                    },
                                    color: 'white',
                                    borderRadius: '4px',
                                    width: '100%',
                                }}
                            >
                                <ListItemIcon>
                                    {selectedAnswer === option ? (
                                        <RadioButtonCheckedIcon sx={{ color: '#ffccff' }} />
                                    ) : (
                                        <RadioButtonUncheckedIcon sx={{ color: 'white' }} />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={option}
                                    primaryTypographyProps={{
                                        style: {
                                            fontFamily: 'Fredoka, sans-serif',
                                            color: 'white',
                                            fontSize: '18px',
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Button
                className="subjectButtons"
                size="lg"
                style={{ marginTop: "10px", backgroundColor: '#862d86', borderColor: '#602060' }}
                onClick={handleSubmit} // Call the handleSubmit when user submits
                disabled={submitted || !selectedAnswer} // Disable the button if already submitted or if no answer selected
            >
                Submit Answer
            </Button>
        </div>
    );
};

export default QuestionComponent;
