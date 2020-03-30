'use strict'
//MODEL
var gBoard;

//DOM
const LIVE_ICON = '🧑'

/*GLOBAL PARAMS*/
var gInterval;
var gLivesCount;
var gIsGameOn;




init()

function init() {
    gBoard = createBoardGame()
    gIsGameOn = false
}

function playGame() {
    gBoard = runGeneration(gBoard)
    renderBoard(gBoard)
}

function runGeneration(gboard) {
    var copyBoard = copyMat(gboard)

    for (var i = 0; i < gboard.length; i++) {
        for (var j = 0; j < gboard[i].length; j++) {
            var pos = { i, j }
            var livesCount = countLivesAround(pos, gboard)
            if (livesCount < 3 || livesCount > 5) {
                if (copyBoard[i][j]) {
                    copyBoard[i][j] = ''
                    gLivesCount--
                }
            } else if (!copyBoard[i][j]) {
                copyBoard[i][j] = LIVE_ICON
                gLivesCount++
            }//END IF-ELSE-IF
        }//END FOR
    }//END FOR
    return copyBoard
}
function copyMat(mat) {
    var copyMat = []
    for (var i = 0; i < mat.length; i++) {
        copyMat[i] = mat[i].slice()
    }
    return copyMat
}

function countLivesAround(pos, board) {
    var livesCount = 0
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= board.length) continue
            if (j === pos.j && i === pos.i) continue
            var cell = board[i][j]
            if (cell) livesCount++
        }
    }
    return livesCount
}

function renderBoard(gboard) {
    if (gLivesCount) clearInterval(gInterval)

    var size = gboard.length
    var strHTML = ""
    for (var i = 0; i < size; i++) {
        strHTML += '<tr>'
        var row = gboard[i]
        for (var j = 0; j < row.length; j++) {

            strHTML += `<td>${row[j]}</td>`
        }
        strHTML += '<tr/>'
    }

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function createBoardGame(size = 8) {
    var board = []
    var gLivesCount = 0

    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            if (Math.random() < 0.5) {
                board[i][j] = LIVE_ICON
                gLivesCount++
            } else board[i][j] = ''
        }
    }
    console.table(board)
    return board
}

function onClickedBtnGame(elBtn) {
    if (gIsGameOn) {
        elBtn.innerText = 'START GAME'
        gIsGameOn = false
        clearInterval(gInterval)
        elBtn.style.backgroundColor = 'forestGreen'
    }
    else {
        elBtn.innerText = 'PAUSE GAME'
        gIsGameOn = true
        gInterval = setInterval(playGame, 1000)
        elBtn.style.backgroundColor = 'lightSalmon'
    }
}

