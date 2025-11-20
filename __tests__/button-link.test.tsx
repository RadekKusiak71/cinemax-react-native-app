import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import ButtonLink from '@/components/button-link'
import { useRouter } from 'expo-router';
import {theme} from "@/constants/theme";

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/constants/theme', () => ({
    theme: {
        colors: {
            primary: '#0000FF',
            background: '#FFFFFF',
            textOnPrimary: '#FFFFFF',
        },
    },
}));

describe('ButtonLink Component', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    it('renders correctly with the provided text', () => {
        render(<ButtonLink href="/home" text="Click Me" />);

        const buttonText = screen.getByText('Click Me');
        expect(buttonText).toBeTruthy();
    });

    it('navigates to the correct href when pressed', () => {
        const testHref = '/profile/settings';
        render(<ButtonLink href={testHref} text="Go to Settings" />);

        const button = screen.getByText('Go to Settings');
        fireEvent.press(button);

        expect(mockPush).toHaveBeenCalledTimes(1);
        expect(mockPush).toHaveBeenCalledWith(testHref);
    });

    it('applies primary variant styles by default', () => {
        render(<ButtonLink href="/test" text="Primary Button" />);
        const component = screen.getByText('Primary Button');

        const buttonText = component.parent;
        const touchableOpacity = buttonText.parent;

        expect(buttonText?.props.style.color).toEqual(theme.colors.textOnPrimary);
        expect(touchableOpacity?.props.style.backgroundColor).toEqual(theme.colors.primary);
    });

    it('applies secondary variant styles', () => {
        render(<ButtonLink href="/test" text="Primary Button" variant="secondary" />);
        const component = screen.getByText('Primary Button');

        const buttonText = component.parent;
        const touchableOpacity = buttonText.parent;

        expect(buttonText?.props.style.color).toEqual(theme.colors.primary);
        expect(touchableOpacity?.props.style.backgroundColor).toEqual(theme.colors.background);
        expect(touchableOpacity?.props.style.borderColor).toEqual(theme.colors.primary);
    });
});