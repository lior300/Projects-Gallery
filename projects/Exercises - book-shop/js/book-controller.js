'use strict'

function init() {
    var books = loadFromStorage(BOOKS_STORAGE_KEY)
    if (!books) {
        createBooks()
        books = getBooks()
    } else gBooks = books
    renderBooks(getBooksToRender())
    renderBtnsPages()
}


function ModalReadBookRender(bookId) {
    var book = getBookById(bookId)

    var strHTML = `
     <h1 class="title">${book.title}</h1>
            <img class="pic-book" src="${book.imgUrl}" alt="Picture Book"/>
            <div class="box-price">
                <span style="text-decoration: underline;">Price:</span><span class="priceBook">${book.price}&#8362;</span>
            </div>
            <div class="panel-rate">
                <h2>Book Rating</h2>
                <div class="btns-rate-panel">
                    <button class="btn" onclick="onRateButton(1, '${bookId}')">+</button>
                    <span class="box-rate">${book.rate}</span>
                    <button class="btn" onclick="onRateButton(-1, '${bookId}')">-</button>
                </div>
            </div>
            <button class="modal-close-btn" onclick="onModalClose()">Close</button>
        </div>
    `
    document.querySelector('.modal-ReadBook').innerHTML = strHTML;
}

function renderBooks(books) {
    if (!books.length) {
        var strHTMLSs = `
        <tr>
            <td colspan='4'>
                There are no books in store inventory
            </td>
        </tr>`
        document.querySelector('table tbody').innerHTML = strHTMLSs
    } else {
        var booksToRender = getBooksToRender(books)
        var strHTMLSs = booksToRender.map(book => {
            return `<tr>
                    <td class="td-id">${book.id}</td>
                    <td class="td-title">${book.title}</td>
                    <td class="td-price">${book.price}&#8362;</td>
                    <td><button onclick="onReadBook('${book.id}')">Read</button></td>
                    <td><button onclick="onUpdateBook('${book.id}')">Update</button></td>
                    <td><button onclick="onRemoveBook('${book.id}')">Delete</button></td>
                </tr>`
        })
        document.querySelector('table tbody').innerHTML = strHTMLSs.join('');
    }
}

function renderBtnsPages() {
    var countPage = Math.ceil(getBooks().length / 5)
    var strHTML = `<button class="btn-back  btn-page " onclick="onArrowPage(-1)"><</button>`
    for (var i = 0; i < countPage; i++) {
        strHTML += `<button class="btn-num  btn-page btn-pageNum${i}" onclick="onNumPage(${i})" >${i + 1}</button >`
    }
    strHTML += `<button class="btn-next  btn-page" onclick="onArrowPage(1)">></button>`
    document.querySelector('.panel-buttons-pages').innerHTML = strHTML;
    var pageIdx = getPageIdx()
    if (pageIdx === 0) document.querySelector('.btn-back').disabled = true;
    if (countPage === 0 || pageIdx === countPage - 1) document.querySelector('.btn-next').disabled = true;
    var elCurrPage = document.querySelector('.btn-pageNum' + pageIdx)
    elCurrPage.disabled = true
    elCurrPage.classList.add('btn-curr-page')
}

function onReadBook(bookId) {
    ModalReadBookRender(bookId)
    var elModalRed = document.querySelector('.modal-ReadBook')
    elModalRed.style.display = 'flex';
}
function onModalClose() {
    var elModalRed = document.querySelector('.modal-ReadBook')
    elModalRed.style.display = 'none';
}


function onCreateBook() {
    var elModalBookCreate = document.querySelector('.modal-create-book');
    elModalBookCreate.classList.toggle('modal-create-book-show')
}
function onAddBook() {
    var dataForm = getDataForm()

    // var name = prompt('Please Enter name book (Title)')
    // if (!name) return
    // var price = +prompt('What is the price of the book?')
    // if (!price) return

    var name = dataForm.name
    if (!name) return
    var price = dataForm.price
    if (!price) return
    var imgUrl = dataForm.imgUrl

    addBook(name, price, imgUrl)
    renderBooks(getBooks())
    renderBtnsPages()
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks(getBooks())
    renderBtnsPages()
}

function onUpdateBook(bookId) {
    var bookPrice = +prompt('Enter new price')
    updateBook(bookId, bookPrice)
    renderBooks(getBooks())
    renderBtnsPages()
}

function onRateButton(rate, bookId) {
    var books = getBooks()
    var bookIdx = getIdxBookById(bookId)
    var newRate = rate + books[bookIdx].rate
    if (newRate < 0 || newRate > 10) return

    updateRate(newRate, bookIdx)
    renderElement('.box-rate', newRate)
}

function onHeaderTable(header) {
    var booksForRender = sortBooks(gBooks, header)
    renderBooks(getBooks())
    renderBtnsPages()
}

function onArrowPage(nextPage) {
    changePage(getPageIdx() + nextPage);
    renderBooks(getBooks())
    renderBtnsPages()
}
function onNumPage(pageNum) {
    changePage(pageNum)
    renderBooks(getBooks())
    renderBtnsPages()
}


function getDataForm() {
    var elFromInputs = document.querySelectorAll('input');
    return {
        name: elFromInputs[0].value,
        price: +elFromInputs[1].value,
        imgUrl: `images\\` + elFromInputs[2].value.split('\\').pop()
    }
}
