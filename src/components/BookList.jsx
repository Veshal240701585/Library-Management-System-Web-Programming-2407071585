import React from 'react';

function BookList({
  books,
  selectedBookId,
  setSelectedBookId,
  onIssueBook,
  onReturnBook,
  onDeleteBook,
}) {
  return (
    <section id="books" className="book-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2>Books in Library</h2>
        <span style={{ fontSize: '0.85rem', color: '#666666' }}>
          Tip: Click a row to select it; press the Delete button or keyboard Delete key to remove.
        </span>
      </div>

      <div className="table-wrapper">
        <table className="book-table">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-message">
                  No books found in the library.
                </td>
              </tr>
            ) : (
              books.map((book) => {
                const isAvailable = book.status === 'Available';
                const isSelected = selectedBookId === book.id;

                return (
                  <tr
                    key={book.id}
                    onClick={() => setSelectedBookId && setSelectedBookId(book.id)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#e3f2fd' : undefined,
                    }}
                    title="Click row to select"
                  >
                    <td><strong>{book.id}</strong></td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>
                      <span className={isAvailable ? 'status-available' : 'status-issued'}>
                        {book.status}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      {isAvailable ? (
                        <button
                          type="button"
                          className="btn-issue"
                          onClick={() => onIssueBook(book.id)}
                          title="Issue this book"
                        >
                          Issue
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-return"
                          onClick={() => onReturnBook(book.id)}
                          title="Return this book"
                        >
                          Return
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => onDeleteBook(book.id)}
                        style={{
                          opacity: isAvailable ? 1 : 0.6,
                          cursor: 'pointer',
                        }}
                        title={
                          isAvailable
                            ? 'Delete this book'
                            : 'Click to see why this book cannot be deleted'
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default BookList;
