import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  DrawerActionTrigger,
} from "../ui/drawer"
import {
  Spinner
} from "@chakra-ui/react";
import UsuarioService, { UsuarioResponse } from "../../service/UsuarioService";
import { Avatar } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

import logo from '../../assets/logo.png'


const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false)


  const fetchUser = async () => {
    try {
      const data = await UsuarioService.buscarUsuarioPorId();
      setUsuario(data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Box bg={"transparent"} px={4} w="100%">
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="1200px"
        mx="auto"
      >
        <Text fontSize={"2em"} fontWeight="bold" color={"darkblue"}>
          <Link to={"/"}>
          <img src={logo} width={"150px"}/>
          </Link>
        </Text>

        <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
          <DrawerBackdrop />
          <DrawerTrigger 
          asChild 
          border={"none"}
          _hover={{bg: "whiteAlpha.500"}}
          >
            <Button variant="outline" _hover={{ bg: "gray.200" }}>
              <FaBars size={20} color="gray" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            {isLoggedIn ? (
              <>
                <DrawerHeader mb={10}>
                  {usuario ? (
                    <>
                      <HStack gap={4} align="center">
                        <Avatar width={"4em"} height={"4em"} name={usuario.nome} />
                        <VStack align="start" gap={1}>
                          <DrawerTitle fontSize="1.5em" fontWeight="bold" color="gray.800">
                          {usuario.nome.split(" ")[0]}
                          </DrawerTitle>
                        </VStack>
                      </HStack>
                    </>
                  ) : (
                    <Spinner size="lg" color="blue.500" />
                  )}
                </DrawerHeader>
                <DrawerBody>
                  <VStack align={"start"} gap={5}>
                    <Link to={"/"}>
                    <HStack alignItems={"center"} justifyContent={"center"}>
                        <GoHome size={20}/>
                        <Text fontSize={"18px"}>Inicio</Text>
                      </HStack>
                    </Link>
                    <Link to={"/perfil"}>
                      <HStack alignItems={"center"} justifyContent={"center"}>
                        <CgProfile size={20}/>
                        <Text fontSize={"18px"}>Perfil</Text>
                      </HStack>
                    </Link>
                  </VStack>
                </DrawerBody>
                <DrawerFooter>
                  <DrawerActionTrigger asChild>
                    <Button
                      bg={"transparent"}
                      _hover={{bg: "gray.200"}}
                      onClick={handleLogout}
                      border={"none"}
                      color={"red.600"}
                    >
                      Sair
                    </Button>
                  </DrawerActionTrigger>
                </DrawerFooter>
              </>
            ) : (
              <>
                <DrawerHeader mb={10}>
                </DrawerHeader>
                <DrawerBody>
                  <VStack align={"start"} gap={5}>
                    <Text color="white" fontSize={"18px"}>
                      <Link to={"/login"}>Login</Link>
                    </Text>
                    <Text color="white" fontSize={"18px"}>
                      <Link to={"/register"}>Criar Conta</Link>
                    </Text>
                  </VStack>
                </DrawerBody>
              </>
            )}
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>
      </Flex>
    </Box>
  );
};

export default Navbar;
