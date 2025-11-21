import { useRetrieveCinema } from "@/api/cinema";
import { CinemaDetails } from "@/types/cinemas";
import * as SecureStore from 'expo-secure-store';
import React, { createContext, PropsWithChildren, useEffect, useState } from "react";

type CinemaContextType = {
    cinema: CinemaDetails | null;
    isLoading: boolean;
    selectCinema: (cinemaId: number) => Promise<void>;
}

const CinemaContext = createContext<CinemaContextType | undefined>(undefined);

const CinemaProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [cinemaId, setCinemaId] = useState<number | null>(null);
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);

    useEffect(() => {
        const loadCinemaId = async () => {
            try {
                const storedId = await SecureStore.getItemAsync('cinemaId');
                if (storedId) setCinemaId(Number(storedId));
            } catch (e) {
                console.error("Failed to load ID", e);
            } finally {
                setIsStorageLoaded(true);
            }
        };
        loadCinemaId();
    }, []);

    const { data: cinema, isLoading: isCinemaLoading } = useRetrieveCinema(cinemaId || undefined, {
        enabled: !!cinemaId && isStorageLoaded,
        staleTime: 5 * 60 * 1000,
    });

    const selectCinema = async (id: number) => {
        setCinemaId(id);
        await SecureStore.setItemAsync('cinemaId', String(id));
    };

    const contextValue = {
        cinema: cinema || null,
        isLoading: isCinemaLoading,
        selectCinema,
    }

    return (
        <CinemaContext.Provider value={contextValue}>
            {children}
        </CinemaContext.Provider>
    );
}

const useCinema = () => {
    const context = React.useContext(CinemaContext);
    if (context === undefined) {
        throw new Error("useCinema must be used within a CinemaProvider");
    }
    return context;
}

export { CinemaProvider, useCinema };

