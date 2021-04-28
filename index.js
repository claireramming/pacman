const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let squares = []
//starting position of pacman 
let pacmanCurrentIndex = 490
let movePac = 1

// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//create board
const designArray = ['pac-dot', 'wall', 'ghost-lair', 'power-pellet', 'empty']

function createBoard(layout, designArray) {
    layout.map(square => {
        const squareDiv = document.createElement("div")
        squareDiv.classList.add(designArray[square])
        grid.appendChild(squareDiv)
        squares.push(squareDiv)
    })
}

function control(e) {
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

function move() {
    const nextSquareClasses = squares[pacmanCurrentIndex + movePac].classList
    if (pacmanCurrentIndex % width === 0 & movePac === -1) {
        squares[pacmanCurrentIndex].classList.remove('pacman')
        pacmanCurrentIndex += width - 1
        squares[pacmanCurrentIndex].classList.add('pacman')
     } else if (pacmanCurrentIndex % width === width-1 & movePac === 1) {
        squares[pacmanCurrentIndex].classList.remove('pacman')
        pacmanCurrentIndex -= width - 1
        squares[pacmanCurrentIndex].classList.add('pacman')
    } else if (!nextSquareClasses.contains('wall') & !nextSquareClasses.contains('ghost-lair')) {
        squares[pacmanCurrentIndex].classList.remove('pacman')
        pacmanCurrentIndex += movePac
        squares[pacmanCurrentIndex].classList.add('pacman')
    } else {
        movePac = 0
    }
    handleSquare()
}

function handleSquare() {
    const currentSquareClass = squares[pacmanCurrentIndex].classList
    if (currentSquareClass.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        scoreDisplay.innerText++
        
    }
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
    }
}

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    
    setInterval(() => {
        const nextGhostSquare = squares[ghost.currentIndex + direction]
        if (
            !nextGhostSquare.classList.contains('wall') &&
            !nextGhostSquare.classList.contains('ghost')
        ) {
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost')
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')
        } else direction = directions[Math.floor(Math.random() * directions.length)]
    }, ghost.speed)
    
}


function startGame(e) {
    scoreDisplay.innerText = 0
    ghosts.forEach(ghost => moveGhost(ghost))
    const startInt = setInterval(() => move(startInt),500)
    document.removeEventListener('keydown', startGame)
    document.addEventListener('keydown', control)
}

createBoard(layout, designArray)

//initiate pacman and ghosts
squares[pacmanCurrentIndex].classList.add('pacman')
const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

document.addEventListener('keydown', startGame)