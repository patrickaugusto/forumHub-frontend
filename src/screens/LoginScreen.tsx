import React from "react";
import { Center, Box, Heading, Text } from "@chakra-ui/react";
import LoginForm from "../components/form/LoginForm";
import "../style/LoginScreen.css";
import { Link } from "react-router-dom";
import Navbar from '../components/nav/NavBar';

const LoginScreen: React.FC = () => {
  return (
  <>
    <Navbar />
    <Center className="login-container" minH={"90vh"}>
      <Box className="login-box" >
        <Heading className="login-heading"  mb={10}>Login</Heading>
        <LoginForm />
        <Text className="register-text">Não tem uma conta? <Link to={"/register"}>Cadastre-se!</Link></Text>
      </Box>
    </Center>
  </>

  );
};

export default LoginScreen;
