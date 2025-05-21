import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegister } from "../../../lib/auth";
import Swal from "sweetalert2";
import { CreateUserRequest } from "../../../types/api";

type RegisterFormProps = {
  onSuccess: () => void;
};

const registerSchema = z
  .object({
    email: z.string().email("Email inválido"),
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    phone: z.string(),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterUserForm = z.infer<typeof registerSchema>;

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterUserForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "000000000",
      password: "",
      confirmPassword: "",
    },
  });

  const registering = useRegister({
    onSuccess: () => {
      Swal.fire({
        title: "¡Registro exitoso!",
        text: "Bienvenido",
        icon: "success",
        timer: 1500
      }).then(() => {
        reset();
        onSuccess();
      });
    },
    onError: (err) => {
      Swal.fire(
        "¡Error al registrar!",
        err.response?.data?.message || "Error desconocido",
        "error"
      );
    },
  });

  const onSubmit = (data: RegisterUserForm) => {
    const createData: CreateUserRequest = {
      email: data.email,
      name: data.name,
      phone: data.phone,
      password: data.password
    };
    registering.mutate(createData);
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
          disabled={registering.isPending}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre completo
        </label>
        <input
          type="text"
          id="name"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          {...register("name")}
          disabled={registering.isPending}
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
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
          disabled={registering.isPending}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Repetir contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          className={`form-control ${
            errors.confirmPassword ? "is-invalid" : ""
          }`}
          {...register("confirmPassword")}
          disabled={registering.isPending}
        />
        {errors.confirmPassword && (
          <div className="invalid-feedback">
            {errors.confirmPassword.message}
          </div>
        )}
      </div>

      <div className="d-grid text-center gap-2">
        <button
          type="submit"
          className="btn btn-dark shadow-sm rounded-pill"
          disabled={isSubmitting || registering.isPending}
        >
          {registering.isPending ? "Cargando..." : "Registrarse"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
