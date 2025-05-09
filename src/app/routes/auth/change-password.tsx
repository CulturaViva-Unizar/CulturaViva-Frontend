import { useNavigate } from "react-router";
import { paths } from "../../../config/paths";
import ChangePasswordForm from "../../../features/auth/components/change-password-form";
import { GoBackBtn } from "../../../components/ui/go-back-btn";

const ChangePassword = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 bg-light" style={{ width: "350px" }}>
        <div className="mb-2">
          <GoBackBtn className="btn-sm btn-dark" />
        </div>
        <h2 className="text-center mb-3">Restablecer contraseña</h2>
        <ChangePasswordForm
          onSuccess={() => {
            navigate(paths.app.getHref());
          }}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
