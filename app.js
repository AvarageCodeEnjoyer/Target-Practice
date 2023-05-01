const startBtn = document.getElementById('start')
const amount = document.getElementById('amount')
const size = document.getElementById('sizeChange')
const form = document.getElementById('form')
const main = document.getElementById('main')

let retryBtn
let timeInterval
let elapsedTime
let timerElement
let startTime
let targetClick = -1
let missClick = 0
let target = document.getElementById('target')

let targetEvent = e => {
  e.stopPropagation();
  let x = randomPos()
  let y = randomPos()
  target.style.left = `${x}%`
  target.style.top = `${y}%`
  targetClick++
  hitText.innerText = targetClick
  if (targetClick >= parseInt(amount.value)) {
    console.log(updateTimer())
    retryBtn.style.opacity = "1"
    target.removeEventListener('click', targetEvent)
    clearInterval(timeInterval)
  }
}

let submitForm = e => {
  e.preventDefault()
  let newContent = `
  <span id="timer"></span>
    <div id="text">
      <p id="missText">0</p>
      <button id="retry">Retry?</button>
      <p id="hitText">0</p>
    </div>
    <div id="wrap">
      <div id="target"></div>
    </div>
  `
  main.innerHTML = newContent
  const wrap = document.getElementById('wrap')
  const missText = document.getElementById('missText')
  const hitText = document.getElementById('hitText')
  retryBtn = document.getElementById('retry')

  target = document.getElementById('target')
  target.style.position = "absolute"
  target.addEventListener('click', targetEvent)
  wrap.addEventListener('click', missEvent)
  retryBtn.addEventListener('click', retry)
  targetEvent(e)
  timerElement = document.getElementById('timer');
  startTime = Date.now();
  timeInterval = setInterval(updateTimer, 10); // Update every 10 milliseconds
}

function changeTarget() {
  let sizeNum = parseInt(size.value)
  target.style.width = `${sizeNum}px`
  target.style.height = `${sizeNum}px`
}

let missEvent = () => {
  missClick++
  missText.innerText = missClick
}

function randomPos() {
  return Math.floor(Math.random() * 97)
}

size.addEventListener('input', e => {
  e.preventDefault()
  size.style.content = e.target.value
  changeTarget()
})

let updateTimer = () => {
  elapsedTime = Date.now() - startTime;
  const seconds = Math.floor(elapsedTime / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const formattedTime = `${pad(seconds)}:${pad(milliseconds)}`;
  timerElement.textContent = formattedTime;
  return elapsedTime
}

function pad(value) {
  return value.toString().padStart(2, '0');
}

function retry() {
  reset()
  main.innerHTML = `
  <h1>Aim Practice</h1>
  <form action="" id="form">
    <div class="formGroup">
      <label for="amount">Number Of Clicks</label>
      <input type="range" min="1" max="25" value="10" id="amount">
    </div>
    <div class="formGroup">
      <label for="sizeChange">Size Of Target</label>
      <input type="range" min="10" max="200" value="50" id="sizeChange">
    </div>
    <div id="target"></div>
    <input type="submit" onclick="submitForm(event)">
  </form>`
  const sizeText = document.getElementById('sizeText')
  const clickText = document.getElementById('clickText')
}

function reset() {
  retryBtn.style.opacity = "0"
  targetClick = -1
  missClick = 0
}
