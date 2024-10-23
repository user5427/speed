import React, { useState, useEffect } from 'react';
import '../../styles/exerciseStyle.css';
import { QuestionComponent } from '../../.components/.MainComponentsExport';
import { useNavigate } from 'react-router-dom';
import { ArticleInfo, FeedbackMessage, ConfettiEffect, ResultsTableComponent, ReadingExerciseComponent} from '../../.components/Exercise/.MainExerciseExport';
import { questions, exerciseInfo } from './articleData';

import { ArticleController, ParagraphController } from '../../.controllers/.MainControllersExport';

const Exercise = () => {
  const navigate = useNavigate();

  const redirectToCategories = () => {
    navigate('/categories');
  };

  const valuetext = (value) => `${value}`;

  // Initialize Hooks at the top level
  const [articleData, setArticleData] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);
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
  const [confettiActive, setConfettiActive] = useState(false);

  const {
    avgReadingSpeed,
    worldRecordWPM,
    usersWPM,
    author,
    source,
    publisher,
  } = exerciseInfo;


  // Declare variables that might be used in useEffect hooks
  const words = paragraphs[currentParagraphIndex]?.text?.split(' ') || [];

  // Fetch the article data when the component mounts
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await ArticleController.Get(111);
        setArticleData(article);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, []);

  // Fetch the paragraphs after articleData is loaded
  useEffect(() => {
    const fetchParagraphs = async () => {
      try {
        const paragraphsData = await Promise.all(
          articleData.paragraphIDs.map((id) => ParagraphController.Get(id))
        );
        setParagraphs(paragraphsData);
      } catch (error) {
        console.error('Error fetching paragraphs:', error);
      }
    };
    if (articleData && articleData.paragraphIDs && articleData.paragraphIDs.length > 0) {
      fetchParagraphs();
    }
  }, [articleData]);

  const totalParagraphs = paragraphs.length;


  // Word reveal loop for each paragraph
useEffect(() => {
  if (articleCompleted) return;
  if (!started || finished) return;
  //if (timePerParagraph.length >= totalParagraphs) return; // Prevent extra intervals

  // Ensure that avgReadingSpeed and worldRecordWPM are defined
  if (avgReadingSpeed == null || worldRecordWPM == null) return;

  // Ensure that words are defined
  if (!words || words.length === 0) return;

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

        setTimePerParagraph((prevTimes) => {
          if (prevTimes.length < totalParagraphs) {
            return [...prevTimes, timeTaken];
          } else {
            return prevTimes;
          }
        });
        
        return prevIndex;
      }
    });
  }, intervalTime);

  return () => clearInterval(interval); // Cleanup
}, [
  started,
  finished,
  inputValue,
  startTime,
  avgReadingSpeed,
  worldRecordWPM,
  words,
  articleCompleted, // Include in dependency array
]);

  // Confetti effect when the article is completed
  useEffect(() => {
    if (articleCompleted) {
      setConfettiActive(true);
    }
  }, [articleCompleted]);

  // All Hooks have been called at this point

// Now, check if data is loaded
if (!articleData || paragraphs.length === 0) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
      }}
    >
      <h1 style={{ color: 'white' }}>Loading...</h1>
    </div>
  );
}


  // Now you can safely access articleData properties
  const title = articleData.title;
  const subject = articleData.categoryTitle;
  const paragraphIDs = articleData.paragraphIDs;

  const wordsPerParagraph = paragraphs.map((paragraph) => paragraph.text.split(' ').length);
  const linearToLog = (value) => Math.round(Math.pow(10, value / 100));
  const logToLinear = (value) => Math.round(Math.log10(value) * 100);

  // Other functions and event handlers
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
    const totalWords = correctIndices.reduce(
      (sum, index) => sum + wordsPerParagraph[index],
      0
    );
    const totalTime = correctIndices.reduce(
      (sum, index) => sum + timePerParagraph[index],
      0
    );

    return totalWords / (totalTime / 60);
  };

  const handleStart = () => setStarted(true);
  const handleShowQuestion = () => {
    setShowQuestion(true);
    setQuestionButtonClicked(true);
  };

  const handleQuestionSubmit = (selectedAnswer) => {
    // Access the correct answer from the questions array
    const correctAnswer = questions[currentParagraphIndex].correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;
  
    setAnswersCorrectness((prevAnswers) => {
      if (prevAnswers.length < totalParagraphs) {
        return [...prevAnswers, isCorrect];
      } else {
        return prevAnswers;
      }
    });
    
    if (isCorrect) {
      setFeedbackMessage('Correct!');
    } else {
      setFeedbackMessage(`Incorrect! The correct answer was '${correctAnswer}'.`);
    }
  };
  
  

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
      setStarted(false); // Ensure started is false
      setFinished(true); // Ensure finished is true
      setStartTime(null); // Reset start time
      setArticleCompleted(true); // Mark article as completed
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
