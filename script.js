let c = document.getElementById("myCanvas")
let ctx = c.getContext("2d")

x = c.width / 20
y = c.height / 10

let loop

function step () {
    console.log('game')

    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if ((i % 2 == 0 && j % 2 == 1) || (i % 2 == 1 && j % 2 == 0)) {
                ctx.fillStyle = 'white'
                ctx.fillRect(40 * i, 40 * j, 40, 40);
            } else {
                ctx.fillStyle = 'lightgrey'
                ctx.fillRect(40 * i, 40 * j, 40, 40);
            }
        }
    }
}

function startGame () {
    loop = setInterval(step, 500)
}

startGame()