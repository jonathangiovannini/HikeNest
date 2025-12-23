import type { ReactNode } from 'react';
import { createContext, useState, useContext, useEffect } from 'react';
import type {User, AuthContextType} from '../types/index.ts'


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProvideProps{
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProvideProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("utenteLoggato");
        if(savedUser){
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("utenteLoggato", JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("utenteLoggato");
    };

    return (
        <AuthContext.Provider value = {{user, login ,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
  }

  return context;
};
