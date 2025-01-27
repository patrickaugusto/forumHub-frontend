import { HStack, Input, Text, Box } from "@chakra-ui/react";
import { FiEdit3, FiCheck, FiX } from "react-icons/fi";

interface EditableFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (newValue: string) => void;
  onCancel: () => void;
  onChange: (value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onChange,
}) => {
  return (
    <HStack w="100%" justify="space-between" align="center">
      {isEditing ? (
        <HStack width="100%">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            size="md"
            placeholder={`Editar ${label.toLowerCase()}`}
          />
          <HStack>
            <Box
              as="span"
              color="green.500"
              cursor="pointer"
              fontSize="lg"
              onClick={() => onSave(value)}
            >
              <FiCheck />
            </Box>
            <Box
              as="span"
              color="red.500"
              cursor="pointer"
              fontSize="lg"
              onClick={onCancel}
            >
              <FiX />
            </Box>
          </HStack>
        </HStack>
      ) : (
        <>
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            {value}
          </Text>
          <Box
            as="span"
            color="blue.500"
            cursor="pointer"
            fontSize="lg"
            onClick={onEdit}
          >
            <FiEdit3 />
          </Box>
        </>
      )}
    </HStack>
  );
};

export default EditableField;
