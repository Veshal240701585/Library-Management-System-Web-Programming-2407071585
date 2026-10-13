import React from 'react';

function Dashboard({ totalBooks, availableBooks, issuedBooks }) {
  return (
    <section id="home" className="dashboard">
      <div className="welcome-message">
        <h2>Welcome to the Library Management System</h2>
        <p>Manage books, keep track of library records, and handle book issues and returns with ease.</p>
      </div>

      <div className="summary-cards">
        <div className="summary-card total">
          <h3>Total Books</h3>
          <p className="count">{totalBooks}</p>
        </div>
        <div className="summary-card available">
          <h3>Available Books</h3>
          <p className="count">{availableBooks}</p>
        </div>
        <div className="summary-card issued">
          <h3>Issued Books</h3>
          <p className="count">{issuedBooks}</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
