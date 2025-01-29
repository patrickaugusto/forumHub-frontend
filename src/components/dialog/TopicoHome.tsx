import { Button, Text, Flex, VStack, Show, useBreakpointValue } from "@chakra-ui/react";
import {
    DialogCloseTrigger,
    DialogContent,
    DialogRoot,
    DialogTrigger,
} from "../ui/dialog";
import { TopicoResponse } from "../../service/TopicoService";
import { TopicoCard } from "../cards/TopicoCard";
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

    const size = useBreakpointValue({ base: "md", md: "cover" });

    return (
            <DialogRoot
                size={size as "md"| "cover"}
                placement="center"
                motionPreset="slide-in-bottom"
            >
                <DialogTrigger asChild bg={"white"} w={"100%"} h={"6em"}>
                    <Button variant="outline">
                        <VStack alignItems={"start"} width={"100%"} h={"100%"} justifyContent={"center"}>

                            <Flex gap={2} alignItems={"center"}>
                                <Text fontSize="sm" color="gray.500">
                                    {topico.dataCriacao}
                                </Text>
                                <Show when={usuario?.role === "ADMIN"}>
                                    <DeleteMenu topico={topico} />
                                </Show>
                            </Flex>
                            <Text fontSize={"2xl"}>
                                {topico.titulo}
                            </Text>
                        </VStack>
                    </Button>
                </DialogTrigger>
                <DialogContent p={2} bg={"none"} border={"none"} shadow={"none"}>
                    <DialogCloseTrigger m={2}/>
                    <TopicoCard key={topico.id} topico={topico} />
                </DialogContent>
            </DialogRoot>
    );
};
