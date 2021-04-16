# Conway's Game of Life

A WIP browser-based implementation of Conway's Game of Life, made with Canvas.

Live deployment here: https://elyssaw.github.io/game-of-life/

## Rules

-    Any live cell with fewer than two live neighbours dies, as if by underpopulation.
-    Any live cell with two or three live neighbours lives on to the next generation.
-    Any live cell with more than three live neighbours dies, as if by overpopulation.
-    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Methodology

#### The Board

The first step is to determine how to represent the game board - I choose a 2-dimensional array, since the value of each square in the array is just a simple boolean of "alive" or "dead." The X value is the outer array, the Y value is the inner - or, in other words, columns and then rows.

#### The Check

The second step is how to check the neighboring cells of each square on the gameboard, so that we can apply the rules of the game to it as necessary.

I choose to check each square surrounding a position by checking board[x-1 to x+1][y-1 to y+1], and having each square hold a value of 1 or 1 to designate alive/dead instead of using a true/false boolean. The sum total of all surrounding squares can be used to determine how many living squares surround the current position, and thus, what rules should be applied to it.

But what about bounds-checking? This method only works for middle cells - cells on the first column, last column, first row, or last row will throw an out-of-bounds error when we access the array. This could've been solved with lots of if statements, but that got messy fast. Instead, I added extra border rows/columns, and have the check logic always skip the first and last row and column.

#### The Rules

The next step is to put the rules into programmable logic. In order:

- If the sum is < 2, the cell dies
- If the sum is 2 or 3, and the square holds a 1, the cell is alive
- If the sum is > 3, the cell dies
- If the sum is 3, the cell becomes alive

#### To-Do

- Styling
- Add step counter
- Add explanation