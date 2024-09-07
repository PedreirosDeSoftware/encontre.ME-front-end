import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/index.jsx'
import Feed from './pages/Feed/index.jsx'
import JoinUs from "./pages/JoinUs/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";
import ProfilePage from './pages/ProfilePage/index.jsx';
import LandingPage from './pages/LadingPage/index.jsx';
import NotFoundPage from './pages/DefaultPages/NotFoundPage/index.jsx';

export function Router() {
    return (
      <Routes>
      <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} ErrorBoundary={<NotFoundPage/>}/>
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} ErrorBoundary={<NotFoundPage/>}/>
      <Route path="/" element={<LandingPage />} ErrorBoundary={<NotFoundPage/>}/>
      <Route path="/login" element={<Login />} ErrorBoundary={<NotFoundPage/>}/>
      <Route path="/register" element={<JoinUs />} ErrorBoundary={<NotFoundPage/>}/>

      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    )
}