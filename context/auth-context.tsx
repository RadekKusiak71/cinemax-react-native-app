import { createContext, PropsWithChildren, useContext, useState } from 'react';


type AuthContextType = {
    userId: number | null,
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [userID, setUserID] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const context: AuthContextType = {
        userId: userID,
        isAuthenticated: isAuthenticated
    }

    return (
        <AuthContext.Provider value={context} >
            {children}
        </AuthContext.Provider>
    )

}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuth };

