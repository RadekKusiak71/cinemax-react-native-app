import RedirectLink from '@/components/redirect-link';
import { render, screen } from '@testing-library/react-native';
import { useRouter } from "expo-router";
import React from 'react';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('RedirectLink Component', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    it('renders correctly with the provided text and linkText', () => {
        render(
            <RedirectLink
                text="Don't have an account? "
                linkText="Sign Up"
                href="/"
            />
        );

        const text = screen.getByText(/Don't have an account?/);
        const link = screen.getByText(/Sign Up/);

        expect(text).toBeTruthy();
        expect(link).toBeTruthy();
    });
});