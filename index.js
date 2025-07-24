let myLibrary = [];

function Book(title, author, pages, read) {
    if(!new.target){
        throw console.error(`Must instantiate object with the 'new' Keyword!`);
    }
    [this.title, this.author, this.pages, this.read] = [title, author, pages, read];
    this.id = crypto.randomUUID();
    console.log(`Book ${title} by ${author} created.`);
}

// Book.prototype.hasRead() {

// }

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
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    const excludedKey = 'id';
    const excludedKey2 = 'title';

    newBook.setAttribute('data-id', book.id);
    newBook.classList.add('book');
    bookHeader.textContent = book.title;
    removeBtn.setAttribute('data-id', book.id);
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    readBtn.classList.add('read-btn');


    for(const key in book){
        if(key === 'id' || key === 'title' || key === 'read'){
            continue;
        }
        const newItem = document.createElement('li');
        newItem.textContent = book[key];
        bookList.appendChild(newItem);
    }


    newBook.appendChild(bookHeader);
    newBook.appendChild(bookList);
    newBook.appendChild(readBtn);
    newBook.appendChild(removeBtn);
    container.appendChild(newBook);
}

function deleteBook(bookIdToDelete){
    console.log('--- deleteBook called. Searching for book. ---');
    
    const initialLength = myLibrary.length;
    myLibrary = myLibrary.filter(book => book.id !== bookIdToDelete);

    if(myLibrary.length < initialLength){
        console.log(`--- Book with ID ${bookIdToDelete} was found and removed`);
    } else {
        console.log(`--- Book with ID ${bookIdToDelete} was NOT found. ---`);
    }
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
    const container = document.querySelector('#book-container');


    openModal.addEventListener('click', ()=> {
        console.log('--- Modal has been opened. ---');
        dialog.showModal();
    });

    closeModal.addEventListener('click', (event)=> {
        event.preventDefault();

        if(bookForm.checkValidity()){
            const title = document.querySelector('#title');
            const author = document.querySelector('#author');
            const pages = document.querySelector('#pages');
            const read = document.querySelector('#read');

            addBookToLibrary(new Book(title.value, author.value, pages.value, read.value));
            clearContainer();
            displayBook();
            bookForm.reset(); // Reset the form fields
            dialog.close(); // Close the dialog only if the form is valid
            console.log('--- Modal has been closed and form submitted. ---');
        } else {
            bookForm.reportValidity();
            console.log('--- Form is not valid. Please fill in all required fields. ---');
        }
        
    });

    dialog.addEventListener('close', () => {
        // You can add any cleanup or specific actions here if needed when the dialog closes.
        console.log('--- Dialog closed by user (e.g., Escape key or click outside). ---');
    });

    container.addEventListener('click',(event)=> {
        const item = event.target;
        if(item.classList.contains('remove-btn')){
            const bookId = item.getAttribute('data-id');
            if(bookId){
                deleteBook(bookId);
                clearContainer();
                displayBook();
            } else {
                console.warn('Remove button clicked, but no data-id found.')
            }
            
        }
    });

    displayBook();
});