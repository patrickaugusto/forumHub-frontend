import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from '@chakra-ui/modal';
import { Button, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import TopicoForm from "../form/TopicoForm";
import "../../style/Modal.css"

const AdicionarTopico = () => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} className="button">
        Adicionar Tópico
      </Button>

      <Modal initialFocusRef={React.useRef(null)} isOpen={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='modal_content'>
          <ModalHeader className='modal_header'>Adicionar Tópico</ModalHeader>
          <ModalBody pb={6} className='modal_body'>
            <TopicoForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdicionarTopico;
