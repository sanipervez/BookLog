import React, { useState, useEffect } from 'react';

const BookCover = ({ title }) => {
    const [coverUrl, setCoverUrl] = useState('');
    
    useEffect(() => {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        const query = title;
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    const book = data.items[0];
                    if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
                        setCoverUrl(book.volumeInfo.imageLinks.thumbnail);
                    }
                }
            })
            .catch(error => console.error('Error fetching book cover:', error));
    }, [title]);

    return (
        <div>
            {coverUrl ? (
                <img src={coverUrl} alt={`${title} cover`} className="book-cover-img" />
            ) : (
                <div className="book-cover-placeholder">No cover available</div>
            )}
        </div>
    );
};

export default BookCover;