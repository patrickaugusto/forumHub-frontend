import React, { useEffect, useState } from "react";
import AdicionarTopico from "../components/ui/modal";
import TopicoService, { TopicoResponse } from "../service/TopicoService";
import { Box, VStack, Text, HStack, Spinner, Center } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/layout"
import "../style/HomeScreen.css";

const Home = () => {
  const [topicos, setTopicos] = useState<TopicoResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicos = async () => {
      try {
        const data = await TopicoService.listarTopicos(0, 10, "dataCriacao,desc");
        setTopicos(data.content);
      } catch (error) {
        console.error("Erro ao buscar tópicos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicos();
  }, []);

  return (
    <HStack className="home-container" gap="4">
      {/* Sidebar */}
      <Box className="sidebar">
        <Text fontWeight="bold" fontSize="lg" mb="4" color="gray.700">
          Navegação
        </Text>
        <Text fontSize="sm" color="gray.600">
          Opções do menu podem ir aqui.
        </Text>
      </Box>

      {/* Main Content */}
      <Box className="main-content">
        <Text className="title-content">
          Tópicos Recentes
        </Text>
        <Box className="scrollable-box" borderRadius="xl">

          {loading ? (
            <Spinner size="lg" color="blue.500" />
          ) : (
            <VStack gap="6" align="stretch">
              {topicos.map((topico) => (
                <Box
                  key={topico.id}
                  padding="6"
                  bg="gray.50"
                  borderRadius="md"
                  boxShadow="base"
                  _hover={{ boxShadow: "lg", bg: "gray.100" }}
                  transition="all 0.2s"
                >
                  <Text fontWeight="bold" fontSize="xl" color="gray.800">
                    {topico.titulo}
                  </Text>
                  <Text mt="2" color="gray.600">
                    {topico.mensagem}
                  </Text>
                  <Text mt="4" fontSize="sm" color="gray.500">
                    Criado em: {topico.dataCriacao}
                  </Text>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </Box>

      {/* Botão Adicionar Tópico */}
      <Box position="absolute" top="2rem" right="2rem">
        <AdicionarTopico />
      </Box>
    </HStack>
  );
};

export default Home;
