import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPages";
import { RegisterPage } from "./pages/RegisterPages";
import Posts from "./components/Posts/Posts";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/mountain" element={<Home />} />
          </Route>

          <Route path="/ingresar" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
