let c = document.getElementById("myCanvas")
let ctx = c.getContext("2d")

size = 80
columns = c.width / size
rows = c.height / size

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

let board = createBoard(columns+2, rows+2, 0)

function step () {
    ctx.clearRect(0, 0, 800, 400)

    console.log('New step')

    let newBoard = board.map(row => {
        return [...row]
    })

    for (let x = 1; x < board.length - 1; x++) {
        console.log(board[x])
        for (let y = 1; y < board[x].length-1; y++) {

            let sum = 
                board[x-1][y] + board[x+1][y] +
                board[x][y-1] + board[x][y+1] +
                board[x-1][y-1] + board[x+1][y+1] +
                board[x-1][y+1] + board[x+1][y-1]
            
            if (((sum === 2 && board[x][y] === 1) || sum === 3)) {
                newBoard[x][y] = 1

                ctx.fillStyle = 'black'
                ctx.fillRect(size * (x), size * (y), size, size)
                ctx.fillStyle = 'red'
                ctx.font = "30px Arial";
                ctx.fillText(`${x}, ${y}`, size * (x), size * (y)+40)

            } else if (board[x][y] === 1) {
                newBoard[x][y] = 0
            }
        }
    }

    board = newBoard.map(row => {
        return [...row]
    })
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

                ctx.fillStyle = 'black'
                ctx.fillRect(size * (x), size * (y), size, size)
                ctx.fillStyle = 'red'
                ctx.font = "30px Arial";
                ctx.fillText(`${x}, ${y}`, size * (x), size * (y)+40)
            }
        })
    })
}

// function startGame () {
//     loop = setInterval(step, 500)
// }

// startGame()