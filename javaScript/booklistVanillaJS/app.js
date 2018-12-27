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
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '123123'
            }, {
                title: 'Book Two',
                author: 'John Twoooeeee',
                isbn: '14343433'
            }
        ];

        const books = StoredBooks;

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
}

/**
 * Store Class: Handle Storage
 */

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

    // Init book
    const book = new Book(title, author, isbn);

    // Add to UI
    UI.addBookToList(book);

    // clear fields
    UI.clearFields();
});

/**
 * Event: Remove Book
 */
document.querySelector('#book-list').addEventListener('click', e => UI.deleteBook(e.target));





