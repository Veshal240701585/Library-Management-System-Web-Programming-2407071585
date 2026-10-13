import React, { useState } from 'react';

function BookForm({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Programming');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!title.trim() || !author.trim() || !category.trim()) {
      setErrorMessage('Please fill in all required fields.');
      setSuccessMessage('');
      return;
    }

    const newBook = {
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      status: 'Available',
    };

    onAddBook(newBook);

    // Reset Form
    setTitle('');
    setAuthor('');
    setCategory('Programming');
    setErrorMessage('');
    setSuccessMessage('Book added successfully!');

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <section id="add-book" className="book-form">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="book-title">Book Title *</label>
            <input
              id="book-title"
              type="text"
              placeholder="e.g. Introduction to Algorithms"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="book-author">Author *</label>
            <input
              id="book-author"
              type="text"
              placeholder="e.g. Thomas H. Cormen"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="book-category">Category *</label>
            <select
              id="book-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Programming">Programming</option>
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-add">
            Add Book
          </button>
          {errorMessage && (
            <span className="form-message error">{errorMessage}</span>
          )}
          {successMessage && (
            <span className="form-message success">{successMessage}</span>
          )}
        </div>
      </form>
    </section>
  );
}

export default BookForm;
