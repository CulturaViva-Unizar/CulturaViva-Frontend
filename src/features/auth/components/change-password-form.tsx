import { useState } from "react";
import Swal from "sweetalert2";

type ChangePasswordFormProps = {
  onSuccess: () => void;
};

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSuccess,
}) => {
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const changePassword = { isPending: false };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmNewPassword) {
      Swal.fire("¡Error!", "La nueva contraseña no coincide", "error");
      return;
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña actual
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="newPassword" className="form-label">
          Nueva contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="newPassword"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmNewPassword" className="form-label">
          Confirmar nueva contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmNewPassword"
          name="confirmNewPassword"
          value={form.confirmNewPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-grid text-center gap-2">
        <button
          type="submit"
          className="btn btn-dark shadow-sm rounded-pill"
          disabled={changePassword.isPending}
        >
          {changePassword.isPending ? "Cargando..." : "Restablecer"}
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
