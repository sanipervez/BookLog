import React, { useState, useEffect} from 'react';
import './Books.css';

function Books() {

    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState('');


    // Retrieve books from localStorage when component mounts
    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books'));
        if (storedBooks) {
            setBooks(storedBooks);
        }
    }, []);

    //creating a function that stores values into an array, and initializes the state of each value as default. 
    const addBook = () => {
        const newBook = { title, author, rating };
        const updatedBooks = [...books, newBook];
        setBooks(updatedBooks); 
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        setTitle('');
        setAuthor('');
        setRating('');
    };
    const deleteBook = (index) => {
        const newBooks = books.filter((_, i) => i !== index);
        setBooks(newBooks);
        localStorage.setItem('books', JSON.stringify(newBooks));
    };

    
    return (

        <div className='container'>
            <h1 className='title'>Book Log</h1>
            <input 
                className="input" 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            
            <input 
                className='input'
                type="text" 
                placeholder="Author" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} 
            />
            <select 
                className='select'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            >
                <option value="">Rating</option>
                <option value="★☆☆☆☆">★☆☆☆☆</option>
                <option value="★★☆☆☆">★★☆☆☆</option>
                <option value="★★★☆☆">★★★☆☆</option>
                <option value="★★★★☆">★★★★☆</option>
                <option value="★★★★★">★★★★★</option>
            </select>
            
            <button 
                className='button'
                onClick={addBook}>Log
            </button>

            <div>
            <ol className='data'>
                {books.map((book, index) => (
                    <li key={index}>
                        {book.title} by {book.author} Rating: {book.rating}
                        <button 
                            className='button'
                            onClick={() => deleteBook(index)}>
                                Delete
                        </button>
                    </li>
                ))}
            </ol>
            </div>
            
        </div>
    
       

    );
}

export default Books;