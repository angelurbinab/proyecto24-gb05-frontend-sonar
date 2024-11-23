import ContenidoPage from './pages/ContenidoPage';


<Route path="/contenido/:id" element={isLoggedIn ? <ContenidoPage /> : <Navigate to="/login" />} />