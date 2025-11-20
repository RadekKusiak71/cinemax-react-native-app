
import { useRegister } from "@/api/auth";
import RegisterView from "@/app/(auth)/register";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

jest.mock('@/api/auth', () => ({
    useRegister: jest.fn(),
}));

jest.mock('expo-router', () => ({
    Link: ({ children }: any) => <>{children}</>,
    useRouter: jest.fn(),
}));

describe('RegisterView', () => {
    const mockMutate = jest.fn();
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
            replace: jest.fn(),
        });

        (useRegister as jest.Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: false,
        });

        jest.spyOn(Alert, 'alert');
    });

    it('renders the registration form correctly', () => {
        render(<RegisterView />);

        expect(screen.getByText('Sign Up')).toBeTruthy();
        expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
        expect(screen.getByText('Register')).toBeTruthy();
    });

    it('submits the form with correct data', async () => {
        render(<RegisterView />);

        fireEvent.changeText(screen.getByPlaceholderText('Enter your email'), 'test@test.com');
        fireEvent.changeText(screen.getByPlaceholderText('Enter your password'), 'password123');
        fireEvent.changeText(screen.getByPlaceholderText('Re-enter your password'), 'password123');
        fireEvent.press(screen.getByText('Register'));

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalledWith(
                {
                    email: 'test@test.com',
                    password: 'password123',
                    passwordConfirmation: 'password123',
                },
                expect.anything()
            );
        });
    });

    it('shows an alert on successful registration', async () => {
        render(<RegisterView />);
        fireEvent.press(screen.getByText('Register'));

        const mutationOptions = mockMutate.mock.calls;
        const mutationFunctions = mutationOptions[0][1]

        mutationFunctions.onSuccess();
        expect(Alert.alert).toHaveBeenCalledWith('Success', 'Registration successful! You can now log in.');
        expect(mockPush).toHaveBeenCalledWith('/(auth)/login');
    });

    it('displays validation errors when API fails', async () => {
        render(<RegisterView />);
        fireEvent.press(screen.getByText('Register'));

        const mutationOptions = mockMutate.mock.calls[0][1];

        const fakeApiError = {
            response: {
                data: {
                    email: ['Email already taken'],
                    password: ['Password too short']
                }
            }
        };

        await act(async () => {
            mutationOptions.onError(fakeApiError);
        });

        expect(screen.getByText('Email already taken')).toBeTruthy();
        expect(screen.getByText('Password too short')).toBeTruthy();

    });

    it('displays activity indicator when pending', () => {
        (useRegister as jest.Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: true,
        });

        render(<RegisterView />);

        const activityIndicator = screen.getByTestId('activity-indicator');
        expect(activityIndicator).toBeTruthy();
    });

    it('shows a generic error alert when API fails without response data', async () => {
        render(<RegisterView />);
        fireEvent.press(screen.getByText('Register'));
        const mutationOptions = mockMutate.mock.calls[0][1];

        const fakeApiError = new Error('Network Error');
        await act(async () => {
            mutationOptions.onError(fakeApiError);
        });

        expect(Alert.alert).toHaveBeenCalledWith('Error', 'Something went wrong.');
    });
});