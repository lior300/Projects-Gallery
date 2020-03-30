//Types
const WALL = 'WALL';
const FLOOR = 'FLOOR';
const PASS = 'PASS'

//gameElements
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE'

//Images
const GAMER_IMG = '<img src="img/gamer.png" />';
const BALL_IMG = '<img src="img/ball.png" />';
const GAMER_GLUE_IMG = '<img src="img/gamer-purple.png" />';
const GLUE_IMG = '<img src="img/candy.png" />';

//Audios
const BALL_AUDIO = new Audio('audio/sound.mp3')
const GLUE_AUDIO = new Audio('audio/sound2.mp3')

// THE MODEL:
var gBoard;
var gGamerPos;
var gBallsCollectedCount;


//Global variables
var gIntervalBalls;
var gIntervalGlue;
var gisGameEnd
var gIsGlue
var gBallsCount;

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBallsCollectedCount = 0
	gBallsCount = 0
	gisGameEnd = false
	gIsGlue = false
	gBoard = buildBoard();
	renderBoard(gBoard);
	renderBallsCounter()

	//Random balls creator
	gIntervalBalls = setInterval(function () {
		var hight = gBoard.length - 2
		var width = gBoard[0].length - 2
		var sizeBoard = hight * width
		if ((sizeBoard) > (gBallsCount + 5)) createBall(gBoard)
	}, 2000)

	//Random glue creator
	gIntervalGlue = setInterval(function () {
		createGlue()
	}, 5000)
}


function buildBoard() {
	// Create the Matrix
	// var board = createMat(10, 12)
	var board = new Array(10);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12);
	}

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
				if (i === parseInt(board.length / 2) || j === parseInt(board.length / 2)) {
					cell.type = PASS
				}
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}
	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Places 2 Balls (currently randomly chosen positions)
	for (i = 0; i < 2; i++) {
		var loc = getRandomLocation(board)
		console.log(loc)
		cell = board[loc.i][loc.j]
		//MODEL UPDATE
		cell.gameElement = BALL
		gBallsCount++
	}

	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			// TODO - change to short if statement
			// if (currCell.type === FLOOR || currCell.type === PASS) cellClass += ' floor';
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			//TODO - Change To ES6 template string
			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			// TODO - change to switch case statement
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;


}

// Move the player to a specific location
function moveTo(i, j) {
	if (gisGameEnd || gIsGlue) return

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

		if (targetCell.type === PASS) {
			var newPos = specialPassage({ i, j })
			i = newPos.i
			j = newPos.j
		}
		else if (targetCell.gameElement === BALL) {
			BALL_AUDIO.play()
			gBallsCount--
			gBallsCollectedCount++
			renderBallsCounter()
			if (gBallsCount === 0) gameOver()
		}
		else if (targetCell.gameElement === GLUE) {
			GLUE_AUDIO.play()
			gIsGlue = true//Player cannot move
			clearInterval(gIntervalGlue)

			setTimeout(function () {
				gIsGlue = false
				renderCell(gGamerPos, GAMER_IMG)
				gIntervalGlue = setInterval(function () {
					createGlue()
				}, 5000)
			}, 3000)
		}
		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		if (!gIsGlue) {
			renderCell(gGamerPos, GAMER_IMG);
		} else renderCell(gGamerPos, GAMER_GLUE_IMG);
	}
}


// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;
	}
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function getRandomLocation(board) {
	var randCol = getRandomInteger(1, board[0].length - 2)
	var randRow = getRandomInteger(1, board.length - 2)
	var cell = board[randRow][randCol]
	while (cell.gameElement) {
		randCol = getRandomInteger(1, board[0].length - 2)
		randRow = getRandomInteger(1, board.length - 2)
		cell = board[randRow][randCol]
	}
	var location = { i: randRow, j: randCol }
	return location
}

function createBall(board) {
	var ballLocation = getRandomLocation(board)
	var cell = board[ballLocation.i][ballLocation.j]

	//MODEL UPDATE
	cell.gameElement = BALL
	gBallsCount++
	renderCell(ballLocation, BALL_IMG)
}


function renderBallsCounter() {
	var elBallsCount = document.querySelector('.balls-count')
	elBallsCount.innerText = gBallsCollectedCount
}

function gameOver() {
	var elMessage = document.querySelector('.message')
	elMessage.style.display = 'block'
	gisGameEnd = true
	clearInterval(gIntervalBalls)
	clearInterval(gIntervalGlue)
}
function resetGame() {
	var elMessage = document.querySelector('.message')
	elMessage.style.display = 'none'
	initGame()
}


function createGlue() {
	var pos = getRandomLocation(gBoard)
	gBoard[pos.i][pos.j].gameElement = GLUE
	renderCell(pos, GLUE_IMG)

	setTimeout(function () {
		if (gBoard[pos.i][pos.j].gameElement === GLUE) {
			gBoard[pos.i][pos.j].gameElement = null
			renderCell(pos, '')
		}
	}, 3000)
}

function specialPassage(pos) {
	var newPos = null
	var limitJ = gBoard[0].length - 1
	var limitI = gBoard.length - 1
	if (pos.i === 5 && pos.j <= 0) {
		newPos = { i: 5, j: limitJ - 1 }
	}
	else if (pos.i === 5 && pos.j >= limitJ) {
		newPos = { i: 5, j: 1 }
	}
	else if (pos.i <= 0 && pos.j === 5) {
		newPos = { i: limitI - 1, j: 5 }
	}
	else if (pos.i >= limitI && pos.j === 5) {
		newPos = { i: 1, j: 5 }
	}
	return newPos
}
