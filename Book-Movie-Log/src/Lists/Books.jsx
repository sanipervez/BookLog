import React, { useState, useEffect } from 'react';
import './Books.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookCover from './BookCover.jsx';

function Books() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('');
    const [rating, setRating] = useState('');
    const [genre, setGenre] = useState('');
    const [note, setNote] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [aiRecommendations, setAiRecommendations] = useState({});
    const [loadingRecs, setLoadingRecs] = useState({});

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        setBooks(storedBooks);
    }, []);

    const addBook = () => {
        if (!title || !author || !genre) {
            alert('Please enter all fields to log a book!');
            return;
        }
    
        const newBook = { 
            id: Date.now() + Math.random(), 
            title, 
            author, 
            genre, 
            status, 
            rating, 
            note
        };
        
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
        setNote('');
    };

    const deleteBook = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this book?');
    
        if (confirmed) {
            setBooks(prevBooks => {
                const updatedBooks = prevBooks.filter(book => book.id !== id);
                localStorage.setItem('books', JSON.stringify(updatedBooks));
                return updatedBooks;
            });
        }
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

    // NEW AI FEATURE: Generate book recommendations
    const generateAIRecommendations = async (bookId, bookTitle, bookGenre) => {
        setLoadingRecs(prev => ({ ...prev, [bookId]: true }));
        
        try {
            const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
            
            // Generate smart search queries based on genre
            const queries = [
                `${bookGenre} bestseller`,
                `books similar to ${bookTitle.split(' ')[0]}`
            ];
            
            const recommendations = [];
            
            for (const query of queries) {
                const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=3&key=${apiKey}`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.items) {
                    const filteredBooks = data.items
                        .filter(item => {
                            const itemTitle = item.volumeInfo.title?.toLowerCase() || '';
                            const userTitles = books.map(b => b.title.toLowerCase());
                            return !userTitles.includes(itemTitle);
                        });
                    
                    recommendations.push(...filteredBooks);
                }
            }
            
            // Format recommendations
            const uniqueRecs = recommendations
                .filter((book, index, self) => 
                    index === self.findIndex(b => b.volumeInfo.title === book.volumeInfo.title)
                )
                .slice(0, 3)
                .map(item => ({
                    title: item.volumeInfo.title || 'Unknown Title',
                    author: item.volumeInfo.authors?.[0] || 'Unknown Author',
                    thumbnail: item.volumeInfo.imageLinks?.thumbnail || ''
                }));

            setAiRecommendations(prev => ({
                ...prev,
                [bookId]: uniqueRecs
            }));
            
        } catch (error) {
            console.error('AI Recommendation Error:', error);
            setAiRecommendations(prev => ({
                ...prev,
                [bookId]: []
            }));
        }
        
        setLoadingRecs(prev => ({ ...prev, [bookId]: false }));
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
            <h1 className='title'>📚 Book Log & Notes</h1>
            
            <div className='row form-group'>
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
            
            <div className='table-container' style={{ backgroundColor: 'beige' }}>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Status</th>
                            <th>Notes</th>
                            <th>Personal Recs</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedBooks.map((book) => (
                            <React.Fragment key={book.id}>
                                <tr>
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
                                        <textarea
                                            className="form-control input" 
                                            value={book.note || ''} 
                                            onChange={(e) => updateBook(book.id, 'note', e.target.value)} 
                                            style={{
                                                border: '2px solid rgb(203, 203, 165)',
                                                color: '#6B4C35',
                                                backgroundColor: 'rgb(255, 255, 248)',
                                                fontWeight: 'bold',
                                                width: '100%',
                                                height: '100px',
                                                whiteSpace: 'pre-wrap',
                                                overflowWrap: 'break-word'
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <button 
                                            className={`ai-button ${aiRecommendations[book.id] ? 'active' : ''}`}
                                            onClick={() => {
                                                if (aiRecommendations[book.id]) {
                                                    setAiRecommendations(prev => ({ ...prev, [book.id]: null }));
                                                } else {
                                                    generateAIRecommendations(book.id, book.title, book.genre);
                                                }
                                            }}
                                            disabled={loadingRecs[book.id]}
                                        >
                                            {loadingRecs[book.id] ? 'Thinking...' : 
                                             aiRecommendations[book.id] ? 'Hide' : '📚 Lets Go!'}
                                        </button>
                                    </td>
                                    <td>
                                        <button className="button" onClick={() => deleteBook(book.id)}>Delete</button>
                                    </td>
                                </tr>
                                
                                {/* AI Recommendations Row */}
                                {aiRecommendations[book.id] && (
                                    <tr className="ai-recommendations-row">
                                        <td colSpan="9">
                                            <div className="ai-recommendations">
                                                <h4 className="ai-title">
                                                    📚 Our Recommendations
                                                </h4>
                                                <p className="ai-subtitle">
                                                    Based on "{book.title}" ({book.genre})
                                                </p>
                                                <div className="recommendations-grid">
                                                    {aiRecommendations[book.id].map((rec, index) => (
                                                        <div key={index} className="recommendation-card">
                                                            {rec.thumbnail && (
                                                                <img 
                                                                    src={rec.thumbnail} 
                                                                    alt={rec.title}
                                                                    className="rec-thumbnail"
                                                                />
                                                            )}
                                                            <div className="rec-info">
                                                                <strong className="rec-title">{rec.title}</strong>
                                                                <small className="rec-author">by {rec.author}</small>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Books;