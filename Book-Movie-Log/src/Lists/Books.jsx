import React, { useState, useEffect } from 'react';
import './Books.css';


function Books() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('');
    const [rating, setRating] = useState('');
    const [genre, setGenre] = useState(''); 


    // Retrieve books from localStorage when component mounts
    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books'));
        if (storedBooks) {
            setBooks(storedBooks);
        }
    }, []);

    // Creating a function that stores values into an array, and initializes the state of each value as default.
    const addBook = () => {
        const newBook = { title, author, genre, status, rating };
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
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={index}>
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
