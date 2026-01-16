
const gamearea = document.getElementById('game-area')
const paddle = document.getElementById('paddle')
const ball = document.getElementById('ball')
const brickcontainer = document.getElementById('bricks-container')
const startmessege = document.getElementById('start-message')
const scoredisplay = document.getElementById('score')

const paddleSpeed = 20
let gameRunning = false
let ballSpeedX = 4
let ballSpeedY = -4
let score = 0

const gamewidth = gamearea.clientWidth
let paddlewidth = paddle.offsetWidth
let startposition = (gamewidth - paddlewidth) / 2
let currentX = startposition
paddle.style.transform = `translateX(${startposition}px)`
// controle de paddle 

document.addEventListener('keydown', event => {


    if (event.key === 'ArrowRight') {
        let position = currentX + paddleSpeed
        currentX = position
        if (position < gamewidth - paddlewidth) {
            paddle.style.transform = `translateX(${position}px)`
        } else {
            currentX = gamewidth - paddlewidth
            paddle.style.transform = `translateX(${currentX}px)`

        }

    } else if (event.key === 'ArrowLeft') {
        if (currentX - paddleSpeed > 0) {
            var position = currentX - paddleSpeed
        } else {
            position = 0
        }
        currentX = position
        paddle.style.transform = `translateX(${position}px)`
    }
    if (!gameRunning) {
        moveBallWithPaddle()
    }

})

let gameheight = gamearea.clientHeight
let ballwidth = ball.offsetWidth
let paddleheight = paddle.clientHeight
let ballX = 0
let ballY = gameheight - paddleheight - ballwidth - 20

function moveBallWithPaddle() {
    ballX = currentX + paddlewidth / 2 - ballwidth / 2
    ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
}

moveBallWithPaddle()

let animationID
function gameloop() {
    if (gameRunning) {
        ballX += ballSpeedX
        ballY += ballSpeedY
        if (ballX + ballwidth >= gamewidth || ballX<= 0) {
            ballSpeedX *= -1
        }

        if (ballY <= 0) {
            ballSpeedY *= -1
        }

        if (ballY + ballwidth >= gameheight) {
            ballSpeedY *= -1
        }
        ball.style.transform = `translate(${ballX}px,${ballY}px)`
    }

    animationID = requestAnimationFrame(gameloop)
}
animationID = requestAnimationFrame(gameloop)
document.addEventListener('keydown', event => {
    if (event.code === 'Space' && !gameRunning) {
        gameRunning = true
        startmessege.style.display = 'none'
    }
})