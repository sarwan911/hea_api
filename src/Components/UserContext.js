// import React, { createContext, useState } from 'react';
// // Create the context
// export const UserContext = createContext();
// // Create the provider component
// export const UserProvider = ({ children }) => {
//  const [username, setUsername] = useState({
//    username: localStorage.getItem('Username') || '',
//    token: localStorage.getItem('token') || '',
//  });
//  return (
// <UserContext.Provider value={{ username, setUsername }}>
//      {children}
// </UserContext.Provider>
//  );
// };

import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: localStorage.getItem('userId') || '',
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || ''
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

