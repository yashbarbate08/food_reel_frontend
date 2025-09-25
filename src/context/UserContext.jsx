// import React from "react";
// import { useState } from "react";
// import { createContext } from "react";

// export const userDataContext = createContext({
//   user: null,
//   setUser: () => {},
// });

// const UserContext = ({ children }) => {
//   const [user, setUser] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//   });

//   return (
//     <div>
//       <userDataContext.Provider value={{ user, setUser }}>
//         {children}
//       </userDataContext.Provider>
//     </div>
//   );
// };

// export default UserContext;

import React, { useState, createContext, useEffect } from "react";

export const userDataContext = createContext({
  user: null,
  setUser: () => {},
});

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Whenever user changes, update localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <userDataContext.Provider value={{ user, setUser }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
