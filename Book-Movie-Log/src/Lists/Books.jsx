import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Unique IDs for each book
import './Books.css';
import BookCover from './BookCover.jsx';

function Books() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('');
    const [rating, setRating] = useState('');
    const [genre, setGenre] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        setBooks(storedBooks);
    }, []);

    const addBook = () => {
        const newBook = { id: uuidv4(), title, author, genre, status, rating };
        setBooks(prevBooks => {
            const updatedBooks = [...prevBooks, newBook];
            localStorage.setItem('books', JSON.stringify(updatedBooks));
            return updatedBooks;
        });
        setTitle('');
        setAuthor('');
        setGenre('');
        setStatus('');
        setRating('');
    };

    const deleteBook = (id) => {
        setBooks(prevBooks => {
            const updatedBooks = prevBooks.filter(book => book.id !== id);
            localStorage.setItem('books', JSON.stringify(updatedBooks));
            return updatedBooks;
        });
    };

    const updateBook = (id, field, value) => {
        setBooks(prevBooks => {
            const updatedBooks = prevBooks.map(book =>
                book.id === id ? { ...book, [field]: value } : book
            );
            localStorage.setItem('books', JSON.stringify(updatedBooks));
            return updatedBooks;
        });
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (sortCriteria === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortCriteria === 'author') {
            return a.author.localeCompare(b.author);
        } else if (sortCriteria === 'genre') {
            return a.genre.localeCompare(b.genre);
        } else if (sortCriteria === 'status') {
            return a.status.localeCompare(b.status);
        }
        return 0;
    });
    

    return (
        <div className='container'>
            <h1 className='title'>Book Log</h1>
            <div className='form-group'>
                <input className="input" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input className="input" type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <input className="input" type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                <button className="button" onClick={addBook}>Log</button>
            </div>
            <div className='form-group'>
                <input className="input" type="text" placeholder="Search by Title or Author" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <select className="select" value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
                    <option value="">Sort by</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="genre">Genre</option>
                    <option value="status">Status</option>
                </select>
            </div>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedBooks.map((book) => (
                            <tr key={book.id}>
                                <td><BookCover title={book.title} /></td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>
                                    <select className="select" value={book.rating || ''} onChange={(e) => updateBook(book.id, 'rating', e.target.value)}>
                                        <option value="">Rating</option>
                                        <option value="★☆☆☆☆">★☆☆☆☆</option>
                                        <option value="★★☆☆☆">★★☆☆☆</option>
                                        <option value="★★★☆☆">★★★☆☆</option>
                                        <option value="★★★★☆">★★★★☆</option>
                                        <option value="★★★★★">★★★★★</option>
                                    </select>
                                </td>
                                <td>
                                    <select className="select" value={book.status || ''} onChange={(e) => updateBook(book.id, 'status', e.target.value)}>
                                        <option value="">Status</option>
                                        <option value="To Read">To Read</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                    {book.status === 'Completed' && <span className="checkmark"></span>}
                                </td>
                                <td>
                                    <button className="button" onClick={() => deleteBook(book.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Books;
