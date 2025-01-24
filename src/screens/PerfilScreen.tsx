import { useEffect, useState } from "react";
import UsuarioService, { UsuarioResponse } from "../service/UsuarioService";
import { Box, VStack, Text, Spinner, HStack, Button, Input } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/layout";
import { Avatar } from "../components/ui/avatar";
import Navbar from "../components/nav/NavBar";
import { FiEdit3 } from "react-icons/fi";
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
        console.log(updatedUser)
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

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <VStack w="100%" px={5} py={2}>
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
                {/* Avatar e Informações do Usuário */}
                <VStack gap={6} align="center">
                  <Box w="8em" h="8em">
                    <Avatar size="full" name={usuario.nome} />
                  </Box>

                  {/* Nome */}
                  <HStack w="100%" justify="space-between" align="center">
                    {isEditingName ? (
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        size="md"
                        placeholder="Editar nome"
                      />
                    ) : (
                      <>
                      <Field label="Nome">
                        <Text fontSize="lg" fontWeight="bold" color="gray.800">
                          {usuario.nome}
                        </Text>
                      </Field>
                      </>
                    )}
                    <Box
                      as="span"
                      color="blue.500"
                      cursor="pointer"
                      fontSize="lg"
                      onClick={() => {
                        if (isEditingName) handleSave("name");
                        setIsEditingName(!isEditingName);
                      }}
                    >
                      <FiEdit3 />
                    </Box>
                  </HStack>

                  {/* E-mail */}
                  <HStack w="100%" justify="space-between" align="center">
                    {isEditingEmail ? (
                      <Input
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        size="md"
                        placeholder="Editar e-mail"
                      />
                    ) : (
                      <Field label="Nome">
                        <Text fontSize="lg" fontWeight="bold" color="gray.800">
                          {usuario.email}
                        </Text>
                      </Field>
                    )}
                    <Box
                      as="span"
                      color="blue.500"
                      cursor="pointer"
                      fontSize="lg"
                      onClick={() => {
                        if (isEditingEmail) handleSave("email");
                        setIsEditingEmail(!isEditingEmail);
                      }}
                    >
                      <FiEdit3 />
                    </Box>
                  </HStack>
                </VStack>

                {/* Divider */}
                <Divider borderColor="gray.300" />

                {/* Botão de Sair */}
                <Button colorScheme="red" size="lg" w="100%" borderRadius="md" variant="outline" onClick={handleLogout}>
                  Sair da Conta
                </Button>
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
