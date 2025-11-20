import { useMutation } from "@tanstack/react-query";
import apiClient from "./client";

const AUTH_URLS = {
    register: '/auth/register/',
    login: '/auth/token/'
}

export type RegisterResponse = {
    id: number
    email: string
    created_at: string
    updated_at: string
}

export type LoginResponse = {
    access: string
    refresh: string
}

export type RegisterPayload = {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export type LoginPayload = {
    email: string;
    password: string;
}

const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const { data } = await apiClient.post(
        AUTH_URLS.register,
        {
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.passwordConfirmation
        }
    );
    return data;
}

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await apiClient.post(
        AUTH_URLS.login,
        payload
    );
    return data;
}

export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: loginUser
    });
};