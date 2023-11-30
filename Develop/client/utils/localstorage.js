// Function to get saved bookIds from localStorage
export const getSavedBookIds = () => {
    const savedBookIds = localStorage.getItem('saved_books')
      ? JSON.parse(localStorage.getItem('saved_books'))
      : [];
  
    return savedBookIds;
  };
  
  // Function to save bookIds to localStorage
  export const saveBookIds = (bookIds) => {
    if (bookIds.length) {
      localStorage.setItem('saved_books', JSON.stringify(bookIds));
    } else {
      localStorage.removeItem('saved_books');
    }
  };
  
  // Function to remove a bookId from localStorage
  export const removeBookId = (bookId) => {
    const savedBookIds = localStorage.getItem('saved_books')
      ? JSON.parse(localStorage.getItem('saved_books'))
      : null;
  
    if (!savedBookIds) {
      return false;
    }
  
    const updatedSavedBookIds = savedBookIds.filter((savedId) => savedId !== bookId);
    localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));
  
    return true;
  };
  