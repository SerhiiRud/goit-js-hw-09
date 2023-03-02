import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataInputEl = document.querySelector('#datetime-picker');
const timerButtonEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const timerEl = document.querySelector('.timer');

timerButtonEl.setAttribute('disabled', 'true');
timerEl.style.display = 'flex';
timerEl.style.gap = '30px';
timerEl.style.marginTop = '30px';

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeProcessor(selectedDates);
  },
};

const fp = flatpickr('#datetime-picker', options);

function timeProcessor(selectedDates) {
  const selectedTime = selectedDates[0].getTime();
  if (selectedTime < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  timerButtonEl.removeAttribute('disabled');
  timerButtonEl.addEventListener('click', onTimerStart);
  function onTimerStart() {
    timerButtonEl.setAttribute('disabled', 'true');
    const timerId = setInterval(timerInterface, 1000, selectedTime);
  }
}

function timerInterface(selectedTime) {
  if (selectedTime >= Date.now()) {
    const timeDifferenceObject = convertMs(selectedTime - Date.now());
    secondsEl.textContent = timeDifferenceObject.seconds;
    minutesEl.textContent = timeDifferenceObject.minutes;
    hoursEl.textContent = timeDifferenceObject.hours;
    daysEl.textContent = timeDifferenceObject.days;
  } else {
    clearInterval(timerId);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

dataInputEl.addEventListener('click', fp);
