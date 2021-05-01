import {increaseScore, squares, width, checkForGameOver} from './gameFunctions.js'

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    ghost.timerId = setInterval(() => {
        const nextGhostSquare = squares[ghost.currentIndex + direction]
        if (
            !nextGhostSquare.classList.contains('wall') &&
            !nextGhostSquare.classList.contains('ghost')
        ) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared')
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            if (ghost.isScared) {squares[ghost.currentIndex].classList.add('scared')}
        } else {direction = directions[Math.floor(Math.random() * directions.length)]}
        
        if (ghost.isScared & 
            (squares[ghost.currentIndex].classList.contains('pacman-open') |
            squares[ghost.currentIndex].classList.contains('left') |
            squares[ghost.currentIndex].classList.contains('right') |
            squares[ghost.currentIndex].classList.contains('down'))
            ) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared')
            ghost.currentIndex = ghost.startIndex
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            ghost.isScared = false
            increaseScore(200)
        }
        
        checkForGameOver()

    }, ghost.speed)
    
}

function scareGhost(ghost) {
    ghost.isScared = true
    squares[ghost.currentIndex].classList.add('scared')
    setTimeout(()=> {
        ghost.isScared = false
        squares[ghost.currentIndex].classList.remove('scared')
    }, 10000)
}

export {Ghost, moveGhost, scareGhost}