let booksList = document.querySelector('.books');
let addBtn = document.querySelector('#addBtn');
let cancelBtn = document.querySelector('#cancelBtn');
let submitBtn = document.querySelector('#submitBtn');
let bookForm = document.querySelector('#formContainer');
let bookTitle = document.querySelector('#bookTitle');
let bookAuthor = document.querySelector('#bookAuthor');
let bookPages = document.querySelector('#bookPages');
let bookRead = document.querySelector('#bookRead');

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

class Library {
    constructor() {
        this.books = [{title: 'The Memoirs of Hadrian', author: 'Marguerite Yourcenar', pages: 347, read: true}]
    }

    inLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title && book.author === newBook.author)
    }

    addBook(newBook) {
        if (!this.inLibrary(newBook)) {
            this.books.push(newBook)
        }
    }

    removeBook(book) {
        this.books = this.books.filter((foundBook) => foundBook.title === book.title && foundBook.author === book.author)
    }
}

const library = new Library();

function toggleForm() {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = 0;
    bookRead.value = 'Yes';
    bookForm.classList.toggle('d-none');
}

function createBook() {
    return new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value);
}

addBtn.onclick = () => {toggleForm()}

cancelBtn.onclick = (e) => {
    e.preventDefault();
    toggleForm()
}

submitBtn.onclick = (e) => {
    e.preventDefault();
    let newBook = createBook();
    library.addBook(newBook);
    displayLibrary(library)
}

function makeCard(book) {
    let bookDisplay = document.createElement('div');
    let displayHeader = document.createElement('header');
    let displayInfo = document.createElement('section');
    let displayText = document.createElement('p');

    let displayTitle = document.createElement('h4');
    let displayAuthor = document.createElement('h5');

    displayHeader.classList.add('card-header', 'bg-dark',);
    displayTitle.innerHTML = `${book.title}`
    displayAuthor.innerHTML = `${book.author}`;
    displayHeader.appendChild(displayTitle);
    bookDisplay.appendChild(displayHeader);

    bookDisplay.classList.add('card','bg-dark','border-dark','text-white', 'my-1');
    displayInfo.classList.add('card-body');
    displayAuthor.classList.add('card-title');
    displayText.classList.add('card-text');
    displayText.innerHTML = `${book.pages} pages <br>Has been read?: ${book.read}`;
    displayInfo.appendChild(displayAuthor);
    displayInfo.appendChild(displayText);
    bookDisplay.appendChild(displayInfo);
    booksList.appendChild(bookDisplay);
}

function displayLibrary(library) {
    booksList.innerHTML = ''
    for (let book of library.books) {
        makeCard(book);
    }
}

displayLibrary(library);