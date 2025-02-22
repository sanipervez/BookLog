import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books'));
        if (storedBooks) {
            setBooks(storedBooks);
        }
    }, []);

    const addBook = () => {
        const newBook = { title, author, genre, status, rating };
        console.log('Adding book:', newBook); // Debugging line
        const updatedBooks = [...books, newBook];
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        setTitle('');
        setAuthor('');
        setGenre('');
        setStatus('');
        setRating('');
    };

    const deleteBook = (index) => {
        const newBooks = books.filter((_, i) => i !== index);
        setBooks(newBooks);
        localStorage.setItem('books', JSON.stringify(newBooks));
    };

    const updateBookStatus = (index, newStatus) => {
        const updatedBooks = books.map((book, i) =>
            i === index ? { ...book, status: newStatus } : book
        );
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
    };

    const updateBookRating = (index, newRating) => {
        const updatedBooks = books.map((book, i) =>
            i === index ? { ...book, rating: newRating } : book
        );
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('Filtered Books:', filteredBooks); // Debugging line

    return (
        <div className='container'>
            <h1 className='title'>Book Log</h1>
            <div className='form-group'>
                <input
                    className="input"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <button
                    className="button"
                    onClick={addBook}
                >
                    Log
                </button>
            </div>
            <div className='form-group'>
                <input
                    className="input"
                    type="text"
                    placeholder="Search by Title or Author"
                    value={searchQuery}
                    onChange={(e) => {
                        console.log('Search Query:', e.target.value); // Debugging line
                        setSearchQuery(e.target.value);
                    }}
                />
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
                        {filteredBooks.map((book, index) => (
                            <tr key={index}>
                                <td>
                                    <BookCover title={book.title} /> 
                                </td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>
                                    <select
                                        className="select"
                                        value={book.rating}
                                        onChange={(e) => updateBookRating(index, e.target.value)}
                                    >
                                        <option value="">Rating</option>
                                        <option value="★☆☆☆☆">★☆☆☆☆</option>
                                        <option value="★★☆☆☆">★★☆☆☆</option>
                                        <option value="★★★☆☆">★★★☆☆</option>
                                        <option value="★★★★☆">★★★★☆</option>
                                        <option value="★★★★★">★★★★★</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="select"
                                        value={book.status}
                                        onChange={(e) => updateBookStatus(index, e.target.value)}
                                    >
                                        <option value="">Status</option>
                                        <option value="To Read">To Read</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                    {book.status === 'Completed' && (
                                        <span className="checkmark"></span>
                                    )}
                                </td>
                                <td>
                                    <button className="button" onClick={() => deleteBook(index)}>Delete</button>
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

