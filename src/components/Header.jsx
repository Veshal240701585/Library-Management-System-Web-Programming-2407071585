import React from 'react';

function Header({ activeNav, setActiveNav }) {
  const handleNavClick = (navId) => {
    setActiveNav(navId);
    const element = document.getElementById(navId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <h1>Library Management System</h1>
        <nav className="nav-links">
          <button
            type="button"
            className={activeNav === 'home' ? 'active' : ''}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={activeNav === 'books' ? 'active' : ''}
            onClick={() => handleNavClick('books')}
          >
            Books
          </button>
          <button
            type="button"
            className={activeNav === 'add-book' ? 'active' : ''}
            onClick={() => handleNavClick('add-book')}
          >
            Add Book
          </button>
          <button
            type="button"
            className={activeNav === 'issue-return' ? 'active' : ''}
            onClick={() => handleNavClick('issue-return')}
          >
            Issue / Return
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
