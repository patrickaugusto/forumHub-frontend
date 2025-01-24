import { BrowserRouter, Routes, Route } from "react-router";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Perfil from "../screens/PerfilScreen";

function AppRoutes() {
    return (  
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/" element={<HomeScreen />}/>
          <Route path="/perfil" element={<Perfil />}/>
        </Routes>
      </BrowserRouter>
      )
  }
  
  export default AppRoutes;