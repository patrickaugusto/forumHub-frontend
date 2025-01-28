import { Button, HStack, Text, Flex, VStack, Show } from "@chakra-ui/react";
import {
    DialogContent,
    DialogRoot,
    DialogTrigger,
} from "../ui/dialog";
import { TopicoResponse } from "../../service/TopicoService";
import { TopicoCard } from "../cards/TopicoCard";
import { Badge } from "@chakra-ui/react";
import { DeleteMenu } from "../menu/DeleteMenu";
import UsuarioService, { UsuarioResponse } from "../../service/UsuarioService";
import { useEffect, useState } from "react";

interface TopicoDialogProps {
    topico: TopicoResponse;
}

export const TopicoDialog: React.FC<TopicoDialogProps> = ({ topico }) => {
    const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);

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
    }, []);

    return (
        <HStack wrap="wrap" gap="4">
            <DialogRoot
                placement="center"
                motionPreset="slide-in-bottom"
            >
                <DialogTrigger asChild bg={"bg.subtle"} w={"100%"} h={"6em"}>
                    <Button variant="outline">
                        <VStack alignItems={"start"} width={"100%"} gap={0}>

                        <Flex w="100%" alignItems="center" justifyContent="space-between">
                                {topico.status === "ABERTO" ? (
                                    <Badge colorPalette="orange">coisado</Badge>
                                ) : topico.status === "RESOLVIDO" ? (
                                    <Badge colorPalette="green">Resolvido</Badge>
                                ) : (
                                    <Badge colorPalette="gray">Desconhecido</Badge>
                                )}
                                <Flex gap={2} alignItems={"center"}>
                                    <Text fontSize="sm" color="gray.500">
                                        {topico.dataCriacao}
                                    </Text>
                                    <Show when={usuario?.role === "ADMIN"}>
                                        <DeleteMenu topico={topico} />
                                    </Show>
                                </Flex>
                            </Flex>
                            <Text fontSize={"2xl"}>
                                {topico.titulo}
                            </Text>
                        </VStack>
                    </Button>
                </DialogTrigger>
                <DialogContent p={2} bg={"none"} border={"none"} shadow={"none"}>
                    <TopicoCard key={topico.id} topico={topico} />
                </DialogContent>
            </DialogRoot>
        </HStack>
    );
};
