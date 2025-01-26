import { useEffect, useState } from "react";
import UsuarioService, { UsuarioResponse } from "../service/UsuarioService";
import { Box, VStack, Text, Spinner, HStack, Button, Input } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/layout";
import { Avatar } from "../components/ui/avatar";
import Navbar from "../components/nav/NavBar";
import { FiEdit3, FiCheck, FiX } from "react-icons/fi";
import { Field } from "../components/ui/field";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const data = await UsuarioService.buscarUsuarioPorId();
      setUsuario(data);
      setEditedName(data.nome);
      setEditedEmail(data.email);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const handleSave = async (field: "name" | "email") => {
    if (!usuario) return;

    try {
      if (field === "name") {
        const updatedUser = await UsuarioService.atualizarUsuario(editedName, usuario.email);
        setUsuario(updatedUser);
      } else if (field === "email") {
        const updatedUser = await UsuarioService.atualizarUsuario(usuario.nome, editedEmail);
        setUsuario(updatedUser);
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }

    if (field === "name") setIsEditingName(false);
    if (field === "email") setIsEditingEmail(false);
  };

  const handleCancel = (field: "name" | "email") => {
    if (field === "name") {
      setEditedName(usuario?.nome || "");
      setIsEditingName(false);
    } else if (field === "email") {
      setEditedEmail(usuario?.email || "");
      setIsEditingEmail(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <VStack w="100%" px={5} py={2} h={"90vh"}>
        <Box
          className="perfil-container"
          maxW="600px"
          w="100%"
          mx="auto"
          p={8}
          bg="white"
          boxShadow="lg"
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
        >
          <VStack gap={8} align="stretch" w="100%">
            <Text fontSize="3xl" fontWeight="bold" color="gray.700" textAlign="center">
              Meu Perfil
            </Text>
            {usuario ? (
              <>
                <VStack gap={6} align="center">
                  <Box w="8em" h="8em">
                    <Avatar size="full" name={usuario.nome} />
                  </Box>

                  {/* Nome */}
                  <HStack w="100%" justify="space-between" align="center">
                    {isEditingName ? (
                      <>
                        <Field label="Nome">
                          <HStack width="100%">
                            <Input
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              size="md"
                              placeholder="Editar nome"
                            />
                            <HStack>
                              <Box
                                as="span"
                                color="green.500"
                                cursor="pointer"
                                fontSize="lg"
                                onClick={() => handleSave("name")}
                              >
                                <FiCheck />
                              </Box>
                              <Box
                                as="span"
                                color="red.500"
                                cursor="pointer"
                                fontSize="lg"
                                onClick={() => handleCancel("name")}
                              >
                                <FiX />
                              </Box>
                            </HStack>
                          </HStack>
                        </Field>

                      </>
                    ) : (
                      <>
                        <Field label="Nome">
                          <Text fontSize="lg" fontWeight="bold" color="gray.800">
                            {usuario.nome}
                          </Text>
                        </Field>
                        <Box
                          as="span"
                          color="blue.500"
                          cursor="pointer"
                          fontSize="lg"
                          onClick={() => setIsEditingName(true)}
                        >
                          <FiEdit3 />
                        </Box>
                      </>
                    )}
                  </HStack>

                  {/* E-mail */}
                  <HStack w="100%" justify="space-between" align="center">
                    {isEditingEmail ? (
                      <>
                        <Field label="E-mail">
                          <HStack w={"100%"}>
                            <Input
                              value={editedEmail}
                              onChange={(e) => setEditedEmail(e.target.value)}
                              size="md"
                              placeholder="Editar e-mail"
                            />
                            <HStack>
                              <Box
                                as="span"
                                color="green.500"
                                cursor="pointer"
                                fontSize="lg"
                                onClick={() => handleSave("email")}
                              >
                                <FiCheck />
                              </Box>
                              <Box
                                as="span"
                                color="red.500"
                                cursor="pointer"
                                fontSize="lg"
                                onClick={() => handleCancel("email")}
                              >
                                <FiX />
                              </Box>
                            </HStack>
                          </HStack>
                        </Field>

                      </>
                    ) : (
                      <>
                        <Field label="E-mail">
                          <Text fontSize="lg" fontWeight="bold" color="gray.800">
                            {usuario.email}
                          </Text>
                        </Field>
                        <Box
                          as="span"
                          color="blue.500"
                          cursor="pointer"
                          fontSize="lg"
                          onClick={() => setIsEditingEmail(true)}
                        >
                          <FiEdit3 />
                        </Box>
                      </>
                    )}
                  </HStack>
                </VStack>

                <Divider borderColor="gray.300" />
                <VStack w={"100%"}>

                <Button colorScheme="red" size="lg" w="50%" borderRadius="md" variant="outline" onClick={handleLogout}>
                  <Text color={"red.600"}>Sair da Conta</Text>
                </Button>
                </VStack>
              </>
            ) : (
              <Spinner size="xl" color="blue.500" alignSelf="center" />
            )}
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

export default Perfil;
