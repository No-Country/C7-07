import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPages";
import { RegisterPage } from "./pages/RegisterPages";
import NavBar from "./components/NavBar/NavBar";
import TourCard from "./components/TourCard/TourCard";
import Posts from "./components/Posts/Posts";
import Tours from "./components/Tours/Tours";
import Perfil from "./components/Perfil/Perfil";
import InputPerfil from "./components/Perfil/InputPerfil";
import Contraseña from "./components/Perfil/Contraseña";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/tours" element={<Tours />} />

          <Route path="/perfil" element={<Perfil />}>
            <Route path="/perfil/contraseña" element={<Contraseña />} />
          </Route>

          <Route path="/ingresar" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
