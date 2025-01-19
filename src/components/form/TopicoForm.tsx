import { Input, Button, Stack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import React, { useState } from "react";
import "../../style/Modal.css";
import TopicoService from "../../service/TopicoService";

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
    } catch (error) {
      console.error("Erro ao adicionar tópico:", error);
    }
  };

  return (
    <Stack>
      <FormControl>
        <FormLabel className="modal_label">Título</FormLabel>
        <Input
          value={titulo}
          onChange={(e) => handleInputChange("titulo", e.target.value)} 
          placeholder="Título do Tópico"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Mensagem</FormLabel>
        <Input
          value={mensagem}
          onChange={(e) => handleInputChange("mensagem", e.target.value)}
          placeholder="Mensagem do Tópico"
        />
      </FormControl>

      <Stack direction="row" justify="flex-end" mt={4}>
        <Button colorScheme="blue" onClick={handleSave} className="modal_button_save">
          Salvar
        </Button>
        <Button onClick={onClose} className="modal_button_cancel">
          Cancelar
        </Button>
      </Stack>
    </Stack>
  );
};

export default TopicoForm;
