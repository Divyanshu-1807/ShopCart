// app/utils/UserContext.jsx
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main Street',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302016',
    dob: new Date('1990-01-01')
  });

  const updateUserProfile = (newData) => {
    setUserData(newData);
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      updateUserProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);