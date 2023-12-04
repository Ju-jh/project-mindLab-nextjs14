'use client'

import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthContextProps {
  accessToken: boolean;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/user/apikey', {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data, 'response.data')
        if (response.data) {
          console.log('response.data가 있어 && response.data.isCookie가 있어')
          setAccessToken(true);
        } else {
          console.log('response.data가 없어 && response.data.isCookie가 없어')
          setAccessToken(false);
        }
      })
      .catch(() => {
        setAccessToken(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
