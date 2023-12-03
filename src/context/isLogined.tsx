import { gql, useQuery } from '@apollo/client';
import React, { createContext, useContext, ReactNode } from 'react';

interface AuthContextProps {
  accessToken: boolean;
}

const CHECK_AUTH = gql`
  query {
    checkAuth {
      isCookie
    }
  }
`;

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, loading, error } = useQuery(CHECK_AUTH);
  const accessToken = data?.checkAuth?.isCookie || false;

  return (
    <AuthContext.Provider value={{ accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
