import React from "react";
import {Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useRouter} from "expo-router";

const MovieListView = () => {
    const router = useRouter();
    return (
        <SafeAreaView>
            <Button title='select cinema' onPress={() => router.push("/cinema-select")} />
        </SafeAreaView>
    );
};

export default MovieListView;