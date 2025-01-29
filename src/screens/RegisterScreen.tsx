import React from "react";
import { Heading, Text, HStack, VStack, Image, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/form/RegisterForm";

import registerImg from "../assets/cartoon-man-sitting-home-with-laptop-b.png";
import logo from "../assets/logo.png";

const RegisterScreen: React.FC = () => {
  return (
    <>
      <HStack minH={"100vh"} w={"100%"} justifyContent={"space-around"} p={2}>
        <Box 
          h={"32em"} 
          flexDirection={"column"} 
          justifyContent="flex-end"
          display={{ base: "none", md: "flex" }}
        >
          <Image
            src={registerImg}
            h={350}
          />
        </Box>

        <VStack bg={"white"}  h={500} w={400} p={4} borderRadius={10} shadow={"lg"} justifyContent={"space-between"}>
          <Image
            src={logo}
            h={50}
          />
          <Heading fontSize={"2xl"}>Criar uma conta</Heading>
          <RegisterForm />
          <Text>
            Já possui uma conta? <Link to={"/login"}>Faça login!</Link>
          </Text>
        </VStack>
      </HStack>
    </>
  );
};

export default RegisterScreen;
