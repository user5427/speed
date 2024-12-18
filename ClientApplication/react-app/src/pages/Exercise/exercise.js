import React, { useState, useEffect, useMemo } from 'react';
import '../../styles/exerciseStyle.css';
import { QuestionComponent } from '../../.components/.MainComponentsExport';
import { useNavigate } from 'react-router-dom';
import { ArticleInfo, FeedbackMessage, ConfettiEffect, ResultsTableComponent, ReadingExerciseComponent} from '../../.components/Exercise/.MainExerciseExport';
import { exerciseInfo } from './articleData';
import { ParagraphSession } from '../../.entities/.MainEntitiesExport';
import { ArticleSession } from '../../.entities/.MainEntitiesExport';
import { ArticleSessionController } from '../../.controllers/.MainControllersExport';


import { ArticleController, ParagraphController, QuestionController} from '../../.controllers/.MainControllersExport';
import { useSearchParams } from 'react-router-dom';  // Import hook for query params

import { useTranslation } from 'react-i18next'; 
import { ThreeDots } from 'react-loader-spinner';

const Exercise = () => {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const redirectToCategories = () => {
    navigate('/categories');
  };

  const valuetext = (value) => `${value}`;

  const [searchParams] = useSearchParams();
  const [articleId, setArticleId] = useState(searchParams.get('articleId'));

  const [articleData, setArticleData] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);
  const [questionsPerParagraph, setQuestionsPerParagraph] = useState([]);
  const [paragraphImageUrl, setParagraphImageUrl] = useState(null);
  const [questionImageUrl, setQuestionImageUrl] = useState(null);



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
  
  const [paragraphSessions, setParagraphSessions] = useState([]);
  const [articleSession, setArticleSession] = useState(null); 

  const currentQuestions = questionsPerParagraph[currentParagraphIndex] || [];

  const {
    avgReadingSpeed,
    worldRecordWPM,
    usersWPM,
    author,
    source,
    publisher,
    addedBy,
  } = exerciseInfo;

  useEffect(() => {
    if (articleId) {
      const newArticleSession = ArticleSession.createSession(Number(articleId));
      setArticleSession(newArticleSession);
    }
  }, [articleId]);

  const saveParagraphSession = () => {
    const currentParagraph = paragraphs[currentParagraphIndex];
    if (!currentParagraph?.id || !timePerParagraph[currentParagraphIndex] || !inputValue) {
      console.error("Missing required fields for paragraph session.");
      return;
    }

    const session = new ParagraphSession();
    session.setParagraphId(currentParagraph.id);
    session.setDuration(timePerParagraph[currentParagraphIndex]);
    session.setWpm(inputValue);

    // Push the paragraph session into the article session
    articleSession.addParagraphSession(session);

    console.log("Paragraph session added to ArticleSession:", session);
    console.log("Current ArticleSession:", articleSession);
  };

  const finishArticleSession = async () => {
    try {
      console.log("Posting ArticleSession:", articleSession);
      await ArticleSessionController.Post(articleSession);
      console.log("Article session saved successfully.");
    } catch (error) {
      console.error("Error saving article session:", error);
    }
  };
  
  

  const words = useMemo(() => {
    return paragraphs[currentParagraphIndex]?.text?.split(' ') || [];
  }, [paragraphs, currentParagraphIndex]);
  
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        let MyArticleId = articleId;
        if (MyArticleId === null) {
          MyArticleId = 155; // DEFAULT ARTICLE ID
        }
        const article = await ArticleController.Get(MyArticleId);
        setArticleData(article);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, []);


useEffect(() => {
  const fetchParagraphs = async () => {
    try {
      const paragraphsData = await Promise.all(
        articleData.paragraphIDs.map((id) => ParagraphController.Get(id))
      );
/*
      // Sort the paragraphsData based on the numbers in the titles
      //TO RECONSIDER
      paragraphsData.sort((a, b) => {
        const aNumber = parseInt(a.title.split('.')[0]);
        const bNumber = parseInt(b.title.split('.')[0]);
        return aNumber - bNumber;
      });
*/
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


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsData = await Promise.all(
          paragraphs.map(async (paragraph) => {
            if (paragraph.questionIDs && paragraph.questionIDs.length > 0) {
              const questionsForParagraph = await Promise.all(
                paragraph.questionIDs.map((questionID) => QuestionController.Get(questionID))
              );
              return questionsForParagraph;
            } else {
              return [];
            }
          })
        );
        setQuestionsPerParagraph(questionsData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    if (paragraphs.length > 0) {
      fetchQuestions();
    }
  }, [paragraphs]);
  
  useEffect(() => {
    let isMounted = true;
  
    const fetchQuestionImage = async () => {
      try {
        if (currentQuestions.length === 0) {
          setQuestionImageUrl(null);
          return;
        }
  
        const question = currentQuestions[0]; // Assuming one question per paragraph TO RECHECK
        const imageURL = await QuestionController.GetImage(question.id);
  
        if (isMounted) {
          if (imageURL) {
            setQuestionImageUrl(imageURL);
          } else {
            setQuestionImageUrl(null);
          }
        }
      } catch (error) {
        console.error('Error fetching question image:', error);
        if (isMounted) {
          setQuestionImageUrl(null);
        }
      }
    };
  
    if (showQuestion) {
      fetchQuestionImage();
    }
  
    return () => {
      isMounted = false;
    };
  }, [showQuestion, currentQuestions]);
  


  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        const currentParagraph = paragraphs[currentParagraphIndex];
        if (!currentParagraph) return;

        const imageURL = await ParagraphController.GetImage(currentParagraph.id);

        if (isMounted) {
          if (imageURL) {
            setParagraphImageUrl(imageURL);
          } else {
            setParagraphImageUrl(null); // Set to NoImage when no image is available
          }
        }
      } catch (error) {
        console.error('Error fetching image:', error);
        if (isMounted) {
          setParagraphImageUrl(null); // Set to NoImage on error
        }
      }
    };

    if (paragraphs.length > 0) {
      fetchImage();
    }

    return () => {
      isMounted = false;
    };
  }, [currentParagraphIndex, paragraphs]);


// Word reveal loop for each paragraph
useEffect(() => {
  if (articleCompleted) return;
  if (!started || finished) return;
  if (avgReadingSpeed == null || worldRecordWPM == null) return;
  if (!words || words.length === 0) return;

  const wpm = Math.min(parseInt(inputValue) || avgReadingSpeed, worldRecordWPM);
  const intervalTime = 60000 / wpm; // Convert WPM to milliseconds

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
  articleCompleted,
  totalParagraphs,
]);

  // Confetti effect when the article is completed
  useEffect(() => {
    if (articleCompleted) {
      setConfettiActive(true);
    }
  }, [articleCompleted]);



  if (!articleData || paragraphs.length === 0 || questionsPerParagraph.length === 0) {
    return (

    <div style={{ display: 'flex', minHeight: '50vh', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="white" 
        ariaLabel="three-dots-loading" 
        visible={true}
      />
    </div>

    );
  }
  
  const title = articleData.title;
  const subject = articleData.categoryTitle;

  const wordsPerParagraph = paragraphs.map((paragraph) => paragraph.text.split(' ').length);
  const linearToLog = (value) => Math.round(Math.pow(10, value / 100));
  const logToLinear = (value) => Math.round(Math.log10(value) * 100);


  const calculateAverageWPM = () => {
    // Get indices of paragraphs where the answer was correct
    const correctIndices = answersCorrectness
      .map((isCorrect, index) => (isCorrect ? index : null))
      .filter((index) => index !== null);

    // If no correct answers - null
    if (correctIndices.length === 0) {
      return null;
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

  const handleStart = () => {
    setStarted(true);
    setStartTime(Date.now());
  };

  const handleShowQuestion = () => {
    setShowQuestion(true);
    setQuestionButtonClicked(true);
  };

  const handleQuestionSubmit = (selectedAnswerIndex) => {
    const currentQuestions = questionsPerParagraph[currentParagraphIndex] || [];
    const question = currentQuestions[0]; // Assuming one question per paragraph 
    // TO COME BACK ^^^^^^^^
    if (!question) {
      setFeedbackMessage('No question available for this paragraph.');
      return;
    }
    const correctAnswerIndex = question.correctAnswerIndex;
    const isCorrect = selectedAnswerIndex === correctAnswerIndex;
  
    setAnswersCorrectness((prevAnswers) => {
      if (prevAnswers.length < totalParagraphs) {
        return [...prevAnswers, isCorrect];
      } else {
        return prevAnswers;
      }
    });
  
    if (isCorrect) {
      setFeedbackMessage(`${t('exercise.message.correct')}!`);
  } else {
      const correctAnswerText = question.answerChoices[correctAnswerIndex];
      setFeedbackMessage(`${t('exercise.message.incorrect')} '${correctAnswerText}'.`);
  }
  };
  
  if (!articleSession) {
    console.error("ArticleSession is not initialized.");
    return;
  }
  
  
  

  const handleNextParagraphOrQuestion = () => {
    if (currentParagraphIndex < paragraphs.length - 1) {
      saveParagraphSession();
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
      saveParagraphSession();
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
        <ArticleInfo title={title} author={author} publisher={publisher} source={source} addedBy={addedBy}/>
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
          paragraphImageUrl={paragraphImageUrl}
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
        <ArticleInfo title={title} author={author} publisher={publisher} source={source} addedBy={addedBy}/>
        </>
        
      )}

{showQuestion && currentQuestions.length > 0 && (
  <div className="mainContainer">
    <QuestionComponent
      question={currentQuestions[0].text}
      options={currentQuestions[0].answerChoices}
      questionImageUrl={questionImageUrl}
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