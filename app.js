const $start = document.getElementById("start");
const $stop = document.getElementById("stop");
const $reset = document.getElementById("reset");
const $timer = document.getElementById("timer");
const $miku = document.getElementById("miku-chara");

let WORK_TIME = 1500;
let BREAK_TIME = 300;

let timeLeft = WORK_TIME;
let isBreak = false;
let interval = null;
let mikuShowFlag = false;
// ここから

const updateTimeDisplay = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  $timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const stopTimer = () => {
  clearInterval(interval);
  interval = null;
};

const resetTimer = () => {
  stopTimer();
  isBreak = false;
  timeLeft = WORK_TIME;
  updateTimeDisplay();
};

const showMikuAnimation = () => {
  $miku.classList.add("show");

  setTimeout(() => {
    $miku.classList.remove("show");
  }, 6000);
};

const timerStep = () => {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimeDisplay();

    const currentSeconds = timeLeft % 60;
    if (currentSeconds === 40 && !mikuShowFlag) {
      mikuShowFlag = true;
      showMikuAnimation();
    }

    if (currentSeconds !== 40) {
      mikuShowFlag = false;
    }
  } else {
    stopTimer();
    if (!isBreak) {
      alert("休憩");
      isBreak = true;
      timeLeft = BREAK_TIME;
    } else {
      alert("開始!");
      isBreak = false;
      timeLeft = WORK_TIME;
    }
    updateTimeDisplay();
    startTimer();
  }
};

const startTimer = () => {
  if (interval !== null) return;

  interval = setInterval(timerStep, 1000);
};

$start.addEventListener("click", startTimer);
$stop.addEventListener("click", stopTimer);
$reset.addEventListener("click", resetTimer);
