


import { state, } from './gameState.js';

import { BRICK_WIDTH, BRICK_HEIGHT, BRICK_ROW_COUNT, STORY } from './constants.js';
import { updateScore, updatelevel, showModal } from './ui.js';
import { initBricks, resetPositions } from './entities.js';
import * as nki from '../main.js'
const gameArea = document.getElementById('game-area');
const brickContainer = document.getElementById('bricks-container');
const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');
const startmessege = document.getElementById('start-message')
const winmusic = document.getElementById('win-music')
const blowingup = document.getElementById('blowingup')
export const dragonmusic = document.getElementById('dragon')
console.log(dragonmusic.volueme)

blowingup.volume = 0.5
export function detectCollision(ballWidth) {
    let collisionHandled = false
    const previousBallX = state.ballX - state.ballSpeedX;

    for (let c = 0; c < state.brickColumnCount; c++) {
        for (let r = 0; r < BRICK_ROW_COUNT; r++) {


            let b = state.bricks[c][r];


            if (b.status > 0) {

                if (
                    state.ballX + ballWidth > b.x &&
                    state.ballX < b.x + BRICK_WIDTH &&
                    state.ballY + ballWidth > b.y &&
                    state.ballY < b.y + BRICK_HEIGHT
                ) {
                    if (!collisionHandled) {

                        if (previousBallX + ballWidth <= b.x || previousBallX >= b.x + BRICK_WIDTH) {
                            state.ballSpeedX *= -1;
                        }

                        else {
                            state.ballSpeedY *= -1;
                        }

                        collisionHandled = true
                    }



                    b.status--;
                    blowingup.currentTime =0
                    blowingup.play()
                  
                    const brickElement = b.element
                    if (brickElement) {
                        if (b.status === 0) {
                            brickElement.style.display = 'none';

                            state.totalbrick++
                        } else if (b.status === 1) {
                            brickElement.className = 'brick'
                        } else {
                            brickElement.className = 'brick-metal'
                        }
                    }


                    state.score++;
                    updateScore();

                    const totalBricks = state.brickColumnCount * BRICK_ROW_COUNT;
                    if (totalBricks === state.totalbrick) {
                        state.gameRunning = false;
                        state.showstory = false;
                        state.totalbrick = 0;

                        if (state.currentLevel < 3) {

                            state.currentLevel++;
                            updatelevel();

                            let baseSpeed = Math.abs(state.ballSpeedY) * 1.2;
                            state.ballSpeedY = -baseSpeed;
                            state.ballSpeedX *= 1.2;

                            if (state.currentLevel === 2) state.timerSecond = 200;
                            if (state.currentLevel === 3) state.timerSecond = 260;

                            initBricks(gameArea.clientWidth, brickContainer);
                            resetPositions(ball, paddle, gameArea.clientWidth, gameArea.clientHeight);

                            let nextStory;
                            if (state.currentLevel === 2) nextStory = STORY.LEVEL2;
                            else if (state.currentLevel === 3) nextStory = STORY.LEVEL3;

                            showModal(
                                nextStory.title,
                                nextStory.text,
                                nextStory.btn,
                                () => {
                                    state.showstory = true;


                                    startmessege.style.display = 'block';
                                    startmessege.innerText = `Press Space to Start Level ${state.currentLevel}`
                                }
                            );

                        } else {
                            nki.stopMusic()
                            winmusic.play()
                            showModal(
                                STORY.WIN.title,
                                STORY.WIN.text,
                                STORY.WIN.btn,
                                () => document.location.reload()
                            );
                        }
                        return;
                    }

                }
            }
        }
    }
}


export function handleBallPaddleCollision(paddleTopEdge, currentPaddleX, paddleWidth, ballWidth) {


    if (
        state.ballY + ballWidth >= paddleTopEdge &&
        state.ballX + ballWidth >= currentPaddleX &&
        state.ballX <= currentPaddleX + paddleWidth
    ) {
         dragonmusic.currentTime =  0
         dragonmusic.play()
        state.ballSpeedY = -Math.abs(state.ballSpeedY);


        let paddleCenter = currentPaddleX + (paddleWidth / 2);
        let ballCenter = state.ballX + (ballWidth / 2);
        let impactPoint = ballCenter - paddleCenter;


        state.ballSpeedX = impactPoint * 0.2;

        if (state.ballSpeedX > 10) state.ballSpeedX = 10;
        if (state.ballSpeedX < -10) state.ballSpeedX = -10;
    }
}