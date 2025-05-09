import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "../../../lib/auth";
import Swal from "sweetalert2";
import axios, { AxiosError } from "axios";
import { LoginUserRequest } from "../../../types/api";

type LoginFormProps = {
  onSuccess: () => void;
};

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const login = useLogin({
    onSuccess: () => {
      Swal.fire("¡Bienvenido!", "Has iniciado sesión correctamente", "success").then(() => {
        reset();
        onSuccess();
      });
    },
    onError: (err: unknown) => {
      let message = "Error desconocido";
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message: string }>;
        message = axiosErr.response?.data?.message ?? axiosErr.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      Swal.fire("¡Error al iniciar sesión!", message, "error");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    const loginData: LoginUserRequest = {
      email: data.email,
      password: data.password,
    }
    login.mutate(loginData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          {...register("email")}
          disabled={isSubmitting || login.isPending}
        />
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          {...register("password")}
          disabled={isSubmitting || login.isPending}
        />
        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
      </div>

      <div className="d-grid text-center gap-2">
        <button
          type="submit"
          className="btn btn-dark shadow-sm rounded-pill"
          disabled={isSubmitting || login.isPending}
        >
          {login.isPending ? "Cargando..." : "Iniciar sesión"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
