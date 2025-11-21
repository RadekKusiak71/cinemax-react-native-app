import { useListCinemas } from "@/api/cinema";
import CinemaCard from "@/components/cinema/cinema-card";
import TitleBlock from "@/components/title-block";
import { ErrorScreen } from "@/components/ui/error-screen";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { theme } from "@/constants/theme";
import { useCinema } from "@/context/cinema-context";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    StyleSheet,
    Text
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CinemaSelectView = () => {
    const router = useRouter();
    const { cinema, selectCinema } = useCinema();

    const handleSetActiveCinema = async (id: number) => {
        await selectCinema(id);
        router.push('/movies');
    };

    const {
        data: cinemas,
        isLoading,
        isError,
        error
    } = useListCinemas({
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) return <LoadingScreen message="Loading cinemas..." />;

    if (isError) return <ErrorScreen message="Failed to load cinemas." />;

    return (
        <SafeAreaView style={styles.container}>
            <TitleBlock title='Select your cinema' subtitle='Choose a cinema to see available movies.' />

            <FlatList
                data={cinemas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CinemaCard
                        id={item.id}
                        name={item.name}
                        city={item.city}
                        isActive={cinema?.id === item.id}
                        onPress={() => handleSetActiveCinema(item.id)}
                    />
                )}
                ListEmptyComponent={<Text>No cinemas found.</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 24,
        gap: 20
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    errorText: {
        color: "red",
        fontSize: 16,
    }
});


export default CinemaSelectView;