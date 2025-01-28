import { Button, HStack, Text, Flex, VStack } from "@chakra-ui/react";
import {
    DialogContent,
    DialogRoot,
    DialogTrigger,
} from "../ui/dialog";
import { TopicoResponse } from "../../service/TopicoService";
import { TopicoCard } from "../cards/TopicoCard";
import { Badge } from "@chakra-ui/react";
import { DeleteMenu } from "../menu/DeleteMenu";


interface TopicoDialogProps {
    topico: TopicoResponse;
}

export const TopicoPerfil: React.FC<TopicoDialogProps> = ({ topico }) => {
    return (
        <HStack wrap="wrap" gap="4">
            <DialogRoot
                placement="center"
                motionPreset="slide-in-bottom"
            >
                <DialogTrigger asChild bg={"bg.subtle"} w={"100%"} h={"6em"}>
                    <Button variant="outline">
                        <VStack alignItems={"start"} width={"100%"} gap={1}>

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
                                    <DeleteMenu topico={topico} />
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
