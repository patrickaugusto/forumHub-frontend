import './App.css';
import { VStack } from "@chakra-ui/react";
import AppRoutes from './routes/Routes';

function App() {
  return (
      <VStack w={"100%"}>
        <AppRoutes />
      </VStack>
  );
}

export default App;
