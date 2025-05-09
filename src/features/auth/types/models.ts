import { Role } from "../../../config/constants";

export type User = {
  nombre: string; 
  apellidos: string; 
  telefono: string; 
  nip: string; 
  email: string;
  rol: Role;
};