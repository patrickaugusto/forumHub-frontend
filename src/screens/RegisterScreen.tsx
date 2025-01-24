import React from "react";
import { Center, Box, Heading, Text } from "@chakra-ui/react";
import "../style/RegisterScreen.css";
import { Link } from "react-router-dom";
import RegisterForm from "../components/form/RegisterForm";
import Navbar from '../components/nav/NavBar';


const RegisterScreen: React.FC = () => {
  return (
    <>
      <Navbar />
      <Center className="register-container" padding={5}>
        <Box className="register-box">
          <Heading className="register-heading">Forum-Hub</Heading>
          <Text className="register-subtitle">Criar uma conta</Text>
          <RegisterForm />
          <Text className="login-text">Já possui uma conta? <Link to={"/login"}>Faça login!</Link></Text>
        </Box>
      </Center>
    </>

  );
};

export default RegisterScreen;
