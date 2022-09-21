import React, { useGlobal } from 'reactn';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [global] = useGlobal();
  const { isLogged } = global;
  return (
    <div>
      {isLogged && <NavBar />}
      <div className="containerPage">
        <Routes>
          {!isLogged && <Route path="/" element={<Login />} />}
          {!isLogged && <Route path="/login" element={<Login />} />}
          {isLogged && <Route path="/" element={<Home />} />}
          {isLogged && <Route path="/frisbee" element={<Home />} />}
          {isLogged && <Route path="/ingredients" element={<Home />} />}
          {isLogged && <Route path="/processes" element={<Home />} />}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
