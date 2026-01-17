
const gamearea = document.getElementById('game-area')
const paddle = document.getElementById('paddle')
const ball = document.getElementById('ball')
const brickcontainer = document.getElementById('bricks-container')
const startmessege = document.getElementById('start-message')
const scoredisplay = document.getElementById('score')

const paddleSpeed = 30
let gameRunning = false
let ballSpeedX = 4
let ballSpeedY = -4
let score = 0

const gamewidth = gamearea.clientWidth
let paddlewidth = paddle.offsetWidth
let startposition = (gamewidth - paddlewidth) / 2
let currentX = startposition
paddle.style.transform = `translateX(${startposition}px)`


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
let paddleTopEdge = paddle.offsetTop
function moveBallWithPaddle() {
    ballX = currentX + paddlewidth / 2 - ballwidth / 2
    ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
}


moveBallWithPaddle()

const brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 80;
const brickHeight = 30;
const brickPadding = 10;
const brickOffsetTop = 40;
const brickOffsetLeft = 40;


let bricks = [];

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = []
        for (let r = 0; r < brickRowCount; r++) {

            let bX = c * (brickWidth + brickPadding) + brickOffsetLeft
            let bY = r * (brickHeight + brickPadding) + brickOffsetTop

            bricks[c][r] = { x: bX, y: bY, status: 1 }

            const brickhtml = document.createElement('div')
            brickhtml.classList.add('brick')
            brickhtml.style.left = bX + 'px'
            brickhtml.style.top = bY + 'px'
            brickhtml.style.width = brickWidth + 'px'
            brickhtml.style.height = brickHeight + 'px'

            brickhtml.id = `brick${c}-${r}`

            brickcontainer.appendChild(brickhtml)
        }
    }
}
drawBricks()
let animationID
function gameloop() {
    if (gameRunning) {
        ballX += ballSpeedX
        ballY += ballSpeedY
        if (ballX + ballwidth >= gamewidth || ballX <= 0) {
            ballSpeedX *= -1
        }

        if (ballY <= 0) {
            ballSpeedY *= -1
        }

        if (ballY + ballwidth >= gameheight) {
           lives--
           livesdisplay.innerText = '❤️'.repeat(lives);
           if(lives === 0){
            alert('Game Over')
            document.location.reload()
           }else{
            resetBall()
           }
        }

        if (ballY + ballwidth >= paddleTopEdge && ballX + ballwidth >= currentX && ballX <= currentX + paddlewidth) {

            ballSpeedY = -Math.abs(ballSpeedY)

            let paddleCenter = currentX + (paddlewidth / 2)
            let ballCenter = ballX + (ballwidth / 2)

            let impactPoint = ballCenter - paddleCenter

            ballSpeedX = impactPoint * 0.2
            if (ballSpeedX > 10) ballSpeedX = 10
            if (ballSpeedX < -10) ballSpeedX = -10



        }
        collisionDetection()

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

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r]
            if (b.status === 1) {
                if (ballX + ballwidth > b.x && ballX < b.x + brickWidth && ballY + ballwidth > b.y && ballY < b.y + brickHeight) {
                    let overlapLeft = (ballX + ballwidth) - b.x;
                    let overlapRight = (b.x + brickWidth) - ballX;
                    let overlapTop = (ballY + ballwidth) - b.y;
                    let overlapBottom = (b.y + brickHeight) - ballY;
                    if (overlapLeft < overlapBottom && overlapLeft < overlapRight && overlapLeft < overlapTop) {
                        ballSpeedX = -Math.abs(ballSpeedX)
                    } else if ((overlapRight < overlapTop && overlapRight < overlapBottom && overlapRight < overlapLeft)) {
                        ballSpeedX = Math.abs(ballSpeedX)
                    }
                    ballSpeedY *= -1



                    b.status = 0
                    const removebrick = document.getElementById(`brick${c}-${r}`)
                    if (removebrick) {
                        removebrick.style.display = 'none';
                    }
                    score++
                    scoredisplay.innerText = score
                }
            }
        }
    }
}

const livesdisplay = document.getElementById('lives')
let lives = 3
function resetBall() {
    gameRunning = false
    currentX = startposition
    paddle.style.transform = `translateX(${currentX}px)`
    startmessege.style.display = 'block'
    startmessege.innerText = "Ready? 3..."
    setTimeout(() => startmessege.innerText = "Set... 2...", 1000)
    setTimeout(() => startmessege.innerText = "Go! 1...", 200);
    setTimeout(() => {
        startmessege.style.display = 'none'
        startmessege.innerText = "Press Space to Start"
        ballSpeedX = 4
        ballSpeedY = -4
        gameRunning = true ;
    }, 3000)
}