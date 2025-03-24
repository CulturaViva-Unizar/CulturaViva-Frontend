// src/components/Register.tsx
import React, { useState } from "react";
import { register } from "../services/authService";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { faMountainCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Register = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(form);
      loginUser(user);
      navigate("/");
    } catch (error) {
      Swal.fire("Error", String(error), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 bg-light" style={{ width: "350px" }}>
        <h2 className="text-center">
          <FontAwesomeIcon icon={faMountainCity} /> CulturaViva
        </h2>
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
            <label htmlFor="username" className="form-label">
              Nombre de Usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={form.username}
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
              className="btn btn-primary shadow-sm rounded-pill"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Registrarse"}
            </button>
            <button
              type="button"
              className="btn btn-danger shadow-sm rounded-pill"
              disabled={loading}
            >
              <FontAwesomeIcon icon={faGoogle} /> Registrarse con Google
            </button>
            <Link
              to="/inicio-sesion"
              className="btn text-decoration-none text-secondary"
            >
              Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
