
var gId = 0
var gProjs = createProjects();


function createProjects() {
    var projs = []
    //Add Project1
    projs.push(createProject(
        'Minesweeper-The game',
        '"minesweeper" - The game',
        'with features and special bonuses',
        ['Games'],
        'projects/MineSweeper/index.html'))

    //Add Project2
    projs.push(createProject(
        'What in the picture?',
        'Guess what\'s in the picture game',
        'A game where you get a picture and you have to answer what\'s in the picture',
        ['Games'],
        'projects/Ex-in-picture/index.html'))

    //Add Project3
    projs.push(createProject(
        'Next-Number',
        'Find the next number',
        'A game where you have to find all the numbers in the fastest time',
        ['Games'],
        'projects/Ex-touch-nums/index.html'))

    //Add Project4
    projs.push(createProject(
        'Balls Board',
        'Clear up all balls from the board',
        'Game - Clear up all balls from the board',
        ['Games'],
        'projects/ball-board-start-here/index.html'))

    //Add Project5
    projs.push(createProject(
        'Game Life',
        'The game life',
        'Board of life',
        ['Games'],
        'projects/game-life/‏‏index.html'))

    //Add Project6
    projs.push(createProject(
        'Bookstore',
        'Book store - Show your book',
        'Bookstore - View books for sale with sorting by name or perice',
        ['Games'],
        'projects/Exercises-book-shop/index.html'))

    return projs
}

function createProject(name, title, desc, labels, url = '#', publishedAt = Date.now()) {
    return {
        id: ++gId, name, title, desc, url, publishedAt, labels
    }
}

function GetgProjs() {
    return gProjs
}

function getProjectById(idProject) {
    return gProjs.find(project => idProject === project.id)
}
