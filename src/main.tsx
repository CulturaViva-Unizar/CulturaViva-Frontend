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
import { ADMIN_ROLE, ALL_ROLES, USER_ROLE } from './common/constants.ts';
import ChatConversation from './pages/ChatConversation.tsx';
import CulturalPlaces from './pages/CulturalPlaces.tsx';
import SuggestedCulturalPlaces from './pages/SuggestedCulturalPlaces.tsx';
import PopularCulturalPlaces from './pages/PopularCulturalPlaces.tsx';
import Analytics from './pages/Analytics.tsx';
import EventDetails from './pages/EventDetails.tsx';
import CulturalPlaceDetails from './pages/CulturalPlaceDetails.tsx';
import UserComments from './pages/UserComments.tsx';

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />

          <Route path="inicio-sesion" element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="no-autorizado" element={<Unauthorized />} />

          <Route element={<ProtectedRoute allowedRoles={[ADMIN_ROLE, USER_ROLE]} />}>
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
            <Route path="asistidos" element={<ProtectedRoute allowedRoles={[ADMIN_ROLE, USER_ROLE]}><AssistedEvents /></ProtectedRoute>} />
            <Route path="proximos" element={<ProtectedRoute allowedRoles={[ADMIN_ROLE, USER_ROLE]}><Upcomingevents /></ProtectedRoute>} />
            <Route path=":eventId" element={<ProtectedRoute allowedRoles={ALL_ROLES}><EventDetails /></ProtectedRoute>} />
          </Route>

          <Route path="lugares-culturales">
            <Route index element={<ProtectedRoute allowedRoles={[ADMIN_ROLE]}><CulturalPlaces /></ProtectedRoute>} />
            <Route path="recomendados" element={<ProtectedRoute allowedRoles={ALL_ROLES}><SuggestedCulturalPlaces /></ProtectedRoute>} />
            <Route path="populares" element={<ProtectedRoute allowedRoles={ALL_ROLES}><PopularCulturalPlaces /></ProtectedRoute>} />
            <Route path=":culturalPlaceId" element={<ProtectedRoute allowedRoles={ALL_ROLES}><CulturalPlaceDetails /></ProtectedRoute>} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={[ADMIN_ROLE]} />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:userId" element={<UserComments />} />
            <Route path="analiticas" element={<Analytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
