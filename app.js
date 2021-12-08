let booksList = document.querySelector('.books');
let addBtn = document.querySelector('#addBtn');
let cancelBtn = document.querySelector('#cancelBtn');
let submitBtn = document.querySelector('#submitBtn');
let bookForm = document.querySelector('#formContainer');
let bookTitle = document.querySelector('#bookTitle');
let bookAuthor = document.querySelector('#bookAuthor');
let bookPages = document.querySelector('#bookPages');
let bookRead = document.querySelector('#bookRead');

let localData = window.localStorage;

function randomNum() {
    return Math.floor(Math.random() * 10**(Math.floor(Math.random()*10+2)));
}

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
    this.id = title.toLowerCase().replaceAll(' ', '') + randomNum() + author.toLowerCase().replaceAll(' ','') + randomNum()
}

class Library {
    constructor() {
        this.books = []
    }

    inLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title && book.author === newBook.author)
    }

    addBook(newBook) {
        if (!this.inLibrary(newBook)) {
            this.books.push(newBook)
        }
    }

    removeBook(id) {
        this.books = this.books.filter((book) => book.id !== id)
    }

    findBook(id) {
        return this.books.find((book) => book.id === id)
    }
}

const library = new Library();

function saveLocal() {
    localData.setItem('library', JSON.stringify(library.books))
}

function loadLocal() {
    const books = JSON.parse(localData.getItem('library'))
    if (books) {
        library.books = books.map(book => new Book(book.title, book.author, book.pages, book.read))
    } else {
        library.books = []
    }
}

function toggleForm() {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = 1;
    bookRead.value = 'Yes';
    bookForm.classList.toggle('d-none');
}

function createBook() {
    return new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
}

addBtn.onclick = () => {toggleForm()}

cancelBtn.onclick = (e) => {
    e.preventDefault();
    toggleForm()
}

submitBtn.onclick = (e) => {
    if (bookTitle.checkValidity() && bookAuthor.checkValidity() && bookPages.checkValidity()) {
        e.preventDefault();
        let newBook = createBook();
        library.addBook(newBook);
        saveLocal();
        displayLibrary(library);
    }
}

function makeCard(book) {
    let bookDisplay = document.createElement('div');
    let displayHeader = document.createElement('header');
    let displayBtns = document.createElement('div');
    let displayPages = document.createElement('p');
    let readBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');
    let displayTitle = document.createElement('h2');
    let displayAuthor = document.createElement('h5');
    let headerInfo = document.createElement('div');


    headerInfo.classList.add('row');
    displayHeader.classList.add('card-header', 'bg-dark',);
    displayAuthor.classList.add('text-muted', 'col-auto');
    displayPages.classList.add('text-muted', 'col-auto');
    displayHeader.appendChild(displayTitle);
    headerInfo.appendChild(displayAuthor);
    headerInfo.appendChild(displayPages);
    displayHeader.appendChild(headerInfo)
    displayTitle.innerHTML = `${book.title}`
    displayAuthor.innerHTML = `${book.author}`;
    displayPages.innerHTML = `${book.pages} pages`;

    
    bookDisplay.appendChild(displayHeader);
    bookDisplay.classList.add('card','bg-dark','border-dark','text-white', 'my-1');
    displayBtns.classList.add('d-grid','gap-2');

    readBtn.classList.add('btn', 'btn-lg');
    if (book.read) {
        readBtn.innerHTML = 'Read'
        readBtn.classList.add('btn-success')
    } else {
        readBtn.innerHTML = 'Not read'
        readBtn.classList.add('btn-warning')
    }
    readBtn.setAttribute('type', 'button')

    readBtn.onclick = () => {
        const foundBook = library.findBook(book.id)
        foundBook.read = !foundBook.read;
        saveLocal();
        displayLibrary()
    }

    deleteBtn.innerHTML = 'Delete Book'
    deleteBtn.classList.add('btn', 'btn-lg','btn-danger');
    deleteBtn.setAttribute('type', 'button');

    deleteBtn.onclick = () => {
        library.removeBook(book.id);
        saveLocal();
        displayLibrary();
    }

    displayBtns.appendChild(readBtn);
    displayBtns.appendChild(deleteBtn);

    displayBtns.classList.add('d-flex','justify-content-around');
    bookDisplay.classList.add('mx-1');
    bookDisplay.appendChild(displayBtns);
    booksList.appendChild(bookDisplay);
    booksList.classList.add('col-auto')
}

function displayLibrary() {
    booksList.innerHTML = '';
    for (let book of library.books) {
        makeCard(book);
    }
}

loadLocal();
displayLibrary();
//Need to add in localstorage functionality