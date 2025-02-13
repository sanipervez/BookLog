import React, { useState } from 'react';
import './Books.css';

function Books() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState([]);

    const handleAddTtitle = (e) => {
        setTitle(e.target.value);
    };

    const handleAddAuthor = (e) => {
        setAuthor(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return(
        <div className = 'container'>
            <div className= 'header'>Book Log</div>
            <div className= 'book-info'>
                <div className= 'title'></div>
                <div className= 'author'></div>
                <div className= 'status'></div>
            </div>

        </div> 
    );
}

export default Books;