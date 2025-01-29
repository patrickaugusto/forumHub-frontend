import { Button, Text, Flex, VStack, useBreakpointValue } from "@chakra-ui/react";
import {
    DialogContent,
    DialogRoot,
    DialogTrigger,
    DialogCloseTrigger
} from "../ui/dialog";
import { TopicoResponse } from "../../service/TopicoService";
import { TopicoCard } from "../cards/TopicoCard";
import { DeleteMenu } from "../menu/DeleteMenu";


interface TopicoDialogProps {
    topico: TopicoResponse;
}

export const TopicoPerfil: React.FC<TopicoDialogProps> = ({ topico }) => {

    const size = useBreakpointValue({ base: "md", md: "cover" });

    return (
            <DialogRoot
                size={size as "md" | "cover"}
                placement="center"
                motionPreset="slide-in-bottom"
            >
                <DialogTrigger asChild bg={"bg.subtle"} w={"100%"} h={"6em"}>
                    <Button variant="outline">
                        <VStack alignItems={"start"} width={"100%"} gap={1}>
                            <Flex gap={2} alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                                <Text fontSize="sm" color="gray.500">
                                    {topico.dataCriacao}
                                </Text>
                                <DeleteMenu topico={topico} />
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
