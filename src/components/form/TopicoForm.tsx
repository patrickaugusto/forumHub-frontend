import { Input, Button, Stack, HStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import React, { useState } from "react";
import { Field } from "../ui/field"
import "../../style/Modal.css";
import TopicoService from "../../service/TopicoService";
import { Textarea } from "@chakra-ui/react"
import { LuCheck, LuX } from "react-icons/lu"

interface TopicoFormProps {
  onClose: () => void;
}

const TopicoForm = ({ onClose }: TopicoFormProps) => {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");

  const autorId = React.useMemo(() => {
    const storedId = localStorage.getItem("userId");
    return storedId ? parseInt(storedId, 10) : null;
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (field === "titulo") {
      setTitulo(value);
    } else if (field === "mensagem") {
      setMensagem(value);
    }
  };

  const handleSave = async () => {
    if (!autorId) {
      console.error("Erro: Autor não encontrado. Faça login novamente.");
      return;
    }

    const novoTopico = { titulo, mensagem, autorId };

    try {
      await TopicoService.adicionarTopico(novoTopico);
      console.log("Tópico adicionado com sucesso!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao adicionar tópico:", error);
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
          />
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
              required={true} variant="subtle" 
              resize={"none"}
              h={150}
              />
          </Field>
        </HStack>
      </FormControl>


      <Stack direction="row" justify="flex-end" mt={4}>
        <Button onClick={onClose} variant="subtle" colorPalette="red" flex="1">
          <LuX />
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="subtle" colorPalette="blue" flex="1">
          <LuCheck />
          Salvar
        </Button>
      </Stack>
    </Stack>
  );
};

export default TopicoForm;
