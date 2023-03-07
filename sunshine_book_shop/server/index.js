import express, { query } from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root1234", 
    database:"book_shop"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) =>{
    res.json("hello")
})

app.get("/books", (req, res) =>{
    const q = "SELECT * FROM books";
    db.query(q, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) =>{
    const q = "INSERT INTO books (`name`, `desc`, `price`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.desc,
        req.body.price,
    ];
    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Inserted")
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `name`= ?, `desc`= ?, `price`= ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.desc,
        req.body.price,
    ];

    db.query(q, [...values, bookId], (err, data) => {
      if (err) return res.json(err)
      return res.json("Updated")
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.json(err)
      return res.json("Deleted")
    })
})

app.listen(3001, () =>{
    console.log("Connected to server");
})