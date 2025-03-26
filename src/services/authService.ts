import { ADMIN_ROLE, Role, USER_ROLE } from "../common/constants";

export interface User {
  email: string;
  username: string;
  role: Role;
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
}

// Simulamos un retardo para las peticiones
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Login mock: si el email contiene "admin" asigna rol admin, sino usuario.
export const login = async (data: LoginData): Promise<User> => {
  await delay(1000);
  if (!data.email || !data.password) {
    return Promise.reject("Datos inválidos");
  }
  const role = data.email.includes("admin") ? ADMIN_ROLE : USER_ROLE;
  // token ficticio
  const token = "fake-jwt-token";
  return { email: data.email, username: "MockUser", role, token };
};

// Registro mock
export const register = async (data: RegisterData): Promise<User> => {
  await delay(1000);
  if (!data.email || !data.username || !data.password) {
    return Promise.reject("Datos inválidos");
  }
  const role = USER_ROLE; // Por defecto asignamos el rol de usuario
  const token = "fake-jwt-token";
  return { email: data.email, username: data.username, role, token };
};
