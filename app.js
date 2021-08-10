const squares = Array.from(document.querySelectorAll('.grid div'))
let currentPosition // be decided by random
const width = 20 // 20divs
var arr = [] // storing the currentPosition for removing the classes after
let score = 0
const displayScore = document.getElementById('score')
let lives = 10
const arrLives = document.getElementsByClassName('lives')
var streak = 0
const container = document.getElementById('lives')
const reset = document.getElementById('reset')

reset.addEventListener('click', () => location.reload())

currentPosition = Math.floor(Math.random() * (14 - 5 + 1)) + 5
// functin to draw the egg
function draw () {
  squares[currentPosition].classList.add('egg')
}

// undraw the  egg
function undraw () {
  squares[currentPosition].classList.remove('egg')
}

var ok = setInterval(moveDown, 500)
function moveDown () {
  undraw()
  currentPosition += width
  draw()
  freeze()
}

function freeze () {
  if (squares[currentPosition + width].classList.contains('taken')) {
    arrLives[arrLives.length - 1].classList.remove('lives')
    lives--
    streak = 0
    if (lives === 0) {
      alert('GAME OVER')
      clearInterval(ok)
    }

    arr.push(currentPosition)
    squares[currentPosition].classList.add('taken')
    squares[currentPosition].classList.add('disappear')
    currentPosition = Math.floor(Math.random() * (14 - 5 + 1)) + 5
    setTimeout(check, 3000)
  } else if (squares[currentPosition + 20].classList.contains('basket')) {
    score++
    streak++
    squares[currentPosition].classList.remove('egg')
    displayScore.innerHTML = score
    currentPosition = Math.floor(Math.random() * (14 - 5 + 1)) + 5
    if (streak === 10) {
      alert('10 streaks!! you got an extra live')
      streak = 0
      lives++
      const block = document.createElement('div')
      block.setAttribute('class', 'lives')
      container.appendChild(block)
    }
  }
}

function check () {
  for (var i = 0; i < arr.length; i++) {
    squares[arr[i]].classList.remove('taken')
    squares[arr[i]].classList.remove('disappear')
    squares[arr[i]].classList.remove('egg')
  }
}

const leftIndex = [20, 80, 140]
let numberL
let leftIndexRandom
numberL = Math.floor(Math.random() * (2 - 0 + 1)) + 0
leftIndexRandom = leftIndex[numberL]

function drawLeft () {
  squares[leftIndexRandom].classList.add('egg')
}

function undrawLeft () {
  squares[leftIndexRandom].classList.remove('egg')
}

var leftInterval
setTimeout(() => { leftInterval = setInterval(leftMove, 500) }, 3000)
function leftMove () {
  if (squares[leftIndexRandom + width].classList.contains('brick')) {
    undrawLeft()
    leftIndexRandom += 1
    drawLeft()
  } else {
    undrawLeft()
    leftIndexRandom += width
    drawLeft()
    freezeLeft()
  }
}

var arrLeft = []
function freezeLeft () {
  if (squares[leftIndexRandom + width].classList.contains('taken')) {
    arrLives[arrLives.length - 1].classList.remove('lives')
    lives--
    streak = 0
    if (lives === 0) {
      alert('GAME OVER')
      clearInterval(leftInterval)
    }

    arrLeft.push(leftIndexRandom)
    squares[leftIndexRandom].classList.add('taken')
    squares[leftIndexRandom].classList.add('disappear')
    numberL = Math.floor(Math.random() * (2 - 0 + 1)) + 0
    leftIndexRandom = leftIndex[numberL]
    setTimeout(checkLeft, 3000)
  } else if (squares[leftIndexRandom + width].classList.contains('basket')) {
    score++
    streak++
    if (streak === 10) {
      alert('10 streaks!! you got an extra live')
      streak = 0
      lives++
      const block = document.createElement('div')
      block.setAttribute('class', 'lives')
      container.appendChild(block)
    }
    squares[leftIndexRandom].classList.remove('egg')
    displayScore.innerHTML = score
    numberL = Math.floor(Math.random() * (2 - 0 + 1)) + 0
    leftIndexRandom = leftIndex[numberL]
  }
}

function checkLeft () {
  for (var i = 0; i < arrLeft.length; i++) {
    squares[arrLeft[i]].classList.remove('taken')
    squares[arrLeft[i]].classList.remove('disappear')
    squares[arrLeft[i]].classList.remove('egg')
  }
}

// right
let numberR
const rightIndex = [39, 99, 159]
let rightIndexRandom
numberR = Math.floor(Math.random() * (2 - 0 + 1)) + 0
rightIndexRandom = rightIndex[numberL]

function drawRight () {
  squares[rightIndexRandom].classList.add('egg')
}

function undrawRight () {
  squares[rightIndexRandom].classList.remove('egg')
}

var rightInterval
setTimeout(() => { rightInterval = setInterval(rightMove, 500) }, 6000)
function rightMove () {
  if (squares[rightIndexRandom + width].classList.contains('brick')) {
    undrawRight()
    rightIndexRandom -= 1
    drawRight()
  } else {
    undrawRight()
    rightIndexRandom += width
    drawRight()
    freezeRight()
  }
}
var arrRight = []
function freezeRight () {
  if (squares[rightIndexRandom + width].classList.contains('taken')) {
    arrLives[arrLives.length - 1].classList.remove('lives')
    lives--
    streak = 0
    if (lives === 0) {
      alert('GAME OVER')
      clearInterval(rightInterval)
    }

    arrRight.push(rightIndexRandom)
    squares[rightIndexRandom].classList.add('taken')
    squares[rightIndexRandom].classList.add('disappear')
    numberR = Math.floor(Math.random() * (2 - 0 + 1)) + 0
    rightIndexRandom = rightIndex[numberR]
    setTimeout(checkRight, 3000)
  } else if (squares[rightIndexRandom + width].classList.contains('basket')) {
    score++
    streak++
    if (streak === 10) {
      alert('10 streaks!! you got an extra live')
      streak = 0
      lives++
      const block = document.createElement('div')
      block.setAttribute('class', 'lives')
      container.appendChild(block)
    }
    squares[rightIndexRandom].classList.remove('egg')
    displayScore.innerHTML = score
    numberR = Math.floor(Math.random() * (2 - 0 + 1)) + 0
    rightIndexRandom = rightIndex[numberR]
  }
}

function checkRight () {
  for (var i = 0; i < arrRight.length; i++) {
    squares[arrRight[i]].classList.remove('taken')
    squares[arrRight[i]].classList.remove('disappear')
    squares[arrRight[i]].classList.remove('egg')
  }
}

let basket = [268, 269, 270, 271, 272]
basket.forEach(value => { squares[value].classList.add('basket') })
document.addEventListener('keydown', control)
function control (e) {
  if (e.keyCode === 39) { // right
    const rightEdge = basket[basket.length - 1] % width === width - 1
    if (!rightEdge) {
      basket.forEach(value => { squares[value].classList.remove('basket') })
      basket = basket.map(value => { return value + 1 })
      basket.forEach(value => { squares[value].classList.add('basket') })
    }
  } else if (e.keyCode === 37) { // left
    const leftEdge = basket[0] % width === 0
    if (!leftEdge) {
      basket.forEach(value => { squares[value].classList.remove('basket') })
      basket = basket.map(value => { return value - 1 })
      basket.forEach(value => { squares[value].classList.add('basket') })
    }
  }
}
