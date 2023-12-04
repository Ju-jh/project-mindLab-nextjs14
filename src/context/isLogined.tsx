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
  email: string;
  photo: string;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('/photo.png');

  useEffect(() => {
    axios
      .post('https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/user/cookie', {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          setAccessToken(true);
          setEmail(response.data.email)
          setPhoto(response.data.photo)
        } else {
          setAccessToken(false);
        }
      })
      .catch(() => {
        setAccessToken(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, email, photo }}>
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
