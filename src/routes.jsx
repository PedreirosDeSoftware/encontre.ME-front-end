import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/index.jsx'
import Feed from './pages/Feed/index.jsx'
import JoinUs from "./pages/JoinUs/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";
import ProfilePage from './pages/ProfilePage/index.jsx';

export function Router() {
    return (
      <Routes>
      <Route path="/" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<JoinUs />} />
    </Routes>
    )
}