import React from "react";
import { Center, Box, Heading, Text } from "@chakra-ui/react";
import LoginForm from "../components/form/LoginForm";
import "../style/LoginScreen.css";
import { Link } from "react-router";

const LoginScreen: React.FC = () => {
  return (
    <Center className="login-container">
      <Box className="login-box">
        <Heading className="login-heading">Bem-vindo</Heading>
        <Text className="login-subtitle">Faça login para acessar o sistema</Text>
        <LoginForm />
        <Text className="register-text">Não tem uma conta? <Link to={"/register"}>Cadastre-se!</Link></Text>
      </Box>
    </Center>
  );
};

export default LoginScreen;
