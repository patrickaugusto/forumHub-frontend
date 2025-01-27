import { VStack, Button, Text } from "@chakra-ui/react";

interface ProfileActionsProps {
  onLogout: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ onLogout }) => {
  return (
    <VStack w="100%">
      <Button
        colorScheme="red"
        size="lg"
        w="50%"
        borderRadius="md"
        variant="outline"
        onClick={onLogout}
      >
        <Text color={"red.600"}>Sair da Conta</Text>
      </Button>
    </VStack>
  );
};

export default ProfileActions;
