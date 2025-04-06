const myLibrary = [];

function Book(title, author, pages, hasBeenRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasBeenRead = hasBeenRead;
}

Book.prototype.toggleReadStatus = function(event) {
  this.hasBeenRead = !this.hasBeenRead;
}

function addBookToLibrary(title, author, pages, hasBeenRead) {
  const newBook = new Book(title, author, pages, hasBeenRead);
  newBook.id = crypto.randomUUID();
  myLibrary.push(newBook);
}

function displayBooks(library) {
  library.forEach(({ title, author, pages, hasBeenRead, id }) => {
    const libraryContainer = document.querySelector(".library");
    const bookCard = document.createElement("div");
    const bookDetails = document.createElement("div");
    const bookControls = document.createElement("div");
    const bookTitle = document.createElement("h1");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const hasBeenReadBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    bookCard.className = "book";
    bookCard.setAttribute("data-id", id);
    bookDetails.className = "book-details";
    bookControls.className = "book-controls";
    bookTitle.className = "book-title";
    bookAuthor.className = "book-author";
    bookPages.className = "book-pages";
    hasBeenReadBtn.className = "has-been-read";
    removeBtn.className = "remove";

    bookTitle.textContent = title;
    bookAuthor.textContent = author;
    bookPages.textContent = `${pages} pages`;
    hasBeenReadBtn.textContent = hasBeenRead ? "read" : "not read";
    hasBeenReadBtn.className += hasBeenRead ? " read" : "";
    removeBtn.textContent = "×";

    removeBtn.addEventListener("click", function(event) {
      const book = event.target.parentElement.parentElement;
      const bookId = book.getAttribute("data-id");

      const indexToRemove = myLibrary.findIndex(book => book.id === bookId);
      myLibrary.splice(indexToRemove, 1);

      book.remove();
    });

    hasBeenReadBtn.addEventListener("click", function(event) {
      const bookId = event.target.parentElement.parentElement.getAttribute("data-id");
      const bookToUpdate = myLibrary.find(book => book.id === bookId);

      bookToUpdate.toggleReadStatus();
      event.target.classList.toggle("read");

      hasBeenReadBtn.textContent = bookToUpdate ? "read" : "not read";
    });

    bookDetails.append(bookTitle, bookAuthor, bookPages);
    bookControls.append(hasBeenReadBtn, removeBtn);

    bookCard.append(bookDetails, bookControls);
    
    libraryContainer.appendChild(bookCard);
  });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, false);
addBookToLibrary("Sapiens", "Yuval Noah Harari", 498, true);

displayBooks(myLibrary);