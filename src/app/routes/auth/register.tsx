import { faMountainCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RegisterForm from "../../../features/auth/components/register-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { paths } from "../../../config/paths";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

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
        <button
          type="button"
          className="btn btn-danger shadow-sm rounded-pill mt-2"
          disabled={false}
        >
          <FontAwesomeIcon icon={faGoogle} /> Registrarse con Google
        </button>
        <div className="d-flex align-items-center mt-3">
          <span className="text-secondary">¿Ya tienes una cuenta?</span>
          <Link
            to={paths.auth.login.getHref(redirectTo)}
            className="btn text-decoration-underline text-secondary"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
