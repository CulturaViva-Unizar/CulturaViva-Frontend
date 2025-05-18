// src/components/LoginGoogleButton.tsx
import React from "react";
import Swal from "sweetalert2";
import axios, { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useLoginGoogle } from "../api/login-google";

type LoginGoogleButtonProps = {
  onSuccess: () => void;
};

const LoginGoogleButton: React.FC<LoginGoogleButtonProps> = ({ onSuccess }) => {
  const { mutate, isPending } = useLoginGoogle({
    onSuccess: () => {
      Swal.fire({
        title: "¡Bienvenido!",
        text: "Has iniciado sesión correctamente",
        icon: "success",
        timer: 1500
      }).then(() => {
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

  return (
    <button
      type="button"
      onClick={() => mutate()}
      disabled={isPending}
      className="btn btn-outline-danger d-flex align-items-center justify-content-center shadow-sm rounded-pill w-100"
    >
      <FontAwesomeIcon icon={faGoogle} className="me-2" />
      {isPending ? "Redirigiendo..." : "Iniciar sesión con Google"}
    </button>
  );
};

export default LoginGoogleButton;
