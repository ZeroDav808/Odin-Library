const myLibrary = [];

function Book(title, author, pages, read) {
    if(!new.target){
        throw console.error(`Must instantiate object with the 'new' Keyword!`);
    }
    [this.title, this.author, this.pages, this.read] = [title, author, pages, read];
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
    }
    console.log(`--- Finished displaying books.`)
}

const book1 = new Book('Lord of the Rings', 'J.R.R Tolkien', 250, 'not read');
const book2 = new Book('Python crash course', 'Eric Matthes', 354, 'not read');