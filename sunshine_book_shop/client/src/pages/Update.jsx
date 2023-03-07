import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Update = () => {
  const navigate = useNavigate();

  const location =useLocation();
  
  const bookId = location.pathname.split("/")[2];

    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
      });

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    console.log(book)

    const handleClick = async (e) => {
        e.preventDefault();
        try {
          await axios.put("http://localhost:3001/books/"+bookId, book);
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div className="form">
        <h2>Update Book</h2>
        <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
        <input type="text" placeholder="Description" name="desc" onChange={handleChange}/>
        <input type="number" placeholder="Price" name="price" onChange={handleChange}/>
        <button className='last_button' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update
