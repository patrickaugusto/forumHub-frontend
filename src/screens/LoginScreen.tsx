import React from "react";
import { Box, Heading, Text, Image, VStack, HStack } from "@chakra-ui/react";
import LoginForm from "../components/form/LoginForm";
import { Link } from "react-router-dom";


import loginImg from "../assets/girl-using-smartphone.png";
import logo from "../assets/logo.png";

const LoginScreen: React.FC = () => {
  return (
  <>
    <HStack minH={"100vh"} w={"100%"} justifyContent={"space-around"} p={2} flexDirection={"row-reverse"}>
    <Box 
          h={"25em"} 
          flexDirection={"column"} 
          justifyContent="flex-end"
          display={{ base: "none", md: "flex" }}
        >
          <Image
            src={loginImg}
            h={350}
            transform="scaleX(-1)" 
          />
        </Box>
        <VStack bg={"white"} h={500} w={400} p={4} borderRadius={10} shadow={"lg"} justifyContent={"space-between"}>
          <Image
            src={logo}
            h={50}
          />
          <Heading fontSize={"2xl"}>Login</Heading>
          <LoginForm />
          <Text>Não tem uma conta? <Link to={"/register"}>Cadastre-se!</Link></Text>
        </VStack>
    </HStack>
  </>

  );
};

export default LoginScreen;
