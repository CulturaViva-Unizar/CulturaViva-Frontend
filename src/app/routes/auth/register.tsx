import { faMountainCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RegisterForm from "../../../features/auth/components/register-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { paths } from "../../../config/paths";
import { useUser } from "../../../lib/auth";
import { useEffect } from "react";
import LoginGithubButton from "../../../features/auth/components/login-github-button";
import LoginGoogleButton from "../../../features/auth/components/login-google-button";

const Register = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  useEffect(() => {
    if (user?.data) {
      navigate(redirectTo || paths.app.getHref(), { replace: true });
    }
  }, [user, navigate, redirectTo]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 bg-light" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">
          <FontAwesomeIcon icon={faMountainCity} /> CulturaViva
        </h2>
        <RegisterForm
          onSuccess={() => {
            navigate(paths.app.getHref());
          }}
        />
        <div className="mt-3">
          <LoginGoogleButton text="Registrarse con Google" />
        </div>
        <div className="mt-3">
          <LoginGithubButton text="Registrarse con GitHub" />
        </div>
        <div className="d-flex align-items-center mt-3">
          <span className="text-secondary">¿Ya tienes una cuenta?</span>
          <Link
            to={paths.auth.login.getHref(redirectTo)}
            className="btn text-decoration-underline text-secondary"
          >
            Iniciar sesión
          </Link>
        </div>
        <div className="mt-4 d-flex flex-column gap-2">
          <Link
            to={paths.app.getHref()}
            replace
            className="btn btn-outline-secondary rounded-pill"
          >
            Continuar sin cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
