import { useQueryClient } from "@tanstack/react-query";

export class TokenService {
    private static ACCESS_KEY = "token";
    private static USER_KEY = "user";

    static getAccessToken(): string | null {
        return localStorage.getItem(this.ACCESS_KEY);
    }

    static setAccessToken(token: string) {
        localStorage.setItem(this.ACCESS_KEY, token);
    }

    static saveUser<T>(user: T) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    static getUser<T>(): T | null {
        const data = localStorage.getItem(this.USER_KEY);
        return data ? (JSON.parse(data) as T) : null;
    }

    static clear() {
        localStorage.removeItem(this.ACCESS_KEY);
        localStorage.removeItem(this.USER_KEY);

        const qc = useQueryClient();
        qc.removeQueries();
    }
}