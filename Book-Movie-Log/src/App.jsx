import { useState } from 'react'
import './App.css'
import BookList from './Lists/Books.jsx';



function App() {

  return (
    <>

      <BookList></BookList>
        
    </>
  );
}

export default App;


/*
const [count, setCount] = useState(0)
<button onClick={() => setCount((count) => count + 1)}>
count is {count}
</button>
*/
