import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type LoginGithubButtonProps = {
  text?: string;
};

const LoginGithubButton: React.FC<LoginGithubButtonProps> = ({text = "Iniciar sesión con GitHub"}) => {
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
      <FontAwesomeIcon icon={faGithub} className="me-2" /> {text}
    </button>
  );
};

export default LoginGithubButton;
