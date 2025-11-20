import Button from "@/components/button";
import FormInput from "@/components/form-input";
import RedirectLink from "@/components/redirect-link";
import TitleBlock from "@/components/title-block";
import { theme } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterView = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <TitleBlock title="Sign Up" subtitle="Enter your details to create an account." />

                <FormInput inputLabel="Email" placeholder="Enter your email" keyboardType="email-address" />
                <FormInput inputLabel="Password" placeholder="Enter your password" secureTextEntry />
                <FormInput inputLabel="Confirm Password" placeholder="Re-enter your password" secureTextEntry />
                <Button title="Register" onPress={() => { }} />
            </View>

            <RedirectLink text="Already have an account? " linkText="Sign In" href="/login" />
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

export default RegisterView;
