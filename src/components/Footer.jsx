import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>Library Management System &copy; {currentYear}</p>
      <p>College Web Programming Project</p>
    </footer>
  );
}

export default Footer;
