import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  position: 'center-center',
  closeButton: false,
});

let timerSetup = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timerSetup = selectedDates[0].getTime();
    // console.log(selectedDates[0].getTime());

    if (timerSetup < date.getTime()) {
      // window.alert('Please choose a date in the future');
      Notify.warning('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

const input = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const display = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

startBtn.disabled = true;

startBtn.addEventListener('click', onClickStartBtn);

const dataPickr = new flatpickr(input, options);
dataPickr.selectedDates[0];

const date = new Date();
let endTime = 0;

const timer = {
  start() {
    let timerId = setInterval(() => {
      const currentTime = Date.now();
      endTime = timerSetup - currentTime;
      const timers = convertMs(endTime);

      updateInterface(timers);
      //   display.days = 111;
      console.log(display.days);
      if (endTime > 1000) {
        startBtn.disabled = true;
      } else {
        clearInterval(timerId);
      }
    }, 1000);
  },
};

function onClickStartBtn() {
  //   const setupTime = ;
  timer.start();
}

function updateInterface({ days, hours, minutes, seconds }) {
  display.days.textContent = addLeadingZero(`${days}`);
  display.hours.textContent = addLeadingZero(`${hours}`);
  display.minutes.textContent = addLeadingZero(`${minutes}`);
  display.seconds.textContent = addLeadingZero(`${seconds}`);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(1112324140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
