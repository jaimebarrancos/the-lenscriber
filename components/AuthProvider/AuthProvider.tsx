import Cookies from "js-cookie";
import React from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  React.useEffect(() => {
    if (accounts) {
      Cookies.set("accounts", accounts);
    }
  }, [accounts]);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}