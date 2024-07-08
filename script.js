document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-input");
  const belumDibaca = document.querySelector(".belum-ul");
  const selesaiDibaca = document.querySelector(".selesai-ul");

  // Load books from local storage
  let books = JSON.parse(localStorage.getItem("books")) || [];

  // Function to render books
  function renderBooks() {
    belumDibaca.innerHTML = "";
    selesaiDibaca.innerHTML = "";

    books.forEach((book) => {
      const bookElement = createBookElement(book);
      if (book.isComplete) {
        selesaiDibaca.appendChild(bookElement);
      } else {
        belumDibaca.appendChild(bookElement);
      }
    });
  }

  // Function to create a book element
  function createBookElement(book) {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.innerHTML = `
          <div id="bukuBaru">
            <p class="judulList">Buku: ${book.title}</p>
            <p>Penulis: ${book.author}</p>
            <p>Tahun Terbit : ${book.year}</p>
            <button class="switchBtn" onclick="toggleBookStatus(${book.id})">Tandai ${book.isComplete ? "Belum" : "Selesai"} Dibaca</button>
            <button class="removeBtn" onclick="deleteBook(${book.id})">Hapus</button>
          </div>  
        `;
    return bookElement;
  }

  // Function to save books to localStorage
  function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  // Function to check if input fields are empty and validate year
  function areFieldsValid(title, author, year) {
    if (title === "" || author === "" || year === "") {
      alert("Semua field harus diisi!");
      return false;
    }
    const yearInt = parseInt(year, 10);
    if (isNaN(yearInt) || yearInt < 1000 || yearInt > new Date().getFullYear()) {
      alert("Tahun harus berupa angka dan valid!");
      return false;
    }
    return true;
  }

  // Add book event for "Belum Dibaca"
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("judul").value;
    const author = document.getElementById("penulis").value;
    const year = document.getElementById("tahunTerbit").value;

    if (!areFieldsValid(title, author, year)) return;

    const newBook = {
      id: +new Date(),
      title,
      author,
      year: parseInt(year, 10),
      isComplete: false,
    };

    books.push(newBook);
    saveBooks();
    renderBooks();
    form.reset();
  });

  // Add book event for "Sudah Dibaca"
  document.querySelector(".btn-sudah").addEventListener("click", function (event) {
    event.preventDefault();
    const title = document.getElementById("judul").value;
    const author = document.getElementById("penulis").value;
    const year = document.getElementById("tahunTerbit").value;

    if (!areFieldsValid(title, author, year)) return;

    const newBook = {
      id: +new Date(),
      title,
      author,
      year: parseInt(year, 10),
      isComplete: true,
    };

    books.push(newBook);
    saveBooks();
    renderBooks();
    form.reset();
  });

  // Function to toggle book status
  window.toggleBookStatus = function (id) {
    const book = books.find((book) => book.id === id);
    book.isComplete = !book.isComplete;
    saveBooks();
    renderBooks();
  };

  // Function to delete a book
  window.deleteBook = function (id) {
    books = books.filter((book) => book.id !== id);
    saveBooks();
    renderBooks();
  };

  // Initial render
  renderBooks();
});
