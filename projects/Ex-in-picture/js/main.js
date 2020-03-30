'use strict'

/*MODEL*/
var gQuests;
var gCurrQuestIdx;
var gIdQuestsCount;
/*GLOBAL VARIABLES*/
var gIsMessShow;
var gIsGameEnd;


console.log('Script start')

function init() {
    gIsMessShow = false
    gIsGameEnd = false
    gCurrQuestIdx = 0
    gIdQuestsCount = 1
    gQuests = []

    var answers = [
        { opts: ['סמבוסק', 'אוזן המן', 'מפרום'], correctOptIndex: 0 },
        { opts: ['אפונה', 'שעועית', 'מפרום'], correctOptIndex: 1 },
        { opts: ['קובה בורל', 'קובה עמבה', 'מפרום'], correctOptIndex: 1 }
    ]
    for (var i = 0; i < answers.length; i++) {
        var newQuests = createQuests(answers[i])
        gQuests.push(newQuests)
    }

    renderQuest()
}

//createQuests() – return an hard-coded (ready made) array for now with at least 3 questions
function createQuests(quest) {
    var id = gIdQuestsCount++
    var opts = quest.opts
    var correctOptIndex = quest.correctOptIndex
    var resQuest = { id, opts, correctOptIndex }
    return resQuest
}

function renderQuest() {
    var quest = gQuests[gCurrQuestIdx]
    //Add image
    var elImg = document.querySelector(".picBox img")
    elImg.src = 'img/' + quest.id + '.jpg'
    addOptions(quest.opts)
}
function addOptions(options) {
    var strHTML = ''
    for (var i = 0; i < options.length; i++) {
        var currOpt = options[i]
        strHTML += ` <button class="answer" data-idx=${i} onclick="onClickedOpt(this)">${currOpt}</button>`
    }
    var elDiv = document.querySelector(".answerBox")
    elDiv.innerHTML = strHTML
}

function onClickedOpt(elAnswer) {
    if (gIsGameEnd || gIsMessShow) return

    var idxAnswer = elAnswer.getAttribute("data-idx")//index of the answer clicked
    var isAnswerCorrect = checkAnswer(idxAnswer)

    if (isAnswerCorrect) {
        gCurrQuestIdx++

        if (checkVictory()) {
            var btn = document.querySelector('.btn')
            btn.style.display = 'block'
            showMessage('VICTORY!!')
        } else {
            showMessage('!נכון')
            setTimeout(renderQuest, 3000)

        }//END IF-ELSE

    } else showMessage('!לא נכון')
}

function checkAnswer(optIdx) {
    var quest = gQuests[gCurrQuestIdx]
    var idxCorrectOpt = '' + quest.correctOptIndex //Get the index of the correct option
    if (optIdx === idxCorrectOpt) return true
    return false
}

function showMessage(mess) {
    if (gIsMessShow) return
    var elmess = document.querySelector('.boxMess')
    elmess.innerText = mess
    elmess.style.display = 'block'
    gIsMessShow = true
    setTimeout(function () {
        elmess.style.display = 'none'
        gIsMessShow = false
    }, 3000)
}

function checkVictory() {
    if (gCurrQuestIdx === gQuests.length) {
        showMessage('VICTORY!!')
        return true
    }
    return false
}

function onBtnResetClicked() {
    gCurrQuestIdx = 0
    gIdQuestsCount = 0
    gIsGameEnd = false
    var btn = document.querySelector('.btn')
    btn.style.display = 'none'
    init()
}
