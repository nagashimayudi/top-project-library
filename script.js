//HTML DOM
const booksCards = document.getElementById("books-cards");
const buttonAddNew = document.getElementById("add-book");
const addNewBookModal = document.getElementById("add-new-book");
const cancelButtonModal = document.getElementById("cancel");
const submitButtonModal = document.getElementById("submit");
const newBookForm = document.getElementById("new-book-form");

//Event listener
buttonAddNew.addEventListener("click", () => {
    addNewBookModal.showModal();
});

newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(newBookForm);
    const formObject = Object.fromEntries(formData.entries());

    if (formObject.read === undefined) {
        formObject.read = false;
    } else {
        formObject.read = true;
    }

    addBookToLibrary(formObject.title, formObject.author, formObject.pages, formObject.read);
    createCard(formObject);

    newBookForm.reset();
    addNewBookModal.close();
});

const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}


function createCard(object) {
    let card = document.createElement("div");
    card.id = "card";
    card.className = "card";

    populateCard(object, card);
    booksCards.appendChild(card);
}

function populateCard(object, card) {
    let cardHeader = document.createElement("div");
    cardHeader.id = "card-header";
    cardHeader.className = "card-header";

    let placeholder = document.createElement("div");
    
    let cardAuthor = document.createElement("div");
    cardAuthor.id = "author";
    cardAuthor.className = "author";
    cardAuthor.textContent = object.author;

    let cardRead = document.createElement("div");
    cardRead.id = "read";
    if (object.read == true) {
        cardRead.className = "read";
        cardRead.innerHTML = "<img src=\"./media/check-circle.svg\" width=\"16px\" height=\"16px\" class=\"read-filter\"> Read";
    } else if (object.read == false) {
        cardRead.className = "not-read";
        cardRead.innerHTML = "<img src=\"./media/check-circle-outline.svg\" width=\"16px\" height=\"16px\" class=\"not-read-filter\"> Unread";
    }

    cardHeader.appendChild(placeholder);
    cardHeader.appendChild(cardAuthor);
    cardHeader.appendChild(cardRead);

    let cardTitle = document.createElement("div");
    cardTitle.id = "title";
    cardTitle.className = "title";
    cardTitle.textContent = object.title;

    let cardPages = document.createElement("div");
    cardPages.id = "pages";
    cardPages.className = "pages";
    cardPages.textContent = "Pages: " + object.pages;

    card.appendChild(cardHeader);
    card.appendChild(cardTitle);
    card.appendChild(cardPages);  
}

addBookToLibrary("Dom Casmurro", "Machado de Assis", 128, true);
createCard(myLibrary[0]);

