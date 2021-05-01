import {control, move, pacmanCurrentIndex} from './pacmanFunctions.js'
import {Ghost, moveGhost, scareGhost} from './ghostFunctions.js'

export const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let score = 0
export const squares = []
//starting position of pacman 
let startInt = NaN
let ghosts = []
let cherryLocation = NaN

export function createBoard(layout, designArray) {
    layout.map(square => {
        const squareDiv = document.createElement("div")
        squareDiv.classList.add(designArray[square])
        grid.appendChild(squareDiv)
        squares.push(squareDiv)
        document.addEventListener('keydown', startGame)
    })
}

export function increaseScore(num) {
    score += num
    scoreDisplay.innerText = score
}

export function initiateChars() {
    squares[pacmanCurrentIndex].classList.add('pacman-close')
    ghosts = [
        new Ghost('blinky', 348, 300),
        new Ghost('pinky', 376, 500),
        new Ghost('inky', 351, 400),
        new Ghost('clyde', 379, 600)
    ]

    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    })
}

export function startGame() {
    console.log('game started')
    scoreDisplay.innerText = score
    ghosts.forEach(ghost => moveGhost(ghost))
    startInt = setInterval(() => move(ghosts),500)
    document.removeEventListener('keydown', startGame)
    document.addEventListener('keydown', control)
}

export function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') & !squares[pacmanCurrentIndex].classList.contains('scared')) {
        console.log("game over")
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keydown', control)
        clearInterval(startInt)
    }
}

export function checkForWin() {
    let win = true
    for (const square of squares) {
        if (square.classList.contains('pac-dot')) {
            win = false
        }
    }
    if (win) {
        console.log("winner!")
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keydown', control)
        clearInterval(startInt)
    }
}

export function handleSquare() {
    const currentSquareClass = squares[pacmanCurrentIndex].classList
    if (currentSquareClass.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        squares[pacmanCurrentIndex].classList.add('pacman-close')
        setTimeout(()=>{squares[pacmanCurrentIndex].classList.remove('pacman-close')},250)
        increaseScore(10)    
    } else if (currentSquareClass.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        squares[pacmanCurrentIndex].classList.add('pacman-close')
        setTimeout(()=>{squares[pacmanCurrentIndex].classList.remove('pacman-close')},250)
        increaseScore(50)
        ghosts.forEach(ghost => scareGhost(ghost))
    } else if (currentSquareClass.contains('cherry')) {
        squares[pacmanCurrentIndex].classList.remove('cherry')
        squares[pacmanCurrentIndex].classList.add('pacman-close')
        setTimeout(()=>{squares[pacmanCurrentIndex].classList.remove('pacman-close')},250)
        increaseScore(100)   
    }
    if (!cherryLocation) {
        placeCherry()
    }
}

function placeCherry() {
    const noObstacles = []
    for (let i=0; i < squares.length; i++) {
        if (!squares[i].classList.contains('wall') &
            !squares[i].classList.contains('pac-dot') &
            !squares[i].classList.contains('power-pellet') &
            !squares[i].classList.contains('ghost-lair') 
        ) {noObstacles.push(i)}
    }
    
    if (noObstacles.length > 100 & !cherryLocation) {
        console.log('cherry placed')
        const randomNum = Math.floor(Math.random() * noObstacles.length)
        cherryLocation = noObstacles[randomNum]
        squares[cherryLocation].classList.add('cherry')
    }
}