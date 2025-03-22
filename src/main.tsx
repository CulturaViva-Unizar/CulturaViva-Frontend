import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router';
import PopularEvents from './pages/PopularEvents.tsx';
import Upcomingevents from './pages/UpcomingEvents.tsx';
import AssistedEvents from './pages/AssistedEvents.tsx';
import SuggestedEvents from './pages/SuggestedEvents.tsx';
import Bookmarks from './pages/Bookmarks.tsx';
import Chats from './pages/Chats.tsx';
import Users from './pages/Users.tsx';
import Events from './pages/Events.tsx';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "sweetalert2/dist/sweetalert2.min.css";
import './index.css'
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import Unauthorized from './pages/Unauthorized.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { ADMIN_ROLE, ALL_ROLES } from './common/constants.ts';
import ChatConversation from './pages/ChatConversation.tsx';

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="inicio-sesion" element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="no-autorizado" element={<Unauthorized />} />

          <Route element={<ProtectedRoute allowedRoles={ALL_ROLES} />}>
            <Route path="/" element={<App />} />
            <Route path="guardados" element={<Bookmarks />} />
            <Route path="chats" element={<Chats />}>
              <Route index element={<h3 className='d-flex bg-light align-items-center justify-content-center'>Selecciona un chat</h3>} />
              <Route path=":chatId" element={<ChatConversation />} />
            </Route>
          </Route>

          <Route path="eventos">
            <Route index element={<ProtectedRoute allowedRoles={[ADMIN_ROLE]}><Events /></ProtectedRoute>} />
            <Route path="recomendados" element={<ProtectedRoute allowedRoles={ALL_ROLES}><SuggestedEvents /></ProtectedRoute>} />
            <Route path="populares" element={<ProtectedRoute allowedRoles={ALL_ROLES}><PopularEvents /></ProtectedRoute>} />
            <Route path="asistidos" element={<ProtectedRoute allowedRoles={ALL_ROLES}><AssistedEvents /></ProtectedRoute>} />
            <Route path="proximos" element={<ProtectedRoute allowedRoles={ALL_ROLES}><Upcomingevents /></ProtectedRoute>} />
          </Route>

          <Route path="users" element={<ProtectedRoute allowedRoles={[ADMIN_ROLE]}><Users /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
