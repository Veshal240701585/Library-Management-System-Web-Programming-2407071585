import React from 'react';

function IssueReturn({ books, onIssueBook, onReturnBook }) {
  const issuedBooks = books.filter((b) => b.status === 'Issued');
  const availableBooks = books.filter((b) => b.status === 'Available');

  return (
    <section id="issue-return" className="book-form">
      <h2>Issue / Return Quick Desk</h2>
      <p style={{ color: '#555555', marginBottom: '15px', fontSize: '0.9rem' }}>
        Quickly review currently borrowed books or issue available copies.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Issued Books (Pending Return) */}
        <div style={{ background: '#ffffff', padding: '15px', borderRadius: '4px', border: '1px solid #e0e4e8' }}>
          <h3 style={{ color: '#c62828', fontSize: '1rem', marginBottom: '10px' }}>
            Currently Issued Books ({issuedBooks.length})
          </h3>
          {issuedBooks.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: '#888888' }}>No books currently issued.</p>
          ) : (
            <ul style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {issuedBooks.map((book) => (
                <li
                  key={book.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid #f0f0f0',
                    fontSize: '0.85rem',
                  }}
                >
                  <div>
                    <strong>[{book.id}]</strong> {book.title}
                  </div>
                  <button
                    type="button"
                    className="btn-return"
                    onClick={() => onReturnBook(book.id)}
                  >
                    Return
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Available Books (Ready to Issue) */}
        <div style={{ background: '#ffffff', padding: '15px', borderRadius: '4px', border: '1px solid #e0e4e8' }}>
          <h3 style={{ color: '#2e7d32', fontSize: '1rem', marginBottom: '10px' }}>
            Available for Issue ({availableBooks.length})
          </h3>
          {availableBooks.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: '#888888' }}>All books are currently issued.</p>
          ) : (
            <ul style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {availableBooks.slice(0, 5).map((book) => (
                <li
                  key={book.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid #f0f0f0',
                    fontSize: '0.85rem',
                  }}
                >
                  <div>
                    <strong>[{book.id}]</strong> {book.title}
                  </div>
                  <button
                    type="button"
                    className="btn-issue"
                    onClick={() => onIssueBook(book.id)}
                  >
                    Issue
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default IssueReturn;
