'use strict'

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function crateArrayOfNums(start, end) {
    var nums = []
    //Create numbers array
    for (var i = start; i <= end; i++) {
        nums.push(i)
    }
    return nums
}

//Gets array and shuffle the array indexes
function shuffle(items) {
    var shuffleArray = []
    var copyItems = items.slice()
    while (copyItems.length > 0) {
        var randomIdx = getRandomInteger(0, copyItems.length - 1)
        var currItems = copyItems.splice(randomIdx, 1)
        shuffleArray.push(currItems[0])
    }
    return shuffleArray
}
