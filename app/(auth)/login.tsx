import Button from "@/components/button";
import FormInput from "@/components/form-input";
import RedirectLink from "@/components/redirect-link";
import TitleBlock from "@/components/title-block";
import { theme } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginView = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <TitleBlock title="Sign In" subtitle="Welcome back! Glad to see you again." />

                <FormInput inputLabel="Email" placeholder="Enter your email" keyboardType="email-address" />
                <FormInput inputLabel="Password" placeholder="Enter your password" secureTextEntry />
                <Button title="Login" onPress={() => { }} />
            </View>

            <RedirectLink text="Don't have an account? " linkText="Sign Up" href="/register" />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingHorizontal: 24,
        gap: 20,
        backgroundColor: theme.colors.background,
    },
    formContainer: {
        paddingTop: 10,
        width: '100%',
        gap: 17,
    }
});

export default LoginView;
