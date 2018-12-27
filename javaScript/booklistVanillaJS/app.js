/**
 * Book Class: represents Book
 */
class Book {
    constructor( title, author, isbn ) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

/**
 * UI Class: Handle UI Tasks
 */
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(book => UI.addBookToList(book));
    }

    static addBookToList( book ) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook( el ) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static showAlert( message, className ) {
        // creating bootstrap alert element from scratch
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        // insert alert in proper place
        const container = document.querySelector(('.container'));
        const form = document.querySelector(('#book-form'));
        container.insertBefore(div, form);

        // disappear alert in 2s
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }
}

/**
 * Store Class: Handle Storage
 */

class Store {
    static getBooks() {
        let books;

        if (localStorage.getItem('books') === null) books = [];
        else books = JSON.parse(localStorage.getItem('books'));

        return books;
    }

    static addBook( book ) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook( isbn ) {
        const books = Store.getBooks();

        books.forEach(( book, index ) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

/**
 * Event: Display Books
 */
document.addEventListener('DOMContentLoaded', UI.displayBooks);

/**
 * Event: Add Book
 */
document.querySelector('#book-form').addEventListener('submit', e => {
    // prevent
    e.preventDefault();

    // get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // validate
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Fill in all fields', 'danger');
    }
    else {
        // Init book
        const book = new Book(title, author, isbn);

        // Add to UI
        UI.addBookToList(book);

        // show book added message
        UI.showAlert('Book added!', 'success');

        // clear fields
        UI.clearFields();
    }
});

/**
 * Event: Remove Book
 */
document
    .querySelector('#book-list')
    .addEventListener('click', e => {
        UI.deleteBook(e.target);

        // show book removed message
        UI.showAlert('Book added!', 'success');
    });





