//HTML DOM
const booksContainer = document.getElementById("books-container");
const buttonAddNew = document.getElementById("add-book");
const addNewBookModal = document.getElementById("add-new-book");
const cancelButtonModal = document.getElementById("cancel");
const newBookForm = document.getElementById("new-book-form");
const buttonDelete = document.getElementById("delete");

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

    newBookForm.reset();
    addNewBookModal.close();
});

cancelButtonModal.addEventListener("click", () => {
    newBookForm.reset();
    addNewBookModal.close();
});

//Needs fixing 
// buttonDelete.addEventListener("click", handleDelete);
//

//JavaScript
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
    createCards(myLibrary);
}

function createCards(myLibrary) {
    booksContainer.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        let card = document.createElement("div");
        card.id = "card";
        card.className = "card";

        populateCard(myLibrary[i], card);
        booksContainer.appendChild(card);
    }
}

//Needs fixing
// function handleDelete(e) {
//     const id = e.target.getAttribute("data-id");
//     myLibrary = myLibrary.filter(card => card.id !== id);

//     const selectedCard = document.querySelector(`.card[data-id="${id}"]`);
//     if (selectedCard) {
//         selectedCard.remove();
//     }
//}
//

function populateCard(object, card) {
    let cardHeader = document.createElement("div");
    cardHeader.id = "card-header";
    cardHeader.className = "card-header";

    let cardDelete = document.createElement("div");
    cardDelete.id = "card-delete";
    cardDelete.className = "card-delete";
    cardDelete.innerHTML = `<button data-id=${object.id}><img src=\"./media/delete-outline.svg\" id=\"delete\" width=\"16px\" height=\"16px\"> Delete</button`;
    
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

    cardHeader.appendChild(cardDelete);
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
console.log(myLibrary);

