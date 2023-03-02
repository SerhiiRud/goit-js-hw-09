const refs = {
  buttonStartEl: document.querySelector('[data-start]'),
  buttonStopEl: document.querySelector('[data-stop]'),
  bodyEl: document.querySelector('body'),
};

let timerId = null;
refs.buttonStopEl.setAttribute('disabled', 'true');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function stopSwitcher() {
  refs.buttonStartEl.removeAttribute('disabled');
  refs.buttonStopEl.setAttribute('disabled', 'true');
  refs.bodyEl.style.backgroundColor = '#fff';
  clearInterval(timerId);
}

function colorSwitcher() {
  refs.buttonStopEl.removeAttribute('disabled');
  refs.buttonStartEl.setAttribute('disabled', 'true');
  timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.buttonStopEl.addEventListener('click', stopSwitcher);
}

refs.buttonStartEl.addEventListener('click', colorSwitcher);
