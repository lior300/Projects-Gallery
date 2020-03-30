'use strict'

var gBooks;

var gSortBy = 'title';
var gPageIdx = 0

const PAGE_SIZE = 5
const BOOKS_STORAGE_KEY = 'books'

function addBook(name, price, imgUrl = '#') {
    var book = createBook(name, price, imgUrl)
    gBooks.unshift(book)
    _saveBooksToStorage()
}

function removeBook(bookId) {
    var idx = getIdxBookById(bookId)
    gBooks.splice(idx, 1)
    _saveBooksToStorage()
}

function updateBook(bookId, bookPrice) {
    var idx = getIdxBookById(bookId)
    gBooks[idx].price = bookPrice
    _saveBooksToStorage()
}

/**return the book-modal**/
function getBooks() {
    return gBooks;
}
function getBooksToRender() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}
/**CREATE ONE BOOK FUNCTIONS**/
function createBook(title, price = 20.0, imgUrl = '#', rate = 0, ) {
    var book = {
        id: makeId(),
        title,
        price,
        rate,
        imgUrl
    }
    return book
}
function createBooks() {
    var booksTitles = [
        'Learning Laravel',
        'Beginning with Laravel',
        'Java for developers']
    gBooks = booksTitles.map(title => createBook(title))
    _saveBooksToStorage()
}

/**SAVE THE BOOKS MODAL IN LOCAL-STORAGE**/
function _saveBooksToStorage() {
    saveToStorage(BOOKS_STORAGE_KEY, gBooks)
}

function getIdxBookById(bookId) {
    var idxBook = gBooks.findIndex(book => bookId === book.id)
    return idxBook
}
function getBookById(bookId) {
    var book = gBooks.find(book => bookId === book.id)
    return book
}

function updateRate(newRate, bookIdx) {
    gBooks[bookIdx].rate = newRate;
    _saveBooksToStorage()
}

function sortBooks(books, sortBy = gSortBy) {
    gSortBy = sortBy
    return books.sort((book1, book2) => {
        if (sortBy === 'title') {
            book1[sortBy] = book1[sortBy].toLowerCase()
            book2[sortBy] = book2[sortBy].toLowerCase()
        }
        if (book1[sortBy] < book2[sortBy]) return -1
        if (book1[sortBy] > book2[sortBy]) return 1
        return 0
    })
}

function changePage(pageNum) {
    gPageIdx = pageNum;
}
function getPageIdx() {
    return gPageIdx
}
