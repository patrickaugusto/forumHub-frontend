import { useEffect, useState } from "react";
import UsuarioService, { UsuarioResponse } from "../service/UsuarioService";
import { VStack, Text, Flex, Container, Stack } from "@chakra-ui/react";
import Navbar from "../components/nav/NavBar";
import AvatarProfile from "../components/perfil/AvatarProfile";
import EditableField from "../components/perfil/EditableField";
import { TopicoPerfil } from "../components/dialog/TopicoPerfil";
import { Field } from "../components/ui/field";
import { SkeletonCircle, SkeletonText, Skeleton } from "../components/ui/skeleton";

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
      <Container w="100%" px={5} py={2} minH={"90vh"} mt={20}>
        <Flex
          w="100%"
          maxW={"1200px"}
          m="auto"
          p={5}
          bg="white"
          boxShadow="lg"
          borderRadius="lg"
          wrap={"wrap"}
          gap={10}
          justifyContent={"center"}
          h={"100%"}
        >
          {loading ? (

            <>
              <VStack gap={8} align="stretch" w="100%" maxW={"400px"} p={2}>
                <Text fontSize="3xl" fontWeight="bold" color="gray.700" textAlign="center">
                  Perfil
                </Text>
                <VStack gap={6} align="center">
                  <SkeletonCircle size="40" />
                  <Stack gap="6" w="100%">
                    <VStack width="full">
                      <SkeletonText noOfLines={1} w={20} />
                      <SkeletonText noOfLines={1} w={"100%"} />
                    </VStack>
                  </Stack>

                  <Stack gap="6" w="100%">
                    <VStack width="full">
                      <SkeletonText noOfLines={1} w={20} />
                      <SkeletonText noOfLines={1} w={"100%"} />
                    </VStack>
                  </Stack>
                </VStack>
              </VStack>

              <VStack alignItems={"center"} w={"40em"} p={2} h={"100%"}>
                <Text fontSize="3xl" fontWeight="bold" color="gray.700" textAlign="center">
                  Meus topicos
                </Text>
                <VStack alignItems={"start"} width={"100%"} p={4} h={"100%"}>
                  <Skeleton w={"full"} height="100px" />
                </VStack>
              </VStack>
            </>
          ) : usuario &&
          (
            <>
              <VStack gap={8} align="stretch" w="100%" maxW={"400px"} p={2}>
                <Text fontSize="3xl" fontWeight="bold" color="gray.700" textAlign="center">
                  Perfil
                </Text>
                <VStack gap={6} align="center">
                  <AvatarProfile name={usuario.nome} />

                  <Field label="Nome">
                    <EditableField
                      label="Nome"
                      value={editedName}
                      isEditing={isEditingName}
                      onEdit={() => setIsEditingName(true)}
                      onSave={(value) => handleSave("name", value)}
                      onCancel={() => handleCancel("name")}
                      onChange={setEditedName}
                    />
                  </Field>

                  <Field label="E-mail">
                    <EditableField
                      label="E-mail"
                      value={editedEmail}
                      isEditing={isEditingEmail}
                      onEdit={() => setIsEditingEmail(true)}
                      onSave={(value) => handleSave("email", value)}
                      onCancel={() => handleCancel("email")}
                      onChange={setEditedEmail}
                    />
                  </Field>
                </VStack>
              </VStack>

              <VStack alignItems={"center"} w={"40em"} p={2} h={"100%"}>
                <Text fontSize="3xl" fontWeight="bold" color="gray.700" textAlign="center">
                  Meus topicos
                </Text>
                <VStack alignItems={"start"} width={"100%"} p={4} h={"100%"}>
                  {usuario?.topicosFeito && usuario.topicosFeito.length > 0 ? (
                    <VStack gap="6" align="stretch" w={"100%"}>
                      {usuario.topicosFeito.map((topico) => (
                        <TopicoPerfil key={topico.id} topico={topico} />
                      ))}
                    </VStack>
                  ) : (
                    <Text fontSize={"1.5em"} textAlign={"center"} width={"100%"}>Nenhum tópico no momento.</Text>
                  )}
                </VStack>
              </VStack>
            </>
          )
          }
        </Flex>
      </Container>
    </>
  );
};

export default Perfil;
