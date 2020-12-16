//Decarling HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

//Decarling game constants
const xSymbol = '×';
const oSymbol = '○';

//Decarling game variables
let gameIsLive = true;
let xIsNext = true;  

//Decarling functions   
function handleWin(letter) {				//function declares the winner 
  gameIsLive = false;
  if (letter === 'x') {					//condition checks the winner
    statusDiv.innerHTML = `${xSymbol ? xSymbol : oSymbol} has won!`;
  }
};

function checkGameStatus() {		// function check the winning combinations									
  const topLeft = cellDivs[0].classList[1];
  const topMiddle = cellDivs[1].classList[1];
  const topRight = cellDivs[2].classList[1];
  const middleLeft = cellDivs[3].classList[1];
  const middleMiddle = cellDivs[4].classList[1];
  const middleRight = cellDivs[5].classList[1];
  const bottomLeft = cellDivs[6].classList[1];
  const bottomMiddle = cellDivs[7].classList[1];
  const bottomRight = cellDivs[8].classList[1];

		//each condition checks and returns the winner is in toprow or middlerow or bottomrow and same as for columns and diagonals alsoo.....!
  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[1].classList.add('won');
    cellDivs[2].classList.add('won');
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
    handleWin(middleLeft);
    cellDivs[3].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[5].classList.add('won');
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
    handleWin(bottomLeft);
    cellDivs[6].classList.add('won');
    cellDivs[7].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    handleWin(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[3].classList.add('won');
    cellDivs[6].classList.add('won');
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
    handleWin(topMiddle);
    cellDivs[1].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[7].classList.add('won');
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWin(topRight);
    cellDivs[2].classList.add('won');
    cellDivs[5].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight);
    cellDivs[2].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[6].classList.add('won');
				// this condition checks the game is drawn or not
  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
    gameIsLive = false;
    statusDiv.innerHTML = 'Game is tied!';
  } else {								// if the game is not ended its shows the who's moves the next in the status bar
    xIsNext = !xIsNext;
    if (xIsNext) {							// if condition checks the x is the next move or not
      statusDiv.innerHTML = `${xSymbol} is next`;
    } else {								// this else condition checks whos move is the next	
      statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
    }
  }
};

// event Handlers funtions
function handleReset() {					//Reset function written's here
  xIsNext = true;													
  statusDiv.innerHTML = `${xSymbol} is next`;			//intially it start from "x" symbol
   for (const cellDiv of cellDivs) {				// loop takes the every each cell it iterates  
    cellDiv.classList.remove('x');				//removes the all "x" symbol in cells
    cellDiv.classList.remove('o');				//removes the all "o" symbol in cells
    cellDiv.classList.remove('won');				//removes the won statement also
  }
  gameIsLive = true;								// game starts from here
};

function handleCellClick(cell) {				//functions add the target to the cells example like topleft or topright
  const classList = cell.target.classList;
  if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {		// this condition not allows to repeat the symbol in cell if its already exicts.. 
    return;
  }
  if (xIsNext) {		//condition checks the "x" symbol is the next or "o" symbol is the next it fails the turn's for the next symbol
    classList.add('x');
    checkGameStatus();
  } else {
    classList.add('o');
    checkGameStatus();
  }
};

//reset button add event listener to handlereset function here
resetDiv.addEventListener('click', handleReset	);

for (const cellDiv of cellDivs) {								//loop returns the each cell into celldiv
  cellDiv.addEventListener('click', handleCellClick)			//addevent listener add to handlecellclick
}
