import { Box, Text, VStack, HStack, Badge, Flex, Textarea, Button, IconButton } from "@chakra-ui/react";
import { TopicoResponse } from "../../service/TopicoService";
import { useState, useEffect } from "react";
import { LiaCommentSolid } from "react-icons/lia";
import RespostaService from "../../service/RespostaService";
import { Avatar } from "../ui/avatar";


interface TopicoCardProps {
  topico: TopicoResponse;
}

export const TopicoCard: React.FC<TopicoCardProps> = ({ topico }) => {
  const [showRespostas, setShowRespostas] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [resposta, setResposta] = useState("");
  const [showEnviarButton, setShowEnviarButton] = useState(false);
  const [isCommentActive, setIsCommentActive] = useState(false);
  const [altura, setAltura] = useState("100%");


  const handleToggleRespostas = () => {
    setShowRespostas(!showRespostas);
    setIsCommentActive(!isCommentActive);
    setAltura("")
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResposta(e.target.value);
  };

  const handleInputFocus = () => {
    setShowEnviarButton(true);
  };

  const handleInputBlur = () => {
    if (!resposta.trim()) {
      setShowEnviarButton(false);
    }
  };

  const handleRespostaSubmit = async () => {
    const usuarioId = parseInt(localStorage.getItem("userId") ?? "0");

    const novaResposta = {
      mensagem: resposta,
      topicoId: topico.id,
      usuarioId: usuarioId,
    };

    try {
      const response = await RespostaService.adicionarResposta(novaResposta);
      setResposta("");
      topico.respostas.push(response);
      setShowRespostas(true);
      setShowEnviarButton(false);
      setAltura("")
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Box
      padding="6"
      bg="gray.50"
      borderRadius="md"
      boxShadow="lg"
      _hover={{ bg: "gray.100" }}
      transition="all 0.2s"
      maxH={altura}
      className="card"

    >
      <VStack align="start">
        <Flex w="100%" alignItems="center" gap={1}>
          <HStack gap={2} align="center">
            <Avatar name={topico.nomeAutor} />
            <Text fontSize={"16px"}>{topico.nomeAutor}</Text>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            • {topico.dataCriacao}
          </Text>
        </Flex>

        <VStack w={"100%"} alignItems={"start"} gap={5} mt={2}>
          <Text fontWeight="bold" fontSize="xl" color="gray.800">
            {topico.titulo}
          </Text>
          <Box bg={"gray.200"} w={"100%"} height={"12em"} p={2} borderRadius={5}>
            <Text color="gray.600">{topico.mensagem}</Text>
          </Box>
        </VStack>
        {isLoggedIn && (
          <VStack w="100%" mt="5" mb="5" alignItems={"end"}>
            <Textarea
              placeholder="Digite sua resposta..."
              value={resposta}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              resize="none"
              rows={3}
            />
            {showEnviarButton && (
              <Button mt="2" onClick={handleRespostaSubmit} className="button">
                Enviar
              </Button>
            )}
          </VStack>
        )}
        <HStack>
          <IconButton
            as="div"
            borderRadius="full"
            p={2}
            bg={isCommentActive ? "gray.300" : "transparent"}
            transition="background-color 0.2s"
            cursor="pointer"
            onClick={handleToggleRespostas}
          >
            <LiaCommentSolid size="1.5em" color="gray" />
          </IconButton>
          <Badge bg="transparent" color="gray">
            {topico.respostas?.length || 0}
          </Badge>
        </HStack>
        {showRespostas && (
          <VStack align="start" gap={10} mt="4" w={"full"}>
            {topico.respostas?.map((resposta) => (
              <VStack key={resposta.id} w={"full"} alignItems={"start"}>
                <HStack w="100%" alignItems={"center"} gap={1}>
                  <Avatar name={resposta.nomeUsuario} />
                  <Text fontWeight="bold" fontSize={"md"}>{`${resposta.nomeUsuario}`}</Text>
                  <Text fontSize="sm" color="gray.500">
                    • {resposta.dataHora}
                  </Text>
                </HStack>
                <Box pl={11} w={"100%"} maxW={"600px"}>
                  <Text>
                    {resposta.mensagem}
                  </Text>
                </Box>
              </VStack>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};
