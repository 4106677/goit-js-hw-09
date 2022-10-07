const startBtn = document.querySelector('button[data-start]');
const stoptBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let interval = null;
// startBtn.disabled = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', onClickStartBtn);
stoptBtn.addEventListener('click', onClickStopBtn);

function onClickStartBtn() {
  interval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    console.log('Interval HEX Start!');
  }, 1000);
  startBtn.disabled = true;
}

function onClickStopBtn() {
  clearInterval(interval);
  console.log('Interval HEX Stop!');
  startBtn.disabled = false;
}
