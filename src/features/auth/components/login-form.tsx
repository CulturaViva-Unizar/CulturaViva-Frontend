import { useState } from "react";
import { useLogin } from "../../../lib/auth";

type LoginFormProps = {
  onSuccess: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const login = useLogin({ onSuccess });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={() => login.mutate(form)}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
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
      <div className="d-grid text-center gap-2">
        <button
          type="submit"
          className="btn btn-dark shadow-sm rounded-pill"
          disabled={login.isPending}
        >
          {login.isPending ? "Cargando..." : "Iniciar sesión"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
