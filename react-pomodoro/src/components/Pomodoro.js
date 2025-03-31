import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { motion, AnimatePresence } from 'framer-motion';
import { timerState, roundState, totalRoundsState, goalState, totalGoalsState, isRunningState } from '../atoms';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #2c3e50;
  color: white;
`;

const TimerDisplay = styled(motion.div)`
  font-size: 8rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  margin: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const StatsDisplay = styled.div`
  font-size: 1.5rem;
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
`;

const Pomodoro = () => {
  const [timer, setTimer] = useRecoilState(timerState);
  const [round, setRound] = useRecoilState(roundState);
  const [totalRounds] = useRecoilState(totalRoundsState);
  const [goal, setGoal] = useRecoilState(goalState);
  const [totalGoals] = useRecoilState(totalGoalsState);
  const [isRunning, setIsRunning] = useRecoilState(isRunningState);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setRound((prev) => {
        const newRound = prev + 1;
        if (newRound >= totalRounds) {
          setGoal((prevGoal) => prevGoal + 1);
          return 0;
        }
        return newRound;
      });
      setTimer(25 * 60);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timer, setTimer, setRound, setGoal, totalRounds]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setTimer(25 * 60);
    setIsRunning(false);
    setRound(0);
    setGoal(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
      <AnimatePresence mode="wait">
        <TimerDisplay
          key={timer}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(timer)}
        </TimerDisplay>
      </AnimatePresence>
      
      <div>
        <Button onClick={toggleTimer}>
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>

      <StatsDisplay>
        <div>Round: {round}/{totalRounds}</div>
        <div>Goal: {goal}/{totalGoals}</div>
      </StatsDisplay>
    </Container>
  );
};

export default Pomodoro;
