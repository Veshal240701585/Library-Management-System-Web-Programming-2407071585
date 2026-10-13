import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BookForm from './components/BookForm';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import IssueReturn from './components/IssueReturn';
import Footer from './components/Footer';
import './App.css';

// Initial sample books (approximately 8 books across multiple categories)
const INITIAL_BOOKS = [
  {
    id: 'B101',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Programming',
    status: 'Available',
  },
  {
    id: 'B102',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    category: 'Programming',
    status: 'Issued',
  },
  {
    id: 'B103',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    status: 'Available',
  },
  {
    id: 'B104',
    title: '1984',
    author: 'George Orwell',
    category: 'Fiction',
    status: 'Issued',
  },
  {
    id: 'B105',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    category: 'Science',
    status: 'Available',
  },
  {
    id: 'B106',
    title: 'Cosmos',
    author: 'Carl Sagan',
    category: 'Science',
    status: 'Available',
  },
  {
    id: 'B107',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'History',
    status: 'Available',
  },
  {
    id: 'B108',
    title: 'Guns, Germs, and Steel',
    author: 'Jared Diamond',
    category: 'History',
    status: 'Available',
  },
];

const STORAGE_KEY = 'lms_books_data';

function App() {
  // Load books from LocalStorage or initialize with sample books on first launch
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem(STORAGE_KEY);
      if (savedBooks !== null) {
        return JSON.parse(savedBooks);
      }
    } catch (error) {
      console.error('Failed to parse books from localStorage:', error);
    }
    return INITIAL_BOOKS;
  });

  // State for search and category filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // State for selected book (for keyboard delete key)
  const [selectedBookId, setSelectedBookId] = useState(null);

  // State for active navigation section
  const [activeNav, setActiveNav] = useState('home');

  // Synchronize book records with LocalStorage whenever books change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch (error) {
      console.error('Failed to save books to localStorage:', error);
    }
  }, [books]);

  // Derive summary counts from books state
  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.status === 'Available').length;
  const issuedBooks = books.filter((b) => b.status === 'Issued').length;

  // Generate unique book ID
  const generateBookId = () => {
    const existingNumbers = books.map((b) => {
      const num = parseInt(b.id.replace(/\D/g, ''), 10);
      return isNaN(num) ? 0 : num;
    });
    const maxNum = existingNumbers.length > 0 ? Math.max(...existingNumbers, 100) : 100;
    return `B${maxNum + 1}`;
  };

  // Add a new book
  const handleAddBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: generateBookId(),
    };
    setBooks((prevBooks) => [newBook, ...prevBooks]);
    setSelectedBookId(newBook.id);
  };

  // Issue a book (only if available)
  const handleIssueBook = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          if (book.status === 'Issued') {
            alert(`"${book.title}" is already issued.`);
            return book;
          }
          return { ...book, status: 'Issued' };
        }
        return book;
      })
    );
  };

  // Return an issued book
  const handleReturnBook = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          if (book.status === 'Available') {
            alert(`"${book.title}" is already available.`);
            return book;
          }
          return { ...book, status: 'Available' };
        }
        return book;
      })
    );
  };

  // Delete a book
  const handleDeleteBook = (bookId) => {
    const bookToDelete = books.find((b) => b.id === bookId);
    if (!bookToDelete) return;

    // Requirement: Do not allow deletion of a currently issued book
    if (bookToDelete.status === 'Issued') {
      alert(`Cannot delete "${bookToDelete.title}" (${bookToDelete.id}) because it is currently issued. Please return it before deleting.`);
      return;
    }

    // Delete the available book directly
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    if (selectedBookId === bookId) {
      setSelectedBookId(null);
    }
  };

  // Support for keyboard "Delete" key when a book is selected
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing inside an input or select
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'SELECT' ||
          document.activeElement.tagName === 'TEXTAREA')
      ) {
        return;
      }

      if (e.key === 'Delete' && selectedBookId) {
        handleDeleteBook(selectedBookId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBookId, books]);

  // Filter books based on search query and category
  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.id.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === 'All' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <Header activeNav={activeNav} setActiveNav={setActiveNav} />

      <main className="main-content">
        {/* Dashboard with welcome message and summary cards */}
        <Dashboard
          totalBooks={totalBooks}
          availableBooks={availableBooks}
          issuedBooks={issuedBooks}
        />

        {/* Add Book Form */}
        <BookForm onAddBook={handleAddBook} />

        {/* Issue / Return Quick Desk */}
        <IssueReturn
          books={books}
          onIssueBook={handleIssueBook}
          onReturnBook={handleReturnBook}
        />

        {/* Search and Category Filter */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Table of Books */}
        <BookList
          books={filteredBooks}
          selectedBookId={selectedBookId}
          setSelectedBookId={setSelectedBookId}
          onIssueBook={handleIssueBook}
          onReturnBook={handleReturnBook}
          onDeleteBook={handleDeleteBook}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
