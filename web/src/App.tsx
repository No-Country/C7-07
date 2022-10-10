import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPages";
import { RegisterPage } from "./pages/RegisterPages";
import NavBar from "./components/NavBar/NavBar";
import Tours from "./components/Tours/Tours";
import Perfil from "./components/Perfil/Perfil";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>

          <Route path="/ingresar" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
