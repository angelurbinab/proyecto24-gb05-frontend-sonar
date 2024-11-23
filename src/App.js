import HomePage from './pages/HomePage';

<Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />