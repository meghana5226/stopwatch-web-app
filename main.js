let timer;
let [seconds, minutes, hours] = [0, 0, 0];
let running = false;

function updateDisplay() {
  document.getElementById('display').innerText =
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}`;
}

function start() {
  if (!running) {
    running = true;
    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
      updateDisplay();
    }, 1000);
  }
}

function pause() {
  clearInterval(timer);
  running = false;
}

function reset() {
  pause();
  [seconds, minutes, hours] = [0, 0, 0];
  updateDisplay();
  clearLaps();
}

function lap() {
  const lapTime = document.getElementById('display').innerText;
  const li = document.createElement('li');
  li.textContent = lapTime;
  document.getElementById('laps').appendChild(li);

  const savedLaps = JSON.parse(localStorage.getItem('laps')) || [];
  savedLaps.push(lapTime);
  localStorage.setItem('laps', JSON.stringify(savedLaps));
}

function clearLaps() {
  document.getElementById('laps').innerHTML = '';
  localStorage.removeItem('laps');
}

function loadLaps() {
  const savedLaps = JSON.parse(localStorage.getItem('laps')) || [];
  savedLaps.forEach((lapTime) => {
    const li = document.createElement('li');
    li.textContent = lapTime;
    document.getElementById('laps').appendChild(li);
  });
}

window.onload = () => {
  updateDisplay();
  loadLaps();
};
