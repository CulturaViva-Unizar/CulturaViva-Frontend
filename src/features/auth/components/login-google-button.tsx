import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

type LoginGoogleButtonProps = {
  text?: string;
};

const LoginGoogleButton: React.FC<LoginGoogleButtonProps> = ({text = "Iniciar sesión con Google"}) => {
  const handleLogin = () => {
    const authUrl = new URL('/auth/google', import.meta.env.VITE_API_URL);
    authUrl.searchParams.set('origin', window.location.origin);
    window.location.href = authUrl.toString();
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="btn btn-outline-danger d-flex align-items-center justify-content-center shadow-sm rounded-pill w-100"
    >
      <FontAwesomeIcon icon={faGoogle} className="me-2" /> {text}
    </button>
  );
};

export default LoginGoogleButton;
