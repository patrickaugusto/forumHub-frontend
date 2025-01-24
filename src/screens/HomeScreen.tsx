import React, { useEffect, useState } from "react";
import AdicionarTopico from "../components/modal/TopicoModal";
import TopicoService, { TopicoResponse } from "../service/TopicoService";
import { Box, VStack, Text, Spinner, HStack, Flex } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../components/ui/pagination";
import "../style/HomeScreen.css";
import Navbar from '../components/nav/NavBar';
import { TopicoCard } from "../components/cards/TopicoCard";

const pageSize = 10;

const Home = () => {
  const [topicos, setTopicos] = useState<TopicoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalTopicos, setTotalTopicos] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchTopicos = async (currentPage: number) => {
    setLoading(true);
    try {
      const data = await TopicoService.listarTopicos(
        currentPage - 1,
        pageSize,
        "dataCriacao,desc"
      );
      setTopicos(data.content);
      setTotalTopicos(data.totalElements);
    } catch (error) {
      console.error("Erro ao buscar tópicos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    fetchTopicos(page);
  }, [page]);

  return (
    <>
      <Navbar />
      <Box className="home-container" gap="4">

        {/* Main Content */}
        <Box className="main-content">
          <Box className="scrollable-box" borderRadius="xl" mb={5}>
            {loading ? (
              <Flex justifyContent="center" h="100%">
                <Spinner size="lg" color="blue.500" />
              </Flex>
            ) : (
              <VStack gap="6" align="stretch">
                {topicos.map((topico) => (
                  <TopicoCard key={topico.id} topico={topico} />
                ))}
              </VStack>
            )}
          </Box>

          {/* Paginação */}
          <PaginationRoot
            page={page}
            count={totalTopicos}
            pageSize={pageSize}
            onPageChange={(e) => setPage(e.page)}
          >
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Box>
        {/* Botão Adicionar Tópico */}
        {isLoggedIn && (
          <Box className="box-button">
            <AdicionarTopico />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
