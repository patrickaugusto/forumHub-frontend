import './App.css';
import { VStack } from "@chakra-ui/react";
import AppRoutes from './routes/Routes';
import { Toaster } from './components/ui/toaster';


function App() {
  return (
      <VStack w={"100%"} zIndex={0} position="relative">
        <Toaster />
        <AppRoutes />
      </VStack>
  );
}

export default App;
