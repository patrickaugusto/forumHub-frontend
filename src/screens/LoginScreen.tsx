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
    <Center className="login-container" padding={10}>
      <Box className="login-box">
        <Heading className="login-heading">Bem-vindo ao Forum-Hub</Heading>
        <Text className="login-subtitle">Faça login para acessar o sistema</Text>
        <LoginForm />
        <Text className="register-text">Não tem uma conta? <Link to={"/register"}>Cadastre-se!</Link></Text>
      </Box>
    </Center>
  </>

  );
};

export default LoginScreen;
