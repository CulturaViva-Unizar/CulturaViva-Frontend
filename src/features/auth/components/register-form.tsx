import { useState } from "react";
import { useRegister } from "../../../lib/auth";
import Swal from "sweetalert2";

type RegisterFormProps = {
  onSuccess: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmPassword: "",
  });
  const registering = useRegister({ onSuccess });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      Swal.fire("¡Error!", "Las contraseñas no coinciden", "error");
      return;
    }
    registering.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="name" className="form-label">
          Nombre completo
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Teléfono
        </label>
        <input
          type="tel"
          className="form-control"
          inputMode="tel"
          pattern="[0-9+\s\-]+"
          id="phone"
          name="phone"
          value={form.phone}
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
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Repetir contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-grid text-center gap-2">
        <button
          type="submit"
          className="btn btn-dark shadow-sm rounded-pill"
          disabled={registering.isPending}
        >
          {registering.isPending ? "Cargando..." : "Registrarse"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
