import { Box } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";

interface AvatarProfileProps {
  name: string;
}

const AvatarProfile: React.FC<AvatarProfileProps> = ({ name }) => {
  return (
    <Box w="8em" h="8em">
      <Avatar size="full" name={name} />
    </Box>
  );
};

export default AvatarProfile;
