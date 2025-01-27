"use client"

import { Button, useCheckboxGroup } from "@chakra-ui/react"
import {
  MenuCheckboxItem,
  MenuContent,
  MenuItemGroup,
  MenuRoot,
  MenuTrigger,
} from "../ui/menu"
import { CiMenuKebab } from "react-icons/ci";


export const DeleteMenu = () => {
  const group = useCheckboxGroup({ defaultValue: ["bar"] })
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
            <CiMenuKebab />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItemGroup title="Features">
          {items.map(({ title, value }) => (
            <MenuCheckboxItem
              key={value}
              value={value}
              checked={group.isChecked(value)}
              onCheckedChange={() => group.toggleValue(value)}
            >
              {title}
            </MenuCheckboxItem>
          ))}
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  )
}

const items = [
  { title: "Delete", value: "" },
  { title: "Detect Language", value: "detect-language" },
  { title: "Spellcheck", value: "spellcheck" },
]
