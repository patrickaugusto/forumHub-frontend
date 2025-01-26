import './App.css';
import { VStack } from "@chakra-ui/react";
import AppRoutes from './routes/Routes';
import wave from './assets/layered-waves.svg';
import { Toaster } from './components/ui/toaster';


function App() {
  return (
      <VStack w={"100%"} zIndex={0} position="relative">
        <Toaster />
        <AppRoutes />
        <img src={wave} className="wave" />
      </VStack>
  );
}

export default App;
