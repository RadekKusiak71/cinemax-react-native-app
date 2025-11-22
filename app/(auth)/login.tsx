import { LoginPayload, useLogin } from "@/api/auth";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import RedirectLink from "@/components/redirect-link";
import TitleBlock from "@/components/title-block";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LoginErrors = {
    email?: string | string[];
    password?: string | string[];
    details?: string;
}

type LoginState = {
    form: LoginPayload;
    errors: LoginErrors;
}

const LoginView = () => {
    const router = useRouter();
    const { mutate, isPending } = useLogin();
    const { login } = useAuth();

    const [state, setState] = useState<LoginState>({
        form: { email: '', password: '' },
        errors: {}
    });

    const handleInputChange = (field: keyof LoginPayload, value: string) => {
        setState((prevState) => ({
            ...prevState,
            errors: { ...prevState.errors, [field]: undefined },
            form: { ...prevState.form, [field]: value },
        }));
    }

    const onSubmit = () => {
        mutate(state.form, {
            onSuccess: (data) => {
                Alert.alert('Success', 'You have logged in successfully!');
                login(data.access, data.refresh);
                router.replace('/(tabs)/movies');
            },
            onError: (error: any) => {
                if (error.response?.data) {
                    if (error.response.data.detail) {
                        Alert.alert('Error', error.response.data.detail);
                    }
                    setState(prev => ({ ...prev, errors: error.response.data }));
                } else {
                    Alert.alert('Error', 'Something went wrong.');
                }
            }
        });
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <TitleBlock title="Sign In" subtitle="Welcome back! Glad to see you again." />

                <FormInput
                    inputLabel="Email"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    onChangeText={(text) => handleInputChange('email', text)}
                    error={state.errors.email}
                    value={state.form.email}
                />

                <FormInput
                    inputLabel="Password"
                    placeholder="Enter your password"
                    secureTextEntry
                    onChangeText={(text) => handleInputChange('password', text)}
                    error={state.errors.password}
                    value={state.form.password}
                />

                <Button title="Login" onPress={onSubmit} isLoading={isPending} />
            </View>

            <RedirectLink text="Don't have an account? " linkText="Sign In" href="/register" />
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
