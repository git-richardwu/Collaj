import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/HomePage';
import ArtPage from './pages/ArtPage';
import Navbar from './components/Navbar';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import { useUserContext } from './hooks/useUserContext';

function App() {
  const { user } = useUserContext();

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>}/>
            <Route exact path="/art-details/:id"
              element={user ? <ArtPage /> : <Navigate to="/"/>}
            />
            <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/"/>}/>
            <Route path="/login" element={!user ? <LoginPage />: <Navigate to="/"/>}/>
            <Route path="/about" element={<AboutPage />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
