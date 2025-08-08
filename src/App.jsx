import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
    }
  }, [secondsLeft, isRunning]);

  const startCountdown = () => {
    const totalSeconds = parseInt(minutes) * 60;
    if (!isNaN(totalSeconds) && totalSeconds > 0) {
      setSecondsLeft(totalSeconds);
      setIsRunning(true);
    }
  };

  const getBackgroundColor = () => {
    const percent = secondsLeft / (parseInt(minutes) * 60);
    if (percent > 0.5) return 'green';
    if (percent > 0.2) return 'orange';
    return 'red';
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App" style={{ backgroundColor: isRunning ? getBackgroundColor() : 'white' }}>
      {!isRunning ? (
        <div className="input-container">
          <h1>Countdown Timer</h1>
          <input
            type="number"
            placeholder="Enter minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
          <button onClick={startCountdown}>Start</button>
        </div>
      ) : (
        <div className="timer-display">
          <h1>{formatTime(secondsLeft)}</h1>
        </div>
      )}
    </div>
  );
}

export default App;