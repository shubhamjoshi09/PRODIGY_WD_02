let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 1;

const timeDisplay = document.getElementById("time");
const startPauseBtn = document.getElementById("startPause");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapsContainer = document.getElementById("laps");

function formatTime(time) {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return (
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds) +
    "." +
    (milliseconds < 10 ? "0" + milliseconds : milliseconds)
  );
}

function startPause() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startPauseBtn.textContent = "Pause";
    startPauseBtn.classList.add("secondary");
    startPauseBtn.classList.remove("primary");
    running = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startPauseBtn.textContent = "Start";
    startPauseBtn.classList.add("primary");
    startPauseBtn.classList.remove("secondary");
    running = false;
  }
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  running = false;
  timeDisplay.textContent = "00:00:00.00";
  startPauseBtn.textContent = "Start";
  startPauseBtn.classList.add("primary");
  startPauseBtn.classList.remove("secondary");
  lapsContainer.innerHTML = "";
  lapCount = 1;
}

function lap() {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}`;
    const timeText = document.createElement("span");
    timeText.textContent = lapTime;
    lapItem.appendChild(timeText);
    lapsContainer.appendChild(lapItem);
    lapCount++;
  }
}

startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
