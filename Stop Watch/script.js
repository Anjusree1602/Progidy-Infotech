let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let previousTimes = [];
let isRunning = false;

const stopwatchDisplay = document.getElementById('stopwatch-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapTimesList = document.getElementById('lap-times');
const previousTimesList = document.getElementById('previous-times');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);

function startStopwatch() {
    startTime = new Date().getTime();
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    updateStopwatch();
}

function pauseStopwatch() {
    currentTime = new Date().getTime() - startTime;
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    addLapTime();
}

function resetStopwatch() {
    startTime = 0;
    currentTime = 0;
    lapTimes = [];
    previousTimes = [];
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapTimesList.innerHTML = '';
    previousTimesList.innerHTML = '';
    stopwatchDisplay.textContent = '00:00:00';
}

function updateStopwatch() {
    if (isRunning) {
        const currentTimeMs = new Date().getTime() - startTime;
        const hours = Math.floor(currentTimeMs / 3600000);
        const minutes = Math.floor((currentTimeMs % 3600000) / 60000);
        const seconds = Math.floor((currentTimeMs % 60000) / 1000);
        const milliseconds = currentTimeMs % 1000;
        stopwatchDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
        setTimeout(updateStopwatch, 10);
    }
}

function pad(number, length = 2) {
    return String(number).padStart(length, '0');
}

function addLapTime() {
    const lapTime = stopwatchDisplay.textContent;
    lapTimes = [lapTime]; 
    lapTimesList.innerHTML = ''; 
    const lapTimeListItem = document.createElement('li');
    lapTimeListItem.textContent = lapTime;
    lapTimesList.appendChild(lapTimeListItem);
    
    previousTimes = [lapTime]; 
    previousTimesList.innerHTML = ''; 
    const previousTimeListItem = document.createElement('li');
    previousTimeListItem.textContent = lapTime;
    previousTimesList.appendChild(previousTimeListItem);
}
