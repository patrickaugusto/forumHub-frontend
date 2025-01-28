import { Button, useCheckboxGroup } from "@chakra-ui/react";
import {
  MenuCheckboxItem,
  MenuContent,
  MenuItemGroup,
  MenuRoot,
  MenuTrigger,
} from "../ui/menu";
import { CiMenuKebab } from "react-icons/ci";
import TopicoService, { TopicoResponse } from "../../service/TopicoService";
import { toaster } from "../ui/toaster";

interface DeleteMenuProps {
  topico: TopicoResponse;
}

export const DeleteMenu: React.FC<DeleteMenuProps> = ({ topico }) => {
  const group = useCheckboxGroup({ defaultValue: ["bar"] });

  const deleteTopico = async (topicoId: number) => {
    try {
      await TopicoService.deletarTopico(topicoId);
      console.log(`Tópico ${topicoId} deletado com sucesso!`);
      toaster.create({
        title: "Tópico deletado com sucesso!",
        type: "success",
      });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao deletar tópico:", error);
      toaster.create({
        title: "Erro ao deletar tópico!",
        type: "error",
      });
    }
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild border={"none"} px={1}>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => e.stopPropagation()} 
        >
          <CiMenuKebab rotate={"90deg"} />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItemGroup>
          {items.map(({ title, value }) => (
            <MenuCheckboxItem
              key={value}
              value={value}
              checked={group.isChecked(value)}
              onCheckedChange={() => group.toggleValue(value)}
              onClick={(e) => {
                e.stopPropagation(); 
                deleteTopico(topico.id); 
              }}
            >
              {title}
            </MenuCheckboxItem>
          ))}
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  );
};

const items = [{ title: "Deletar", value: "" }];
