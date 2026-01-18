


import { state } from './gameState.js';

import { BRICK_WIDTH, BRICK_HEIGHT, BRICK_ROW_COUNT } from './constants.js';
import { updateScore } from './ui.js';

export function detectCollision(ballWidth) {
   
    for (let c = 0; c < state.brickColumnCount; c++) {
        for (let r = 0; r < BRICK_ROW_COUNT; r++) {
            
            
            let b = state.bricks[c][r];

      
            if (b.status === 1) {
             
                if (
                    state.ballX + ballWidth > b.x && 
                    state.ballX < b.x + BRICK_WIDTH && 
                    state.ballY + ballWidth > b.y && 
                    state.ballY < b.y + BRICK_HEIGHT
                ) {
                 
                    let overlapLeft = (state.ballX + ballWidth) - b.x;
                    let overlapRight = (b.x + BRICK_WIDTH) - state.ballX;
                    let overlapTop = (state.ballY + ballWidth) - b.y;
                    let overlapBottom = (b.y + BRICK_HEIGHT) - state.ballY;

                   
                    if (overlapLeft < overlapBottom && overlapLeft < overlapRight && overlapLeft < overlapTop) {
                        state.ballSpeedX = -Math.abs(state.ballSpeedX);
                    } else if (overlapRight < overlapTop && overlapRight < overlapBottom && overlapRight < overlapLeft) {
                        state.ballSpeedX = Math.abs(state.ballSpeedX);
                    } else {
                        state.ballSpeedY *= -1;
                    }

                    
                    b.status = 0;
                    
                   
                    const brickElement = document.getElementById(`brick${c}-${r}`);
                    if (brickElement) {
                        brickElement.style.display = 'none';
                    }

                  
                    state.score++;
                    updateScore(); 
               
                    const totalBricks = state.brickColumnCount * BRICK_ROW_COUNT;
                    if (totalBricks === state.score) {
                        state.gameRunning = false;
                        alert('"YOU WIN! BRAVO 3LIK! 🎉"');
                        document.location.reload();
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
    
        state.ballSpeedY = -Math.abs(state.ballSpeedY);


        let paddleCenter = currentPaddleX + (paddleWidth / 2);
        let ballCenter = state.ballX + (ballWidth / 2);
        let impactPoint = ballCenter - paddleCenter;


        state.ballSpeedX = impactPoint * 0.2;

        if (state.ballSpeedX > 10) state.ballSpeedX = 10;
        if (state.ballSpeedX < -10) state.ballSpeedX = -10;
    }
}