const getAllBooks = (req, res) => {
  return res.status(200).json({ message: "Fetched all books" });
};

const getBookById = (req, res) => {
  return res
    .status(200)
    .json({ message: `Fetched book with ID ${req.params.id}` });
};

const createBook = (req, res) => {
  return res.status(201).json({ message: "Created new book" });
};

const updateBook = (req, res) => {
  return res
    .status(200)
    .json({ message: `Updated book with ID ${req.params.id}` });
};

const deleteBook = (req, res) => {
  return res
    .status(200)
    .json({ message: `Deleted book with ID ${req.params.id}` });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
