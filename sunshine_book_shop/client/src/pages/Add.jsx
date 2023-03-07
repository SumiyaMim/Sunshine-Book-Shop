import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Add = () => {

    const navigate = useNavigate();

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
          await axios.post("http://localhost:3001/books", book);
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div className="form">
        <h2>Add New Book</h2>
        <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
        <input type="text" placeholder="Description" name="desc" onChange={handleChange}/>
        <input type="number" placeholder="Price" name="price" onChange={handleChange}/>
        <button className='last_button' onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add
