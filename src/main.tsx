import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.tsx'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "sweetalert2/dist/sweetalert2.min.css";
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import PopularEvents from './pages/PopularEvents.tsx';
import NextEvents from './pages/NextEvents.tsx';
import AssistedEvents from './pages/AssistedEvents.tsx';
import SuggestedEvents from './pages/SuggestedEvents.tsx';
import Bookmarks from './pages/Bookmarks.tsx';
import Chats from './pages/Chats.tsx';
import ChatConversation from './pages/ChatConversation.tsx';

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />

        <Route path='guardados' element={<Bookmarks />} />
        
        <Route path="chats" element={<Chats />}>
          <Route index element={<h3 className='d-flex bg-light align-items-center justify-content-center'>Selecciona un chat</h3>} />
          <Route path=":chatId" element={<ChatConversation />} />
        </Route>

        <Route path="eventos">
          <Route path="recomendados" element={<SuggestedEvents />} />
          <Route path="populares" element={<PopularEvents />} />
          <Route path="asistidos" element={<AssistedEvents />} />
          <Route path="proximos" element={<NextEvents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
