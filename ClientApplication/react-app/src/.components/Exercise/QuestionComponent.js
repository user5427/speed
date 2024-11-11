import React, { useState, useEffect, useRef } from 'react';
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

import { useTranslation } from 'react-i18next'; 

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const QuestionComponent = ({
  question,
  options = [],
  onSubmit,
  currentParagraphIndex,
}) => {
  const [shuffledOptions, setShuffledOptions] = useState([]); // Store shuffled options
  const [selectedAnswer, setSelectedAnswer] = useState(''); // Track selected answer
  const [submitted, setSubmitted] = useState(false); // Track if the user has submitted the answer
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const optionsShuffled = useRef(false); // Track if options are already shuffled

  // Shuffle the options only once when the component is first rendered
  useEffect(() => {
    if (!optionsShuffled.current) {
      const optionsWithIndices = options.map((optionText, index) => ({
        optionText,
        originalIndex: index,
      }));
      setShuffledOptions(shuffleArray([...optionsWithIndices]));
      optionsShuffled.current = true;
    }
  }, [options]);

  // Handle answer selection
  const handleListItemClick = (optionText, originalIndex) => {
    setSelectedAnswer(optionText);
    setSelectedOptionIndex(originalIndex);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit(selectedOptionIndex);
  };

  const { t } = useTranslation();

  return (
    <div className="questionContainer">
      <Row>
        <Col>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="yellowCircle">{currentParagraphIndex + 1}</div>
            <h3 style={{ margin: 0 }}>{question}</h3>
          </div>
        </Col>
      </Row>
      <Divider
        variant="middle"
        style={{
          margin: '13px 0',
          backgroundColor: '#666',
          borderBottomWidth: 3,
        }}
      />
      <Box
        sx={{
          width: '100%',
          bgcolor: '#0e0e13',
          color: 'white',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '5px',
        }}
      >
        <Grid container spacing={2}>
          {shuffledOptions.map(({ optionText, originalIndex }, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <ListItemButton
                onClick={() => handleListItemClick(optionText, originalIndex)}
                disabled={submitted}
                sx={{
                  bgcolor:
                    selectedAnswer === optionText
                      ? '#4d0039 !important'
                      : '#1f1f2d',
                  '&:hover': {
                    bgcolor: '#3f3f5a',
                  },
                  color: 'white',
                  borderRadius: '4px',
                  width: '100%',
                }}
              >
                <ListItemIcon>
                  {selectedAnswer === optionText ? (
                    <RadioButtonCheckedIcon sx={{ color: '#ffccff' }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ color: 'white' }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={optionText}
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
        className="buttons purple"
        size="lg"
        style={{
          marginTop: '10px',
        }}
        onClick={handleSubmit}
        disabled={submitted || !selectedAnswer}
      >
        {t('exercise.question.submitAnswer')}
      </Button>
    </div>
  );
};

export default QuestionComponent;
