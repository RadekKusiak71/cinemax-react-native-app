import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type AuthContextType = {
    userId: number | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

type AccessClaims = {
    user_id: number
    exp: number
    iat: number
    jti: string
    token_type: 'access' | 'refresh'
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [userID, setUserID] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const accessToken = await SecureStore.getItemAsync('accessToken');
                if (accessToken) {
                    const claims = jwtDecode<AccessClaims>(accessToken);

                    const isExpired = claims.exp * 1000 < Date.now();

                    if (!isExpired) {
                        setUserID(claims.user_id);
                        setIsAuthenticated(true);
                    } else {
                        await logout();
                    }
                }
            } catch (error) {
                console.error("Failed to load token", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadToken();
    }, []);


    const login = async (accessToken: string, refreshToken: string) => {
        try {
            const claims = jwtDecode<AccessClaims>(accessToken);
            setUserID(claims.user_id);
            setIsAuthenticated(true);

            await Promise.all([
                SecureStore.setItemAsync('accessToken', accessToken),
                SecureStore.setItemAsync('refreshToken', refreshToken)
            ]);
        } catch (error) {
            console.error("Error during login", error);
            throw error;
        }
    }

    const logout = async () => {
        setUserID(null);
        setIsAuthenticated(false);
        await Promise.all([
            SecureStore.deleteItemAsync('accessToken'),
            SecureStore.deleteItemAsync('refreshToken')
        ]);
    }


    const context: AuthContextType = {
        userId: userID,
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        login: login,
        logout: logout
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
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };

