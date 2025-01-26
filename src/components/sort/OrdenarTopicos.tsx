import { Button } from "@chakra-ui/react"
import {
    MenuContent,
    MenuRadioItem,
    MenuRadioItemGroup,
    MenuRoot,
    MenuTrigger,
} from "../ui/menu"
import { useState } from "react"
import { HiSortAscending } from "react-icons/hi"

const OrdenarTopicos = () => {
    const [value, setValue] = useState("asc")
    return (
        <MenuRoot>
            <MenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <HiSortAscending /> Ordenar
                </Button>
            </MenuTrigger>
            <MenuContent minW="10rem">
                <MenuRadioItemGroup
                    value={value}
                    onValueChange={(e) => setValue(e.value)}
                >
                    <MenuRadioItem value="desc">Mais Recentes</MenuRadioItem>
                    <MenuRadioItem value="asc">Mais Antigos</MenuRadioItem>
                </MenuRadioItemGroup>
            </MenuContent>
        </MenuRoot>
    )
}

export default OrdenarTopicos