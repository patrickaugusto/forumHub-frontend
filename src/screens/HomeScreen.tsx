import { useEffect, useState } from "react";
import AdicionarTopico from "../components/modal/TopicoModal";
import TopicoService, { TopicoResponse } from "../service/TopicoService";
import { Box, VStack, Spinner, HStack, Flex, Text, Button } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../components/ui/pagination";
import "../style/HomeScreen.css";
import Navbar from "../components/nav/NavBar";
import { TopicoDialog } from "../components/dialog/TopicoHome";
import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu";
import { HiSortAscending } from "react-icons/hi";

const pageSize = 10;

const Home = () => {
  const [topicos, setTopicos] = useState<TopicoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalTopicos, setTotalTopicos] = useState(0);
  const [order, setOrder] = useState("desc");
  const [error, setError] = useState<string | null>(null);

  const fetchTopicos = async (currentPage: number, currentOrder: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Ordenação enviada:", `dataCriacao,${currentOrder}`);
      const data = await TopicoService.listarTopicos(
        currentPage - 1,
        pageSize,
        `dataCriacao,${currentOrder}`
      );
      setTopicos(data.content);
      setTotalTopicos(data.totalElements);
    } catch (error) {
      console.error("Erro ao buscar tópicos:", error);
      setError("Erro ao carregar tópicos. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };


  const changeOrder = (value: string) => {
    setOrder(value);
  };
  


  useEffect(() => {
    fetchTopicos(page, order);
  }, [page, order]);

  return (
    <>
      <Navbar />
      <Box className="home-container" gap="4" m={"auto"} justifyContent={"center"}>
        <Box className="main-content" maxW={"1000px"}>

          <Box className="scrollable-box" mb={5}>
            {loading ? (
              <Flex justifyContent="center" h="100%">
                <Spinner size="lg" color="blue.500" />
              </Flex>
            ) : error ? (
              <Flex justifyContent="center" alignItems="center" h="100%">
                <Text color="red.500">{error}</Text>
              </Flex>
            ) : topicos.length > 0 ? (
              <VStack gap="6" align="stretch">
                {topicos.map((topico) => (
                  <TopicoDialog key={topico.id} topico={topico} />
                ))}
              </VStack>
            ) : (
              <Flex justifyContent="center" alignItems="center">
                <Text fontSize={"2em"}>Nenhum tópico no momento.</Text>
              </Flex>
            )}
          </Box>

          <PaginationRoot
            page={page}
            count={totalTopicos}
            pageSize={pageSize}
            onPageChange={(e) => setPage(e.page)}
            mt={5}
          >
            <HStack justifyContent="center">
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Box>

        <Flex 
          gap={5}
          wrap={"wrap"}
        >

        <MenuRoot>
          <MenuTrigger asChild border={"none"}>
            <Button variant="outline" size="sm">
              <HiSortAscending /> Ordenar
            </Button>
          </MenuTrigger>
          <MenuContent minW="10rem">
            <MenuRadioItemGroup value={order}>
              <MenuRadioItem value="desc" onClick={() => changeOrder("desc")}>
                Mais Recentes
              </MenuRadioItem>
              <MenuRadioItem value="asc" onClick={() => changeOrder("asc")}>
                Mais Antigos
              </MenuRadioItem>
            </MenuRadioItemGroup>
          </MenuContent>
        </MenuRoot>

        {localStorage.getItem("token") && (
          <Box className="box-button">
            <AdicionarTopico />
          </Box>
        )}
        </Flex>
      </Box>
    </>
  );
};

export default Home;
