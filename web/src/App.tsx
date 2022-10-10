import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPages";
import { RegisterPage } from "./pages/RegisterPages";
import NavBar from "./components/NavBar/NavBar";
<<<<<<< HEAD
import Tours from "./components/Tours/Tours";
=======
import TourCard from "./components/TourCard/TourCard";
import Posts from "./components/Posts/Posts";
import Tours from "./components/Tours/Tours";
import Perfil from "./components/Perfil/Perfil";
import InputPerfil from "./components/Perfil/InputPerfil";
import Contraseña from "./components/Perfil/Contraseña";
>>>>>>> 83ce6775aaea0fd929396a502909ba7c761d784f

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<NavBar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
=======
          <Route path="/" element={<Posts />} />
          <Route path="/tours" element={<Tours />} />

          <Route path="/perfil" element={<Perfil />}>
            <Route path="/perfil/contraseña" element={<Contraseña />} />
>>>>>>> 83ce6775aaea0fd929396a502909ba7c761d784f
          </Route>

          <Route path="/ingresar" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
