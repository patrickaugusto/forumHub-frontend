import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Alert, AlertIcon, AlertTitle, AlertDescription, } from "@chakra-ui/alert";
import '../../style/LoginScreen.css'; 
interface ErrorAlertProps {
    message: string;
    onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
    return (
        <Alert status="error" className="error-alert">
            <Flex align="center" justify="center" w="100%">
                <Box className="alert-icon" boxSize="20px" display="flex" justifyContent="center">
                    <AlertIcon />
                </Box>
                <Box flex="1" ml={2}>
                    <AlertTitle className="alert-title">Erro ao fazer login!</AlertTitle>
                    <AlertDescription className="alert-description">{message}</AlertDescription>
                </Box>
            </Flex>
        </Alert>
    );
};

export default ErrorAlert;
