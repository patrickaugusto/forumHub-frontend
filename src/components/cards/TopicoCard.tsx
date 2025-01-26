import { Box, Text, VStack, HStack, Badge, Flex, Input, Button } from "@chakra-ui/react";
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

  const handleToggleRespostas = () => {
    setShowRespostas(!showRespostas);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResposta(e.target.value);
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
    >
      <VStack align="start">
      <Flex w="100%" alignItems="center" justifyContent="space-between">
          <HStack gap={2} align="center">
            <Avatar name={topico.nomeAutor} />
            <Text fontSize={"16px"}>
              {topico.nomeAutor}
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            {topico.dataCriacao}
          </Text>
          </Flex>

          <Text fontWeight="bold" fontSize="xl" color="gray.800">
            {topico.titulo}
          </Text>
        <Box bg={"gray.200"} w={"100%"} height={"12em"} p={2} borderRadius={5}>
          <Text color="gray.600">
            {topico.mensagem}
          </Text>
        </Box>
        {isLoggedIn && (
          <Box w="100%" mt="5" mb="5">
            <Input
              placeholder="Digite sua resposta..."
              value={resposta}
              onChange={handleInputChange}
            />
            <Button mt="2" onClick={handleRespostaSubmit}>Enviar</Button>
          </Box>
        )}
        <HStack>
          <LiaCommentSolid
            size="1.5em"
            color="gray"
            onClick={handleToggleRespostas}
            cursor="pointer"
          />
          <Badge bg="transparent" color="gray">{topico.respostas?.length || 0}</Badge>
        </HStack>
        {showRespostas && (
          <VStack align="start" gap="2" mt="4" pl="4" borderLeft="2px solid gray">
            {topico.respostas?.map((resposta) => (
              <Box key={resposta.id}>
                <Text fontWeight="bold">{`${resposta.nomeUsuario}`}</Text>
                <Text>{resposta.mensagem}</Text>
                <Text fontSize="sm" color="gray.500">{resposta.dataHora}</Text>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};
