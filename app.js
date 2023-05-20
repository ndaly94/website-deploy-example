const express = require('express');
const app = express();
const port = 3000;


//middleware from express that lets us Parse JSON. NEEDED IN EVERY API EVER 
app.use(express.json());
app.use(require('cors'))//lets you share resources with other servers

//make a basic array to store the books info:

let books = [];

//Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

//add new book to the array using .post, .push and .status
app.post('/books', (req, res) => {
    books.push(req.body);
    res.status(201).json(req.body);
});

//GET a specific book using .find
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({message: 'Book not found'});
    res.json(book);
});

//update a book
app.put('/books/:id', (req, res)=> {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({message: "book not found"});

    Object.assign(book, req.body);
    res.json(book);
});

//to delete a book we use .delet
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({message: "book not found"});

    books.splice(index, 1);
    res.sendStatus(204);
}); 

// always have the .listen at the end
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});