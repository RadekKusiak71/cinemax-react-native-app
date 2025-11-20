import FormInput from "@/components/form-input";
import { render, screen } from "@testing-library/react-native";


describe('FormInput Component', () => {

    it('renders correctly with the provided label', () => {
        render(
            <FormInput
                inputLabel="Username"
                placeholder="Enter your username"
                value="test"

            />
        );
        const label = screen.getByText('Username');
        const input = screen.getByTestId('form-input');
        expect(label).toBeTruthy();
        expect(input).toBeTruthy();
    });

    it('allows to pass value and placeholder props', () => {
        render(
            <FormInput
                inputLabel="Email"
                placeholder="Enter your email"
                value="test"
            />
        );
        const input = screen.getByTestId('form-input');
        expect(input.props.placeholder).toEqual('Enter your email');
        expect(input.props.value).toEqual('test');
    });

    it('displays a single error message correctly', () => {
        render(
            <FormInput
                inputLabel="Email"
                error="Invalid email address"
            />
        );
        const errorMessage = screen.getByText('Invalid email address');
        expect(errorMessage).toBeTruthy();
    });

    it('displays multiple error messages correctly', () => {
        const errors = ['Username is required', 'Password must be at least 8 characters'];
        render(
            <FormInput
                inputLabel="Login"
                error={errors}
            />
        );
        errors.forEach(error => {
            const errorMessage = screen.getByText(error);
            expect(errorMessage.props.children).toEqual(error);
        });
    });
});