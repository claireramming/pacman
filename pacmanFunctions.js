import {squares, width, handleSquare, checkForGameOver, checkForWin} from './gameFunctions.js'

let movePac = 1
export let pacmanCurrentIndex = 490

export function control(e) {
    let nextMove = movePac
    
    switch(e.key) {
        case 'ArrowDown':
            nextMove = width
        break
        case 'ArrowUp':
            nextMove = -width
        break
        case 'ArrowLeft':
            nextMove = -1
        break
        case 'ArrowRight':
            nextMove = 1
        break   
    }
    const nextSquareClasses = squares[pacmanCurrentIndex + nextMove].classList
    if (!nextSquareClasses.contains('wall') & !nextSquareClasses.contains('ghost-lair')) {
        movePac = nextMove
    }   
}

export function move() {
    const nextSquareClasses = squares[pacmanCurrentIndex + movePac].classList
    if (pacmanCurrentIndex % width === 0 & movePac === -1) {
        squares[pacmanCurrentIndex].classList.remove('pacman-close', 'left')
        pacmanCurrentIndex += width - 1
        squares[pacmanCurrentIndex].classList.add('left')
     } else if (pacmanCurrentIndex % width === width-1 & movePac === 1) {
        squares[pacmanCurrentIndex].classList.remove('pacman-close', 'pacman-open')
        pacmanCurrentIndex -= width - 1
        squares[pacmanCurrentIndex].classList.add('pacman-open')
    } else if (
        !nextSquareClasses.contains('wall') & 
        !nextSquareClasses.contains('ghost-lair') & 
        movePac !== 0) {
        squares[pacmanCurrentIndex].classList.remove('pacman-close', 'pacman-open', 'left', 'up', 'down')
        pacmanCurrentIndex += movePac
        switch(movePac) {
            case width:
                squares[pacmanCurrentIndex].classList.add('down')
                break
            case -width:
                squares[pacmanCurrentIndex].classList.add('up')
                break
            case 1:
                squares[pacmanCurrentIndex].classList.add('pacman-open')
                break
            case -1:
                squares[pacmanCurrentIndex].classList.add('left')
                break
        }
    } else {
        movePac = 0
    }
    handleSquare()
    checkForGameOver()
    checkForWin()
}



