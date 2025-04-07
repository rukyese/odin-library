const newBookBtn = document.querySelector(".new-book");
const dialog = document.querySelector(".new-book-dialog");
const form = dialog.querySelector("form");
const confirmBtn = document.querySelector(".confirmBtn");

const myLibrary = [];

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = crypto.randomUUID();
  }

  toggleReadStatus() {
    this.readStatus = !this.readStatus;
  }
}

function addBookToLibrary(title, author, pages, readStatus) {
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

function createBookCard({ title, author, pages, readStatus, id }) {
  const bookCard = document.createElement("div");
  bookCard.className = "book";
  bookCard.setAttribute("data-id", id);

  const bookDetails = createBookDetails(title, author, pages);
  const bookControls = createBookControls(readStatus, id);

  bookCard.append(bookDetails, bookControls);

  return bookCard;
}

function createBookDetails(title, author, pages) {
  const bookDetails = document.createElement("div");
  bookDetails.className = "book-details";

  const bookTitle = document.createElement("h1");
  bookTitle.className = "book-title";
  bookTitle.textContent = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.className = "book-author";
  bookAuthor.textContent = author;

  const bookPages = document.createElement("p");
  bookPages.className = "book-pages";
  bookPages.textContent = `${pages} page${pages > 1 ? "s" : ""}`;

  bookDetails.append(bookTitle, bookAuthor, bookPages);

  return bookDetails;
}

function createBookControls(readStatus, bookId) {
  const bookControls = document.createElement("div");
  bookControls.className = "book-controls";

  const readStatusBtn = document.createElement("button");
  readStatusBtn.className = "read-status";
  if (readStatus) readStatusBtn.classList.add("read");
  readStatusBtn.textContent = readStatus ? "read" : "not read";

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove";
  removeBtn.textContent = "×";

  bindReadStatusToggle(readStatusBtn, bookId);
  bindRemoveButton(removeBtn, bookId);

  bookControls.append(readStatusBtn, removeBtn);

  return bookControls;
}

function bindRemoveButton(removeBtn, bookId) {
  removeBtn.addEventListener("click", function (event) {
    const book = event.target.parentElement.parentElement;

    const indexToRemove = myLibrary.findIndex((book) => book.id === bookId);
    myLibrary.splice(indexToRemove, 1);

    book.remove();
  });
}

function bindReadStatusToggle(readStatusBtn, bookId) {
  readStatusBtn.addEventListener("click", function (event) {
    const bookToUpdate = myLibrary.find((book) => book.id === bookId);

    bookToUpdate.toggleReadStatus();
    event.target.classList.toggle("read");

    readStatusBtn.textContent = bookToUpdate.readStatus ? "read" : "not read";
  });
}

function displayBooks(library) {
  const libraryContainer = document.querySelector(".library");
  libraryContainer.replaceChildren();

  library.forEach((book) => {
    const card = createBookCard(book);
    libraryContainer.appendChild(card);
  });
}

newBookBtn.addEventListener("click", function () {
  dialog.showModal();
});

dialog.addEventListener("close", function () {
  if (dialog.returnValue !== "submitted") return;

  const formData = new FormData(form);
  const [title, author, pages, readStatus] = [
    formData.get("title"),
    formData.get("author"),
    parseInt(formData.get("pages")),
    formData.get("read-status") === "read" ? true : false,
  ];
  const newBook = new Book(title, author, pages, readStatus);

  myLibrary.splice(0, 0, newBook);
  displayBooks(myLibrary);
  form.reset();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, false);
addBookToLibrary("Sapiens", "Yuval Noah Harari", 498, true);

displayBooks(myLibrary);
