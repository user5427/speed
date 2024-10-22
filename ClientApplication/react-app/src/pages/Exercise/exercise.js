import React, { useState, useEffect } from 'react';
import '../../styles/exerciseStyle.css';
import { QuestionComponent } from '../../.components/.MainComponentsExport';
import { useNavigate } from 'react-router-dom';
//import { ArticleController, ParagraphController, QuestionController } from '../../.controllers/.services/.MainServices';
import { ArticleInfo, FeedbackMessage, ConfettiEffect, ResultsTableComponent, ReadingExerciseComponent} from '../../.components/Exercise/.MainExerciseExport';
import { paragraphs, questions, exerciseInfo } from './articleData';

const Exercise = () => {
  const navigate = useNavigate();

  const redirectToCategories = () => {
    navigate('/categories');
  };

  const valuetext = (value) => `${value}`;

  const { subject, title, author, source, publisher, avgReadingSpeed, worldRecordWPM, usersWPM } = exerciseInfo;


  const [inputValue, setInputValue] = useState(238); // Track WPM value
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Index of the current word
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0); // Track current paragraph
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionButtonClicked, setQuestionButtonClicked] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [articleCompleted, setArticleCompleted] = useState(false); // New state for article completion
  const [timePerParagraph, setTimePerParagraph] = useState([]); // Array to store time for each paragraph
  const [startTime, setStartTime] = useState(null); // Track the start time of a paragraph
  const [answersCorrectness, setAnswersCorrectness] = useState([]); // Array to store correctness per paragraph

  const wordsPerParagraph = paragraphs.map((paragraph) => paragraph.split(' ').length);

  const linearToLog = (value) => Math.round(Math.pow(10, value / 100));
  const logToLinear = (value) => Math.round(Math.log10(value) * 100);

  const words = paragraphs[currentParagraphIndex].split(' ');

  const [confettiActive, setConfettiActive] = useState(false);
  

  // Word reveal loop for each paragraph
  useEffect(() => {
    if (!started || finished) return;

    const wpm = Math.min(parseInt(inputValue) || avgReadingSpeed, worldRecordWPM);
    const intervalTime = 60000 / wpm; // Convert WPM to milliseconds

    // Record the start time when the paragraph starts
    if (!startTime) {
      setStartTime(Date.now());
    }

    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => {
        if (prevIndex < words.length) {
          return prevIndex + 1;
        } else {
          clearInterval(interval); // Finish current paragraph
          setFinished(true); // Mark paragraph as finished

          // Calculate the time taken to finish the paragraph
          const endTime = Date.now();
          const timeTaken = (endTime - startTime) / 1000; // Time in seconds

          setTimePerParagraph([...timePerParagraph, timeTaken]);

          return prevIndex;
        }
      });
    }, intervalTime);

    return () => clearInterval(interval); // Cleanup
  }, [started, inputValue, words.length, startTime, timePerParagraph, finished]);

  // Move to the next paragraph or display question
  const handleNextParagraphOrQuestion = () => {
    if (currentParagraphIndex < paragraphs.length - 1) {
      // Move to next paragraph
      setCurrentParagraphIndex(currentParagraphIndex + 1);
      setCurrentWordIndex(0);
      setStarted(false); // Reset to start new paragraph
      setFinished(false);
      setQuestionButtonClicked(false);
      setShowQuestion(false); // Hide question for new paragraph
      setFeedbackMessage(''); // Reset feedback
      setStartTime(null); // Reset start time for the new paragraph
    } else {
      // All paragraphs are finished
      setArticleCompleted(true); // Mark article as completed
    }
  };

  useEffect(() => {
    if (articleCompleted) {
      setConfettiActive(true);
    }
  }, [articleCompleted]);
  

  const calculateAverageWPM = () => {
    // Get indices of paragraphs where the answer was correct
    const correctIndices = answersCorrectness
      .map((isCorrect, index) => (isCorrect ? index : null))
      .filter((index) => index !== null);

    // If no correct answers, return null or NaN
    if (correctIndices.length === 0) {
      return null; // Or you can return NaN
    }

    // Sum words and time only for paragraphs with correct answers
    const totalWords = correctIndices.reduce((sum, index) => sum + wordsPerParagraph[index], 0);
    const totalTime = correctIndices.reduce((sum, index) => sum + timePerParagraph[index], 0);

    return totalWords / (totalTime / 60);
  };

  const handleStart = () => setStarted(true);
  const handleShowQuestion = () => {
    setShowQuestion(true);
    setQuestionButtonClicked(true);
  };

  const handleQuestionSubmit = (selectedAnswer) => {
    const correctAnswer = questions[currentParagraphIndex].correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;

    // Update the answersCorrectness array
    setAnswersCorrectness((prevAnswers) => [...prevAnswers, isCorrect]);

    if (isCorrect) {
      setFeedbackMessage('Correct!');
    } else {
      setFeedbackMessage(`Incorrect! The correct answer was '${correctAnswer}'.`);
    }
  };

  if (articleCompleted) {
    return (
      <>
        <ConfettiEffect active={confettiActive} />
        <ResultsTableComponent
          timePerParagraph={timePerParagraph}
          wordsPerParagraph={wordsPerParagraph}
          usersWPM={usersWPM}
          answersCorrectness={answersCorrectness}
          calculateAverageWPM={calculateAverageWPM}
          redirectToCategories={redirectToCategories}
        />
        <ArticleInfo title={title} author={author} publisher={publisher} source={source} />
      </>
    );
  }

  return (
    <>
      {!showQuestion && (
        <>
        <ReadingExerciseComponent
          subject={subject}
          title={title}
          currentParagraphIndex={currentParagraphIndex}
          paragraphs={paragraphs}
          words={words}
          started={started}
          finished={finished}
          currentWordIndex={currentWordIndex}
          handleStart={handleStart}
          handleShowQuestion={handleShowQuestion}
          inputValue={inputValue}
          setInputValue={setInputValue}
          logToLinear={logToLinear}
          linearToLog={linearToLog}
          worldRecordWPM={worldRecordWPM}
          valuetext={valuetext}
          questionButtonClicked={questionButtonClicked}
        />
        <ArticleInfo title={title} author={author} publisher={publisher} source={source} />
        </>
        
      )}

      {showQuestion && (
        <div className="mainContainer">
          <QuestionComponent
            question={questions[currentParagraphIndex].question}
            options={questions[currentParagraphIndex].options}
            onSubmit={handleQuestionSubmit}
            currentParagraphIndex={currentParagraphIndex}
          />
        </div>
      )}

      {feedbackMessage && (
        <FeedbackMessage
          feedbackMessage={feedbackMessage}
          currentParagraphIndex={currentParagraphIndex}
          paragraphs={paragraphs}
          handleNextParagraphOrQuestion={handleNextParagraphOrQuestion}
        />
      )}
    </>
  );
};

export default Exercise;
