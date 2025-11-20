import { useLogin } from "@/api/auth";
import LoginView from "@/app/(auth)/login";
import { useAuth } from "@/context/auth-context";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

jest.mock('@/api/auth', () => ({
    useLogin: jest.fn(),
}));

jest.mock('@/context/auth-context', () => ({
    useAuth: jest.fn(),
}));

jest.mock('expo-router', () => ({
    Link: ({ children }: any) => <>{children}</>,
    useRouter: jest.fn(),
}));

describe('LoginView', () => {
    const mockMutate = jest.fn();
    const mockPush = jest.fn();
    const mockReplace = jest.fn();
    const mockLogin = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
            replace: mockReplace,
        });

        (useLogin as jest.Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: false,
        });

        (useAuth as jest.Mock).mockReturnValue({
            userId: null,
            login: mockLogin,
            isAuthenticated: false,
        });

        jest.spyOn(Alert, 'alert');
    });

    it('renders the login form correctly', () => {
        render(<LoginView />);

        expect(screen.getByText('Sign In')).toBeTruthy();
        expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
        expect(screen.getByPlaceholderText('Enter your password')).toBeTruthy();
        expect(screen.getByText('Login')).toBeTruthy();
    });

    it('submits the form with correct data', async () => {
        render(<LoginView />);

        fireEvent.changeText(screen.getByPlaceholderText('Enter your email'), 'john@example.com');
        fireEvent.changeText(screen.getByPlaceholderText('Enter your password'), 'secret123');

        fireEvent.press(screen.getByText('Login'));

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalledWith(
                {
                    email: 'john@example.com',
                    password: 'secret123',
                },
                expect.anything()
            );
        });
    });

    it('shows an alert on successful login', () => {
        render(<LoginView />);
        fireEvent.press(screen.getByText('Login'));

        const mutationOptions = mockMutate.mock.calls[0][1];

        mutationOptions.onSuccess();

        expect(Alert.alert).toHaveBeenCalledWith('Success', 'You have logged in successfully!');
        expect(mockLogin).toHaveBeenCalled();
        expect(mockReplace).toHaveBeenCalledWith('/(tabs)/movies-list');
    });

    it('displays validation errors on input fields', async () => {
        render(<LoginView />);
        fireEvent.press(screen.getByText('Login'));

        const mutationOptions = mockMutate.mock.calls[0][1];

        const validationError = {
            response: {
                data: {
                    email: ['This field is required.'],
                    password: ['Password cannot be empty.']
                }
            }
        };

        await act(async () => {
            mutationOptions.onError(validationError);
        });

        expect(screen.getByText('This field is required.')).toBeTruthy();
        expect(screen.getByText('Password cannot be empty.')).toBeTruthy();
    });

    it('shows an alert for specific "detail" errors (e.g., Invalid Credentials)', async () => {
        render(<LoginView />);
        fireEvent.press(screen.getByText('Login'));

        const mutationOptions = mockMutate.mock.calls[0][1];

        const logicError = {
            response: {
                data: {
                    detail: 'No active account found with the given credentials'
                }
            }
        };

        await act(async () => {
            mutationOptions.onError(logicError);
        });

        expect(Alert.alert).toHaveBeenCalledWith('Error', 'No active account found with the given credentials');
    });

    it('shows generic error when API fails without response data', async () => {
        render(<LoginView />);
        fireEvent.press(screen.getByText('Login'));
        const mutationOptions = mockMutate.mock.calls[0][1];

        const networkError = new Error('Network Error');

        await act(async () => {
            mutationOptions.onError(networkError);
        });

        expect(Alert.alert).toHaveBeenCalledWith('Error', 'Something went wrong.');
    });

    it('shows loading state when pending', () => {
        (useLogin as jest.Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: true,
        });

        render(<LoginView />);

        const button = screen.getByTestId('activity-indicator');
        expect(button).toBeTruthy();
    });

});