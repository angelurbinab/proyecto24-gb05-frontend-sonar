import PerfilPage from './pages/PerfilPage';



<Route path="/perfil" element={isLoggedIn ? <PerfilPage /> : <Navigate to="/login" />} />