// File: books.ts
// Student Name : Hok Hei Wong
// StudentID : 301193519
// Date: June 20, 2022

// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.render('books/index', {title: 'Books',page: 'books', books: books});
  });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {  
      res.render('books/details', {title: 'Add a New Book',page: 'details',books:''});
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = new book
  ({
    "Title" : req.body.Title,
    "Author" : req.body.Author,
    "Description" : req.body.Description,
    "Genre": req.body.Genre,
    "Price" : req.body.Price
  });
  // Create book by newBook Object
  book.create(newBook, (err: Error) =>
  {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.redirect('/books');
  });
});



// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req: express.Request, res : express.Response, next: express.NextFunction) => {
  book.findById(
    req.params.id, (err: Error, books: Document) =>
    {
      if(err)
      {
          console.error(err);
          res.end(err);
      }
      res.render('books/details', { title: "Edit Record" , page: 'edit', books: books });
    }   
)
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  let newBook = new book({
    "_id": id,
    "Title" : req.body.Title,
    "Author" : req.body.Author,
    "Description" : req.body.Description,
    "Genre": req.body.Genre,
    "Price" : req.body.Price
  });
  // Find book with ID and update by newBook Object
    book.findByIdAndUpdate({_id: id}, newBook, {new: true}, (err: Error) => {
      if (err) {
        console.error(err);
        res.end(err);
      }
      res.redirect('/books');
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  book.remove({_id:id}, (err: Error) => {
    if (err) 
    {
        console.error(err);
        res.end(err);
    } 
  });
  res.redirect('/books');
});


//module.exports = router;
