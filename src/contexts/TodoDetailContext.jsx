import React, { createContext, useState, useContext } from 'react';

const TodoDetailContext = createContext({
  memoId: null, // Initial value for memoId
  setMemoId: () => {}, // Placeholder function for setting memoId
});

const TodoDetailProvider = ({ children }) => {
  const [memoId, setMemoId] = useState(null);

  return (
    <TodoDetailContext.Provider value={{ memoId, setMemoId }}>
      {children}
    </TodoDetailContext.Provider>
  );
};

export const useTodoDetailContext = () => useContext(TodoDetailContext);

export { TodoDetailContext, TodoDetailProvider };