import React from "react";
import { Center, Box, Heading, Text } from "@chakra-ui/react";
import "../style/RegisterScreen.css";
import { Link } from "react-router";
import RegisterForm from "../components/form/RegisterForm";

const RegisterScreen: React.FC = () => {
  return (
    <Center className="register-container">
      <Box className="register-box">
        <Heading className="register-heading">Forum-Hub</Heading>
        <Text className="register-subtitle">Criar uma conta</Text>
        <RegisterForm />
        <Text className="login-text">Já possui uma conta? <Link to={"/"}>Faça login!</Link></Text>
      </Box>
    </Center>
  );
};

export default RegisterScreen;
