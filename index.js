const myLibrary = [];

function Book(title, author, pages, read) {
    if(!new.target){
        throw console.error(`Must instantiate object with the 'new' Keyword!`);
    }
    [this.title, this.author, this.pages, this.read] = [title, author, pages, read];
    this.id = crypto.randomUUID();
    console.log(`Book ${title} by ${author} created.`);
}

function addBookToLibrary(book){
    myLibrary.push(book);
    console.log(`Book "${book.title}" added to the library`);
}

function displayBook() {
    console.log(`--- Displaying all books. ---`)
    for(const item of myLibrary){
        console.log(`Displaying: "${item.title}" by ${item.author}, ${item.pages}, status: ${item.read}`);
        createBookCard(item);
    }
    console.log(`--- Finished displaying books.`)
}

function createBookCard(book) {
    const container = document.querySelector('#book-container');
    const newBook = document.createElement('div');
    const bookHeader = document.createElement('h3');
    const bookList = document.createElement('ul');
    const excludedKey = 'id';
    const excludedKey2 = 'title';

    newBook.setAttribute('data-id', book.id);
    newBook.classList.add('book');
    bookHeader.textContent = book.title;

    for(const key in book){
        if(key === excludedKey || key === excludedKey2){
            continue;
        }
        const newItem = document.createElement('li');
        newItem.textContent = book[key];
        bookList.appendChild(newItem);
    }

    newBook.appendChild(bookHeader);
    newBook.appendChild(bookList);
    container.appendChild(newBook);
}

function clearContainer() {
    const container = document.querySelector('#book-container');
    container.replaceChildren();
    console.log('DOM has been cleared');
}

// const book1 = new Book('Lord of the Rings', 'J.R.R Tolkien', 250, 'not read');
// const book2 = new Book('Python crash course', 'Eric Matthes', 354, 'not read');

document.addEventListener('DOMContentLoaded', ()=> {
    console.log('--- Page has loaded. ---')
    const openModal = document.querySelector('#open-modal');
    const closeModal = document.querySelector('#close-modal');
    const dialog = document.querySelector('#dialog');
    const bookForm = document.querySelector('form');


    openModal.addEventListener('click', ()=> {
        console.log('--- Modal has been opened. ---');
        dialog.showModal();
    });

    closeModal.addEventListener('click', ()=> {
        dialog.close();
        console.log('--- Modal has been closed. ---');
    });

    bookForm.addEventListener('submit', ()=> {
        const title = document.querySelector('#title');
        const author = document.querySelector('#author');
        const pages = document.querySelector('#pages');
        const read = document.querySelector('#read');

        addBookToLibrary(new Book(title.value, author.value, pages.value, read.value));
        clearContainer();
        displayBook();
        bookForm.reset();
    })
    displayBook();
})