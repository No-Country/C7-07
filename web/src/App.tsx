import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPages";
import { RegisterPage } from "./pages/RegisterPages";
import NavBar from "./components/NavBar/NavBar";
import Tours from "./components/Tours/Tours";
import Profile from "./components/Perfil/Profile";
import Password from "./components/Perfil/Password";
import InputProfile from "./components/Perfil/InputProfile";
import Tour from "./components/Tour/Tour";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/tours" element={<Tours />}/>
            <Route path="/tours/:tourId" element={<Tour/>} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<InputProfile />} />
              <Route path="/profile/password" element={<Password />} />
            </Route>
          </Route>
          <Route path="/ingresar" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
