import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import ArtPage from './pages/ArtPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route exact path="/art-details/:id"
              element={<ArtPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
