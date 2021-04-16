let c = document.getElementById("myCanvas")
let ctx = c.getContext("2d")

size = 20
columns = c.width / size
rows = c.height / size
blockColor = '#2a3d45'
borderColor = '#2a3d45'
primaryColor = '#bcac9b'
secondaryColor = '#ddc9b4'

function createBoard (numberOfColumns, numberOfRows, initialValue) {
    let array = []

    for (let i = 0; i < numberOfColumns; i++) {
        let row = []

        for (let j = 0; j < numberOfRows; j++) {
            row.push(initialValue)
        }

        array.push(row)
    }

    return array
}

let loop
let board = createBoard(columns, rows, 0)

function clearBoard () {
    if (loop) clearInterval(loop)
    board = createBoard(columns, rows, 0)
    drawBoard()
}

function drawBoard () {
    board.forEach((row, x)=>{
        row.forEach((col, y) => {
            if (x == 0 || y == 0 || x == board.length-1 || y == board[x].length - 1) {
                ctx.fillStyle = borderColor
                ctx.fillRect(size * (x), size * (y), size, size)
            } else if (board[x][y]) {
                ctx.fillStyle = blockColor
                ctx.fillRect(size * (x), size * (y), size, size)
            } else if (x % 2 == 0 && y % 2 == 1 || x % 2 == 1 && y % 2 == 0) {
                ctx.fillStyle = primaryColor
                ctx.fillRect(size * (x), size * (y), size, size)
            } else {
                ctx.fillStyle = secondaryColor
                ctx.fillRect(size * (x), size * (y), size, size)
            }
        })
    })
}

function step () {
    ctx.clearRect(0, 0, 1000, 1000)

    console.log('New step')

    let newBoard = board.map(row => {
        return [...row]
    })

    for (let x = 1; x < board.length - 1; x++) {
        for (let y = 1; y < board[x].length-1; y++) {

            let sum = 
                board[x-1][y] + board[x+1][y] +
                board[x][y-1] + board[x][y+1] +
                board[x-1][y-1] + board[x+1][y+1] +
                board[x-1][y+1] + board[x+1][y-1]
            
            if (((sum === 2 && board[x][y] === 1) || sum === 3)) {
                newBoard[x][y] = 1
            } else {
                newBoard[x][y] = 0
            }
        }
        
        console.log(board[x], newBoard[x])
    }

    board = newBoard.map(row => {
        return [...row]
    })

    // Draw
    drawBoard()
}

myCanvas.onclick = function (e) {
    let clickX = e.offsetX
    let clickY = e.offsetY

    board.forEach((row, x) => {
        if (x == 0 || x == board.length-1) return;

        row.forEach((square, y) => {
            if (y == 0 || y == board.length[x]-1) return;

            if (
            clickX > (x) * size && clickX < (x) * size + size && 
            clickY > (y) * size && clickY < (y) * size + size) {
                board[x][y] = 1

                ctx.fillStyle = blockColor
                ctx.fillRect(size * (x), size * (y), size, size)
            }
        })
    })
}

drawBoard()

function startGame () {
    play.innerText = 'Stop'

    if (loop) {
        stopGame()
    } else {
        loop = setInterval(step, 500)
    }
}

function stopGame () {
    play.innerText = 'Play'
    clearInterval(loop)
    loop = null
}