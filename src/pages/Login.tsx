import React, { useState } from 'react';
import { login } from '../services/authService';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountainCity } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form);
      loginUser(user);
      navigate('/');
    } catch (error) {
      Swal.fire('Error', String(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className='card p-4 bg-light' style={{ width: '350px' }}>
        <h2 className='text-center'><FontAwesomeIcon icon={faMountainCity}/> CulturaViva</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="d-grid text-center gap-2">
            <button type="submit" className="btn btn-primary shadow-sm rounded-pill" disabled={loading}>
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
            <button type="button" className="btn btn-danger shadow-sm rounded-pill" disabled={loading}>
              <FontAwesomeIcon icon={faGoogle} /> Iniciar sesión con Google
            </button>
            <Link to="/registro" className="btn text-decoration-none text-secondary">
              Registrarse
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
