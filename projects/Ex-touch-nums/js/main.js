'use strict'

/*MODEL*/
var gBoard;
var gCurrNumIdx;
var gSize;
var gCountNums;
var gTime;

var isGameStarted = false;
var gInterval;


function init() {
    gBoard = createBoard()
    gCurrNumIdx = 1;
    gCountNums = 16;
    gSize = 4;
    gTime = 0;
    renderBoard(gBoard)
}

function createBoard(countNum = 16) {
    var nums = crateArrayOfNums(1, countNum)
    nums = shuffle(nums)
    return nums
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0, index = 0; i < gSize; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < gSize; j++) {
            var currNum = board[index++]
            strHTML += `<td onclick="numberClicked(this)"  data-num=${currNum}>${currNum}</td>`
        }
        strHTML += `</tr>`
    }//END FOR
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function numberClicked(elNum) {
    // var elValue = elNum.innerText
    var elValue = elNum.getAttribute('data-num')

    if (checkIfCurrNum(elValue)) {
        if (!isGameStarted) {
            startGame()
        }
        elNum.classList.add("clicked");
        if (checkIFWin()) {
            console.log('You win');
            showHidePanelBtns()
            stopTimer()
            var elMess = document.querySelector('.mess')
            elMess.style.display = 'block'
        } else printNextNum()
    }//END IF
}


function btnSizeClicked(elBtn) {
    var sizeElBtn = elBtn.getAttribute('data-size')
    if (sizeElBtn === '16') {
        gSize = 4
        gCountNums = 16
    } else if (sizeElBtn === '25') {
        gSize = 5
        gCountNums = 25
    } else {
        gSize = 6
        gCountNums = 36
    }
    resetGame()
    var elMess = document.querySelector('.mess')
    elMess.style.display = 'none'
}

function checkIfCurrNum(numVal) {
    var strCurrNumIdx = '' + gCurrNumIdx //Convert to string
    if (strCurrNumIdx === numVal) {
        gCurrNumIdx++
        return true
    }
    return false
}

function startTimer() {
    var elTime = document.querySelector('.time')
    var time = 0
    gInterval = setInterval(function () {
        elTime.innerHTML = (time / 1000).toFixed(3)
        time++
    }, 1)
}
function stopTimer() {
    clearInterval(gInterval)
}

function checkIFWin() {
    return (gCountNums < gCurrNumIdx)
}

function showHidePanelBtns() {
    var elPanel = document.querySelector('.btnsPanel')
    elPanel.style.display = (elPanel.style.display === 'none') ? 'block' : 'none'
}

function printNextNum() {

    var elNextNumber = document.querySelector('#number')
    elNextNumber.innerText = gCurrNumIdx
}

function resetGame() {
    gCurrNumIdx = 1
    printNextNum()
    isGameStarted = false
    gBoard = createBoard(gCountNums)
    renderBoard(gBoard)
}

function startGame() {
    isGameStarted = true
    showHidePanelBtns()
    startTimer()
}
