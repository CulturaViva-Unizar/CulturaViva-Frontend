import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const LoginGithubButton: React.FC = () => {
  const handleLogin = () => {
    const authUrl = new URL('/auth/github', import.meta.env.VITE_API_URL);
    authUrl.searchParams.set('origin', window.location.origin);
    window.location.href = authUrl.toString();
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="btn btn-outline-dark d-flex align-items-center justify-content-center shadow-sm rounded-pill w-100"
    >
      <FontAwesomeIcon icon={faGithub} className="me-2" /> Iniciar sesión con GitHub
    </button>
  );
};

export default LoginGithubButton;
