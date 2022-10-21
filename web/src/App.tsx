import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import NavBar from "./components/NavBar/NavBar";
import Tours from "./components/Tours/Tours";
import Profile from "./components/Perfil/Profile";
import Password from "./components/Perfil/Password";
import InputProfile from "./components/Perfil/InputProfile";
import { PreRegister } from "./components/Auth/Register/PreRegister";
import { Private } from "./components/Auth/Private/Private";
import NotFound from "./components/NotFound/NotFound";
import Tour from "./components/Tour/Tour";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Private>
                <NavBar />
              </Private>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:tourId" element={<Tour />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<InputProfile />} />
              <Route path="/profile/password" element={<Password />} />
            </Route>
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register">
            <Route index element={<PreRegister />} />
            <Route
              path="traveler"
              element={<RegisterPage userType="turista" />}
            />
            <Route
              path="agency"
              element={<RegisterPage userType="agencia" />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
