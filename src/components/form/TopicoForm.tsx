import { Input, Button, Stack, HStack, Center, Flex, Text } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/form-control";
import React, { useState } from "react";
import { Field } from "../ui/field";
import TopicoService from "../../service/TopicoService";
import { Textarea } from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import { toaster } from "../ui/toaster";

interface TopicoFormProps {
  onClose: () => void;
}

const TopicoForm = ({ onClose }: TopicoFormProps) => {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");

  const MAX_TITULO_LENGTH = 50;
  const MAX_MENSAGEM_LENGTH = 500;

  const usuarioId = Number(localStorage.getItem("userId"));

  const handleInputChange = (field: string, value: string) => {
    if (field === "titulo") {
      setTitulo(value);
    } else if (field === "mensagem") {
      setMensagem(value);
    }
  };

  const handleSave = async () => {
    
    if (!usuarioId) {
      console.error("Erro: Autor não encontrado. Faça login novamente.");
      return;
    }

    const novoTopico = { titulo, mensagem, usuarioId };

    try {
      await TopicoService.adicionarTopico(novoTopico);
      console.log("Tópico adicionado com sucesso!");
      toaster.create({
        title: "Tópico criado com sucesso!",
        type: "success",
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao adicionar tópico:", error);
      toaster.create({
        title: "Erro ao adicionar tópico.",
        type: "error",
      });
    }
  };

  return (
    <Stack>
      <FormControl isRequired>
        <HStack gap="10" width="full">
          <Field label="Título" required>
            <Input
              value={titulo}
              onChange={(e) => handleInputChange("titulo", e.target.value)}
              placeholder="Título do Tópico"
              required={true}
              maxLength={MAX_TITULO_LENGTH}
            />
            <Text fontSize="sm" color="gray.500">
              {titulo.length}/{MAX_TITULO_LENGTH} caracteres
            </Text>
          </Field>
        </HStack>
      </FormControl>
      <FormControl isRequired>
        <HStack gap="10" width="full">
          <Field label="Mensagem" required>
            <Textarea
              value={mensagem}
              onChange={(e) => handleInputChange("mensagem", e.target.value)}
              placeholder="Mensagem do Tópico"
              required={true}
              resize="none"
              h={150}
              maxLength={MAX_MENSAGEM_LENGTH}
            />
            <Text fontSize="sm" color="gray.500">
              {mensagem.length}/{MAX_MENSAGEM_LENGTH} caracteres
            </Text>
          </Field>
        </HStack>
      </FormControl>

      <Center mt={4}>
        <Flex direction="row" gap={2}>
          <Button onClick={onClose} variant="subtle" colorPalette="red" flex="1" p={2} width={200}>
            <LuX />
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="subtle" colorPalette="green" flex="1" p={2} width={200}>
            <LuCheck />
            Salvar
          </Button>
        </Flex>
      </Center>
    </Stack>
  );
};

export default TopicoForm;
