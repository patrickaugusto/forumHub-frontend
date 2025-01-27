import { useEffect, useState } from "react";
import UsuarioService, { UsuarioResponse } from "../service/UsuarioService";
import { Box, VStack, Spinner, Text, Flex } from "@chakra-ui/react";
import Navbar from "../components/nav/NavBar";
import AvatarProfile from "../components/perfil/AvatarProfile";
import EditableField from "../components/perfil/EditableField";
import { TopicoDialog } from "../components/dialog/TopicoDialog";

const Perfil = () => {
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await UsuarioService.buscarUsuarioPorId();
      setUsuario(data);
      setEditedName(data.nome);
      setEditedEmail(data.email);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (field: "name" | "email", value: string) => {
    if (!usuario) return;

    try {
      if (field === "name") {
        const updatedUser = await UsuarioService.atualizarUsuario(value, usuario.email);
        setUsuario(updatedUser);
      } else if (field === "email") {
        const updatedUser = await UsuarioService.atualizarUsuario(usuario.nome, value);
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

  return (
    <>
      <Navbar />
      <VStack w="100%" px={5} py={2} h={"90vh"}>
        <Box
          w="100%"
          maxW={"1200px"}
          mx="auto"
          p={5}
          bg="white"
          boxShadow="lg"
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          display={"flex"}
          gap={10}
          alignItems="center"
          h={"30em"}
        >

          {loading ? (
            <Box w="100%" h="100vh" display="flex" justifyContent="center" alignItems="center">
            <Spinner size="xl" color="blue.500" />
          </Box>
          ) : usuario &&
            (
              <>

                <VStack gap={8} align="stretch" w="100%" maxW={"400px"} p={2} h={"100%"}>
                  <Text fontSize="3xl" fontWeight="bold" color="gray.700" textAlign="center">
                    Perfil
                  </Text>
                  <VStack gap={6} align="center">
                    <AvatarProfile name={usuario.nome} />

                    <EditableField
                      label="Nome"
                      value={editedName}
                      isEditing={isEditingName}
                      onEdit={() => setIsEditingName(true)}
                      onSave={(value) => handleSave("name", value)}
                      onCancel={() => handleCancel("name")}
                      onChange={setEditedName}
                    />

                    <EditableField
                      label="E-mail"
                      value={editedEmail}
                      isEditing={isEditingEmail}
                      onEdit={() => setIsEditingEmail(true)}
                      onSave={(value) => handleSave("email", value)}
                      onCancel={() => handleCancel("email")}
                      onChange={setEditedEmail}
                    />
                  </VStack>
                </VStack>

                <Box bg={"blackAlpha.200"} p={0.5} h={"100%"} borderRadius={100} />

                <VStack alignItems={"center"} width={"100%"} p={2} h={"100%"}>
                  <Text fontSize="3xl" fontWeight="bold" color="gray.700" textAlign="center">
                    Meus topicos
                  </Text>
                  <VStack alignItems={"start"} width={"100%"} p={4} h={"100%"}>
                    {usuario?.topicosFeito && usuario.topicosFeito.length > 0 ? (
                      <VStack gap="6" align="stretch" w={"100%"}>
                        {usuario.topicosFeito.map((topico) => (
                          <TopicoDialog key={topico.id} topico={topico} />
                        ))}
                      </VStack>
                    ) : (
                      <Flex justifyContent="center" alignItems="center">
                        <Text fontSize={"2em"}>Nenhum tópico no momento.</Text>
                      </Flex>
                    )}
                  </VStack>
                </VStack>
              </>


            )
          }
        </Box>
      </VStack>
    </>
  );
};

export default Perfil;
