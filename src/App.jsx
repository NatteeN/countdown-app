import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [overtime, setOvertime] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused && secondsLeft > 0) {
      // นับถอยหลัง
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && !isPaused && secondsLeft === 0 && !isTimeUp) {
      // หมดเวลา → เริ่ม overtime
      setIsTimeUp(true);
      interval = setInterval(() => {
        setOvertime(prev => prev + 1);
      }, 1000);
    } else if (isRunning && !isPaused && isTimeUp) {
      // นับ overtime ต่อ
      interval = setInterval(() => {
        setOvertime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [secondsLeft, isRunning, isPaused, isTimeUp]);

  const startCountdown = () => {
    const totalSeconds = parseInt(minutes) * 60;
    if (!isNaN(totalSeconds) && totalSeconds > 0) {
      setInitialSeconds(totalSeconds);
      setSecondsLeft(totalSeconds);
      setOvertime(0);
      setIsRunning(true);
      setIsPaused(false);
      setIsTimeUp(false);
    }
  };

  const repeatCountdown = () => {
    setSecondsLeft(initialSeconds);
    setOvertime(0);
    setIsRunning(true);
    setIsPaused(false);
    setIsTimeUp(false);
  };

  const stopCountdown = () => {
    setIsPaused(true);
  };

  const resumeCountdown = () => {
    setIsPaused(false);
  };

  const clearCountdown = () => {
    setMinutes('');
    setSecondsLeft(0);
    setOvertime(0);
    setIsRunning(false);
    setIsPaused(false);
    setIsTimeUp(false);
  };

  const getBackgroundColor = () => {
    if (isTimeUp) return 'red';
    const percent = secondsLeft / initialSeconds;
    if (percent > 0.5) return 'green';
    if (percent > 0.2) return 'orange';
    return 'red';
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h.toString().padStart(2, '0') + ':' : ''}${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // return (
  //   <div
  //     className="App"
  //     style={{ backgroundColor: isRunning ? getBackgroundColor() : 'white' }}
  //   >
  //     {!isRunning ? (
  //       <div className="input-container">
  //         <h1>Countdown Timer</h1>
  //         <input
  //           type="number"
  //           placeholder="Enter minutes"
  //           value={minutes}
  //           onChange={(e) => setMinutes(e.target.value)}
  //         />
  //         <button onClick={startCountdown}>Start</button>
  //       </div>
  //     ) : (
  //       <div className="timer-display">
  //         {isTimeUp ? (
  //           <>
  //             <h1>Time Up!</h1>
  //             <h2 style={{ margin: '1rem 0' }}>+{formatTime(overtime)}</h2>
  //             <div>
  //               <button onClick={repeatCountdown}>Repeat</button>
  //               <button onClick={clearCountdown} style={{ marginLeft: '1rem' }}>
  //                 New Timer
  //               </button>
  //             </div>
  //           </>
  //         ) : (
  //           <>
  //             <h1>{formatTime(secondsLeft)}</h1>
  //             <div style={{ marginTop: '1rem' }}>
  //               {!isPaused ? (
  //                 <button onClick={stopCountdown}>Stop</button>
  //               ) : (
  //                 <button onClick={resumeCountdown}>Resume</button>
  //               )}
  //               <button onClick={clearCountdown} style={{ marginLeft: '1rem' }}>
  //                 Clear
  //               </button>
  //               <button onClick={repeatCountdown} style={{ marginLeft: '1rem' }}>
  //                 Re-count
  //               </button>
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
  return (
  !isRunning ? (
    <div className="start-screen">
      <div className="gradient-bg"></div>
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
    </div>
  ) : (
    <div className="App" style={{ backgroundColor: getBackgroundColor() }}>
  <div className="timer-display">
    {isTimeUp ? (
      <>
        <h1>Time Up!</h1>
        <h2 style={{ margin: '1rem 0' }}>+{formatTime(overtime)}</h2>
        <div>
          <button onClick={repeatCountdown}>Repeat</button>
          <button onClick={clearCountdown} style={{ marginLeft: '1rem' }}>
            New Timer
          </button>
        </div>
      </>
    ) : (
      <>
        {/* แสดงสถานะ Paused */}
        {isPaused && <div className="status">⏸ Paused</div>}

        {/* เวลา */}
        <h1>{formatTime(secondsLeft)}</h1>

        {/* ปุ่มควบคุม */}
        <div style={{ marginTop: '1rem' }}>
          {!isPaused ? (
            <button onClick={stopCountdown}>⏸ Pause</button>
          ) : (
            <button onClick={resumeCountdown}>▶ Resume</button>
          )}
          <button onClick={clearCountdown} style={{ marginLeft: '1rem' }}>
            Clear
          </button>
          <button onClick={repeatCountdown} style={{ marginLeft: '1rem' }}>
            Re-count
          </button>
        </div>
      </>
    )}
  </div>
</div>
  )
);
  
}

export default App;