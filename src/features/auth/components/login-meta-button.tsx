import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeta } from "@fortawesome/free-brands-svg-icons";

const LoginMetaButton: React.FC = () => {
  const handleLogin = () => {
    window.location.href = import.meta.env.VITE_API_URL + `/auth/facebook?origin=${encodeURIComponent(window.location.origin)}`;
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="btn btn-outline-primary d-flex align-items-center justify-content-center shadow-sm rounded-pill w-100"
    >
      <FontAwesomeIcon icon={faMeta} className="me-2" /> Iniciar sesión con Meta
    </button>
  );
};

export default LoginMetaButton;
