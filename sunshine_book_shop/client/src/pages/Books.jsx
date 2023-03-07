import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get("http://localhost:3001/books")
                setBooks(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
      try{
          await axios.delete("http://localhost:3001/books/"+id)
          window.location.reload()
      }catch(err){
          console.log(err)
      }
    }

  return (
    <div>
      <h1>Sunshine Book Shop</h1><br></br><br></br>
      <div className="books">
        {books.map(book =>(
            <div className="book" key={book.id}>
                <h3>{book.name}</h3>
                <p>{book.desc}</p>
                <span>${book.price}</span>
                <div className='all_button'>
                <Link to={`/update/${book.id}`}>
                   <button className="update">Update</button>
                </Link>
                <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button><br></br>
                </div>
            </div>
          
        ))}
      </div>
      <Link to="/add">
        <button className='add_new'>Add New Book</button>
      </Link>
    </div>
  )
}

export default Books
