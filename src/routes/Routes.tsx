import { BrowserRouter, Routes, Route } from "react-router";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";

function AppRoutes() {
    return (  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/home" element={<HomeScreen/>}/>
        </Routes>
      </BrowserRouter>
      )
  }
  
  export default AppRoutes;