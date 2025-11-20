import { RegisterPayload, useRegister } from "@/api/auth";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import RedirectLink from "@/components/redirect-link";
import TitleBlock from "@/components/title-block";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type RegisterErrors = {
    email?: string | string[];
    password?: string | string[];
    password_confirmation?: string | string[];
}

type RegisterState = {
    form: RegisterPayload;
    errors: RegisterErrors;
}

const RegisterView = () => {
    const router = useRouter();
    const { mutate, isPending } = useRegister();

    const [state, setState] = useState<RegisterState>({
        form: { email: '', password: '', passwordConfirmation: '' },
        errors: {}
    });

    const handleInputChange = (field: keyof RegisterPayload, value: string) => {
        setState((prevState) => ({
            ...prevState,
            errors: { ...prevState.errors, [field]: undefined },
            form: { ...prevState.form, [field]: value },
        }));
    }

    const onSubmit = () => {
        mutate(state.form, {
            onSuccess: () => {
                Alert.alert('Success', 'Registration successful! You can now log in.');
                router.push('/(auth)/login');
            },
            onError: (error: any) => {
                if (error.response?.data) {
                    setState(prev => ({ ...prev, errors: error.response.data }));
                } else {
                    Alert.alert('Error', 'Something went wrong.');
                }
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <TitleBlock title="Sign Up" subtitle="Enter your details to create an account." />

                <FormInput
                    inputLabel="Email"
                    placeholder="Enter your email"
                    error={state.errors.email}
                    value={state.form.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                />

                <FormInput
                    inputLabel="Password"
                    placeholder="Enter your password"
                    error={state.errors.password}
                    value={state.form.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry
                />

                <FormInput
                    inputLabel="Confirm Password"
                    placeholder="Re-enter your password"
                    error={state.errors.password_confirmation}
                    value={state.form.passwordConfirmation}
                    onChangeText={(value) => handleInputChange('passwordConfirmation', value)}
                    secureTextEntry
                />

                <Button title="Register" onPress={onSubmit} isLoading={isPending} />
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
