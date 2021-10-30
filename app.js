let container = document.querySelector('.container');

let myLibrary = [{title: 'The Memoirs of Hadrian', author: 'Marguerite Yourcenar', pages: 347, read: true}];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
    this.info = function() {
        if (read) {
            return `${title} by ${author}, ${pages} pages, has been read`
        } else {
            return `${title} by ${author}, ${pages} pages, not read yet`
        }
    }
}

function addBookToLibrary() {

}

function displayLibrary(library) {
    for (i=0; i < library.length; i++) {
        let book = library[i];
        let bookDisplay = document.createElement('div');
        let displayHeader = document.createElement('header');
        let displayInfo = document.createElement('section');
        let displayTitle = document.createElement('h4');
        let displayAuthor = document.createElement('h5');
        let displayText = document.createElement('p');


        displayHeader.classList.add('card-header');
        displayTitle.innerHTML = `${book.title}`
        displayAuthor.innerHTML = `${book.author}`;
        displayHeader.appendChild(displayTitle);
        bookDisplay.appendChild(displayHeader);


        bookDisplay.classList.add('card');
        displayInfo.classList.add('card-body');
        displayAuthor.classList.add('card-title');
        displayText.classList.add('card-text');
        displayText.innerHTML = `${book.pages} pages <br>Has been read?: ${book.read}`;
        displayInfo.appendChild(displayAuthor);
        displayInfo.appendChild(displayText);
        bookDisplay.appendChild(displayInfo);
        container.appendChild(bookDisplay);
    }
}

displayLibrary(myLibrary);