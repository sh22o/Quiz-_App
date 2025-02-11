import React, { useState, useEffect, useRef } from "react";
import "./Quize.css";
import data from "../assets/data.js";

const TOTAL_TIME = 60; // Total quiz duration
const QUESTION_TIME = 12; // Time per question
const COUNTDOWN_START = 3; // Countdown before quiz starts

const Quize = () => {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(QUESTION_TIME);
  const [totalTimeLeft, setTotalTimeLeft] = useState(TOTAL_TIME);
  const [timeUp, setTimeUp] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_START);

  const timerRef = useRef(null);
  const totalTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);
  const optionsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // 📌 Countdown before quiz starts
  useEffect(() => {
    if (startQuiz || result) return;

    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownTimerRef.current);
          setStartQuiz(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimerRef.current);
  }, [startQuiz]);

  // 📌 Start total quiz timer when quiz starts
  useEffect(() => {
    if (!startQuiz || result) return;

    totalTimerRef.current = setInterval(() => {
      setTotalTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(totalTimerRef.current);
          setResult(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(totalTimerRef.current);
  }, [startQuiz]);

  // 📌 Start question timer when question changes
  useEffect(() => {
    if (!startQuiz || result) return;

    setQuestionTimeLeft(QUESTION_TIME);
    setTimeUp(false);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setQuestionTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          setTimeUp(true);
          handleNext();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [index, startQuiz]);

  // 📌 Check answer function
  const checkAnswer = (e, answer) => {
    if (lock) return;
    clearInterval(timerRef.current);

    if (data[index].ans === answer) {
      e.target.classList.add("correct");
      setScore(score + 1);
    } else {
      e.target.classList.add("wrong");

      let correctIndex = [
        data[index].option1,
        data[index].option2,
        data[index].option3,
        data[index].option4,
      ].indexOf(data[index].ans);

      optionsRef[correctIndex].current.classList.add("correct");
    }

    setLock(true);
    setTimeout(handleNext, 500);
  };

  // 📌 Handle Next Question
  const handleNext = () => {
    if (index === data.length - 1) {
      setResult(true);
      clearInterval(timerRef.current);
      clearInterval(totalTimerRef.current);
      return;
    }

    setIndex(index + 1);
    setLock(false);

    optionsRef.forEach((ref) => {
      if (ref.current) {
        ref.current.classList.remove("correct", "wrong");
      }
    });
  };

  // 📌 Reset the quiz properly
  const handleReset = () => {
    clearInterval(timerRef.current);
    clearInterval(totalTimerRef.current);
    clearInterval(countdownTimerRef.current);

    setIndex(0);
    setScore(0);
    setResult(false);
    setLock(false);
    setQuestionTimeLeft(QUESTION_TIME);
    setTotalTimeLeft(TOTAL_TIME);
    setTimeUp(false);
    setCountdown(COUNTDOWN_START); // Restart countdown
    setStartQuiz(false); // Reset quiz state

    setTimeout(() => setStartQuiz(false), 0); // Ensure state updates
  };

  // 📌 Result messages
  let resultMessage = "";
  if (totalTimeLeft === 0) {
    resultMessage = "⏳ Time's Up! Try again!";
  } else if (score === data.length) {
    resultMessage = "🎉 Amazing! You got all answers correct!";
  } else if (score >= data.length / 2) {
    resultMessage = "😊 Good job! Keep practicing!";
  } else {
    resultMessage = "😢 Good luck next time! Keep learning!";
  }

  return (
    <div className="container">
      {startQuiz ? (
        <>
          <div className="quiz-header">
            <h2> Quiz App </h2>
            <div className="timer-container">
              <h3 className="total-timer" style={{ fontSize: "20px", fontWeight: "bold", color: totalTimeLeft <= 10 ? "red" : "black" }}>
                ⏳ Total: {totalTimeLeft}s
              </h3>
              <h3 className="question-timer" style={{ fontSize: "24px", fontWeight: "bold", float: "right", color: questionTimeLeft <= 3 ? "red" : "black" }}>
                ⏳ {questionTimeLeft}s
              </h3>
            </div>
          </div>
          <hr />

          {result ? (
            <>
              <h3>{resultMessage}</h3>
              <h3>Your Score: {score} out of {data.length}</h3>
              <button onClick={handleReset}>Reset</button>
            </>
          ) : (
            <>
              <h2>{index + 1}. {data[index].question}</h2>

              {timeUp && <h3 className="time-up-message">⏰ Time's Up!</h3>}

              <ul>
                <li ref={optionsRef[0]} onClick={(e) => checkAnswer(e, data[index].option1)}>{data[index].option1}</li>
                <li ref={optionsRef[1]} onClick={(e) => checkAnswer(e, data[index].option2)}>{data[index].option2}</li>
                <li ref={optionsRef[2]} onClick={(e) => checkAnswer(e, data[index].option3)}>{data[index].option3}</li>
                <li ref={optionsRef[3]} onClick={(e) => checkAnswer(e, data[index].option4)}>{data[index].option4}</li>
              </ul>

              <button className="button" onClick={handleNext}>Next</button>

              <div className="index"> {index + 1} of {data.length} questions </div>
            </>
          )}
        </>
      ) : (
        <>
          <h2>Get Ready!</h2>
          <h3 className="countdown">{countdown}</h3>
        </>
      )}
    </div>
  );
};

export default Quize;
