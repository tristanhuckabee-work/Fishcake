import { createContext, useContext, useState, useEffect } from "react";
import { restoreSession } from "../api/session";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    restoreSession().then((data) => {
      setUser(data.user);
      setLoaded(true);
    });
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser, loaded }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}