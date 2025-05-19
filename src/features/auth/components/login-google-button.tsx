// src/components/LoginGoogleButton.tsx
import React from "react";
import Swal from "sweetalert2";
import axios, { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

type LoginGoogleButtonProps = {
  onSuccess: () => void;
};

const LoginGoogleButton: React.FC<LoginGoogleButtonProps> = ({ onSuccess }) => {
  const handleLogin = () => {
    window.location.href = import.meta.env.VITE_API_URL + `/auth/google?origin=${encodeURIComponent(window.location.origin)}`;
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="btn btn-outline-danger d-flex align-items-center justify-content-center shadow-sm rounded-pill w-100"
    >
      <FontAwesomeIcon icon={faGoogle} className="me-2" /> Iniciar sesión con Google
    </button>
  );
};

export default LoginGoogleButton;
