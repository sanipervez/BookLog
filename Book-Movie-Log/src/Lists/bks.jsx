import { use, useState } from "react";

function bks(){

    const [book, setBook] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('');

    const addBook = () => {
        const newEntry = {title, author, status};

        setBooks([...book, newEntry]);
        setTitle('');
        setAuthor('');
        status('Read');
    };


    return(
        <div>
            <h1>Book Log</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                
            >
                <option value="Read">Read</option>
                <option value="In Progress"></option>
            </select>

            <button onClick={addBook}>Log</button>
        
        </div>
       
    );
}

export default bks;
