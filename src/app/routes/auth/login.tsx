import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainCity } from "@fortawesome/free-solid-svg-icons";
import LoginForm from "../../../features/auth/components/login-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { paths } from "../../../config/paths";
import { useEffect } from "react";
import { useUser } from "../../../lib/auth";
import LoginGoogleButton from "../../../features/auth/components/login-google-button";
import LoginMetaButton from "../../../features/auth/components/login-meta-button";

const Login = () => {
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
        <LoginForm
          onSuccess={() => {
            navigate(paths.app.getHref());
          }}
        />
        <div className="mt-3">
          <LoginGoogleButton />
        </div>
        <div className="mt-3">
          <LoginMetaButton />
        </div>
        <div className="d-flex align-items-center mt-2">
          <span className="text-secondary">¿Aún no tienes una cuenta?</span>
          <Link
            to={paths.auth.register.getHref(redirectTo)}
            className="btn text-decoration-underline text-secondary"
          >
            Registrarse
          </Link>
        </div>
        <div className="mt-4 d-flex flex-column gap-2">
          <Link
            to={paths.app.getHref()}
            replace
            className="btn btn-outline-secondary rounded-pill"
          >
            Continuar sin iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
